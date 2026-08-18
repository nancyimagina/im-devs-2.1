import { Check } from "lucide-react";

const capabilities = [
  {
    title: "Software Engineering",
    items: [
      "Backend development (Node.js, Python, Java, .NET)",
      "Frontend development (React, Vue, Angular)",
      "API-first and service-oriented architectures",
      "Monolith modernization and system refactoring",
    ],
  },
  {
    title: "Salesforce & Apex Engineering",
    items: [
      "Advanced Apex development",
      "Lightning Web Components (LWC)",
      "Custom objects, workflows, triggers and integrations",
      "Enterprise-grade Salesforce architectures",
    ],
  },
  {
    title: "Architecture & Scalability",
    items: [
      "Clean Architecture and Domain-Driven Design (DDD)",
      "High-availability and fault-tolerant systems",
      "Performance optimization and technical debt reduction",
      "Secure authentication and authorization models",
    ],
  },
  {
    title: "Quality & Delivery",
    items: [
      "Code reviews and technical leadership",
      "CI/CD pipelines",
      "Automated testing strategies",
      "Documentation and knowledge transfer",
    ],
  },
];

const whyUs = [
  "Senior-first mindset",
  "Strong technical leadership",
  "Proven experience with enterprise U.S. clients",
  "Nearshore efficiency without compromising quality",
];

const value = [
  {
    title: "We extend your team",
    text: "Experienced developers integrated directly with your internal engineering and product teams.",
  },
  {
    title: "We accelerate delivery",
    text: "More velocity without increasing internal overhead or management burden.",
  },
  {
    title: "We reduce risk",
    text: "Stable, long-term engineering capacity instead of short-lived outsourcing.",
  },
];

const industries = [
  "Home Services & Construction",
  "Enterprise Platforms (Salesforce-based systems)",
  "Logistics & Operations",
  "Technology-driven businesses",
];

const howWeWork = [
  "Teams aligned to U.S. business hours",
  "Clear communication and accountability",
  "Flexible scaling as your needs grow",
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute top-1/3 -right-40 -z-10 size-[520px] rounded-full bg-primary/6 blur-[130px]" />

      <div className="section-shell">
        <span className="eyebrow">Who we are</span>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
              A nearshore partner for mission-critical systems
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Imagina Devs is a nearshore software development partner specialized in building,
              scaling and operating mission-critical systems for U.S. companies. We integrate senior
              engineering talent directly into your teams, aligned to U.S. time zones and enterprise
              standards.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our delivery model covers Staff Augmentation across Jr, Mid, Senior and Tech Lead
              profiles, long-term team extensions, and direct collaboration with your internal
              engineering and product teams.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {whyUs.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {value.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-surface/60 p-5">
                <h3 className="text-sm font-semibold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-primary/25 bg-primary/8 p-5">
              <h3 className="text-sm font-semibold">How we work</h3>
              <ul className="mt-3 space-y-2">
                {howWeWork.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-semibold">Core technical capabilities</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-border bg-surface/40 p-5 transition-colors hover:border-primary/35"
              >
                <h4 className="text-sm font-semibold text-primary">{c.title}</h4>
                <ul className="mt-3 space-y-2">
                  {c.items.map((i) => (
                    <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Industries we support:</span>
          {industries.map((i) => (
            <span
              key={i}
              className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-foreground/85"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
