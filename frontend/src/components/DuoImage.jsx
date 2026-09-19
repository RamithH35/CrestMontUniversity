import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable Photo treatment component.
 * Renders in full color and adds a soft gradient overlay at the bottom 
 * to blend the image into cards/backgrounds.
 */
function DuoImage({ src, alt = "", className = "", hoverEffect = true, loading = "lazy", onLoad }) {
  const handleLoad = (e) => {
    if (onLoad) {
      onLoad(e);
    }
    ScrollTrigger.refresh();
  };

  return (
    <div className={`relative overflow-hidden ${hoverEffect ? "reveal-hover group" : ""} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-500 ease-[var(--ease)] group-hover:scale-104"
        loading={loading}
        onLoad={handleLoad}
      />
      {/* Soft gradient overlay blending into card/bg */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, var(--card) 100%)',
        }}
      />
    </div>
  );
}

export default DuoImage;
