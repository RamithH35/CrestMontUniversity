import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../lib/motion';

function StatBlock() {
  const stats = [
    { num: "97%", label: "PLACEMENT RATE" },
    { num: "120+", label: "ACTIVE LABS" },
    { num: "40+", label: "CLUBS ON CAMPUS" },
  ];

  return (
    <section className="md:pr-[56px] py-[100px] transition-all duration-300">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="wrap stats grid grid-cols-3 gap-[40px] text-center max-md:grid-cols-1 max-md:gap-7"
      >
        {stats.map((stat, idx) => (
          <motion.div key={idx} variants={staggerItem}>
            <div className="stat-num font-display font-bold text-[clamp(36px,5vw,56px)] text-[var(--blue)]">
              {stat.num}
            </div>
            <div className="stat-label font-mono text-[12px] text-[var(--ink-soft)] mt-2 uppercase">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default StatBlock;
