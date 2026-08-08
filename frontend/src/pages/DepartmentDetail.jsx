import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import LoadingState from "../components/LoadingState";
import EventCard from "../components/EventCard";
import { fadeUp, staggerContainer } from "../lib/motion";

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://fullstack-web-mvpk.onrender.com";

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

function initials(name) {
  const parts = String(name || "")
    .split(" ")
    .filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function DepartmentDetail() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [deptRes, eventsRes] = await Promise.all([
          fetch(`${API_BASE}/departments/${id}`),
          fetch(`${API_BASE}/events`)
        ]);

        if (!deptRes.ok) {
          throw new Error("Department not found");
        }

        const deptData = await deptRes.json();
        const eventsData = await eventsRes.json();

        setDepartment(deptData);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        setError(err.message || "Failed to load department details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const targetCategory = useMemo(() => {
    if (!department) return "";
    const name = department.name;
    if (name.includes("Technology")) return "Technology";
    if (name.includes("Business")) return "Business";
    if (name.includes("Arts") || name.includes("Culture")) return "Culture";
    return "";
  }, [department]);

  const filteredEvents = useMemo(() => {
    if (!targetCategory) return [];
    return events.filter(e => getEventCategoryTag(e) === targetCategory);
  }, [events, targetCategory]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !department) {
    return (
      <div className="md:pr-[56px] py-[100px]">
        <div className="wrap">
          <div className="bg-[var(--card)] border border-[var(--line)] p-8 rounded-[4px]">
            <p className="text-lg font-semibold text-[var(--ink)]">Department not found</p>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              {error || "The requested department could not be located."}
            </p>
            <Link to="/departments" className="btn btn-outline mt-5">
              Back to Departments
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={department.name}
        subtitle={department.description}
      />

      <section className="md:pr-[56px] py-[100px]">
        <div className="wrap">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-12 md:grid-cols-3"
          >
            {/* Faculty section */}
            <motion.div variants={fadeUp} className="md:col-span-2">
              <h2 className="font-display text-[clamp(22px,2.5vw,32px)] font-bold text-[var(--ink)] mb-8">
                Faculty Profiles
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {department.faculty && department.faculty.length > 0 ? (
                  department.faculty.map((f, i) => (
                    <article key={i} className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-[4px] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--line)] font-mono text-sm font-bold text-[var(--blue)]">
                            {initials(f.name)}
                          </span>
                          <div>
                            <h3 className="text-base font-bold text-[var(--ink)]">{f.name}</h3>
                            <p className="text-xs text-[var(--ink-soft)] font-mono uppercase tracking-[0.05em] mt-1">{f.title}</p>
                          </div>
                        </div>
                        <p className="mt-4 text-[13px] leading-relaxed text-[var(--ink-soft)]">
                          {f.bio || "No biography provided."}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-sm text-[var(--ink-soft)]">No faculty members listed.</p>
                )}
              </div>
            </motion.div>

            {/* Achievements section */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-[clamp(22px,2.5vw,32px)] font-bold text-[var(--ink)] mb-8">
                Achievements
              </h2>
              <div className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-[4px]">
                {department.achievements && department.achievements.length > 0 ? (
                  <ul className="grid gap-4 list-inside list-disc text-[14px] leading-relaxed text-[var(--ink-soft)]">
                    {department.achievements.map((ach, i) => (
                      <li key={i} className="pl-1">
                        {ach}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[var(--ink-soft)]">No achievements recorded yet.</p>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Department Events Section */}
          <section className="mt-24">
            <h2 className="font-display text-[clamp(22px,2.5vw,32px)] font-bold text-[var(--ink)] mb-10">
              Department Events
            </h2>
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
                {filteredEvents.map(event => (
                  <EventCard key={event._id || event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-[var(--card)] border border-[var(--line)] p-8 text-center rounded-[4px]">
                <p className="text-sm text-[var(--ink-soft)]">No events scheduled for this department currently.</p>
              </div>
            )}
          </section>

          <div className="mt-12">
            <Link to="/departments" className="btn btn-outline">
              Back to Departments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DepartmentDetail;
