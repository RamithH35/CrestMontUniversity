export const EASE = [0.22, 1, 0.36, 1]; // ease-out-expo feel, matches Villa Kujoyama's restraint

export const DURATION = {
  fast: 0.2,   // hover/tap feedback
  base: 0.6,   // scroll reveals, section entrances
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const hoverLift = {
  rest: { scale: 1, filter: "grayscale(0.3) sepia(0.2)" }, // duotone-ish rest state
  hover: {
    scale: 1.02,
    filter: "grayscale(0) sepia(0)", // reveals full color on hover
    transition: { duration: DURATION.fast, ease: EASE },
  },
};

export const marqueeScroll = {
  animate: {
    x: ["0%", "-50%"],
    transition: { duration: 20, ease: "linear", repeat: Infinity },
  },
};
