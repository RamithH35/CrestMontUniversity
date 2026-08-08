import React from 'react';
import { motion } from 'framer-motion';
import DuoImage from './DuoImage';
import EyebrowBadge from './EyebrowBadge';
import PillButton from './PillButton';
import { fadeUp } from '../lib/motion';
import cover1 from '../assets/cover-1.jpg'; // Import real hero background photo

function Hero() {
  return (
    <section id="home" className="hero relative md:pr-[56px] transition-all duration-300">
      {/* Full-bleed hero media using reusable DuoImage */}
      <div className="hero-media h-[78vh] min-h-[520px] overflow-hidden">
        <DuoImage 
          src={cover1} 
          alt="Crestmont University Campus" 
          className="w-full h-full" 
          hoverEffect={false} 
        />
      </div>

      {/* Floating headline card with fade-up scroll reveal */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="hero-card absolute top-[14%] left-8 max-w-[520px] bg-[var(--card)] p-11 rounded-[4px] shadow-[0_24px_60px_rgba(0,0,0,0.12)] max-md:static max-md:m-6 max-md:p-7"
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
