import React from 'react';
import PillButton from './PillButton';

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--bg)] py-16 transition-all duration-300">
      <div className="wrap">
        {/* Footer Top Call-to-action */}
        <div className="foot-top flex justify-between items-end mb-12 flex-wrap gap-6">
          <h2 className="text-[clamp(28px,4vw,44px)] font-display font-bold leading-[1.05] tracking-[-0.02em] max-w-[520px]">
            Ready to see what<br />Crestmont University's building?
          </h2>
          <PillButton 
            variant="outline" 
            href="#events" 
            className="border-[var(--bg)] text-[var(--bg)] hover:bg-[var(--bg)] hover:text-[var(--ink)]"
          >
            Browse the Agenda
          </PillButton>
        </div>

        {/* Footer Bottom Meta details */}
        <div className="foot-bottom flex justify-between border-t border-[#333] pt-6 font-mono text-[11px] text-[#999] flex-wrap gap-3">
          <span>© 2026 Crestmont University</span>
          <span>Innovating Tomorrow</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
