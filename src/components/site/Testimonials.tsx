import { Quote } from "lucide-react";
import { logoByName } from "@/lib/brand";

const testimonials = [
  {
    quote:
      "They embedded four senior engineers in under two weeks. Within a quarter they were leading Apex refactors our internal team had postponed for a year.",
    name: "Daniel Reeves",
    role: "VP of Engineering",
    company: "Renuity",
  },
  {
    quote:
      "The difference is the senior-first mindset. We stopped managing tasks and started discussing architecture — velocity went up and incidents went down.",
    name: "María Fernanda Ospina",
    role: "Director of Technology",
    company: "BBVA",
  },
  {
    quote:
      "Same time zone, clear accountability, no ramp-up drama. It feels like one team, not a vendor on the other side of a ticket queue.",
    name: "Chris Alvarado",
    role: "Head of Product",
    company: "AgiOne",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-y border-border/60 bg-surface/30 py-20 md:py-28"
    >
      <div className="section-shell">
        <span className="eyebrow">Testimonials</span>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
          What engineering leaders say
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-border bg-surface/70 p-7 transition-colors duration-300 hover:border-primary/35"
            >
              <Quote className="size-6 text-primary" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <img
                  src={logoByName[t.company]}
                  alt={t.company}
                  loading="lazy"
                  className="h-6 w-auto max-w-[96px] object-contain opacity-70 brightness-0 invert"
                />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
