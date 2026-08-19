import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ParticleShape } from "./ParticleShape";
import { Button } from "@/components/ui/button";

const slides = [
  {
    kicker: "Staff Augmentation",
    title: "Scale your engineering team fast",
    text: "Embed senior engineers into your team within days. Scale delivery without compromising quality or velocity",
    shape: "gear" as const,
  },
  {
    kicker: "Salesforce Experts",
    title: "Specialized Salesforce engineering",
    text: "Certified Salesforce engineers specialized in Apex, LWC, and scalable enterprise implementations",
    shape: "cloud" as const,
  },
];

const AUTOPLAY_MS = 7000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [go, paused, index]);

  const active = slides[index]!;

  return (
    <section
      className="relative isolate overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div key={index} className="fade-up min-w-0">
          <span className="eyebrow inline-flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            {active.kicker}
          </span>
          <h1 className="text-gradient-brand mt-5 line-clamp-2 text-[2rem] leading-[1.08] font-bold text-balance sm:text-5xl lg:text-[3.5rem]">
            {active.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {active.text}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full px-7 font-semibold">
              <Link to="/contact">Start scaling</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-transparent px-7 font-semibold text-foreground hover:bg-accent"
            >
              <Link to="/case-studies">See our work</Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-md justify-self-center lg:max-w-lg">
          <div className="absolute inset-8 rounded-full bg-primary/8 blur-3xl" />
          <ParticleShape shape={active.shape} />
        </div>
      </div>

      {/* Centered controls below the slider */}
      <div className="section-shell mt-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="grid size-10 place-items-center rounded-full border border-border text-foreground/80 transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="grid size-10 place-items-center rounded-full border border-border text-foreground/80 transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.kicker}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to ${s.kicker}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-9 bg-primary" : "w-3 bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
