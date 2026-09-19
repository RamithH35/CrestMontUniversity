import React from 'react';

function HighlightCard({ quote, name, role, variant = "default" }) {
  let cardClass = "highlight-card min-w-[340px] max-w-[420px] bg-white border border-[var(--line)] text-[var(--ink)] rounded-[6px] p-8 flex-none shadow-sm";
  let quoteClass = "quote text-[17px] leading-[1.6] mb-6 font-sans text-[var(--ink)] font-normal";
  let nameClass = "highlight-name font-semibold text-[15px] text-[var(--ink)]";
  let roleClass = "highlight-role font-mono text-[12px] text-[var(--ink-soft)] mt-1";

  if (variant === "clay") {
    cardClass = "highlight-card min-w-[340px] max-w-[420px] bg-[var(--clay)] border border-[var(--clay)] text-white rounded-[6px] p-8 flex-none shadow-md";
    quoteClass = "quote text-[17px] leading-[1.6] mb-6 font-sans text-white font-normal";
    nameClass = "highlight-name font-semibold text-[15px] text-white";
    roleClass = "highlight-role font-mono text-[12px] text-white/80 mt-1";
  } else if (variant === "blue") {
    cardClass = "highlight-card min-w-[340px] max-w-[420px] bg-[var(--bg-dark)] border border-[rgba(255,255,255,0.15)] text-[var(--text-on-dark)] rounded-[6px] p-8 flex-none shadow-md";
    quoteClass = "quote text-[17px] leading-[1.6] mb-6 font-sans text-[var(--text-on-dark)] font-normal";
    nameClass = "highlight-name font-semibold text-[15px] text-[var(--text-on-dark)]";
    roleClass = "highlight-role font-mono text-[12px] text-white/70 mt-1";
  }

  return (
    <div className={cardClass}>
      <p className={quoteClass}>
        {quote}
      </p>
      <div className={nameClass}>
        {name}
      </div>
      <div className={roleClass}>
        {role}
      </div>
    </div>
  );
}

export default HighlightCard;
