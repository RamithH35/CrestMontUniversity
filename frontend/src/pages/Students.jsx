import PageHero from "../components/PageHero";
import SectionCard from "../components/SectionCard";

function Students() {
  return (
    <div>
      <PageHero
        title="Students"
        subtitle="Resources and support for academic growth, wellbeing, and leadership."
      />
      <section className="container-app grid gap-4 py-12 md:grid-cols-3">
        <SectionCard title="Student Portal" description="Access timetable, attendance, exam info, and learning tools." />
        <SectionCard title="Support Services" description="Counseling, mentoring, peer tutoring, and career advisory support." />
        <SectionCard title="Clubs and Chapters" description="Technical, cultural, and social clubs led by student communities." />
      </section>
    </div>
  );
}

export default Students;
