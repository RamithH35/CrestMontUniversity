import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import DuoImage from "../components/DuoImage";
import LoadingState from "../components/LoadingState";
import { staggerContainer, staggerItem } from "../lib/motion";

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://fullstack-web-mvpk.onrender.com";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const res = await fetch(`${API_BASE}/departments`);
        if (res.ok) {
          const data = await res.json();
          setDepartments(data);
        }
      } catch (err) {
        console.error("Failed to fetch departments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepts();
  }, []);

  const getDeptImage = (name) => {
    if (name.includes("Technology")) {
      return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=600&q=80";
    }
    if (name.includes("Business")) {
      return "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=500&h=600&q=80";
    }
    return "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=500&h=600&q=80";
  };

  const getDeptTag = (name) => {
    if (name.includes("Technology")) return "Engineering";
    if (name.includes("Business")) return "Management";
    return "Humanities";
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      <PageHero
        title="Departments"
        subtitle="Explore our academic units dedicated to rigor, creation, and campus impact."
      />

      <section className="md:pr-[56px] py-[100px]">
        <div className="wrap">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1"
          >
            {departments.map((dept) => (
              <motion.div
                key={dept._id}
                variants={staggerItem}
                className="event-card flex flex-col bg-[var(--card)] rounded-[4px] overflow-hidden border border-[var(--line)]"
              >
                <Link to={`/departments/${dept._id}`}>
                  <div className="event-media aspect-[4/5] overflow-hidden duo reveal-hover">
                    <DuoImage
                      src={getDeptImage(dept.name)}
                      alt={dept.name}
                      className="w-full h-full"
                      hoverEffect={false}
                    />
                  </div>
                  <div className="event-body p-[20px] flex-1 flex flex-col justify-between">
                    <div>
                      <div className="event-top flex justify-between items-start mb-[10px]">
                        <span className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--ink-soft)]">
                          {getDeptTag(dept.name)}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-[20px] leading-[1.1] tracking-[-0.02em] mb-[8px] text-[var(--ink)]">
                        {dept.name}
                      </h3>
                      <p className="text-[var(--ink-soft)] text-[13px] leading-relaxed">
                        {dept.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-start mt-12">
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Departments;
