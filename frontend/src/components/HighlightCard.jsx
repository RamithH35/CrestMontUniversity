import React from 'react';

function HighlightCard({ quote, name, role, variant = "default" }) {
  let cardClass = "highlight-card min-w-[340px] bg-[var(--card)] border border-[var(--line)] rounded-[4px] p-8 flex-none";
  
  if (variant === "clay") {
    cardClass = "highlight-card min-w-[340px] bg-[var(--clay)] text-white border border-[var(--clay)] rounded-[4px] p-8 flex-none";
  } else if (variant === "blue") {
    cardClass = "highlight-card min-w-[340px] bg-[var(--blue)] text-white border border-[var(--blue)] rounded-[4px] p-8 flex-none";
  }
  
  return (
    <div className={cardClass}>
      <p className="quote text-[17px] leading-[1.55] mb-6 font-sans">
        {quote}
      </p>
      <div className="highlight-name font-medium text-[14px]">
        {name}
      </div>
      <div className="highlight-role font-mono text-[11px] opacity-70">
        {role}
      </div>
    </div>
  );
}

export default HighlightCard;
