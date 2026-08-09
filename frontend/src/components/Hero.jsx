import React from 'react';
import { motion } from 'framer-motion';
import EyebrowBadge from './EyebrowBadge';
import PillButton from './PillButton';
import { fadeUp } from '../lib/motion';
import cover1 from '../assets/cover-1.jpg'; // Import real hero background photo

function Hero() {
  return (
    <section id="home" className="hero relative transition-all duration-300">
      {/* Full-bleed hero media with full-color fixed/parallax background and gradient overlay */}
      <div className="hero-media h-[78vh] min-h-[520px] overflow-hidden relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${cover1})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
          }}
        />
        {/* Soft gradient overlay transitioning to page background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, var(--bg) 100%)',
          }}
        />
      </div>

      {/* Floating glassmorphism headline card with fade-up scroll reveal */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="hero-card absolute top-[14%] left-8 max-w-[520px] glass-card p-11 rounded-[4px] shadow-[0_24px_60px_rgba(0,0,0,0.08)] max-md:static max-md:m-6 max-md:p-7"
      >
        <EyebrowBadge text="Innovating Tomorrow" />
        <h1 className="text-[clamp(34px,4.4vw,52px)] mt-[14px] mb-3 leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
          Crestmont<br />University
        </h1>
        <p className="text-[var(--ink-soft)] mb-7 text-[15px] leading-relaxed">
          Where research, making, and community meet. Every lab, launch, and late-night build starts here.
        </p>
        <div className="hero-actions flex gap-3 flex-wrap">
          <PillButton variant="solid" href="#events">Explore Events</PillButton>
          <PillButton variant="outline" href="#departments">College Layout</PillButton>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
