import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

function Alumni() {
  return (
    <div>
      <PageHero
        title="Alumni"
        subtitle="A global network of Crestmont University graduates shaping industry, research, and entrepreneurship."
      />
      <section className="container-app grid gap-4 py-12 md:grid-cols-3">
        <SectionCard title="Alumni Network" description="Mentorship, referrals, and knowledge exchange across graduating batches." />
        <SectionCard title="Distinguished Alumni" description="Leaders in product engineering, public policy, academia, and startups." />
        <SectionCard title="Give Back" description="Contribute through mentoring, scholarships, and innovation grants." />
      </section>
    </div>
  );
}

export default Alumni;
