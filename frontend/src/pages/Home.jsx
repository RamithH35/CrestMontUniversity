import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Imports of core sections and primitives
import Hero from '../components/Hero';
import About from '../components/About';
import DepartmentRow from '../components/DepartmentRow';
import MarqueeBand from '../components/MarqueeBand';
import FilterBar from '../components/FilterBar';
import EventCard from '../components/EventCard';
import HighlightCard from '../components/HighlightCard';
import StatBlock from '../components/StatBlock';
import EyebrowBadge from '../components/EyebrowBadge';
import DuoImage from '../components/DuoImage';

// Motion variants
import { fadeUp, staggerContainer, staggerItem } from '../lib/motion';

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://fullstack-web-mvpk.onrender.com";

// Default/fallback events to ensure page matches redirect.html exactly
const DEFAULT_EVENTS = [
  {
    id: "1",
    _id: "1",
    title: "Hackathon 48",
    club: "CodeForge Club", // maps to "Technology"
    type: "register",
    category: "upcoming",
    description: "48 hours of design, code, and launch.",
  },
  {
    id: "2",
    _id: "2",
    title: "Founders Talk",
    club: "Entrepreneurs Cell", // maps to "Business"
    type: "register",
    category: "upcoming",
    description: "Founder stories and AMA with campus builders.",
  },
  {
    id: "3",
    _id: "3",
    title: "Spring Showcase",
    club: "EcoImpact Collective", // maps to "Culture"
    type: "past",
    category: "past",
    description: "Campus activities and projects exhibition.",
  }
];

// Helper to map club names to Technology / Business / Culture tags
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

  // Load events from Render backend
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
        const marqueeList = (Array.isArray(marquee) ? marquee : []).map(e => ({ ...e, category: "upcoming" })); // Treat marquee as upcoming for filters

        const merged = [...marqueeList, ...upcomingList, ...pastList];
        
        if (merged.length > 0) {
          // If we got events, merge and append them to defaults to ensure a rich grid
          // but avoid duplication of core seeded events
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
      // Fetch departments
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

  // Compute unique categories present in the database (e.g. Technology, Business, Culture, Community)
  const categoriesList = useMemo(() => {
    const tags = events.map(event => getEventCategoryTag(event));
    return [...new Set(tags)].sort();
  }, [events]);

  // Apply filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Category filter
      const categoryTag = getEventCategoryTag(event);
      const matchesCategory = selectedCategory === "all" || categoryTag === selectedCategory;
      
      // Date/Status filter (matches event.category which is "upcoming" or "past")
      const matchesDate = selectedDate === "all" || event.category === selectedDate;
      
      return matchesCategory && matchesDate;
    });
  }, [events, selectedCategory, selectedDate]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Departments Row Section */}
      <section id="departments" className="md:pr-[56px] py-[100px] transition-all duration-300">
        <div className="wrap">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="section-head max-w-[640px] mb-14"
          >
            <EyebrowBadge text="Explore Areas" />
            <h2 className="text-[clamp(28px,3.2vw,42px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
              Three ways to get involved
            </h2>
            <p className="text-[var(--ink-soft)] mt-[14px] text-[15px] leading-relaxed">
              Every event on this site sits under one of these — pick a lane, or move between all three.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col"
          >
            {departments.length > 0 ? (
              departments.slice(0, 3).map((dept, idx) => {
                const mapping = {
                  "Technology & Engineering": {
                    num: "01",
                    tags: ["Hackathons", "Robotics", "+6 more"],
                    imgUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&h=300&q=80"
                  },
                  "Business & Leadership": {
                    num: "02",
                    tags: ["Founder Talks", "Case Comps", "+4 more"],
                    imgUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&h=300&q=80"
                  },
                  "Arts, Culture & Community": {
                    num: "03",
                    tags: ["Showcases", "Cultural Nights", "+8 more"],
                    imgUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=300&h=300&q=80"
                  }
                };
                const info = mapping[dept.name] || {
                  num: String(idx + 1).padStart(2, '0'),
                  tags: ["Academic", "Faculty"],
                  imgUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&h=300&q=80"
                };
                return (
                  <DepartmentRow 
                    key={dept._id}
                    id={dept._id}
                    num={info.num} 
                    title={dept.name} 
                    description={dept.description} 
                    tags={info.tags}
                    imgUrl={info.imgUrl}
                  />
                );
              })
            ) : (
              <>
                <DepartmentRow 
                  num="01" 
                  title="Technology & Engineering" 
                  description="Hackathons, robotics builds, and open lab hours across AI, embedded systems, and software." 
                  tags={["Hackathons", "Robotics", "+6 more"]}
                  imgUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&h=300&q=80"
                />
                <DepartmentRow 
                  num="02" 
                  title="Business & Leadership" 
                  description="Founder talks, case competitions, and the campus incubator's demo nights." 
                  tags={["Founder Talks", "Case Comps", "+4 more"]}
                  imgUrl="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&h=300&q=80"
                />
                <DepartmentRow 
                  num="03" 
                  title="Arts, Culture & Community" 
                  description="Showcases, cultural nights, and the clubs fair that kicks off every semester." 
                  tags={["Showcases", "Cultural Nights", "+8 more"]}
                  imgUrl="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=300&h=300&q=80"
                />
              </>
            )}
          </motion.div>
          <div className="flex justify-start mt-10">
            <Link to="/departments" className="btn btn-outline">
              Explore All Departments
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Marquee divider statement band */}
      <MarqueeBand />

      {/* 5. Events Section */}
      <section id="events" className="md:pr-[56px] py-[100px] transition-all duration-300">
        <div className="wrap">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="section-head max-w-[640px] mb-14"
          >
            <EyebrowBadge text="Agenda" />
            <h2 className="text-[clamp(28px,3.2vw,42px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
              What's on at Crestmont University
            </h2>
          </motion.div>

          {/* Interactive filter chips matching redirect.html */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <FilterBar 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              categories={categoriesList}
            />
          </motion.div>

          {/* Events Grid layout */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="events-grid grid grid-cols-3 gap-7 max-md:grid-cols-1"
          >
            {filteredEvents.slice(0, 3).map((event) => (
              <EventCard key={event._id || event.id} event={event} />
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 font-mono text-sm text-[var(--ink-soft)] bg-white/40 border border-[var(--line)] rounded-[4px] mt-4">
              No matching events found. Try adjusting your filters.
            </div>
          )}

          <div className="flex gap-4 mt-10 flex-wrap">
            <Link to="/campus-life" className="btn btn-solid">
              Explore More Events
            </Link>
            <Link to="/club-head/login" className="btn btn-outline">
              Club Head? Login Here
            </Link>
          </div>
        </div>
      </section>

      {/* 5.5 Clubs Section */}
      <section id="clubs" className="md:pr-[56px] py-[100px] transition-all duration-300 border-t border-[var(--line)]">
        <div className="wrap">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="section-head max-w-[640px] mb-14"
          >
            <EyebrowBadge text="Featured Clubs" />
            <h2 className="text-[clamp(28px,3.2vw,42px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
              Student-led Communities
            </h2>
            <p className="text-[var(--ink-soft)] mt-[14px] text-[15px] leading-relaxed">
              Explore our diverse set of active student groups running coding challenges, aerospace building, and incubation cells.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1"
          >
            {[
              {
                name: "CodeForge Club",
                desc: "Crestmont's premier coding club focusing on algorithms, web dev, and national hackathons.",
                img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&h=600&q=80",
                tag: "Coding"
              },
              {
                name: "AeroDesign Society",
                desc: "Designing, building, and flying remote-controlled aircraft and high-powered rockets.",
                img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=500&h=600&q=80",
                tag: "Aerospace"
              },
              {
                name: "EcoImpact Collective",
                desc: "Promoting sustainability, campus recycling drives, and ecological conservation studies.",
                img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&h=600&q=80",
                tag: "Environment"
              },
              {
                name: "Robotics Guild",
                desc: "Building autonomous systems and competing in battlebots and maze solver competitions.",
                img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=600&q=80",
                tag: "Robotics"
              },
              {
                name: "Entrepreneurs Cell",
                desc: "Incubating ideas, conducting case studies, and hosting founder demo nights.",
                img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&h=600&q=80",
                tag: "Business"
              }
            ].slice(0, 3).map((club) => (
              <motion.div
                key={club.name}
                variants={staggerItem}
                className="event-card flex flex-col bg-[var(--card)] rounded-[4px] overflow-hidden border border-[var(--line)]"
              >
                <Link to={`/clubs/${encodeURIComponent(club.name)}`}>
                  <div className="event-media aspect-[4/5] overflow-hidden duo reveal-hover">
                    <DuoImage
                      src={club.img}
                      alt={club.name}
                      className="w-full h-full"
                      hoverEffect={false}
                    />
                  </div>
                  <div className="event-body p-[20px] flex-1 flex flex-col justify-between">
                    <div>
                      <div className="event-top flex justify-between items-start mb-[10px]">
                        <span className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--ink-soft)]">
                          {club.tag}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-[20px] leading-[1.1] tracking-[-0.02em] mb-[8px] text-[var(--ink)]">
                        {club.name}
                      </h3>
                      <p className="text-[var(--ink-soft)] text-[13px] leading-relaxed">
                        {club.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-start mt-10">
            <Link to="/clubs" className="btn btn-outline">
              Explore More Clubs
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section (Voices) */}
      <section id="voices" className="md:pr-[56px] py-[100px] transition-all duration-300">
        <div className="wrap">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="section-head max-w-[640px] mb-14"
          >
            <EyebrowBadge text="Voices" />
            <h2 className="text-[clamp(28px,3.2vw,42px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
              What students say
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="highlights flex gap-6 overflow-x-auto pb-4"
          >
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
          </motion.div>
        </div>
      </section>

      {/* 7. Stats Grid Section */}
      <StatBlock />
    </div>
  );
}

export default Home;
