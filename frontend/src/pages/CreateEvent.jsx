import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import { CLUBS } from "../data/universityData";

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://fullstack-web-mvpk.onrender.com";

function isGoogleFormsUrl(urlString) {
  try {
    const parsed = new URL(urlString);
    const host = parsed.hostname.toLowerCase();
    return host === "forms.gle" || host === "docs.google.com";
  } catch (error) {
    return false;
  }
}

function CreateEvent() {
  const navigate = useNavigate();
  const isClubHead = localStorage.getItem("isClubHead") === "true";
  const [form, setForm] = useState({
    title: "",
    description: "",
    club: CLUBS[0],
    type: "register",
    category: "upcoming",
    volunteerLink: "",
    registerLink: "",
    eventDate: "",
    registrationEndDate: "",
  });
  const [status, setStatus] = useState("");

  if (!isClubHead) {
    return <Navigate to="/club-head/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (form.category === "past") {
      setStatus("Past events cannot be created from this page.");
      return;
    }
    
    const now = new Date();
    const eventDateObj = new Date(form.eventDate);
    const regDateObj = new Date(form.registrationEndDate);

    if (eventDateObj < now) {
      setStatus("Event date cannot be in the past.");
      return;
    }
    if (regDateObj < now) {
      setStatus("Registration end date cannot be in the past.");
      return;
    }
    if (regDateObj > eventDateObj) {
      setStatus("Registration end date cannot be after the event date.");
      return;
    }
    if (
      (form.type === "volunteer" || form.type === "both") &&
      !isGoogleFormsUrl(form.volunteerLink)
    ) {
      setStatus("Volunteer link must be a Google Form URL.");
      return;
    }
    if (
      (form.type === "register" || form.type === "both") &&
      !isGoogleFormsUrl(form.registerLink)
    ) {
      setStatus("Register link must be a Google Form URL.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });
      const payload = await res.json();
      if (!res.ok) {
        setStatus(payload.message || "Unable to create event.");
        return;
      }
      setStatus("Event created successfully.");
      setForm((prev) => ({
        ...prev,
        title: "",
        description: "",
        type: "register",
        category: "upcoming",
        volunteerLink: "",
        registerLink: "",
        eventDate: "",
        registrationEndDate: "",
      }));
    } catch (error) {
      setStatus("Unable to create event right now.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isClubHead");
    navigate("/club-head/login");
  };

  return (
    <div>
      <PageHero
        title="Create Event"
        subtitle="Create current campus events. Past events are exhibition-only and cannot be added."
      />

      <section className="mx-auto w-full max-w-3xl px-4 py-12 lg:px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--card)] border border-[var(--line)] p-8 rounded-[4px] grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Event title"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            className="input"
            required
          />
          <select
            value={form.club}
            onChange={(e) => setForm((prev) => ({ ...prev, club: e.target.value }))}
            className="select"
          >
            {CLUBS.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="input md:col-span-2"
            rows={4}
            required
          />

          <select
            value={form.type}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
            className="select"
          >
            <option value="volunteer">Volunteer</option>
            <option value="register">Register</option>
            <option value="both">Both</option>
          </select>

          <select
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            className="select"
          >
            <option value="upcoming">Upcoming</option>
            <option value="marquee">Marquee</option>
          </select>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-[0.05em] text-[var(--ink-soft)] mb-1">Event Date (Required)</label>
            <input
              type="datetime-local"
              value={form.eventDate}
              onChange={(e) => setForm((prev) => ({ ...prev, eventDate: e.target.value }))}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-[0.05em] text-[var(--ink-soft)] mb-1">Registration End Date (Required)</label>
            <input
              type="datetime-local"
              value={form.registrationEndDate}
              onChange={(e) => setForm((prev) => ({ ...prev, registrationEndDate: e.target.value }))}
              className="input"
              required
            />
          </div>

          {(form.type === "volunteer" || form.type === "both") && (
            <input
              type="url"
              placeholder="Volunteer Google Form link"
              value={form.volunteerLink}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, volunteerLink: e.target.value }))
              }
              className="input md:col-span-2"
              required
            />
          )}
          {(form.type === "register" || form.type === "both") && (
            <input
              type="url"
              placeholder="Register Google Form link"
              value={form.registerLink}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, registerLink: e.target.value }))
              }
              className="input md:col-span-2"
              required
            />
          )}

          {status && (
            <p className="text-sm text-[var(--clay)] md:col-span-2">{status}</p>
          )}

          <div className="flex flex-wrap gap-3 md:col-span-2 mt-2">
            <button className="btn btn-solid">
              Publish Event
            </button>
            <Link
              to="/campus-life"
              className="btn btn-outline"
            >
              Back to Campus Life
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn border border-red-500/30 bg-red-50/50 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateEvent;
