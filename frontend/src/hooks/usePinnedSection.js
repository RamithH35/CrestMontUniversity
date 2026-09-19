import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced hook for pinned section sticky layout, split-text heading reveals, 
 * directional card staggers, and robust ResizeObserver sync.
 */
export function usePinnedSection(sectionRef, headingRef, clusterRef, dependencies = []) {
  useEffect(() => {
    const clusterEl = clusterRef?.current;
    const sectionEl = sectionRef?.current;
    const headingEl = headingRef?.current;

    // Stability guard: skip animation if refs or children are missing
    if (!clusterEl || !sectionEl) {
      return;
    }

    if (!clusterEl.children || clusterEl.children.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Heading Column: Watermark + Split Words + Narrative Elements
      if (headingEl) {
        const watermark = headingEl.querySelector('.watermark-num');
        const splitWords = headingEl.querySelectorAll('.split-word');
        const narrativeItems = headingEl.querySelectorAll('.heading-anim');

        const headingTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Watermark subtle parallax entrance
        if (watermark) {
          headingTl.fromTo(
            watermark,
            { opacity: 0, y: -25, scale: 0.94 },
            { opacity: 0.035, y: 0, scale: 1, duration: 1.0, ease: "power2.out" },
            0
          );
        }

        // Split-text word reveal
        if (splitWords && splitWords.length > 0) {
          headingTl.fromTo(
            splitWords,
            { yPercent: 110, opacity: 0, rotateZ: 1.5 },
            { yPercent: 0, opacity: 1, rotateZ: 0, duration: 0.85, stagger: 0.04, ease: "power4.out" },
            0.1
          );
        }

        // Narrative elements (eyebrow, description, buttons)
        if (narrativeItems && narrativeItems.length > 0) {
          headingTl.fromTo(
            narrativeItems,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out" },
            0.2
          );
        }
      }

      // 2. Cluster Cards: Directional Stagger with Layout Nuance
      const cards = Array.from(clusterEl.children);
      
      cards.forEach((card, idx) => {
        // Provide directional variety matching the visual layout offset
        const xOffset = idx % 2 === 0 ? -16 : 16;
        const yOffset = 45 + (idx * 5);

        gsap.fromTo(
          card,
          { opacity: 0, y: yOffset, x: xOffset, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionEl);

    // Stability: ResizeObserver to refresh ScrollTrigger on DOM changes
    let resizeObserver = null;
    if (typeof window !== 'undefined' && window.ResizeObserver && clusterEl) {
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(clusterEl);
    }

    ScrollTrigger.refresh();

    return () => {
      if (resizeObserver && clusterEl) {
        resizeObserver.unobserve(clusterEl);
      }
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRef, headingRef, clusterRef, ...dependencies]);
}

