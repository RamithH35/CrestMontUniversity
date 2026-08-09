import React from 'react';
import { motion } from 'framer-motion';
import DuoImage from './DuoImage';
import EyebrowBadge from './EyebrowBadge';
import PillButton from './PillButton';
import { fadeUp } from '../lib/motion';
import cover2 from '../assets/cover-2.png'; // Import real about section photo

function About() {
  return (
    <section id="about" className="py-[100px] transition-all duration-300">
      <div className="wrap grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-8">
        
        {/* About Photo with reveal-on-scroll */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="about-media aspect-[4/5] rounded-[4px] overflow-hidden"
        >
          <DuoImage 
            src={cover2} 
            alt="Students collaborating" 
            className="w-full h-full" 
            hoverEffect={true} 
          />
        </motion.div>

        {/* About Copy with reveal-on-scroll */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="about-copy"
        >
          <EyebrowBadge text="Why We Exist" />
          <h2 className="text-[clamp(28px,3.2vw,42px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]">
            A campus built around what students actually make
          </h2>
          <p className="text-[var(--ink-soft)] mt-4 leading-[1.7] text-[15px]">
            Crestmont University runs on labs, clubs, and cross-department projects — not just lecture halls. This is the single place to find what's happening, who's running it, and how to get in.
          </p>
          <div className="hero-actions mt-6 flex gap-3 flex-wrap">
            <PillButton variant="solid" href="#events">See What's On</PillButton>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

export default About;
