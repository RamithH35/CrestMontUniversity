const express = require("express");
const Event = require("../models/Event");
const { requireClubHead } = require("../middleware/auth");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

function isGoogleFormsUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const host = parsed.hostname.toLowerCase();
    return host === "forms.gle" || host === "docs.google.com";
  } catch (error) {
    return false;
  }
}

async function verifyGoogleFormsRedirect(urlString) {
  if (!isGoogleFormsUrl(urlString)) {
    return false;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(urlString, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response || !response.url) {
      return false;
    }

    return isGoogleFormsUrl(response.url);
  } catch (error) {
    return false;
  }
}

async function verifyEventContent(title, description) {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Gemini API Key configuration check:", apiKey ? "Loaded (non-empty)" : "Missing/Empty");
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("GEMINI_API_KEY is not configured. Rejecting submission (fail closed).");
    return false;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a campus event moderator. Classify whether the following submission looks like a legitimate campus/club event or unrelated/spam/inappropriate content.
Title: "${title}"
Description: "${description}"

Respond ONLY with "legitimate" or "flagged".`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    console.log("Raw Gemini response object:", JSON.stringify(response));
    const text = response.text ? response.text.trim().toLowerCase() : "";
    console.log("Raw Gemini response text:", text);
    
    // Robust checks: clean punctuation and check for inclusion of "legitimate"
    const cleanText = text.replace(/[^a-z]/g, "");
    return cleanText.includes("legitimate") && !cleanText.includes("flagged");
  } catch (error) {
    console.error("Gemini API call failed. Rejecting submission (fail closed):", error);
    return false;
  }
}

async function getUnsplashImage(category, title) {
  const fallbacks = {
    upcoming: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    past: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    marquee: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    default: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  };

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey || accessKey === "your_unsplash_access_key_here") {
    console.warn("UNSPLASH_ACCESS_KEY is not configured. Using placeholder image.");
    return fallbacks[category] || fallbacks.default;
  }

  try {
    const query = encodeURIComponent(`${category} ${title}`.trim());
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=1`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    });

    if (!response.ok) {
      console.error(`Unsplash API responded with status: ${response.status}`);
      return fallbacks[category] || fallbacks.default;
    }

    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error("Failed to fetch image from Unsplash:", error);
  }

  return fallbacks[category] || fallbacks.default;
}

function normalizeIncomingEvent(body) {
  const type = String(body.type || "").toLowerCase();
  if (!["volunteer", "register", "both"].includes(type)) {
    return { ok: false, message: "Type must be volunteer, register, or both." };
  }

  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const club = String(body.club || "").trim();

  if (!title) {
    return { ok: false, message: "Title is required." };
  }

  const volunteerLink = body.volunteerLink ? String(body.volunteerLink).trim() : "";
  const registerLink = body.registerLink ? String(body.registerLink).trim() : "";
  const category = String(body.category || "upcoming").toLowerCase();

  if (!["upcoming", "past", "marquee"].includes(category)) {
    return { ok: false, message: "Category must be upcoming, past, or marquee." };
  }
  if (category === "past") {
    return {
      ok: false,
      message: "Past events are exhibition-only and cannot be created.",
    };
  }

  if (type === "volunteer" && !volunteerLink) {
    return { ok: false, message: "Volunteer link is required for volunteer type." };
  }

  if (type === "register" && !registerLink) {
    return { ok: false, message: "Register link is required for register type." };
  }

  if (type === "both" && (!volunteerLink || !registerLink)) {
    return { ok: false, message: "Both volunteer and register links are required." };
  }

  const now = new Date();

  const eventDate = body.eventDate ? new Date(body.eventDate) : null;
  if (!eventDate || isNaN(eventDate.getTime())) {
    return { ok: false, message: "A valid Event Date is required." };
  }
  if (eventDate < now) {
    return { ok: false, message: "Event Date cannot be in the past." };
  }

  const registrationEndDate = body.registrationEndDate ? new Date(body.registrationEndDate) : null;
  if (!registrationEndDate || isNaN(registrationEndDate.getTime())) {
    return { ok: false, message: "A valid Registration End Date is required." };
  }
  if (registrationEndDate < now) {
    return { ok: false, message: "Registration End Date cannot be in the past." };
  }
  if (registrationEndDate > eventDate) {
    return { ok: false, message: "Registration End Date cannot be after the Event Date." };
  }

  return {
    ok: true,
    event: {
      title,
      description,
      club,
      type,
      category,
      volunteerLink,
      registerLink,
      eventDate,
      registrationEndDate,
    },
  };
}

// GET /events
router.get("/", async (req, res) => {
  try {
    const category = req.query.category ? String(req.query.category).toLowerCase() : "";
    const query = {};
    const now = new Date();

    if (category) {
      if (!["upcoming", "past", "marquee"].includes(category)) {
        return res.status(400).json({ message: "Invalid category filter." });
      }
      if (category === "past") {
        query.$or = [
          { category: "past" },
          { eventDate: { $lte: now } }
        ];
      } else {
        query.category = category;
        query.eventDate = { $gt: now };
      }
    }

    const events = await Event.find(query).sort({ createdAt: -1 });

    const computedEvents = events.map(event => {
      const isPast = event.eventDate && new Date(event.eventDate) <= now;
      if (isPast) {
        const obj = event.toObject ? event.toObject() : event;
        return {
          ...obj,
          category: "past"
        };
      }
      return event;
    });

    return res.json(computedEvents);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch events." });
  }
});

// POST /events
router.post("/", requireClubHead, async (req, res) => {
  const normalized = normalizeIncomingEvent(req.body);
  if (!normalized.ok) {
    return res.status(400).json({ message: normalized.message });
  }

  const { title, description, type, volunteerLink, registerLink } = normalized.event;

  // Handle Demo Account restrictions
  if (req.clubHead && req.clubHead.isDemo) {
    normalized.event.isDemo = true;
    const oneHourOut = new Date(Date.now() + 60 * 60 * 1000);
    normalized.event.demoExpiresAt = oneHourOut;
    
    // Silently cap registrationEndDate to maximum 1 hour, or eventDate, whichever is smaller
    const maxAllowedRegDate = normalized.event.eventDate && normalized.event.eventDate < oneHourOut
      ? normalized.event.eventDate
      : oneHourOut;
    
    if (normalized.event.registrationEndDate && normalized.event.registrationEndDate > maxAllowedRegDate) {
      normalized.event.registrationEndDate = maxAllowedRegDate;
    }
  }

  const linksToCheck = [];
  if (type === "volunteer" || type === "both") {
    linksToCheck.push({ label: "Volunteer", url: volunteerLink });
  }
  if (type === "register" || type === "both") {
    linksToCheck.push({ label: "Register", url: registerLink });
  }

  for (const link of linksToCheck) {
    const valid = await verifyGoogleFormsRedirect(link.url);
    if (!valid) {
      return res.status(400).json({
        message: `${link.label} link must be a valid Google Form URL (forms.gle or docs.google.com/forms).`,
      });
    }
  }

  // AI Content Moderation
  const isLegitimate = await verifyEventContent(title, description);
  if (!isLegitimate) {
    return res.status(400).json({
      message: "Event submission was flagged as inappropriate, spam, or unrelated.",
    });
  }

  // Fetch image from Unsplash
  const imageUrl = await getUnsplashImage(normalized.event.category, title);
  normalized.event.imageUrl = imageUrl;

  try {
    const createdEvent = await Event.create(normalized.event);
    return res.status(201).json(createdEvent);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create event." });
  }
});

// DELETE /events/:id
router.delete("/:id", requireClubHead, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found." });
    }
    return res.json({ message: "Deleted" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid event id." });
  }
});

module.exports = router;
