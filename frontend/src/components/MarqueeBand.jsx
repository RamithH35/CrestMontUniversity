import React from 'react';
import { motion } from 'framer-motion';
import { marqueeScroll } from '../lib/motion';

function MarqueeBand() {
  const items = [
    "CAMPUS OVER CLASSROOM",
    "BUILD OVER WATCH",
    "SHOW UP OVER SIGN UP",
  ];

  // Render content items with separators
  const renderItems = (keyPrefix) => (
    <span key={keyPrefix} className="inline-flex items-center">
      {items.map((item, idx) => (
        <span key={`${keyPrefix}-${idx}`} className="inline-flex items-center">
          <span className="font-display font-bold text-[22px] text-[var(--bg)] uppercase">
            {item}
          </span>
          <span className="sep font-display font-bold text-[22px] mx-9 text-[var(--clay)] select-none">
            •
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee-band bg-[var(--ink)] py-[26px] overflow-hidden whitespace-nowrap select-none">
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
