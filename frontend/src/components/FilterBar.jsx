import React from 'react';

function FilterBar({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedDate, 
  setSelectedDate,
  categories = [] 
}) {
  return (
    <div className="filter-bar flex gap-3 items-center mb-10 flex-wrap w-full">
      {/* Category Dropdown styled as a chip */}
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="chip appearance-none font-mono text-[12px] pl-[16px] pr-[28px] py-[9px] rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] cursor-pointer focus:outline-none focus:border-[var(--blue)]"
          aria-label="Filter by Category"
        >
          <option value="all">Category: All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="absolute right-[12px] top-1/2 -translate-y-1/2 font-mono text-[10px] text-[var(--ink-soft)] pointer-events-none select-none">▼</span>
      </div>

      {/* Date Dropdown styled as a chip */}
      <div className="relative">
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="chip appearance-none font-mono text-[12px] pl-[16px] pr-[28px] py-[9px] rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--ink)] cursor-pointer focus:outline-none focus:border-[var(--blue)]"
          aria-label="Filter by Date"
        >
          <option value="all">Date: All</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <span className="absolute right-[12px] top-1/2 -translate-y-1/2 font-mono text-[10px] text-[var(--ink-soft)] pointer-events-none select-none">▼</span>
      </div>

      {/* Status Legend */}
      <span className="legend flex gap-[18px] md:ml-auto font-mono text-[11px] text-[var(--ink-soft)] items-center">
        <span className="legend-item flex items-center gap-[6px]">
          <span className="dot w-[6px] h-[6px] rounded-full bg-[var(--blue)]" />
          Upcoming
        </span>
        <span className="legend-item flex items-center gap-[6px]">
          <span className="dot past w-[6px] h-[6px] rounded-full bg-[#B6B0A2]" />
          Past
        </span>
      </span>
    </div>
  );
}

export default FilterBar;
