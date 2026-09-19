import React, { useEffect, useRef } from 'react';
import DuoImage from './DuoImage';
import EyebrowBadge from './EyebrowBadge';
import PillButton from './PillButton';
import cover2 from '../assets/cover-2.png';
import { gsap, ScrollTrigger, SplitText } from '../lib/motion';

function About() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const copyRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Photo directional slide & scale entrance
      if (mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { opacity: 0, x: -40, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 2. Headline Split-text word reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.split-word');
        if (words && words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 110, opacity: 0, rotateZ: 1.5 },
            {
              yPercent: 0,
              opacity: 1,
              rotateZ: 0,
              duration: 0.85,
              stagger: 0.05,
              ease: "power4.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // 3. Copy items (eyebrow, paragraph, button) directional stagger
      if (copyRef.current) {
        const otherElements = copyRef.current.querySelectorAll('.about-anim');
        if (otherElements && otherElements.length > 0) {
          gsap.fromTo(
            otherElements,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, sectionRef);

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-[100px] transition-all duration-300">
      <div className="wrap grid grid-cols-2 gap-16 items-center max-md:grid-cols-1 max-md:gap-8">

        {/* About Photo */}
        <div ref={mediaRef} className="about-media aspect-[4/5] rounded-[4px] overflow-hidden">
          <DuoImage
            src={cover2}
            alt="Students collaborating"
            className="w-full h-full"
            hoverEffect={true}
            loading="eager"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>

        {/* About Copy */}
        <div ref={copyRef} className="about-copy">
          <div className="about-anim">
            <EyebrowBadge text="Why We Exist" />
          </div>
          <h2
            ref={headingRef}
            className="text-[clamp(28px,3.2vw,42px)] mt-[18px] leading-[1.05] tracking-[-0.02em] font-display font-bold text-[var(--ink)]"
          >
            <SplitText text="A campus built around what students actually make" />
          </h2>
          <p className="about-anim text-[var(--ink-soft)] mt-4 leading-[1.7] text-[15px]">
            Crestmont University runs on labs, clubs, and cross-department projects — not just lecture halls. This is the single place to find what's happening, who's running it, and how to get in.
          </p>
          <div className="about-anim hero-actions mt-6 flex gap-3 flex-wrap">
            <PillButton variant="solid" href="#events">See What's On</PillButton>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;

