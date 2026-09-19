import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import DuoImage from "../components/DuoImage";
import { CLUBS } from "../data/universityData";

const CLUB_DATA = {
  "CodeForge Club": {
    desc: "Crestmont's premier coding club focusing on algorithms, web dev, and national hackathons.",
    img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Coding"
  },
  "AeroDesign Society": {
    desc: "Designing, building, and flying remote-controlled aircraft and high-powered rockets.",
    img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Aerospace"
  },
  "EcoImpact Collective": {
    desc: "Promoting sustainability, campus recycling drives, and ecological conservation studies.",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Environment"
  },
  "Robotics Guild": {
    desc: "Building autonomous systems and competing in battlebots and maze solver competitions.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Robotics"
  },
  "Entrepreneurs Cell": {
    desc: "Incubating ideas, conducting case studies, and hosting founder demo nights.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&h=600&q=80",
    tag: "Business"
  }
};

function Clubs() {
  return (
    <div>
      <PageHero
        title="Student Clubs"
        subtitle="Discover student-led communities, find your interest, and build projects together."
      />

      <section className="py-[100px]">
        <div className="wrap">
          <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
            {CLUBS.map((clubName) => {
              const info = CLUB_DATA[clubName] || {
                desc: "Explore events and activities run by our student community.",
                img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&h=600&q=80",
                tag: "General"
              };
              return (
                <div
                  key={clubName}
                  className="event-card flex flex-col glass-card rounded-[4px] overflow-hidden"
                >
                  <Link to={`/clubs/${encodeURIComponent(clubName)}`}>
                    <div className="event-media aspect-[4/5] overflow-hidden reveal-hover">
                      <DuoImage
                        src={info.img}
                        alt={clubName}
                        className="w-full h-full"
                        hoverEffect={false}
                      />
                    </div>
                    <div className="event-body p-[20px] flex-1 flex flex-col justify-between">
                      <div>
                        <div className="event-top flex justify-between items-start mb-[10px]">
                          <span className="tag font-mono text-[10px] tracking-[0.05em] uppercase px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--ink-soft)]">
                            {info.tag}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-[20px] leading-[1.1] tracking-[-0.02em] mb-[8px] text-[var(--ink)]">
                          {clubName}
                        </h3>
                        <p className="text-[var(--ink-soft)] text-[13px] leading-relaxed">
                          {info.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="flex justify-start mt-12">
            <Link to="/" className="btn btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clubs;
export { CLUB_DATA };
