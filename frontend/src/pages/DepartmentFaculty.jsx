import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { DEPARTMENTS } from "../data/universityData";

function initials(name) {
  const parts = String(name || "")
    .split(" ")
    .filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function DepartmentFaculty() {
  const { code } = useParams();
  const department = DEPARTMENTS.find((d) => d.code.toLowerCase() === String(code || "").toLowerCase());

  if (!department) {
    return (
      <div className="container-app py-12">
        <div className="surface p-6">
          <p className="text-lg font-semibold text-slate-100">Department not found</p>
          <p className="mt-2 text-sm text-slate-300">
            Please go back to Departments and choose a valid department.
          </p>
          <Link to="/departments" className="btn btn-secondary mt-5">
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={`${department.code} Faculty Portfolio`}
        subtitle={`Meet the faculty team of ${department.name}.`}
      />

      <section className="md:pr-[56px] py-[100px]">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--ink)]">
                Faculty Profiles
              </h2>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                Department: {department.name}
              </p>
            </div>
            <Link to="/departments" className="btn btn-outline">
              View all departments
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {department.faculty.map((name) => (
              <article key={name} className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-[4px]">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--line)]">
                    <span className="text-sm font-bold text-[var(--blue)]">{initials(name)}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-[var(--ink)]">
                      {name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">Faculty Member</p>
                  </div>
                </div>

                <dl className="mt-5 grid gap-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-soft)] font-mono">
                      Expertise
                    </dt>
                    <dd className="mt-1 text-[var(--ink)]">
                      Teaching, mentoring, and research guidance
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-soft)] font-mono">
                      Contact
                    </dt>
                    <dd className="mt-1 text-[var(--ink)]">
                      {`${name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.+|\.+$/g, "")}@crestmont.edu.in`}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DepartmentFaculty;

