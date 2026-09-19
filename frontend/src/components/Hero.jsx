import React, { useEffect, useRef } from 'react';
import EyebrowBadge from './EyebrowBadge';
import PillButton from './PillButton';
import cover1 from '../assets/cover-1.jpg';
import { gsap, SplitText } from '../lib/motion';

function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Ken Burns Slow Cinematic Zoom
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.15, transformOrigin: "center center" },
          { scale: 1.0, duration: 3.5, ease: "power2.out" }
        );
      }

      const tl = gsap.timeline({ delay: 0.15 });

      // 2. Eyebrow badge directional slide-down
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" },
          0
        );
      }

      // 3. Split-text word-by-word reveal for Headline
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.split-word');
        if (words && words.length > 0) {
          tl.fromTo(
            words,
            { yPercent: 120, opacity: 0, rotateZ: 2 },
            { yPercent: 0, opacity: 1, rotateZ: 0, duration: 0.9, stagger: 0.08, ease: "power4.out" },
            0.15
          );
        }
      }

      // 4. Subtitle paragraph directional fade
      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.4
        );
      }

      // 5. Actions / PillButtons staggered scale & lift
      if (actionsRef.current && actionsRef.current.children) {
        tl.fromTo(
          actionsRef.current.children,
          { opacity: 0, y: 20, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out" },
          0.55
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={sectionRef} className="hero relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Full-bleed photo background with Ken Burns zoom & subtle dark gradient scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: `url(${cover1})` }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 38, 0.45) 0%, rgba(15, 23, 38, 0.65) 100%)',
          }}
        />
      </div>

      {/* Bold, centered direct headline overlay — no card/box */}
      <div className="wrap relative z-10 w-full py-24 text-center flex flex-col items-center">
        <div className="max-w-[780px] flex flex-col items-center">
          <div ref={eyebrowRef} className="mb-4">
            <EyebrowBadge text="Innovating Tomorrow" className="bg-white/10 text-white border-white/20 backdrop-blur-md" />
          </div>
          <h1
            ref={headingRef}
            className="text-[clamp(40px,6vw,72px)] mb-6 leading-[1.02] tracking-[-0.03em] font-display font-bold text-white drop-shadow-sm"
          >
            <SplitText text="Crestmont University" />
          </h1>
          <p
            ref={textRef}
            className="text-white/90 mb-10 text-[17px] sm:text-[19px] leading-relaxed max-w-[620px] font-sans"
          >
            Where research, making, and community meet. Every lab, launch, and late-night build starts here.
          </p>
          <div ref={actionsRef} className="hero-actions flex gap-4 flex-wrap justify-center">
            <PillButton
              variant="solid"
              href="#events"
              className="bg-white text-[var(--bg-dark)] hover:bg-[var(--cta)] hover:text-white border-white transition-all shadow-lg"
            >
              Explore Events
            </PillButton>
            <PillButton
              variant="outline"
              href="#departments"
              className="border-white/40 text-white hover:bg-white hover:text-[var(--bg-dark)] transition-all backdrop-blur-sm"
            >
              College Layout
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

