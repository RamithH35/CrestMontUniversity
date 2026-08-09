import React from 'react';
import { useNavigate } from 'react-router-dom';
import cover1 from '../assets/cover-1.jpg';

function PageHero({ title, subtitle, eyebrow = "Crestmont University", backgroundImage = cover1, showBackButton = true }) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-[var(--line)] min-h-[35vh] flex items-center py-12">
      {/* Full-color background photo banner with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Soft bottom gradient overlay transitioning to page background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.35) 60%, var(--bg) 100%)',
          }}
        />
      </div>

      {/* Floating glassmorphism card containing titles */}
      <div className="wrap relative z-10 w-full">
        <div className="glass-card p-8 rounded-[4px] max-w-[720px] shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[11px] font-mono text-[var(--ink)] opacity-75 hover:opacity-100 mb-4 transition-all group cursor-pointer"
            >
              <span className="transform transition-transform group-hover:-translate-x-1 font-sans text-xs">&larr;</span> BACK
            </button>
          )}
          
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink)] opacity-85 font-mono mb-2">
            {eyebrow}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl relative pb-4">
            {title}
            {/* Accent underline highlight */}
            <span className="absolute bottom-0 left-0 w-12 h-[3px] bg-[var(--blue)]" />
          </h1>
          <p className="mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-[var(--ink-soft)]">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
