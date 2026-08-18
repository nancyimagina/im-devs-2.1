import { clientLogos } from "@/lib/brand";

export function TrustedBy() {
  const row = [...clientLogos, ...clientLogos];

  return (
    <section aria-label="Clients" className="border-y border-border/60 bg-surface/40 py-10">
      <p className="text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        Trusted by teams we build with
      </p>
      <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-16 group-hover:[animation-play-state:paused]">
          {row.map((logo, i) => (
            <img
              key={`${logo.name}-${i}`}
              src={logo.url}
              alt={logo.name}
              loading="lazy"
              className="h-8 w-auto shrink-0 opacity-60 brightness-0 invert transition-opacity duration-300 hover:opacity-100 sm:h-10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
