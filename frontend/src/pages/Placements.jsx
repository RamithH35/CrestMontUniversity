import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

const PLACEMENT_TRENDS = [
  { year: "2021-22", rate: 86, highestLpa: 18.5, averageLpa: 4.8 },
  { year: "2022-23", rate: 89, highestLpa: 21.0, averageLpa: 5.3 },
  { year: "2023-24", rate: 92, highestLpa: 24.6, averageLpa: 5.9 },
  { year: "2024-25", rate: 95, highestLpa: 27.4, averageLpa: 6.4 },
  { year: "2025-26", rate: 97, highestLpa: 30.2, averageLpa: 6.9 },
];

function Placements() {
  return (
    <div>
      <PageHero
        title="Placements"
        subtitle="Career outcomes powered by training, mentoring, and recruiter partnerships."
      />
      <section className="container-app grid gap-6 py-12 md:grid-cols-3">
        <SectionCard
          title="Top Recruiters"
          description="Infosys, TCS, Zoho, Bosch, Amazon, and many high-growth startups."
          imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
        />
        <SectionCard
          title="Preparation"
          description="Mock interviews, coding practice, aptitude coaching, and profile building."
          imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
        />
        <SectionCard
          title="Internships"
          description="Industry internships integrated into curriculum for final-year placement readiness."
          imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
        />
      </section>

      <section className="container-app pb-14">
        <div className="surface p-6 md:p-8">
          <div className="mb-6">
            <h2 className="font-['Poppins'] text-2xl font-bold tracking-tight text-slate-100">
              Placement Performance (Past 5 Years)
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              Year-wise placement rate with highest and average package trends.
            </p>
          </div>

          <div className="space-y-4">
            {PLACEMENT_TRENDS.map((item) => (
              <div key={item.year}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-200">{item.year}</span>
                  <span className="font-semibold text-accent">{item.rate}% placed</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-sky-300"
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
                <div className="mt-1 flex flex-wrap gap-4 text-xs text-slate-300">
                  <span>Highest: {item.highestLpa} LPA</span>
                  <span>Average: {item.averageLpa} LPA</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Latest Placement Rate
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-100">97%</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Highest Package (2025-26)
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-100">30.2 LPA</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Average Package (2025-26)
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-100">6.9 LPA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Placements;
