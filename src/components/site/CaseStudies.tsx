import { ArrowUpRight, ImagePlus } from "lucide-react";
import { logoByName } from "@/lib/brand";
import caseRenuity from "@/assets/case-renuity.jpg";
import caseBbva from "@/assets/case-bbva.jpg";

type CaseStudy = {
  client: string;
  industry: string;
  title: string;
  summary: string;
  metrics: Array<{ value: string; label: string }>;
  stack: string[];
  image?: string;
};

const caseStudies: CaseStudy[] = [
  {
    client: "Renuity",
    industry: "Home Services & Construction",
    title: "Salesforce platform for a national home services network",
    summary:
      "We extended the internal engineering team with senior Apex and LWC developers to unify lead intake, scheduling and field operations across multiple brands.",
    metrics: [
      { value: "6", label: "Senior engineers embedded" },
      { value: "40%", label: "Faster release cycles" },
    ],
    stack: ["Apex", "LWC", "Salesforce APIs", "CI/CD"],
    image: caseRenuity,
  },
  {
    client: "BBVA",
    industry: "Enterprise Platforms",
    title: "Monolith modernization for mission-critical banking services",
    summary:
      "Progressive refactoring toward service-oriented architecture with Clean Architecture boundaries, automated testing and secure authorization models.",
    metrics: [
      { value: "99.9%", label: "Service availability" },
      { value: "-35%", label: "Technical debt backlog" },
    ],
    stack: ["Java", "Node.js", "DDD", "Automated testing"],
    image: caseBbva,
  },
  {
    client: "AgiOne",
    industry: "Logistics & Operations",
    title: "Operations platform rebuilt for scale",
    summary:
      "An API-first operations platform with real-time tracking dashboards, delivered by a nearshore team working in U.S. time zones alongside the product organization.",
    metrics: [
      { value: "3x", label: "Throughput per shift" },
      { value: "12 wks", label: "To first production release" },
    ],
    stack: ["React", "Python", "PostgreSQL", "AWS"],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="scroll-mt-24 py-20 md:py-28">
      <div className="section-shell">
        <span className="eyebrow">Case studies</span>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
          Systems we helped build, scale and operate
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <article
              key={cs.client}
              className="group flex flex-col overflow-hidden rounded-3xl bg-light text-light-foreground shadow-lift transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* Image slot — swap the src or drop an image into src/assets */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-light-foreground/5">
                {cs.image ? (
                  <img
                    src={cs.image}
                    alt={`${cs.client} case study`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-2 border-b border-dashed border-light-foreground/20 text-light-muted">
                    <ImagePlus className="size-6" />
                    <span className="text-xs font-medium">Add project image</span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-4">
                  <img
                    src={logoByName[cs.client]}
                    alt={cs.client}
                    loading="lazy"
                    className="h-7 w-auto max-w-[120px] object-contain brightness-0 opacity-80"
                  />
                  <span className="rounded-full bg-light-foreground/6 px-3 py-1 text-[11px] font-medium text-light-muted">
                    {cs.industry}
                  </span>
                </div>

                <h3 className="mt-5 text-lg leading-snug font-semibold">{cs.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-light-muted">{cs.summary}</p>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-light-foreground/10 pt-5">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="text-2xl font-bold tracking-tight">{m.value}</dd>
                      <p className="mt-1 text-xs leading-snug text-light-muted">{m.label}</p>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-2">
                  {cs.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-light-foreground/12 px-2.5 py-1 text-[11px] font-medium text-light-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-light-foreground underline-offset-4 hover:underline"
                >
                  Discuss a similar project
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
