import React from 'react';

/**
 * Reusable Duotone Photo treatment component.
 * Grayscale filter + mix-blend-mode: luminosity + color tint layer overlay.
 * Uses accent-primary (var(--blue)) color overlay on top of deep blue background.
 */
function DuoImage({ src, alt = "", className = "", hoverEffect = true }) {
  return (
    <div className={`duo relative overflow-hidden bg-[var(--blue-deep)] ${hoverEffect ? "reveal-hover group" : ""} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover filter grayscale contrast-[1.15] brightness-[1.05] mix-blend-luminosity transition-all duration-500 ease-[var(--ease)] group-hover:scale-104"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[var(--blue)] mix-blend-color opacity-75 transition-opacity duration-500 ease-[var(--ease)] group-hover:opacity-15 pointer-events-none" />
    </div>
  );
}

export default DuoImage;
