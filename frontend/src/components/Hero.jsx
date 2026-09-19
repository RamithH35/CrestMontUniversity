import React, { useEffect, useRef } from 'react';
import EyebrowBadge from './EyebrowBadge';
import PillButton from './PillButton';
import cover1 from '../assets/cover-1.jpg';
import { gsap } from '../lib/motion';

function Hero() {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <section id="home" className="hero relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Full-bleed photo background with a subtle dark gradient scrim for text contrast */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
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
        <div ref={contentRef} className="max-w-[780px] flex flex-col items-center">
          <div className="mb-4">
            <EyebrowBadge text="Innovating Tomorrow" className="bg-white/10 text-white border-white/20 backdrop-blur-md" />
          </div>
          <h1 className="text-[clamp(40px,6vw,72px)] mb-6 leading-[1.02] tracking-[-0.03em] font-display font-bold text-white drop-shadow-sm">
            Crestmont University
          </h1>
          <p className="text-white/90 mb-10 text-[17px] sm:text-[19px] leading-relaxed max-w-[620px] font-sans">
            Where research, making, and community meet. Every lab, launch, and late-night build starts here.
          </p>
          <div className="hero-actions flex gap-4 flex-wrap justify-center">
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
