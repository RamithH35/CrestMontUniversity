import React from 'react';

function StatBlock() {
  const stats = [
    { num: "97%", label: "PLACEMENT RATE" },
    { num: "120+", label: "ACTIVE LABS" },
    { num: "40+", label: "CLUBS ON CAMPUS" },
  ];

  return (
    <section className="py-[100px] transition-all duration-300">
      <div
        className="wrap stats grid grid-cols-3 gap-[40px] text-center max-md:grid-cols-1 max-md:gap-7"
      >
        {stats.map((stat, idx) => (
          <div key={idx}>
            <div className="stat-num font-display font-bold text-[clamp(36px,5vw,56px)] text-[var(--blue)]">
              {stat.num}
            </div>
            <div className="stat-label font-mono text-[12px] text-[var(--ink-soft)] mt-2 uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatBlock;
