import React from 'react';

function PillButton({ children, href, onClick, variant = "solid", className = "", type = "button", ...props }) {
  const btnClass = `btn ${variant === "solid" ? "btn-solid" : "btn-outline"} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={btnClass} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button type={type} onClick={onClick} className={btnClass} {...props}>
      {children}
    </button>
  );
}

export default PillButton;
