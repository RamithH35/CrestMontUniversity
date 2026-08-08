function PageHero({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] py-16">
      <div className="wrap relative">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-soft)] font-mono">
          Crestmont University
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export default PageHero;
