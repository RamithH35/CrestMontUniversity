import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

function Research() {
  return (
    <div>
      <PageHero
        title="Research"
        subtitle="Interdisciplinary innovation at the intersection of technology, sustainability, and society."
      />
      <section className="container-app grid gap-4 py-12 md:grid-cols-3">
        <SectionCard title="Centers of Excellence" description="AI Systems Lab, Smart Infrastructure Lab, and Renewable Energy Center." />
        <SectionCard title="Publications" description="Faculty and students publish in indexed journals and premier conferences." />
        <SectionCard title="Funded Projects" description="Government and industry-funded projects with real-world deployment outcomes." />
      </section>
    </div>
  );
}

export default Research;
