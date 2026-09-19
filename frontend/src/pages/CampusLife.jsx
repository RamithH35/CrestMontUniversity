import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import EventCard from "../components/EventCard";
import LoadingState from "../components/LoadingState";
import PageHero from "../components/PageHero";

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://fullstack-web-mvpk.onrender.com";

function CampusLife() {
  const [eventsByCategory, setEventsByCategory] = useState({
    upcoming: [],
    past: [],
    marquee: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ category: "all", role: "all", club: "all" });
  const [showFilters, setShowFilters] = useState(false);

  const loadEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const [upcomingRes, pastRes, marqueeRes] = await Promise.all([
        fetch(`${API_BASE}/events?category=upcoming`),
        fetch(`${API_BASE}/events?category=past`),
        fetch(`${API_BASE}/events?category=marquee`),
      ]);
      const [upcoming, past, marquee] = await Promise.all([
        upcomingRes.json(),
        pastRes.json(),
        marqueeRes.json(),
      ]);
      setEventsByCategory({
        upcoming: Array.isArray(upcoming) ? upcoming : [],
        past: Array.isArray(past) ? past : [],
        marquee: Array.isArray(marquee) ? marquee : [],
      });
    } catch (fetchError) {
      setError("Unable to load events right now. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

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

  const allClubs = useMemo(() => {
    const clubs = [
      ...eventsByCategory.upcoming,
      ...eventsByCategory.past,
      ...eventsByCategory.marquee,
    ].map((event) => event.club);
    return [...new Set(clubs.filter(Boolean))].sort();
  }, [eventsByCategory]);

  const applyFilters = (events) =>
    events.filter((event) => {
      const categoryMatch = filters.category === "all" || getEventCategoryTag(event) === filters.category;
      const roleMatch =
        filters.role === "all" ||
        event.type === filters.role ||
        (event.type === "both" && (filters.role === "volunteer" || filters.role === "register"));
      const clubMatch = filters.club === "all" || event.club === filters.club;
      return categoryMatch && roleMatch && clubMatch;
    });

  const filtered = {
    upcoming: applyFilters(eventsByCategory.upcoming),
    past: applyFilters(eventsByCategory.past),
    marquee: applyFilters(eventsByCategory.marquee),
  };

  return (
    <div>
      <PageHero
        title="Campus Life"
        subtitle="Join ongoing campus events and explore our event history gallery."
      />

      <section className="py-[100px]">
        <div className="wrap">
          <div className="glass-card p-8 sm:p-10 rounded-[6px] mb-14 grid gap-8 md:grid-cols-[1.4fr_1fr] items-center border border-[var(--line)]">
            <div>
              <span className="eyebrow mb-3">
                <span className="dot" /> Campus Events Desk
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                Current events are open for registration
              </h2>
              <p className="mt-3 text-[var(--ink-soft)] text-[15px] leading-relaxed">
                Upcoming and marquee events include active registration and volunteer links. Past events are preserved in our archive gallery.
              </p>
            </div>
            <div className="bg-white/80 border border-[var(--line)] p-6 rounded-[6px] flex flex-col justify-between shadow-xs">
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed font-sans">
                Looking to explore the archive of completed symposiums and hackathons?
              </p>
              <a
                href="#past-events"
                className="btn btn-outline mt-4 w-full justify-center text-xs uppercase tracking-wider font-mono font-semibold"
              >
                Check Past Events <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--cta)] text-white text-[10px] ml-1">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
              Events Hub
            </h2>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="btn btn-outline"
            >
              Filter Events
            </button>
          </div>

          {showFilters && (
            <div className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-[4px] mb-8 grid gap-4 md:grid-cols-3">
              <select
                value={filters.category}
                onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
                className="select"
              >
                <option value="all">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Culture">Culture</option>
                <option value="Community">Community</option>
              </select>
              <select
                value={filters.role}
                onChange={(e) => setFilters((prev) => ({ ...prev, role: e.target.value }))}
                className="select"
              >
                <option value="all">All Roles</option>
                <option value="volunteer">Volunteer</option>
                <option value="register">Register</option>
                <option value="both">Both</option>
              </select>
              <select
                value={filters.club}
                onChange={(e) => setFilters((prev) => ({ ...prev, club: e.target.value }))}
                className="select"
              >
                <option value="all">All Clubs</option>
                {allClubs.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </select>
            </div>
          )}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-sm font-medium text-red-600 rounded-[4px]">
              {error}
            </div>
          )}

          <div className="space-y-16">
            <div>
              <h3 className="mb-6 font-display text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
                Marquee Events
              </h3>
              {loading ? (
                <LoadingState label="Loading marquee events..." />
              ) : filtered.marquee.length ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.marquee.map((event) => (
                    <EventCard key={event._id || event.id} event={event} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No marquee events yet"
                  description="Add featured events to showcase major campus activities."
                />
              )}
            </div>

            <div>
              <h3 className="mb-6 font-display text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
                Upcoming Events
              </h3>
              {loading ? (
                <LoadingState label="Loading upcoming events..." />
              ) : filtered.upcoming.length ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.upcoming.map((event) => (
                    <EventCard key={event._id || event.id} event={event} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No upcoming events"
                  description="Check again later for new club activities."
                />
              )}
            </div>

            <div id="past-events" className="pt-6 border-t border-[var(--line)]">
              <h3 className="mb-2 font-display text-xl font-bold tracking-tight text-[var(--ink)] sm:text-2xl">
                Past Events Archive
              </h3>
              <p className="mb-6 text-sm text-[var(--ink-soft)]">
                Past events are displayed for exhibition only. Registration is not available.
              </p>
              {loading ? (
                <LoadingState label="Loading past events..." />
              ) : filtered.past.length ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.past.map((event) => (
                    <EventCard key={event._id || event.id} event={event} interactive={false} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No past events"
                  description="Completed events will be archived here."
                />
              )}
            </div>
          </div>

          <div className="bg-[var(--card)] border border-[var(--line)] p-10 text-center rounded-[4px] mt-16">
            <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--ink)]">
              Club Head Access Portal
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-[var(--ink-soft)] text-sm leading-relaxed">
              Log in to the administrator console to submit or manage campus events.
            </p>
            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <Link
                to="/club-head/login"
                className="btn btn-solid"
              >
                Club Head? Login Here
              </Link>
              <Link
                to="/"
                className="btn btn-outline"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CampusLife;
