import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import LoadingState from "../components/LoadingState";
import EventCard from "../components/EventCard";
import { CLUB_DATA } from "./Clubs";
import { fadeUp, staggerContainer } from "../lib/motion";

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://fullstack-web-mvpk.onrender.com";

function ClubDetail() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || "");
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubAndEvents = async () => {
      try {
        setLoading(true);
        const [clubRes, eventsRes] = await Promise.all([
          fetch(`${API_BASE}/clubs/${encodeURIComponent(decodedName)}`),
          fetch(`${API_BASE}/events`)
        ]);

        if (clubRes.ok) {
          const clubData = await clubRes.json();
          setClub(clubData);
        }
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(Array.isArray(eventsData) ? eventsData : []);
        }
      } catch (err) {
        console.error("Failed to fetch club detail or events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClubAndEvents();
  }, [decodedName]);

  const clubInfo = useMemo(() => {
    return CLUB_DATA[decodedName] || {
      desc: "Explore events and activities run by our student community.",
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&h=600&q=80",
      tag: "General"
    };
  }, [decodedName]);

  const clubEvents = useMemo(() => {
    return events.filter(e => e.club === decodedName);
  }, [events, decodedName]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      <PageHero
        title={decodedName}
        subtitle={club ? club.description : clubInfo.desc}
      />

      <section className="py-[100px]">
        <div className="wrap">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-12 md:grid-cols-3"
          >
            {/* Left side: Club metadata & Actions */}
            <motion.div variants={fadeUp} className="md:col-span-1">
              <div className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-[4px] sticky top-24">
                <span className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--ink-soft)] mb-4 inline-block">
                  {clubInfo.tag}
                </span>
                <h3 className="font-display font-bold text-[22px] text-[var(--ink)] mb-3">
                  About the Club
                </h3>
                <p className="text-[14px] leading-relaxed text-[var(--ink-soft)] mb-6">
                  {club ? club.description : clubInfo.desc}
                </p>
                <div className="flex flex-col gap-3">
                  <Link to="/clubs" className="btn btn-outline w-full justify-center">
                    Back to Clubs
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right side: Club Events & Achievements */}
            <motion.div variants={fadeUp} className="md:col-span-2 space-y-12">
              {/* Achievements section */}
              {club && club.achievements && club.achievements.length > 0 && (
                <div>
                  <h2 className="font-display text-[clamp(22px,2.5vw,32px)] font-bold text-[var(--ink)] mb-6">
                    Club Achievements
                  </h2>
                  <div className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-[4px]">
                    <ul className="grid gap-4 list-inside list-disc text-[14px] leading-relaxed text-[var(--ink-soft)]">
                      {club.achievements.map((ach, i) => (
                        <li key={i} className="pl-1">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Club Events */}
              <div>
                <h2 className="font-display text-[clamp(22px,2.5vw,32px)] font-bold text-[var(--ink)] mb-6">
                  Club Agenda
                </h2>
                {clubEvents.length > 0 ? (
                  <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
                    {clubEvents.map(event => (
                      <EventCard key={event._id || event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-[var(--card)] border border-[var(--line)] p-8 text-center rounded-[4px]">
                    <p className="text-sm text-[var(--ink-soft)]">No events run by this club yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
          <div className="mt-12">
            <Link to="/clubs" className="btn btn-outline">
              Back to Clubs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClubDetail;
