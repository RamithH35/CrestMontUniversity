import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";
import { UNIVERSITY } from "../data/universityData";

function About() {
  return (
    <div>
      <PageHero
        title={`About ${UNIVERSITY.name}`}
        subtitle="A multidisciplinary institution committed to academic rigor, innovation, and social impact."
      />
      <section className="container-app grid gap-4 py-12 md:grid-cols-3">
        <SectionCard
          title="Our Mission"
          description="To nurture ethically grounded professionals who can build technology for humanity."
        />
        <SectionCard
          title="Our Vision"
          description="To be a globally respected center for engineering, science, and leadership education."
        />
        <SectionCard
          title="Our Legacy"
          description={`Since ${UNIVERSITY.established}, Crestmont University has produced innovators, entrepreneurs, and scholars.`}
        />
      </section>
    </div>
  );
}

export default About;
