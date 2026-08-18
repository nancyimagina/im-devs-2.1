import { Mail, Phone } from "lucide-react";
import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Staff Augmentation", href: "#services" },
      { label: "Custom Software Development", href: "#services" },
      { label: "Salesforce & Apex", href: "#services" },
      { label: "Enterprise Platforms", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Blog", href: "#blog" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border bg-surface/50">
      <div className="section-shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img src={brand.logoLight} alt="Imagina Devs" className="h-8 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Nearshore engineering teams that build, scale and operate mission-critical systems for
              U.S. companies.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-sm font-semibold">Get in touch</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-foreground/90 transition-colors hover:text-primary"
                >
                  <Mail className="size-4 text-primary" />
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phoneHref}`}
                  className="inline-flex items-center gap-2.5 text-sm text-foreground/90 transition-colors hover:text-primary"
                >
                  <Phone className="size-4 text-primary" />
                  {brand.phone}
                </a>
              </li>
            </ul>
            <Button asChild className="mt-6 rounded-full px-6 font-semibold">
              <a href={`mailto:${brand.email}`}>Start a conversation</a>
            </Button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Imagina Devs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Nearshore software development · Aligned to U.S. time zones
          </p>
        </div>
      </div>
    </footer>
  );
}
