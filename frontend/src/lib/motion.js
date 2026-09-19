import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const EASE = {
  expoOut: "expo.out",
  power3Out: "power3.out",
  power4Out: "power4.out",
  custom: "cubic-bezier(0.22, 1, 0.36, 1)",
};

export const DURATION = {
  fast: 0.25,
  base: 0.6,
  cinematic: 1.2,
  kenBurns: 8,
};

/**
 * SplitText component for accessible, responsive word-by-word reveals.
 */
export function SplitText({ text, className = "", wordClassName = "" }) {
  if (!text) return null;
  const words = String(text).split(" ");
  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0">
          <span className={`inline-block split-word ${wordClassName}`}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export const marqueeScroll = {
  animate: {
    x: ["0%", "-50%"],
    transition: { duration: 20, ease: "linear", repeat: Infinity },
  },
};

