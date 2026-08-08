import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";
import { UNIVERSITY } from "../data/universityData";

function Contact() {
  return (
    <div>
      <PageHero
        title="Contact"
        subtitle="Get in touch for admissions, academics, events, or general support."
      />
      <section className="container-app grid gap-4 py-12 md:grid-cols-3">
        <SectionCard
          title="Address"
          description={`${UNIVERSITY.name}, Innovation Valley Road, ${UNIVERSITY.location}`}
        />
        <SectionCard
          title="Admissions Office"
          description="admissions@crestmont.edu.in | +91 422 430 2200"
        />
        <SectionCard
          title="Student Affairs"
          description="studentaffairs@crestmont.edu.in | +91 422 430 2244"
        />
      </section>
    </div>
  );
}

export default Contact;
