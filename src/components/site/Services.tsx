import { Cloud, Code2, Layers, LifeBuoy, ShieldCheck, Users } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Staff Augmentation",
    text: "Jr, Mid, Senior and Tech Leads embedded directly into your teams, aligned to U.S. business hours.",
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    text: "Backend in Node.js, Python, Java and .NET with React, Vue or Angular frontends, API-first by default.",
  },
  {
    icon: Cloud,
    title: "Salesforce & Apex Engineering",
    text: "Advanced Apex, Lightning Web Components, custom objects, triggers and enterprise-grade integrations.",
  },
  {
    icon: Layers,
    title: "Enterprise Platform Development",
    text: "Clean Architecture and DDD for high-availability, fault-tolerant systems built to scale.",
  },
  {
    icon: ShieldCheck,
    title: "Architecture & Modernization",
    text: "Monolith modernization, performance optimization, technical debt reduction and secure auth models.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Technical Support",
    text: "CI/CD pipelines, automated testing, code reviews, documentation and continuous knowledge transfer.",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="section-shell">
        <span className="eyebrow">What we do</span>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
            Engineering capacity that plugs into your roadmap
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            We help U.S. companies design and build reliable software through high-quality nearshore
            teams. Long-term partnerships, not short-term outsourcing.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary">
                <s.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
