import React from 'react';

function EyebrowBadge({ text, className = "", hasDot = true }) {
  return (
    <span className={`eyebrow ${className}`}>
      {hasDot && <span className="dot" />}
      {text}
    </span>
  );
}

export default EyebrowBadge;
