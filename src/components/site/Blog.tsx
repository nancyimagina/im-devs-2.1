import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    tag: "Staff Augmentation",
    date: "Aug 4, 2026",
    readTime: "6 min read",
    title: "Staff augmentation vs. outsourcing: what actually scales delivery",
    excerpt:
      "Adding people rarely fixes velocity. What does: embedding senior engineers inside your existing rituals, ownership model and codebase from day one.",
  },
  {
    tag: "Salesforce",
    date: "Jul 22, 2026",
    readTime: "8 min read",
    title: "Apex at enterprise scale: patterns that survive governor limits",
    excerpt:
      "Bulkified triggers, a service layer around Apex, and LWC boundaries that keep enterprise Salesforce implementations testable and cheap to change.",
  },
  {
    tag: "Architecture",
    date: "Jul 9, 2026",
    readTime: "7 min read",
    title: "Modernizing a monolith without freezing the roadmap",
    excerpt:
      "A strangler-fig approach with Clean Architecture boundaries, CI/CD safety nets and automated testing lets you refactor while shipping features.",
  },
];

export function Blog() {
  return (
    <section id="blog" className="scroll-mt-24 py-20 md:py-28">
      <div className="section-shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Blog</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
              Notes from our engineering practice
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col rounded-3xl border border-border bg-surface/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-primary/12 px-2.5 py-1 font-semibold text-primary">
                  {p.tag}
                </span>
                <span>{p.date}</span>
                <span aria-hidden="true">·</span>
                <span>{p.readTime}</span>
              </div>
              <h3 className="mt-5 text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
              <a
                href="#blog"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Read article
                <ArrowUpRight className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
