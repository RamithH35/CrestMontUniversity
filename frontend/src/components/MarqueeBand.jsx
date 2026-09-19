import React from 'react';
import { motion } from 'framer-motion';
import { marqueeScroll } from '../lib/motion';

function MarqueeBand({
  items = [
    "CAMPUS OVER CLASSROOM",
    "BUILD OVER WATCH",
    "SHOW UP OVER SIGN UP",
    "STUDENTS OVER SPECTATORS",
  ],
}) {
  const renderItems = (keyPrefix) => (
    <span key={keyPrefix} className="inline-flex items-center">
      {items.map((item, idx) => (
        <span key={`${keyPrefix}-${idx}`} className="inline-flex items-center">
          <span className="font-display font-bold text-[22px] text-[var(--text-on-dark)] uppercase tracking-wider">
            {item}
          </span>
          <span className="sep font-display font-bold text-[24px] mx-9 text-[var(--cta)] select-none">
            •
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee-band bg-[var(--bg-dark)] py-[26px] overflow-hidden whitespace-nowrap select-none border-y border-[rgba(255,255,255,0.1)]">
      <motion.div
        className="marquee-track inline-block"
        variants={marqueeScroll}
        animate="animate"
      >
        <span className="inline-flex">
          {renderItems("first")}
          {renderItems("second")}
        </span>
      </motion.div>
    </div>
  );
}

export default MarqueeBand;
