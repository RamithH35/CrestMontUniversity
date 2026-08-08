import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

function Academics() {
  return (
    <div>
      <PageHero
        title="Academics"
        subtitle="Outcome-driven curriculum, project-based learning, and global exposure."
      />
      <section className="container-app grid gap-4 py-12 md:grid-cols-3">
        <SectionCard title="Programs" description="Undergraduate, postgraduate, and doctoral tracks across engineering and sciences." />
        <SectionCard title="Curriculum" description="Industry-aligned modules, research practice, and hands-on capstone experiences." />
        <SectionCard title="Academic Calendar" description="Semester model with continuous assessment, internships, and immersion terms." />
      </section>
    </div>
  );
}

export default Academics;
