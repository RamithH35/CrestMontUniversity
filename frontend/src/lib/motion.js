import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const EASE = "power3.out";

export const DURATION = {
  fast: 0.2,
  base: 0.6,
};

export const marqueeScroll = {
  animate: {
    x: ["0%", "-50%"],
    transition: { duration: 20, ease: "linear", repeat: Infinity },
  },
};
