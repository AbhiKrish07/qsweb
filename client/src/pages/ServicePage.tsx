import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code, Cpu, ExternalLink, Layers, Sparkles, Terminal, Zap, Shield, Rocket } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { playClick } from "@/lib/sound";

export interface ServiceDetail {
  slug: string;
  number: string;
  title: string;
  headlineItalic: string;
  headlineSuffix: string;
  tagline: string;
  lead: string;
  color: string;
  shape: string;
  metaBadge: string;
  overview: string;
  deliverables: {
    title: string;
    description: string;
    specs: string[];
    timeline: string;
  }[];
  workflow: {
    step: string;
    title: string;
    desc: string;
    deliverable: string;
  }[];
  techStack: {
    category: string;
    items: string[];
  }[];
  metrics: {
    value: string;
    label: string;
    sublabel: string;
  }[];
  featuredProduct: {
    name: string;
    slug: string;
    tag: string;
    description: string;
    image: string;
  };
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "product-strategy-design": {
    slug: "product-strategy-design",
    number: "01",
    title: "Product Strategy & Design",
    headlineItalic: "intention",
    headlineSuffix: ", designed for clarity.",
    tagline: "PRDs, UX/UI, wireframes, interaction physics, token systems & interactive Figma/React prototypes.",
    lead: "Most digital products fail because they build too much before understanding what matters. We cut through feature bloat to engineer opinionated product architecture, high-density wireframes, tactile micro-interactions, and living design token systems.",
    color: "#b4a0e5",
    shape: "/assets/img/formes/soleil.svg",
    metaBadge: "PRACTICE 01 // STRATEGY & DESIGN",
    overview: "Our Product Strategy & Design practice bridges user psychology, commercial viability, and software feasibility. We don't produce static mockups that get lost in translation; we deliver production-ready token systems, structured PRDs, and interactive prototypes that engineer momentum directly into your codebase.",
    deliverables: [
      {
        title: "Opinionated PRD & Architecture Scoping",
        description: "Concrete problem framing, feature triage, user intent topologies, and crisp technical specifications that eliminate ambiguity.",
        specs: ["Problem-Solution Mapping", "User Flow Diagrams", "Information Architecture", "Feature Phasing Matrix"],
        timeline: "Sprint Day 1 – 3",
      },
      {
        title: "High-Fidelity Interface Systems",
        description: "Bespoke desktop and mobile screen architectures designed with spatial hierarchy, mathematical grid alignment, and typographic craft.",
        specs: ["Spatial Viewport Grids", "Component Hierarchies", "Edge State Handling", "Dark & Light Colorways"],
        timeline: "Sprint Day 4 – 8",
      },
      {
        title: "Living Design Token Libraries",
        description: "Semantic color systems, fluid typography scales, elevation levels, and zero-runtime CSS tokens ready for Next.js & Tailwind.",
        specs: ["Tailwind v4 Token Config", "CSS Custom Properties", "Typography Hierarchy", "Micro-Spacers Scale"],
        timeline: "Sprint Day 7 – 10",
      },
      {
        title: "Interactive Kinetic Prototypes",
        description: "Functional React and Figma prototypes validating click sounds, gesture physics, and real user feedback loops before writing backend code.",
        specs: ["Tactile Sound Triggers", "GSAP / Framer Physics", "Keyboard Navigation (⌘K)", "Mobile Touch Ergonomics"],
        timeline: "Sprint Day 10 – 14",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Intent Discovery & Formulation",
        desc: "We analyze your audience, technical constraints, and competitive landscape to isolate the single highest-leverage value proposition.",
        deliverable: "Comprehensive Product Brief & Architectural PRD",
      },
      {
        step: "02",
        title: "Spatial Prototyping & Systems",
        desc: "We iterate on wireframes and tactile layouts, testing real interactive friction and establishing the aesthetic direction.",
        deliverable: "Interactive React / Figma High-Fidelity Prototype",
      },
      {
        step: "03",
        title: "Token Production & Engineering Handoff",
        desc: "We export living design tokens, icon sets, component states, and coordinate directly with engineering to guarantee pixel fidelity.",
        deliverable: "Living Design System & Component Library",
      },
    ],
    techStack: [
      { category: "Design & Prototyping", items: ["Figma Enterprise", "Radix UI", "GSAP", "Tailwind CSS v4", "Lucide Icons"] },
      { category: "Tokens & Front-End", items: ["CSS Variables", "PostCSS", "TypeScript", "React 19", "Web Audio API"] },
      { category: "Deliverables & Specs", items: ["Living PRD", "Component Storybook", "Figma Design System", "SVG Formes"] },
    ],
    metrics: [
      { value: "48h", label: "Initial Prototype Sprint", sublabel: "From brief to interactive test" },
      { value: "100%", label: "Token-Driven Consistency", sublabel: "Zero hardcoded hex values" },
      { value: "0%", label: "Unmotivated AI Slop", sublabel: "Bespoke, intentional interfaces" },
    ],
    featuredProduct: {
      name: "Zen AI Runtime System",
      slug: "zen-ai",
      tag: "FLAGSHIP PRODUCT",
      description: "A serene, local-first open source AI engine running on-device neural quantizations with 0.2ms latency and zero telemetry.",
      image: "/assets/quiet/craft-design-system.jpg",
    },
  },

  "software-product-engineering": {
    slug: "software-product-engineering",
    number: "02",
    title: "Software & Product Engineering",
    headlineItalic: "craftsmanship",
    headlineSuffix: ", built for high velocity.",
    tagline: "Full-stack Next.js 15, TypeScript, PostgreSQL, low-latency APIs, local-first SQLite & real-time dashboards.",
    lead: "We engineer production-grade software that scales cleanly from Day 1. Zero bloat, rigorous type safety, modular micro-architecture, and edge-first execution. From local SQLite runtimes to serverless PostgreSQL databases, our software is fast, resilient, and maintainable.",
    color: "#ff5a1f",
    shape: "/assets/img/formes/etoile-huit.svg",
    metaBadge: "PRACTICE 02 // SOFTWARE ENGINEERING",
    overview: "Software engineering at Quiet Studio rejects cumbersome enterprise baggage and slow corporate rituals. We work as dedicated, senior technical builders who write clean, strictly-typed TypeScript and modern React architectures that boot in milliseconds and withstand production scale.",
    deliverables: [
      {
        title: "Full-Stack Next.js 15 & React 19 Architecture",
        description: "Server components, server actions, optimistic UI updates, streaming SSR, and micro-animations with zero hydration mismatch.",
        specs: ["Next.js 15 App Router", "Server Component Isolation", "Optimistic State Management", "Streaming Server Render"],
        timeline: "Sprint Day 1 – 6",
      },
      {
        title: "Low-Latency API & Database Layer",
        description: "Edge endpoints, PostgreSQL schemas, Drizzle/Prisma ORMs, vector search indices, and sub-15ms response times.",
        specs: ["PostgreSQL Schema Design", "Drizzle ORM Type-Safety", "Connection Pooling", "Edge Worker Caching"],
        timeline: "Sprint Day 4 – 10",
      },
      {
        title: "Local-First & Offline Engine",
        description: "SQLite/Wasm local storage, offline queue synchronization, zero telemetry, and zero cloud vendor lock-in.",
        specs: ["Wasm SQLite Engine", "Optimistic Offline Mutations", "Background Sync Queue", "Plain-Text Export APIs"],
        timeline: "Sprint Day 8 – 14",
      },
      {
        title: "Production Infrastructure & Telemetry",
        description: "Dockerized builds, automated linting & test suites, Vercel/Railway deploys, and automated health checks.",
        specs: ["Zero-Error CI/CD Pipelines", "Containerized Builds", "Automated Playwright Tests", "Self-Healing Observability"],
        timeline: "Sprint Day 12 – 16",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Architecture Modeling & Scaffolding",
        desc: "We establish strict TypeScript contracts, database schemas, and edge API routes to guarantee end-to-end data integrity.",
        deliverable: "Type-Safe Backend Scaffolding & Database Migrations",
      },
      {
        step: "02",
        title: "Component Engineering & Integration",
        desc: "We wire UI components to live data feeds, implementing optimistic mutations, tactile feedback, and robust error boundaries.",
        deliverable: "Fully Functional Web Application & State Machine",
      },
      {
        step: "03",
        title: "Performance Audits & Deployment",
        desc: "We run rigorous Lighthouse audits, load testing, bundle tree-shaking, and deploy to worldwide edge infrastructure.",
        deliverable: "Production Bundle & Verified Live Endpoint",
      },
    ],
    techStack: [
      { category: "Frontend Framework", items: ["Next.js 15", "React 19", "TypeScript Strict", "Tailwind CSS", "Vite"] },
      { category: "Backend & Data", items: ["Node.js", "PostgreSQL", "SQLite / Wasm", "Drizzle ORM", "Redis"] },
      { category: "Cloud & Edge", items: ["Cloudflare Workers", "Vercel", "Railway", "Docker", "GitHub Actions"] },
    ],
    metrics: [
      { value: "< 0.2ms", label: "Local Query Latency", sublabel: "Instant local-first computation" },
      { value: "100%", label: "Strict Type Safety", sublabel: "Zero runtime any type bypasses" },
      { value: "0", label: "Vendor Cloud Lock-In", sublabel: "100% self-hostable open stack" },
    ],
    featuredProduct: {
      name: "LearnLoop Cognitive App",
      slug: "learnloop",
      tag: "FLAGSHIP PRODUCT",
      description: "A frictionless loop for turning curiosity into durable understanding with tight feedback loops and adaptive recall.",
      image: "/assets/quiet/craft-software-code.jpg",
    },
  },

  "applied-ai-intelligent-systems": {
    slug: "applied-ai-intelligent-systems",
    number: "03",
    title: "Applied AI & Intelligent Systems",
    headlineItalic: "reflex",
    headlineSuffix: ", not ceremony.",
    tagline: "RAG architectures, multi-agent workflows, quantized edge inference, local LLM embeddings & telemetry pipelines.",
    lead: "AI is not a magic button; it is an engineering discipline. We build reliable, deterministic agent workflows and low-latency inference pipelines. From multi-agent swarms with discrete authority gating to quantized on-device models running on Apple Silicon, we make AI practical and useful.",
    color: "#eab308",
    shape: "/assets/img/formes/trefle.svg",
    metaBadge: "PRACTICE 03 // APPLIED AI & SYSTEMS",
    overview: "We avoid fragile chatbot wrappers. Our Applied AI practice builds deterministic cognitive pipelines: multi-agent autonomous swarms, sparse tensor memory systems (SCTM) with isotropic whitening, and local-first edge models that operate offline with zero telemetry and sub-millisecond execution.",
    deliverables: [
      {
        title: "Autonomous Multi-Agent Swarms",
        description: "Specialized agent topologies with explicit roles, self-correcting validation loops, and discrete authority gating before taking real-world actions.",
        specs: ["Capability Token Validation", "Self-Healing Retries", "Deterministic Tool Schemas", "Audit Trail Telemetry"],
        timeline: "Sprint Day 1 – 6",
      },
      {
        title: "Context-Engineered RAG Pipelines",
        description: "High-density vector embeddings, hybrid BM25 lexical search, cross-encoder rerankers, and distractor-free memory stores.",
        specs: ["Hybrid Lexical & Vector Search", "Dynamic Chunk Re-ranking", "Isotropic Whitening Filters", "Semantic Context Caching"],
        timeline: "Sprint Day 5 – 10",
      },
      {
        title: "Quantized Edge Model Deployment",
        description: "Apple Silicon Metal/CoreML acceleration, GGUF/Ollama quantization, and zero-telemetry offline inference directly on user hardware.",
        specs: ["Apple Silicon Neural Engine", "GGUF Q4_K_M Quantization", "Local llama.cpp Runtimes", "Zero Cloud Reliance"],
        timeline: "Sprint Day 8 – 14",
      },
      {
        title: "Safety Guardrails & Capability Gating",
        description: "Zero-trust action gates preventing hallucinated file writes, shell execution, or sensitive data leakage in autonomous workflows.",
        specs: ["Discrete Authority Gating", "Prompt Injection Shields", "Deterministic Tool Gating", "Sub-Millisecond Verification"],
        timeline: "Sprint Day 12 – 16",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Topology Design & Tool Definition",
        desc: "We define precise tool schemas, agent capability boundaries, and evaluation metrics for your specific domain workflow.",
        deliverable: "Agent Specification & Capability Token Matrix",
      },
      {
        step: "02",
        title: "Swarm Implementation & Context Tuning",
        desc: "We build the multi-agent graph with memory stores, embedding caches, and fallback mechanisms for resilient autonomous execution.",
        deliverable: "Working Multi-Agent Pipeline & Evaluator Suite",
      },
      {
        step: "03",
        title: "Edge Optimization & Production Guardrails",
        desc: "We quantize model weights for local execution, configure telemetry sandboxes, and perform stress testing against prompt attacks.",
        deliverable: "Hardened Production AI Engine & Benchmarks",
      },
    ],
    techStack: [
      { category: "Agent Frameworks", items: ["LangGraph", "LlamaIndex", "Ollama", "llama.cpp", "HuggingFace"] },
      { category: "Models & Hardware", items: ["Claude 3.5 Sonnet", "GPT-4o", "DeepSeek-R1", "Apple Silicon CoreML", "NVIDIA TensorRT"] },
      { category: "Memory & Storage", items: ["SCTM Memory System", "ChromaDB", "pgvector", "SQLite Vector", "Redis Cache"] },
    ],
    metrics: [
      { value: "99.2%", label: "Intent Resolution", sublabel: "Rigorous evaluation benchmarks" },
      { value: "< 14ms", label: "Edge Inference Latency", sublabel: "On-device neural execution" },
      { value: "Zero", label: "Cloud Data Telemetry", sublabel: "Private local-first data integrity" },
    ],
    featuredProduct: {
      name: "Aethel Intent & Memory Lab",
      slug: "aethel",
      tag: "RESEARCH SYSTEM",
      description: "Context-engineered multi-agent pipelines generating production-ready creative variations and ad assets with strict brand guardrails.",
      image: "/assets/quiet/craft-ai-agents.jpg",
    },
  },

  "brand-experience-launch": {
    slug: "brand-experience-launch",
    number: "04",
    title: "Brand, Experience & Launch",
    headlineItalic: "enduring",
    headlineSuffix: ", designed to cut through noise.",
    tagline: "Product positioning, kinetic design systems, studio narrative, high-conversion landing sites & launch collateral.",
    lead: "Great software deserves an undeniable identity. We craft distinctive brand systems that combine typographical mastery, spatial physicality, and sharp product narratives. We eliminate generic corporate templates in favor of memorable, tactile digital experiences.",
    color: "#22c55e",
    shape: "/assets/img/formes/fleur.svg",
    metaBadge: "PRACTICE 04 // BRAND & LAUNCH",
    overview: "In a world flooded with generic AI-generated marketing slop, genuine craftsmanship stands out. We build complete visual identities for products and ambitious founders: bespoke logotypes, living design token systems, narrative-driven product copy, and high-performance launch sites.",
    deliverables: [
      {
        title: "Comprehensive Brand Identity System",
        description: "Bespoke wordmarks, geometric symbolisms, responsive logotypes, typographic pairings, and living color guidelines.",
        specs: ["Primary & Secondary Logomarks", "Typography Hierarchy (Grotesque + Serif)", "Palette & Living Token Specs", "Asset Export Bundles (SVG / PNG / WebP)"],
        timeline: "Sprint Day 1 – 5",
      },
      {
        title: "Product Positioning & Manifesto Copywriting",
        description: "Clear value propositions, manifesto copywriting, landing page narratives, and crisp feature descriptions that cut through corporate jargon.",
        specs: ["Commercial Positioning Matrix", "Studio Manifesto & Voice", "Landing Page Headline Systems", "Technical Micro-Copy"],
        timeline: "Sprint Day 4 – 8",
      },
      {
        title: "High-Craft Launch Website & Showcases",
        description: "Award-level marketing sites built with Lenis smooth momentum scrolling, WebGL shaders, tactile audio feedback, and kinetic typography.",
        specs: ["100/100 Lighthouse Performance", "Lenis Momentum Physics", "WebGL Background Shaders", "Tactile Audio Clicks"],
        timeline: "Sprint Day 8 – 14",
      },
      {
        title: "Worldwide Launch Collateral & Media Kits",
        description: "Open Graph cards, Twitter / LinkedIn banner kits, Product Hunt launch collateral, investor pitch decks, and video showreels.",
        specs: ["Automated Dynamic OG Images", "Social Launch Asset Grid", "High-Resolution Keynotes", "Brand Guidelines PDF"],
        timeline: "Sprint Day 12 – 16",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Positioning & Studio Narrative",
        desc: "We define your core competitive advantage, audience persona, and sharp technical point of view.",
        deliverable: "Positioning Playbook & Core Brand Manifesto",
      },
      {
        step: "02",
        title: "Visual System & Living Design Tokens",
        desc: "We construct the visual identity, typography system, custom forms, and token libraries across dark and light modes.",
        deliverable: "Complete Brand Identity Deck & Design Token Package",
      },
      {
        step: "03",
        title: "Site Engineering & Launch Deployment",
        desc: "We develop the interactive marketing experience, optimize for mobile performance, and ship to production worldwide.",
        deliverable: "Live High-Performance Launch Website & Media Kit",
      },
    ],
    techStack: [
      { category: "Visual Systems", items: ["Figma Enterprise", "Adobe Illustrator", "Spline 3D", "After Effects", "KaTeX"] },
      { category: "Web Engineering", items: ["Next.js 15", "Vite", "Lenis Momentum Scroll", "Web Audio API", "OGL WebGL"] },
      { category: "Launch & SEO", items: ["Dynamic OpenGraph", "Schema.org Metadata", "Lighthouse 100", "Vercel Edge CDN"] },
    ],
    metrics: [
      { value: "100/100", label: "Lighthouse Performance", sublabel: "Instant loading with zero layout shift" },
      { value: "48h", label: "Rapid Brand Sprint", sublabel: "From positioning to live assets" },
      { value: "100%", label: "Client IP Ownership", sublabel: "All code and brand assets belong to you" },
    ],
    featuredProduct: {
      name: "Capture Desktop Companion",
      slug: "capture",
      tag: "FLAGSHIP PRODUCT",
      description: "Ambient screen context and intent capture built for macOS creative directors and software engineers who build fast.",
      image: "/assets/quiet/craft-brand-system.jpg",
    },
  },
};

// Route slug normalization mapping
export const SLUG_ALIASES: Record<string, string> = {
  "product-strategy": "product-strategy-design",
  "product-design": "product-strategy-design",
  "strategy": "product-strategy-design",
  "software-engineering": "software-product-engineering",
  "software": "software-product-engineering",
  "engineering": "software-product-engineering",
  "applied-ai": "applied-ai-intelligent-systems",
  "ai": "applied-ai-intelligent-systems",
  "intelligent-systems": "applied-ai-intelligent-systems",
  "brand-launch": "brand-experience-launch",
  "brand": "brand-experience-launch",
  "launch": "brand-experience-launch",
};

export default function ServicePage({ onOpenContact }: { onOpenContact?: () => void }) {
  const [, params] = useRoute("/services/:slug");
  const rawSlug = params?.slug || "product-strategy-design";
  const normalizedSlug = SLUG_ALIASES[rawSlug] || rawSlug;
  const service = SERVICES_DATA[normalizedSlug] || SERVICES_DATA["product-strategy-design"];

  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const handleContactClick = () => {
    playClick();
    if (onOpenContact) {
      onOpenContact();
    } else {
      window.location.href = "mailto:hello@thequietstudio.space";
    }
  };

  const otherServices = Object.values(SERVICES_DATA).filter(
    (s) => s.slug !== service.slug
  );

  return (
    <div className="service-page-container" style={{ background: "#111110", color: "#f4f1ea", minHeight: "100vh", paddingBottom: "100px" }}>
      {/* Top Breadcrumb & Studio Header */}
      <div className="wrap" style={{ maxWidth: "1180px", margin: "0 auto", padding: "130px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", font: "600 11px/1 'DM Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <Link href="/" className="hover:text-orange-500 transition-colors" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }} onClick={() => playClick()}>
              Quiet Studio
            </Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>
            <Link href="/#expertises" className="hover:text-orange-500 transition-colors" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }} onClick={() => playClick()}>
              Practices
            </Link>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>/</span>
            <span style={{ color: "#ff5a1f" }}>{service.number}</span>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "9999px", background: "rgba(255,90,31,0.12)", border: "1px solid rgba(255,90,31,0.25)", color: "#ff5a1f", font: "700 10.5px/1 'DM Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff5a1f", display: "inline-block" }}></span>
            <span>{service.metaBadge}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ padding: "50px 0 60px" }}>
          <h1 style={{ font: "800 clamp(2.8rem, 5.8vw, 5.2rem)/1.04 'Cabinet Grotesk', -apple-system, sans-serif", letterSpacing: "-0.035em", color: "#ffffff", maxWidth: "980px", margin: "0 0 28px" }}>
            Conceived with <span style={{ fontFamily: "'Baila', Georgia, serif", fontStyle: "italic", color: "#ff5a1f" }}>{service.headlineItalic}</span>{service.headlineSuffix}
          </h1>

          <p style={{ font: "500 clamp(1.15rem, 1.8vw, 1.4rem)/1.6 'DM Sans', sans-serif", color: "rgba(255,255,255,0.78)", maxWidth: "820px", margin: "0 0 40px" }}>
            {service.lead}
          </p>

          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <button
              type="button"
              className="primary-button"
              onClick={handleContactClick}
              style={{ padding: "14px 28px", fontSize: "12px" }}
            >
              <span>Book Practice Sprint</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="#deliverables"
              className="outline-button"
              onClick={() => playClick()}
              style={{ padding: "13px 24px", fontSize: "12px", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", textDecoration: "none" }}
            >
              <span>View Deliverables &amp; Specs</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </div>

        {/* Key Practice Performance Metrics Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "70px" }}>
          {service.metrics.map((m, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <span style={{ font: "800 clamp(2.2rem, 3.4vw, 3rem)/1 'Cabinet Grotesk', sans-serif", color: "#ff5a1f", letterSpacing: "-0.03em" }}>
                {m.value}
              </span>
              <span style={{ font: "700 15px 'Cabinet Grotesk', sans-serif", color: "#ffffff" }}>
                {m.label}
              </span>
              <span style={{ font: "500 12.5px/1.4 'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)" }}>
                {m.sublabel}
              </span>
            </div>
          ))}
        </div>

        {/* Practice Overview Narrative */}
        <div style={{ background: "#171615", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "28px", padding: "clamp(32px, 5vw, 56px)", marginBottom: "80px" }}>
          <span style={{ font: "700 11px/1 'DM Mono', monospace", letterSpacing: "0.1em", color: "#ff5a1f", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
            PRACTICE ARCHITECTURE &amp; METHODOLOGY
          </span>
          <h2 style={{ font: "800 clamp(1.8rem, 3.2vw, 2.6rem)/1.2 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.02em", maxWidth: "780px", margin: "0 0 20px" }}>
            {service.title}
          </h2>
          <p style={{ font: "400 clamp(1rem, 1.4vw, 1.15rem)/1.7 'DM Sans', sans-serif", color: "rgba(255,255,255,0.72)", maxWidth: "860px", margin: 0 }}>
            {service.overview}
          </p>
        </div>

        {/* Deliverables Grid */}
        <div id="deliverables" style={{ marginBottom: "90px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "36px" }}>
            <div>
              <span style={{ font: "700 11px/1 'DM Mono', monospace", letterSpacing: "0.08em", color: "#ff5a1f", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                CORE DELIVERABLES
              </span>
              <h2 style={{ font: "800 clamp(2rem, 3.6vw, 3rem)/1.1 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.025em", margin: 0 }}>
                What we ship in a sprint
              </h2>
            </div>
            <p style={{ font: "500 13.5px 'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", maxWidth: "420px", margin: 0 }}>
              Fixed scope. Concrete artifacts. Complete client IP ownership with zero vendor lock-in.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {service.deliverables.map((item, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "36px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <span style={{ font: "700 12px 'DM Mono', monospace", color: "#ff5a1f", padding: "4px 10px", borderRadius: "9999px", background: "rgba(255,90,31,0.12)", border: "1px solid rgba(255,90,31,0.25)" }}>
                      {item.timeline}
                    </span>
                    <span style={{ font: "700 12px 'DM Mono', monospace", color: "rgba(255,255,255,0.3)" }}>
                      DELIVERABLE 0{idx + 1}
                    </span>
                  </div>

                  <h3 style={{ font: "800 22px/1.25 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.015em", margin: "0 0 14px" }}>
                    {item.title}
                  </h3>

                  <p style={{ font: "400 14px/1.65 'DM Sans', sans-serif", color: "rgba(255,255,255,0.68)", margin: "0 0 24px" }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                  <span style={{ font: "600 10.5px 'DM Mono', monospace", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                    INCLUDED SPECIFICATIONS
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} style={{ display: "flex", alignItems: "center", gap: "8px", font: "500 12.5px 'DM Sans', sans-serif", color: "rgba(255,255,255,0.85)" }}>
                        <Check size={13} style={{ color: "#ff5a1f", flexShrink: 0 }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Step Sprint Workflow */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "28px", padding: "clamp(36px, 5vw, 60px)", marginBottom: "90px" }}>
          <div style={{ marginBottom: "40px" }}>
            <span style={{ font: "700 11px/1 'DM Mono', monospace", letterSpacing: "0.08em", color: "#ff5a1f", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
              SPRINT LIFECYCLE
            </span>
            <h2 style={{ font: "800 clamp(2rem, 3.4vw, 2.8rem)/1.15 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.025em", margin: 0 }}>
              How we work together
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {service.workflow.map((w, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  <span style={{ font: "800 28px/1 'Cabinet Grotesk', sans-serif", color: "#ff5a1f" }}>
                    {w.step}
                  </span>
                  <span style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.15)" }}></span>
                </div>
                <h3 style={{ font: "800 20px/1.2 'Cabinet Grotesk', sans-serif", color: "#ffffff", margin: 0 }}>
                  {w.title}
                </h3>
                <p style={{ font: "400 14px/1.65 'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)", margin: 0 }}>
                  {w.desc}
                </p>
                <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px dashed rgba(255,255,255,0.08)", font: "600 11px 'DM Mono', monospace", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                  <span>OUTPUT: {w.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack & Tooling Capabilities */}
        <div style={{ marginBottom: "90px" }}>
          <div style={{ marginBottom: "32px" }}>
            <span style={{ font: "700 11px/1 'DM Mono', monospace", letterSpacing: "0.08em", color: "#ff5a1f", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
              DISCIPLINE CAPABILITIES
            </span>
            <h2 style={{ font: "800 clamp(2rem, 3.4vw, 2.8rem)/1.15 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.025em", margin: 0 }}>
              Tooling &amp; Technology Stack
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {service.techStack.map((stack, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px" }}>
                <h3 style={{ font: "700 15px 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.01em", margin: "0 0 16px" }}>
                  {stack.category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {stack.items.map((t, tIdx) => (
                    <span key={tIdx} style={{ padding: "6px 12px", borderRadius: "9999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", font: "600 12px 'DM Mono', monospace", color: "rgba(255,255,255,0.85)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Living Product Proof */}
        <div style={{ background: "#141413", border: "1px solid rgba(255,90,31,0.3)", borderRadius: "28px", padding: "clamp(32px, 4.5vw, 52px)", marginBottom: "90px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", font: "700 11px/1 'DM Mono', monospace", color: "#ff5a1f", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px" }}>
              <Sparkles size={13} />
              <span>{service.featuredProduct.tag}</span>
            </div>
            <h2 style={{ font: "800 clamp(2rem, 3.6vw, 3rem)/1.1 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              {service.featuredProduct.name}
            </h2>
            <p style={{ font: "400 15px/1.65 'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", margin: "0 0 28px" }}>
              {service.featuredProduct.description}
            </p>
            <Link
              href={`/products/${service.featuredProduct.slug}`}
              className="primary-button"
              onClick={() => playClick()}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
            >
              <span>Explore Interactive Product</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", aspectRatio: "16/10", background: "#000000" }}>
            <img
              src={service.featuredProduct.image}
              alt={service.featuredProduct.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Explore Other Practices Navigation */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "60px", marginBottom: "70px" }}>
          <div style={{ marginBottom: "32px" }}>
            <span style={{ font: "700 11px/1 'DM Mono', monospace", letterSpacing: "0.08em", color: "#ff5a1f", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
              STUDIO CAPABILITIES
            </span>
            <h3 style={{ font: "800 clamp(1.8rem, 2.8vw, 2.4rem)/1.2 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.02em", margin: 0 }}>
              Explore other studio practices
            </h3>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                onClick={() => {
                  playClick();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:border-orange-500 transition-colors"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "26px", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ font: "700 12px 'DM Mono', monospace", color: "#ff5a1f" }}>
                      PRACTICE {other.number}
                    </span>
                    <ArrowUpRight size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
                  </div>
                  <h4 style={{ font: "800 18px/1.25 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.01em", margin: "0 0 10px" }}>
                    {other.title}
                  </h4>
                  <p style={{ font: "400 13px/1.55 'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", margin: 0 }}>
                    {other.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Closing Action Footer Card */}
        <div style={{ background: "linear-gradient(135deg, rgba(255,90,31,0.15) 0%, rgba(20,20,19,0.95) 100%)", border: "1px solid rgba(255,90,31,0.35)", borderRadius: "32px", padding: "clamp(40px, 6vw, 70px) 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <span style={{ font: "700 11.5px/1 'DM Mono', monospace", letterSpacing: "0.08em", color: "#ff5a1f", textTransform: "uppercase", display: "inline-block", marginBottom: "16px" }}>
            READY TO SHIP MEANINGFUL SOFTWARE?
          </span>
          <h2 style={{ font: "800 clamp(2.4rem, 4.8vw, 4.2rem)/1.1 'Cabinet Grotesk', sans-serif", color: "#ffffff", letterSpacing: "-0.03em", maxWidth: "700px", margin: "0 auto 20px" }}>
            Let’s start your {service.title} sprint.
          </h2>
          <p style={{ font: "500 15px/1.6 'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", maxWidth: "560px", margin: "0 auto 36px" }}>
            Fixed-scope 48-hour to 2-week sprints. Zero agency bloat. Response within 24 hours.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <button
              type="button"
              className="primary-button"
              onClick={handleContactClick}
              style={{ padding: "14px 32px", fontSize: "12.5px" }}
            >
              <span>Start Conversation</span>
              <ArrowRight size={14} />
            </button>
            <Link
              href="/"
              className="outline-button"
              onClick={() => playClick()}
              style={{ padding: "13px 26px", fontSize: "12.5px", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", textDecoration: "none" }}
            >
              <span>Back to Studio Overview</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2V14M8 14L3 9M8 14L13 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
