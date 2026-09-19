import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable hook for section card stagger entrance and smooth scroll sync.
 */
export function usePinnedSection(sectionRef, headingRef, clusterRef, dependencies = []) {
  useEffect(() => {
    const clusterEl = clusterRef?.current;
    const sectionEl = sectionRef?.current;

    if (!clusterEl || !sectionEl) {
      return;
    }

    if (!clusterEl.children || clusterEl.children.length === 0) {
      return;
    }

    const ctx = gsap.context(() => {
      // Smooth fade & stagger entrance for cards as they enter viewport
      gsap.fromTo(
        clusterEl.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: clusterEl,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionEl);

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
