import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/motion';

function StatBlock() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const stats = [
    { num: "97%", label: "PLACEMENT RATE" },
    { num: "120+", label: "ACTIVE LABS" },
    { num: "40+", label: "CLUBS ON CAMPUS" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current && containerRef.current.children) {
        gsap.fromTo(
          containerRef.current.children,
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-[100px] transition-all duration-300">
      <div
        ref={containerRef}
        className="wrap stats grid grid-cols-3 gap-[40px] text-center max-md:grid-cols-1 max-md:gap-7"
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-num font-display font-bold text-[clamp(36px,5vw,56px)] text-[var(--blue)]">
              {stat.num}
            </div>
            <div className="stat-label font-mono text-[12px] text-[var(--ink-soft)] mt-2 uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatBlock;

