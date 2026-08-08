import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

function Admissions() {
  return (
    <div>
      <PageHero
        title="Admissions"
        subtitle="Simple, transparent admissions process with scholarships and merit pathways."
      />
      <section className="container-app grid gap-4 py-12 md:grid-cols-3">
        <SectionCard title="Eligibility" description="Entrance exam scores, academic record, and interview for selected programs." />
        <SectionCard title="Scholarships" description="Merit, need-based, and diversity scholarships available each cycle." />
        <SectionCard title="Application Timeline" description="Applications open in January; offers released in phased rounds." />
      </section>
    </div>
  );
}

export default Admissions;
