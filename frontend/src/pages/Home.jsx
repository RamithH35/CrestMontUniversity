import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, ExternalLink } from 'lucide-react';

// Imports of core sections and primitives
import Hero from '../components/Hero';
import About from '../components/About';
import MarqueeBand from '../components/MarqueeBand';
import FilterBar from '../components/FilterBar';
import HighlightCard from '../components/HighlightCard';
import StatBlock from '../components/StatBlock';
import EyebrowBadge from '../components/EyebrowBadge';
import DuoImage from '../components/DuoImage';
import { usePinnedSection } from '../hooks/usePinnedSection';
import { SplitText, gsap } from '../lib/motion';

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://fullstack-web-mvpk.onrender.com";

// Default/fallback events
const DEFAULT_EVENTS = [
  {
    id: "1",
    _id: "1",
    title: "Hackathon 48",
    club: "CodeForge Club",
    type: "register",
    category: "upcoming",
    description: "48 hours of design, code, and launch.",
    registerLink: "https://github.com"
  },
  {
    id: "2",
    _id: "2",
    title: "Founders Talk",
    club: "Entrepreneurs Cell",
    type: "register",
    category: "upcoming",
    description: "Founder stories and AMA with campus builders.",
    registerLink: "https://github.com"
  },
  {
    id: "3",
    _id: "3",
    title: "Spring Showcase",
    club: "EcoImpact Collective",
    type: "past",
    category: "past",
    description: "Campus activities and projects exhibition.",
  }
];

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

function Home() {
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("all");

  // Slide-in Detail Panel state
  const [activePanelItem, setActivePanelItem] = useState(null);

  // Refs for ScrollTrigger Pinned Sections
  const deptSectionRef = useRef(null);
  const deptHeadingRef = useRef(null);
  const deptClusterRef = useRef(null);

  const eventsSectionRef = useRef(null);
  const eventsHeadingRef = useRef(null);
  const eventsClusterRef = useRef(null);

  const clubsSectionRef = useRef(null);
  const clubsHeadingRef = useRef(null);
  const clubsClusterRef = useRef(null);

  const voicesSectionRef = useRef(null);
  const voicesHeadingRef = useRef(null);

  // Load events and departments from backend
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
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

        const upcomingList = (Array.isArray(upcoming) ? upcoming : []).map(e => ({ ...e, category: "upcoming" }));
        const pastList = (Array.isArray(past) ? past : []).map(e => ({ ...e, category: "past" }));
        const marqueeList = (Array.isArray(marquee) ? marquee : []).map(e => ({ ...e, category: "upcoming" }));

        const merged = [...marqueeList, ...upcomingList, ...pastList];

        if (merged.length > 0) {
          const filteredMerged = merged.filter(
            e => !DEFAULT_EVENTS.some(d => d.title.toLowerCase() === e.title.toLowerCase())
          );
          setEvents([...DEFAULT_EVENTS, ...filteredMerged]);
        }
      } catch (err) {
        console.warn("Could not connect to backend, falling back to default seeded events.", err);
      } finally {
        setLoading(false);
      }

      try {
        const deptsRes = await fetch(`${API_BASE}/departments`);
        if (deptsRes.ok) {
          const deptsData = await deptsRes.json();
          setDepartments(deptsData);
        }
      } catch (err) {
        console.warn("Failed to fetch departments", err);
      }
    };

    fetchEvents();
  }, []);

  const categoriesList = useMemo(() => {
    const tags = events.map(event => getEventCategoryTag(event));
    return [...new Set(tags)].sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const categoryTag = getEventCategoryTag(event);
      const matchesCategory = selectedCategory === "all" || categoryTag === selectedCategory;
      const matchesDate = selectedDate === "all" || event.category === selectedDate;
      return matchesCategory && matchesDate;
    });
  }, [events, selectedCategory, selectedDate]);

  // Hooks for smooth scroll-triggered card reveals
  usePinnedSection(deptSectionRef, deptHeadingRef, deptClusterRef, [departments]);
  usePinnedSection(eventsSectionRef, eventsHeadingRef, eventsClusterRef, [filteredEvents]);
  usePinnedSection(clubsSectionRef, clubsHeadingRef, clubsClusterRef, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (voicesHeadingRef.current) {
        const splitWords = voicesHeadingRef.current.querySelectorAll('.split-word');
        const badge = voicesHeadingRef.current.querySelector('.voices-badge');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: voicesSectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        if (badge) {
          tl.fromTo(badge, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
        }

        if (splitWords && splitWords.length > 0) {
          tl.fromTo(
            splitWords,
            { yPercent: 110, opacity: 0, rotateZ: 1.5 },
            { yPercent: 0, opacity: 1, rotateZ: 0, duration: 0.85, stagger: 0.05, ease: "power4.out" },
            0.1
          );
        }
      }
    }, voicesSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Pinned Photo-Cluster & Rolling Text Departments Section */}
      <section
        id="departments"
        ref={deptSectionRef}
        className="py-[100px] lg:py-[120px] bg-[var(--bg)] relative transition-all duration-300 border-t border-[var(--line)]"
      >
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">

          {/* Sticky Left Heading Column */}
          <div
            ref={deptHeadingRef}
            className="lg:col-span-5 z-10 lg:sticky lg:top-32 self-start pt-2"
          >
            <div className="watermark-num absolute -top-6 -left-4 font-display font-bold text-[130px] text-[var(--ink)] opacity-[0.035] select-none pointer-events-none leading-none">
              01
            </div>

            <div className="heading-anim">
              <EyebrowBadge text="Academic Units" />
            </div>
            <h2 className="text-[clamp(32px,3.8vw,48px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
              <SplitText text="Original Thinking" />
            </h2>
            <p className="heading-anim text-[var(--ink-soft)] mt-[16px] text-[15px] leading-relaxed max-w-[420px]">
              Crestmont's academic units structure our labs, workshops, and core student-led collaborations. Scroll to explore our key departments.
            </p>
            <div className="heading-anim mt-8">
              <Link to="/departments" className="btn btn-solid">
                Explore All Departments <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Asymmetric Clustered Layout on the Right (3 items) */}
          <div
            ref={deptClusterRef}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            {(departments.length > 0 ? departments.slice(0, 3) : [
              {
                _id: "tech-1",
                name: "Technology & Engineering",
                description: "Hackathons, robotics builds, and open lab hours across AI, embedded systems, and software.",
                tags: ["Hackathons", "Robotics", "AI Labs"],
                imgUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&h=500&q=80"
              },
              {
                _id: "bus-1",
                name: "Business & Leadership",
                description: "Founder talks, case competitions, and the campus incubator's demo nights.",
                tags: ["Founder Talks", "Case Comps", "Incubator"],
                imgUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&h=500&q=80"
              },
              {
                _id: "arts-1",
                name: "Arts, Culture & Community",
                description: "Showcases, cultural nights, and the clubs fair that kicks off every semester.",
                tags: ["Showcases", "Cultural Nights", "Exhibitions"],
                imgUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=700&h=500&q=80"
              }
            ]).map((dept, idx) => {
              const mapping = {
                "Technology & Engineering": {
                  num: "01",
                  tags: ["Hackathons", "Robotics", "+6 more"],
                  imgUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&h=500&q=80"
                },
                "Business & Leadership": {
                  num: "02",
                  tags: ["Founder Talks", "Case Comps", "+4 more"],
                  imgUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=700&h=500&q=80"
                },
                "Arts, Culture & Community": {
                  num: "03",
                  tags: ["Showcases", "Cultural Nights", "+8 more"],
                  imgUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=700&h=500&q=80"
                }
              };
              const info = mapping[dept.name] || {
                num: String(idx + 1).padStart(2, '0'),
                tags: dept.tags || ["Academic", "Faculty"],
                imgUrl: dept.imgUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&h=500&q=80"
              };

              const offsetClass = idx === 1 ? "lg:ml-10" : idx === 2 ? "lg:mr-10" : "";

              return (
                <div
                  key={dept._id || idx}
                  className={`glass-card rounded-[6px] p-7 transition-all duration-300 hover:shadow-lg ${offsetClass}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs text-[var(--ink-soft)] uppercase tracking-wider font-semibold">
                      {info.num} {'//'} DEPARTMENT
                    </span>
                    <button
                      onClick={() => setActivePanelItem({ title: dept.name, description: dept.description, tags: info.tags, type: 'department', id: dept._id })}
                      className="font-mono text-[11px] text-[var(--blue)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Quick View <ExternalLink size={12} />
                    </button>
                  </div>

                  <div className="aspect-[16/9] rounded-[4px] overflow-hidden mb-5">
                    <DuoImage
                      src={info.imgUrl}
                      alt={dept.name}
                      className="w-full h-full"
                      hoverEffect={true}
                    />
                  </div>

                  <h3 className="font-display font-bold text-[22px] text-[var(--ink)] mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-[var(--ink-soft)] text-[14px] leading-relaxed mb-5">
                    {dept.description}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-[var(--line)]">
                    <div className="flex gap-2 flex-wrap">
                      {info.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[4px] rounded-full border border-[var(--line)] text-[var(--ink-soft)] bg-white/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/departments/${dept._id}`}
                      className="font-mono text-xs font-bold text-[var(--ink)] hover:text-[var(--clay)] flex items-center gap-1"
                    >
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Marquee divider statement band — Dark Navy */}
      <MarqueeBand
        items={[
          "STUDENTS OVER SPECTATORS",
          "CAMPUS OVER CLASSROOM",
          "BUILD OVER WATCH",
          "SHOW UP OVER SIGN UP",
        ]}
      />

      {/* 5. Events Section */}
      <section
        id="events"
        ref={eventsSectionRef}
        className="py-[100px] lg:py-[120px] transition-all duration-300"
      >
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Sticky Left Heading Column */}
          <div
            ref={eventsHeadingRef}
            className="lg:col-span-5 z-10 lg:sticky lg:top-32 self-start pt-2"
          >
            <div className="watermark-num absolute -top-6 -left-4 font-display font-bold text-[130px] text-[var(--ink)] opacity-[0.035] select-none pointer-events-none leading-none">
              02
            </div>

            <div className="heading-anim">
              <EyebrowBadge text="Campus Agenda" />
            </div>
            <h2 className="text-[clamp(32px,3.8vw,48px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
              <SplitText text="What's on at Crestmont" />
            </h2>
            <p className="heading-anim text-[var(--ink-soft)] mt-[16px] text-[15px] leading-relaxed max-w-[420px]">
              From 48-hour hackathons and founder AMAs to project showcases. Filter by category to register or volunteer.
            </p>
            <div className="heading-anim flex gap-4 mt-8 flex-wrap">
              <Link to="/campus-life" className="btn btn-solid">
                Explore More Events
              </Link>
              <Link to="/club-head/login" className="btn btn-outline">
                Club Head? Login
              </Link>
            </div>
          </div>

          {/* Right Column: Filters + Uniform 3 Event Cards */}
          <div
            ref={eventsClusterRef}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            <FilterBar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              categories={categoriesList}
            />

            {filteredEvents.slice(0, 3).map((event, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const offsetClass = idx === 1 ? "lg:ml-10" : idx === 2 ? "lg:mr-10" : "";
              const isPast = event.category === "past";
              const tagStr = getEventCategoryTag(event);

              return (
                <div
                  key={event._id || event.id || idx}
                  className={`glass-card rounded-[6px] p-7 transition-all duration-300 hover:shadow-lg ${offsetClass}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs text-[var(--ink-soft)] uppercase tracking-wider font-semibold">
                      {num} {'//'} EVENT
                    </span>
                    <button
                      onClick={() => setActivePanelItem({ title: event.title, description: event.description, club: event.club, date: event.date, type: 'event', raw: event })}
                      className="font-mono text-[11px] text-[var(--blue)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Quick View <ExternalLink size={12} />
                    </button>
                  </div>

                  <div className="aspect-[16/9] rounded-[4px] overflow-hidden mb-5">
                    <DuoImage
                      src={event.imageUrl || event.image || (
                        idx === 0
                          ? "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&h=500&q=80"
                          : idx === 1
                          ? "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=700&h=500&q=80"
                          : "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=700&h=500&q=80"
                      )}
                      alt={event.title}
                      className="w-full h-full"
                      hoverEffect={true}
                    />
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-display font-bold text-[22px] text-[var(--ink)]">
                      {event.title}
                    </h3>
                    <span className="status flex items-center gap-[6px] font-mono text-[11px] text-[var(--ink-soft)]">
                      <span className={`dot w-[6px] h-[6px] rounded-full flex-none ${isPast ? 'bg-[#B6B0A2]' : 'bg-[var(--blue)]'}`} />
                      {isPast ? "Past" : "Upcoming"}
                    </span>
                  </div>

                  <p className="text-[var(--ink-soft)] text-[14px] leading-relaxed mb-5">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-[var(--line)]">
                    <div className="flex gap-2 flex-wrap items-center">
                      <span className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[4px] rounded-full border border-[var(--line)] text-[var(--ink-soft)] bg-white/50">
                        {tagStr}
                      </span>
                      {event.club && (
                        <span className="font-mono text-[11px] text-[var(--clay)] font-semibold">
                          {event.club}
                        </span>
                      )}
                    </div>
                    {event.registerLink && !isPast ? (
                      <a
                        href={event.registerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-bold text-[var(--ink)] hover:text-[var(--cta)] flex items-center gap-1"
                      >
                        Register &rarr;
                      </a>
                    ) : (
                      <button
                        onClick={() => setActivePanelItem({ title: event.title, description: event.description, club: event.club, date: event.date, type: 'event', raw: event })}
                        className="font-mono text-xs font-bold text-[var(--ink)] hover:text-[var(--clay)] flex items-center gap-1 cursor-pointer"
                      >
                        View Details &rarr;
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12 font-mono text-sm text-[var(--ink-soft)] bg-white/40 border border-[var(--line)] rounded-[4px]">
                No matching events found. Try adjusting your filters.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5.2 Second Marquee divider band between Events and Clubs */}
      <MarqueeBand
        items={[
          "INNOVATION IN ACTION",
          "RESEARCH & MAKING",
          "COMMITTED TO CRAFT",
          "STUDENT DRIVEN",
        ]}
      />

      {/* 5.5 Clubs Section */}
      <section
        id="clubs"
        ref={clubsSectionRef}
        className="py-[100px] lg:py-[120px] transition-all duration-300"
      >
        <div className="wrap grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Sticky Left Heading Column */}
          <div
            ref={clubsHeadingRef}
            className="lg:col-span-5 z-10 lg:sticky lg:top-32 self-start pt-2"
          >
            <div className="watermark-num absolute -top-6 -left-4 font-display font-bold text-[130px] text-[var(--ink)] opacity-[0.035] select-none pointer-events-none leading-none">
              03
            </div>

            <div className="heading-anim">
              <EyebrowBadge text="Student Guilds" />
            </div>
            <h2 className="text-[clamp(32px,3.8vw,48px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
              <SplitText text="Student-led Communities" />
            </h2>
            <p className="heading-anim text-[var(--ink-soft)] mt-[16px] text-[15px] leading-relaxed max-w-[420px]">
              Explore our diverse set of active student groups running coding challenges, aerospace building, and incubation cells.
            </p>
            <div className="heading-anim mt-8">
              <Link to="/clubs" className="btn btn-solid">
                Explore More Clubs <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Uniform 3 Club Cards */}
          <div
            ref={clubsClusterRef}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            {[
              {
                name: "CodeForge Club",
                desc: "Crestmont's premier coding club focusing on algorithms, web dev, and national hackathons.",
                img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&h=500&q=80",
                tag: "Coding"
              },
              {
                name: "AeroDesign Society",
                desc: "Designing, building, and flying remote-controlled aircraft and high-powered rockets.",
                img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=700&h=500&q=80",
                tag: "Aerospace"
              },
              {
                name: "EcoImpact Collective",
                desc: "Promoting sustainability, campus recycling drives, and ecological conservation studies.",
                img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&h=500&q=80",
                tag: "Environment"
              }
            ].map((club, idx) => {
              const num = String(idx + 1).padStart(2, '0');
              const offsetClass = idx === 1 ? "lg:ml-10" : idx === 2 ? "lg:mr-10" : "";

              return (
                <div
                  key={club.name}
                  className={`glass-card rounded-[6px] p-7 transition-all duration-300 hover:shadow-lg ${offsetClass}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs text-[var(--ink-soft)] uppercase tracking-wider font-semibold">
                      {num} {'//'} CLUB
                    </span>
                    <button
                      onClick={() => setActivePanelItem({ title: club.name, description: club.desc, tags: [club.tag], type: 'club' })}
                      className="font-mono text-[11px] text-[var(--blue)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Quick View <ExternalLink size={12} />
                    </button>
                  </div>

                  <div className="aspect-[16/9] rounded-[4px] overflow-hidden mb-5">
                    <DuoImage
                      src={club.img}
                      alt={club.name}
                      className="w-full h-full"
                      hoverEffect={true}
                    />
                  </div>

                  <h3 className="font-display font-bold text-[22px] text-[var(--ink)] mb-2">
                    {club.name}
                  </h3>
                  <p className="text-[var(--ink-soft)] text-[14px] leading-relaxed mb-5">
                    {club.desc}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-[var(--line)]">
                    <span className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[4px] rounded-full border border-[var(--line)] text-[var(--ink-soft)] bg-white/50">
                      {club.tag}
                    </span>
                    <Link
                      to={`/clubs/${encodeURIComponent(club.name)}`}
                      className="font-mono text-xs font-bold text-[var(--ink)] hover:text-[var(--clay)] flex items-center gap-1"
                    >
                      View Club Details &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Testimonials Section (Voices) */}
      <section id="voices" ref={voicesSectionRef} className="py-[120px] transition-all duration-300">
        <div className="wrap">
          <div ref={voicesHeadingRef} className="section-head max-w-[640px] mb-14">
            <div className="voices-badge inline-block">
              <EyebrowBadge text="Voices" />
            </div>
            <h2 className="text-[clamp(28px,3.2vw,42px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
              <SplitText text="What students say" />
            </h2>
          </div>

          <div className="marquee-container">
            <div className="marquee-content">
              {[0, 1].map((setIndex) => (
                <React.Fragment key={setIndex}>
                  <HighlightCard
                    quote="&quot;Hackathon 48 is the reason I switched majors. Three days, one idea, way too much coffee.&quot;"
                    name="Priya Nair"
                    role="3rd Year, Computer Science"
                    variant="default"
                  />
                  <HighlightCard
                    quote="&quot;The founders' circle turned my side project into an actual pitch deck.&quot;"
                    name="Aravind Menon"
                    role="Final Year, Business"
                    variant="clay"
                  />
                  <HighlightCard
                    quote="&quot;Spring Showcase is where half the campus finds out what the other half has been building.&quot;"
                    name="Sana Iqbal"
                    role="2nd Year, Design"
                    variant="blue"
                  />
                  <HighlightCard
                    quote="&quot;Having 24/7 access to the fabrication lab changed everything. I built my entire drone prototype right here.&quot;"
                    name="Vikram Mehta"
                    role="3rd Year, Robotics"
                    variant="default"
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stats Grid Section */}
      <StatBlock />

      {/* Slide-In Detail Panel from Screen Edge */}
      {activePanelItem && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setActivePanelItem(null)}
          />

          {/* Sliding Panel */}
          <div className="relative w-full max-w-[500px] bg-[var(--bg)] border-l border-[var(--line)] shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-[var(--line)] bg-white">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)]">
                {activePanelItem.type === 'department' ? 'Department Quick View' : 'Event Quick View'}
              </span>
              <button
                onClick={() => setActivePanelItem(null)}
                className="p-2 rounded-full hover:bg-[var(--bg)] text-[var(--ink)] cursor-pointer"
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto space-y-6">
              <h2 className="font-display text-3xl font-bold text-[var(--ink)]">
                {activePanelItem.title}
              </h2>

              {activePanelItem.club && (
                <div className="font-mono text-xs text-[var(--clay)] uppercase tracking-wider">
                  Organized by: {activePanelItem.club}
                </div>
              )}

              <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed">
                {activePanelItem.description}
              </p>

              {activePanelItem.tags && (
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[var(--ink-soft)] mb-3">
                    Associated Tags
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {activePanelItem.tags.map((t, idx) => (
                      <span key={idx} className="tag font-mono text-[11px] uppercase px-3 py-1 rounded-full border border-[var(--line)] bg-white text-[var(--ink)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activePanelItem.type === 'department' && (
                <div className="pt-6 border-t border-[var(--line)]">
                  <Link
                    to={`/departments/${activePanelItem.id}`}
                    className="btn btn-solid w-full justify-center"
                    onClick={() => setActivePanelItem(null)}
                  >
                    View Full Department Hub <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              {activePanelItem.type === 'event' && activePanelItem.raw?.registerLink && (
                <div className="pt-6 border-t border-[var(--line)]">
                  <a
                    href={activePanelItem.raw.registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid w-full justify-center"
                  >
                    Register for Event <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
