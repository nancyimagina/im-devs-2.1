import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustedBy } from "@/components/site/TrustedBy";
import { Services } from "@/components/site/Services";
import { CaseStudies } from "@/components/site/CaseStudies";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { Blog } from "@/components/site/Blog";
import { Footer } from "@/components/site/Footer";

const title = "Imagina Devs — Nearshore Staff Augmentation & Salesforce Experts";
const description =
  "Embed senior nearshore engineers into your team within days. Salesforce Apex & LWC specialists building mission-critical systems for U.S. companies.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <CaseStudies />
        <About />
        <Testimonials />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
