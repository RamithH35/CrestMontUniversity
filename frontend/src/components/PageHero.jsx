import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cover1 from '../assets/cover-1.jpg';
import { gsap, SplitText } from '../lib/motion';

function PageHero({ title, subtitle, eyebrow = "Crestmont University", backgroundImage = cover1, showBackButton = true }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const elementsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Ken Burns slow zoom
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.12, transformOrigin: "center center" },
          { scale: 1.0, duration: 2.5, ease: "power2.out" }
        );
      }

      const tl = gsap.timeline({ delay: 0.1 });

      // 2. Split-text title reveal
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.split-word');
        if (words && words.length > 0) {
          tl.fromTo(
            words,
            { yPercent: 115, opacity: 0, rotateZ: 1.5 },
            { yPercent: 0, opacity: 1, rotateZ: 0, duration: 0.8, stagger: 0.05, ease: "power4.out" },
            0.1
          );
        }
      }

      // 3. Narrative elements (back button, eyebrow, subtitle)
      if (elementsRef.current && elementsRef.current.children) {
        tl.fromTo(
          elementsRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          0.25
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [title]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[50vh] flex items-center py-20">
      {/* Full-color background photo banner with dark gradient scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform"
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
        <div className="max-w-[780px]">
          <div ref={elementsRef}>
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
          </div>

          <h1
            ref={titleRef}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl relative pb-4 leading-[1.05]"
          >
            <SplitText text={title} />
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

