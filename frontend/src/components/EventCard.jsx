import React from 'react';
import { motion } from 'framer-motion';
import DuoImage from './DuoImage';
import { hoverLift, staggerItem } from '../lib/motion';

/**
 * Helper to resolve high-quality Unsplash image URLs for placeholders.
 */
function getEventImage(event) {
  if (event.imageUrl) return event.imageUrl;
  if (event.image) return event.image;

  const titleLower = (event.title || "").toLowerCase();
  if (titleLower.includes("hackathon")) {
    return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&h=600&q=80";
  } else if (titleLower.includes("founders") || titleLower.includes("talk")) {
    return "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=500&h=600&q=80";
  } else if (titleLower.includes("showcase") || titleLower.includes("spring")) {
    return "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=500&h=600&q=80";
  }
  
  return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&h=600&q=80";
}

/**
 * Helper to resolve event category tags
 */
function getEventCategoryTag(event) {
  const club = event.club || "";
  if (club.includes("CodeForge") || club.includes("Robotics")) {
    return "Technology";
  }
  if (club.includes("AeroDesign") || club.includes("Entrepreneurs")) {
    return "Business";
  }
  if (club.includes("EcoImpact")) {
    return "Culture";
  }
  return "Community";
}

/**
 * Helper to format event date
 */
function getEventDate(event) {
  if (event.eventDate) {
    const d = new Date(event.eventDate);
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[d.getMonth()] || "SEP";
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }
  if (event.date) return event.date;
  
  if (event.createdAt) {
    const d = new Date(event.createdAt);
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[d.getMonth()] || "SEP";
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const titleLower = (event.title || "").toLowerCase();
  if (titleLower.includes("hackathon")) {
    return "18 — 20 SEP 2026";
  } else if (titleLower.includes("founders") || titleLower.includes("talk")) {
    return "02 OCT 2026";
  } else if (titleLower.includes("showcase") || titleLower.includes("spring")) {
    return "14 MAR 2026";
  }
  
  return "24 OCT 2026";
}

function EventCard({ event }) {
  const isPast = event.category === "past";
  const dateStr = getEventDate(event);
  const tagStr = getEventCategoryTag(event);
  const imageUrl = getEventImage(event);

  const isRegistrationClosed = event.registrationEndDate && new Date(event.registrationEndDate) < new Date();

  return (
    <motion.div
      variants={staggerItem}
      className="event-card flex flex-col glass-card rounded-[4px] overflow-hidden"
    >
      <motion.div 
        className="event-media aspect-[4/5] overflow-hidden"
        variants={hoverLift}
        initial="rest"
        whileHover="hover"
      >
        <DuoImage 
          src={imageUrl} 
          alt={event.title} 
          className="w-full h-full"
          hoverEffect={false}
        />
      </motion.div>

      <div className="event-body p-[20px] flex-1 flex flex-col justify-between">
        <div>
          <div className="event-top flex justify-between items-start mb-[10px]">
            <span className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--ink-soft)]">
              {tagStr}
            </span>
            <span className="status flex items-center gap-[6px] font-mono text-[10px] text-[var(--ink-soft)]">
              <span className={`dot w-[6px] h-[6px] rounded-full flex-none ${isPast ? 'bg-[#B6B0A2]' : 'bg-[var(--blue)]'}`} />
              {isPast ? "Past" : "Upcoming"}
            </span>
          </div>
          <h3 className="font-display font-bold text-[18px] leading-[1.05] tracking-[-0.02em] mb-[6px] text-[var(--ink)]">
            {event.title}
          </h3>
          <p className="text-[13px] text-[var(--ink-soft)] leading-relaxed mt-2 line-clamp-2">
            {event.description}
          </p>
        </div>
        <div>
          <span className="event-date mono font-mono text-[12px] text-[var(--ink-soft)] uppercase mt-[12px] block">
            {dateStr}
          </span>

          {/* Registration link validation */}
          {!isPast && (event.registerLink || event.volunteerLink) && (
            <div className="mt-4 pt-4 border-t border-[var(--line)] flex gap-3 items-center">
              {isRegistrationClosed ? (
                <span className="text-[11px] font-mono uppercase tracking-[0.05em] text-[var(--clay)] font-bold">
                  Registration closed
                </span>
              ) : (
                <>
                  {event.registerLink && (
                    <a
                      href={event.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline text-[11px] py-[6px] px-[12px] gap-[4px] rounded-full"
                    >
                      Register
                    </a>
                  )}
                  {event.volunteerLink && (
                    <a
                      href={event.volunteerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline text-[11px] py-[6px] px-[12px] gap-[4px] rounded-full"
                    >
                      Volunteer
                    </a>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default EventCard;
