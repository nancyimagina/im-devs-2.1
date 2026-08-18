import { Cloud, Code2, Layers, LifeBuoy, ShieldCheck, Users } from "lucide-react";
import caseRenuity from "@/assets/case-renuity.jpg";
import caseAgione from "@/assets/case-agione.jpg";
import blogStaff from "@/assets/blog-staff.jpg";
import blogSalesforce from "@/assets/blog-salesforce.jpg";
import blogArchitecture from "@/assets/blog-architecture.jpg";

export const services = [
  {
    icon: Users,
    title: "Staff Augmentation",
    text: "Jr, Mid, Senior and Tech Leads embedded directly into your teams, aligned to U.S. business hours.",
    details: [
      "Profiles matched to your stack and rituals",
      "Onboarding in days, not months",
      "Flexible scaling up or down per quarter",
    ],
  },
  {
    icon: Code2,
    title: "Custom Software Development",
    text: "Backend in Node.js, Python, Java and .NET with React, Vue or Angular frontends, API-first by default.",
    details: [
      "API-first, service-oriented delivery",
      "Product discovery to production",
      "Design systems and accessible UI",
    ],
  },
  {
    icon: Cloud,
    title: "Salesforce & Apex Engineering",
    text: "Advanced Apex, Lightning Web Components, custom objects, triggers and enterprise-grade integrations.",
    details: [
      "Bulkified, testable Apex service layers",
      "LWC component architecture",
      "Integrations with core enterprise systems",
    ],
  },
  {
    icon: Layers,
    title: "Enterprise Platform Development",
    text: "Clean Architecture and DDD for high-availability, fault-tolerant systems built to scale.",
    details: [
      "Domain-Driven Design boundaries",
      "High availability and fault tolerance",
      "Observability from day one",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Architecture & Modernization",
    text: "Monolith modernization, performance optimization, technical debt reduction and secure auth models.",
    details: [
      "Strangler-fig modernization plans",
      "Performance and cost optimization",
      "Secure authentication and authorization",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Technical Support",
    text: "CI/CD pipelines, automated testing, code reviews, documentation and continuous knowledge transfer.",
    details: [
      "CI/CD and automated testing strategy",
      "Code reviews and technical leadership",
      "Documentation and knowledge transfer",
    ],
  },
];

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  metrics: Array<{ value: string; label: string }>;
  stack: string[];
  image?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "renuity",
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
    slug: "agione",
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
    image: caseAgione,
  },
  {
    slug: "nutresa",
    client: "Nutresa",
    industry: "Enterprise Platforms",
    title: "Modernizing core operations services",
    summary:
      "Progressive refactoring toward service-oriented architecture with Clean Architecture boundaries, automated testing and secure authorization models.",
    metrics: [
      { value: "99.9%", label: "Service availability" },
      { value: "-35%", label: "Technical debt backlog" },
    ],
    stack: ["Java", "Node.js", "DDD", "Automated testing"],
  },
];

export type Post = {
  slug: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "staff-augmentation-vs-outsourcing",
    tag: "Staff Augmentation",
    date: "Aug 4, 2026",
    readTime: "6 min read",
    title: "Staff augmentation vs. outsourcing: what actually scales delivery",
    excerpt:
      "Adding people rarely fixes velocity. What does: embedding senior engineers inside your existing rituals, ownership model and codebase from day one.",
    image: blogStaff,
    body: [
      "Outsourcing moves a problem outside your organization. Staff augmentation keeps the problem inside, but adds the seniority needed to solve it. The distinction matters most when the work touches systems your business depends on every day.",
      "Embedded engineers join your standups, your code reviews and your on-call rotation. There is no translation layer between product intent and implementation, and no ticket queue where context goes to die.",
      "The practical test is ownership: if an engineer can propose an architectural change, defend it in review and ship it behind a feature flag, they are part of the team. If they can only execute a spec, you bought capacity, not delivery.",
    ],
  },
  {
    slug: "apex-at-enterprise-scale",
    tag: "Salesforce",
    date: "Jul 22, 2026",
    readTime: "8 min read",
    title: "Apex at enterprise scale: patterns that survive governor limits",
    excerpt:
      "Bulkified triggers, a service layer around Apex, and LWC boundaries that keep enterprise Salesforce implementations testable and cheap to change.",
    image: blogSalesforce,
    body: [
      "Governor limits are not an obstacle, they are a design constraint that rewards good architecture. One trigger per object, delegating to a handler and then to a service layer, keeps business logic out of the platform's execution context.",
      "Bulkification is the baseline: every method assumes collections, never a single record. Queries live outside loops, DML is batched, and selectors centralize SOQL so query cost is visible in one place.",
      "On the frontend, Lightning Web Components should read from Apex through narrow, purpose-built endpoints. Wide, generic endpoints are how Salesforce orgs become untestable.",
    ],
  },
  {
    slug: "modernizing-a-monolith",
    tag: "Architecture",
    date: "Jul 9, 2026",
    readTime: "7 min read",
    title: "Modernizing a monolith without freezing the roadmap",
    excerpt:
      "A strangler-fig approach with Clean Architecture boundaries, CI/CD safety nets and automated testing lets you refactor while shipping features.",
    image: blogArchitecture,
    body: [
      "Big-bang rewrites fail for a predictable reason: they ask the business to stop while engineering catches up. The strangler-fig pattern avoids that by routing selected capabilities to new services while the monolith keeps serving everything else.",
      "Start with the seams that hurt most: the modules with the highest change rate and the highest incident count. Wrap them behind an interface, add characterization tests, then move the implementation.",
      "CI/CD and automated testing are not extras here, they are the safety net that makes incremental modernization survivable. Without them, every extraction is a gamble.",
    ],
  },
];

export const testimonials = [
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
