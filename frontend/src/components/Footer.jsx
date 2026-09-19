import React from 'react';
import PillButton from './PillButton';

function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] text-[var(--text-on-dark)] py-20 transition-all duration-300 border-t border-[rgba(255,255,255,0.1)]">
      <div className="wrap">
        {/* Footer Top Call-to-action */}
        <div className="foot-top flex justify-between items-end mb-16 flex-wrap gap-6">
          <h2 className="text-[clamp(28px,4vw,44px)] font-display font-bold leading-[1.05] tracking-[-0.02em] max-w-[520px] text-[var(--text-on-dark)]">
            Ready to see what<br />Crestmont University's building?
          </h2>
          <PillButton
            variant="outline"
            href="#events"
            className="border-[var(--text-on-dark)] text-[var(--text-on-dark)] hover:bg-[var(--text-on-dark)] hover:text-[var(--bg-dark)]"
          >
            Browse the Agenda
          </PillButton>
        </div>

        {/* Footer Bottom Meta details */}
        <div className="foot-bottom flex justify-between border-t border-[rgba(255,255,255,0.15)] pt-8 font-mono text-[11px] text-[#A0AEC0] flex-wrap gap-3">
          <span>© 2026 Crestmont University</span>
          <span>Innovating Tomorrow</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
