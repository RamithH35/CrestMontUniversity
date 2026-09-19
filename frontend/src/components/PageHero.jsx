import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cover1 from '../assets/cover-1.jpg';
import { gsap } from '../lib/motion';

function PageHero({ title, subtitle, eyebrow = "Crestmont University", backgroundImage = cover1, showBackButton = true }) {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    }
  }, [title]);

  return (
    <section className="relative overflow-hidden min-h-[50vh] flex items-center py-20">
      {/* Full-color background photo banner with dark gradient scrim */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 38, 0.5) 0%, rgba(15, 23, 38, 0.75) 100%)',
          }}
        />
      </div>

      {/* Bold direct text overlay matching new hero spec */}
      <div className="wrap relative z-10 w-full">
        <div ref={contentRef} className="max-w-[780px]">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[11px] font-mono text-white/80 hover:text-white mb-6 transition-all group cursor-pointer"
            >
              <span className="transform transition-transform group-hover:-translate-x-1 font-sans text-xs">&larr;</span> BACK
            </button>
          )}

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80 font-mono mb-3">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl relative pb-4 leading-[1.05]">
            {title}
            <span className="absolute bottom-0 left-0 w-16 h-[3px] bg-[var(--cta)]" />
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-white/90 font-sans">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
