import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code,
  Command,
  Cpu,
  ExternalLink,
  Eye,
  FileCode,
  FileText,
  Github,
  Globe,
  Layers,
  LayoutGrid,
  LoaderCircle,
  Mail,
  MoveUpRight,
  Palette,
  PenTool,
  Search,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { playClick } from "@/lib/sound";
import QuietStudioLab3D from "@/components/QuietStudioLab3D";
import FluxLines from "@/components/FluxLines";
import ElectricLogo from "@/components/ElectricLogo";
import Strands from "@/components/Strands";
import HalftoneReveal from "@/components/HalftoneReveal";
import TextLoop from "@/components/TextLoop";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* =========================================================================
   CASE STUDIES / SELECTED WORK DATA (SECTION 05)
   ========================================================================= */
interface CaseStudy {
  id: string;
  name: string;
  label: "CONCEPT CASE STUDY" | "CLIENT ENGAGEMENT";
  category: "branding" | "design" | "writing";
  industry: string;
  services: string[];
  description: string;
  metrics?: string;
  imageBg: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "hotel-buci",
    name: "Hôtel Buci Paris",
    label: "CONCEPT CASE STUDY",
    category: "branding",
    industry: "Hospitality & Luxury",
    services: ["Brand Identity", "Typography", "Foil Stationery", "Packaging"],
    description:
      "A refined, tactile visual identity celebrating Parisian heritage with warm paper tones, custom grotesque typography, and foil-stamped collateral.",
    metrics: "Identity System · 14 Touchpoints",
    imageBg: "radial-gradient(circle at 50% 50%, rgba(255, 90, 31, 0.15) 0%, rgba(20, 20, 19, 0.95) 100%)",
  },
  {
    id: "stylin-pitch",
    name: "Stylin Pitch System",
    label: "CLIENT ENGAGEMENT",
    category: "design",
    industry: "Developer Tools & SaaS",
    services: ["Presentation Design", "18-Slide Pitch Deck", "Data Graphics"],
    description:
      "Series-A investor pitch deck system and interactive presentation slides built for technical narrative clarity, visual momentum, and venture storytelling.",
    metrics: "$4.2M Seed Raised",
    imageBg: "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)",
  },
  {
    id: "darling-publication",
    name: "Darling Magazine",
    label: "CONCEPT CASE STUDY",
    category: "writing",
    industry: "Media & Publishing",
    services: ["Editorial Design", "Brand Voice Playbook", "Website Copy"],
    description:
      "Typographic publication layout and brand voice guidelines celebrating thoughtful longform discourse and quiet editorial pacing.",
    metrics: "Voice Guide · 8 Editorial Templates",
    imageBg: "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.15) 0%, rgba(28, 25, 23, 0.95) 100%)",
  },
  {
    id: "ideapeel-revamp",
    name: "Ideapeel Studio",
    label: "CLIENT ENGAGEMENT",
    category: "branding",
    industry: "Creative Technology",
    services: ["Brand Identity", "Digital Assets", "System Guidelines", "Icons"],
    description:
      "Comprehensive studio brand overhaul translating complex technical infrastructure into an intuitive visual language and modular design system.",
    metrics: "Complete Brand Revamp",
    imageBg: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(24, 24, 27, 0.95) 100%)",
  },
  {
    id: "reed-words",
    name: "Reed Words",
    label: "CONCEPT CASE STUDY",
    category: "writing",
    industry: "Consumer Software",
    services: ["Website Copywriting", "Landing Pages", "Strategic Messaging"],
    description:
      "Clear, resonant brand messaging and website copy that eliminates generic tech buzzwords in favor of honest, human-centered tone.",
    metrics: "Full Web Copy · 3 Landing Pages",
    imageBg: "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 0%, rgba(20, 24, 20, 0.95) 100%)",
  },
  {
    id: "bricks-design",
    name: "Bricks Architecture",
    label: "CONCEPT CASE STUDY",
    category: "design",
    industry: "Architecture & Space",
    services: ["Visual Language", "Print Collateral", "Digital Portfolio"],
    description:
      "Geometric identity and tactile collateral extending across digital surfaces and sustainable print materials with modular precision.",
    metrics: "Modular Collateral System",
    imageBg: "radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.15) 0%, rgba(24, 20, 22, 0.95) 100%)",
  },
];

/* =========================================================================
   FAQ QUESTIONS & ANSWERS (SECTION 10)
   ========================================================================= */
const FAQ_ITEMS = [
  {
    q: "What services does Quiet Studio offer?",
    a: "We specialize in three core creative disciplines: Branding & Identity (brand strategy, naming, logos, color and typography systems, guidelines), Design (graphics, presentation and pitch decks, brochures, social suites, editorial layouts, packaging), and Writing (website copywriting, landing pages, brand messaging, newsletters, business writing, editing and proofreading). We also offer ongoing monthly creative partnerships.",
  },
  {
    q: "How does the AI-assisted process work?",
    a: "Quiet Studio uses AI to accelerate research, explore variations, build initial drafts, and handle repetitive asset scaling. This removes production overhead and lowers turnaround time while preserving original creative depth.",
  },
  {
    q: "Do humans review the deliverables?",
    a: "Always. Every deliverable is directed, curated, edited, and approved by human creative leads before you ever see it. We treat AI as a fast production engine, never as an unmonitored autopilot.",
  },
  {
    q: "Can you work with an existing brand?",
    a: "Yes. We can adopt your existing brand guidelines, color palettes, fonts, and assets, ensuring all new design and copy seamlessly matches your current look and tone.",
  },
  {
    q: "Can I request both design and writing?",
    a: "Absolutely. In fact, combining design and writing is our sweet spot—ensuring the visual layout and the words work together harmoniously rather than feeling disconnected.",
  },
  {
    q: "How do revisions work?",
    a: "All projects include clear revision rounds. You can leave precise contextual feedback, and we refine the deliverables until you are completely satisfied and approve the final files.",
  },
  {
    q: "Do you offer monthly packages?",
    a: "Yes. Our Creative Partnership packages provide dedicated monthly capacity across branding, design, and writing for growing teams that need regular creative output without agency retainer bloat.",
  },
  {
    q: "How do I start a project?",
    a: "Click 'Start a project', fill out our project brief with your goals, timeline, and reference links, and we’ll review your details and send a proposal within 24 to 48 hours.",
  },
  {
    q: "Can I work with Quiet Studio internationally?",
    a: "Yes. Quiet Studio operates globally with clients across North America, Europe, Asia, and worldwide, working asynchronously and collaboratively across timezones.",
  },
];

/* =========================================================================
   WAITLIST / INTAKE QUICK FORM COMPONENT
   ========================================================================= */
function StudioQuickForm() {
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Branding & Identity");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Please enter a valid work email.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Thank you. We'll be in touch with a project proposal.");
      setEmail("");
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="waitlist-form" style={{ maxWidth: "480px", margin: "0 auto" }}>
      <input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? <LoaderCircle size={14} className="spin" /> : "Start a project →"}
      </button>
    </form>
  );
}

/* =========================================================================
   MAIN HOMEPAGE COMPONENT (SECTION 16 BUILD ORDER)
   ========================================================================= */
export default function Home({
  mode = "human",
  onModeChange,
}: {
  mode?: "human" | "agent";
  onModeChange?: (mode: "human" | "agent") => void;
}) {
  const homeRef = useRef<HTMLDivElement>(null);
  const [workFilter, setWorkFilter] = useState<"all" | "branding" | "design" | "writing">("all");
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  const openProjectModal = () => {
    playClick();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  const openClientPortal = () => {
    playClick();
    window.dispatchEvent(new CustomEvent("open-client-portal"));
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const filteredWork = useMemo(() => {
    if (workFilter === "all") return CASE_STUDIES;
    return CASE_STUDIES.filter((c) => c.category === workFilter);
  }, [workFilter]);

  return (
    <div className="home-page" ref={homeRef}>
      {mode === "human" ? (
        /* =========================================================================
           QUIET STUDIO — COMPLETE CREATIVE STUDIO HOMEPAGE (SECTIONS 01-16)
           ========================================================================= */
        <>
          {/* =====================================================================
              SECTION 02 — HERO
              ===================================================================== */}
          <section className="human-spatial-canvas" id="overview">
            {/* Interactive FluxLines Background */}
            <div className="hero-flux-backdrop" aria-hidden="true">
              <FluxLines
                colors={
                  isDark
                    ? ["#ff5a1f", "#ff844b", "#ffffff", "#fb923c"]
                    : ["#ff5a1f", "#3f3f46", "#ea580c", "#71717a"]
                }
                dpr={1}
                glow={2}
                rimWidth={0.2}
                lineWidth={1}
                speed={0.45}
                scale={1.5}
                turbulence={0.9}
                fluidity={0.12}
                flowDirection="down"
                mouseInteraction
                clickSwirl
                lightMode={!isDark}
                transparent
                opacity={isDark ? 0.9 : 0.65}
              />
            </div>

            {/* Top-Left Floating Post-It Sticky Note */}
            <div className="floating-widget-note" aria-hidden="true">
              <div className="pin-dot" />
              <p>
                The best technology doesn’t ask to be noticed. Powered by AI. Refined by people.
              </p>
            </div>

            {/* Mid-Left Floating Widget: Interactive Strands Glass Orb */}
            <div className="floating-widget-strands" aria-label="Interactive Strands Glass Orb" title="Interactive Art Direction Orb">
              <Strands
                colors={["#ff5a1f", "#ff7849", "#ffa07a", "#fff4ed", "#38bdf8", "#2563eb", "#1d4ed8"]}
                glass={true}
                glassSize={1.05}
                energy={0.7}
                maxDevicePixelRatio={1}
                interactive
                clickPulse
                lightMode={!isDark}
              />
            </div>

            {/* Top-Right Floating Widget: Interactive Electric Studio Engine */}
            <div className="floating-widget-electric" aria-label="Quiet Studio Production Engine">
              <div className="electric-widget-header">
                <div className="electric-widget-title">
                  <span className="electric-live-dot" />
                  <span>Studio Engine</span>
                </div>
                <span className="electric-tag-pill">AI + HUMAN</span>
              </div>
              <div className="electric-logo-canvas-wrap">
                <ElectricLogo
                  color={isDark ? "#ffffff" : "#ff5a1f"}
                  glowColor={isDark ? "#ff5a1f" : "#ff7849"}
                  scale={0.75}
                  strands={4}
                  bend={0.6}
                  crackle={1.5}
                  arcs={1}
                  speed={2.2}
                  interactive
                  theme={isDark ? "dark" : "light"}
                />
              </div>
            </div>

            {/* Center Hero Content */}
            <div className="human-hero-brand-badge">
              <span className="brand-dot" />
            </div>

            <h1 className="human-hero-headline-prioritize">
              Creative work,
              <span className="headline-light-line">without the usual overhead.</span>
            </h1>

            <p className="human-hero-sub-prioritize">
              We build brands, design experiences and create words that help businesses communicate better.
            </p>

            {/* Disciplines Tagline */}
            <div
              style={{
                font: "600 12px 'DM Mono', monospace",
                color: "var(--orange)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                margin: "4px 0 16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>Branding</span>
              <span>·</span>
              <span>Design</span>
              <span>·</span>
              <span>Writing</span>
            </div>

            {/* Hero CTAs */}
            <div className="human-hero-cta-group">
              <button
                type="button"
                className="human-hero-cta-btn"
                onClick={openProjectModal}
              >
                <span>Start a project</span>
                <ArrowRight size={14} />
              </button>
              <a
                href="#work"
                className="human-hero-secondary-btn"
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Explore our work</span>
                <ArrowDownRight size={13} />
              </a>
              {onModeChange && (
                <button
                  type="button"
                  className="human-hero-secondary-btn"
                  onClick={() => {
                    playClick();
                    onModeChange("agent");
                  }}
                  title="Switch to AI Laboratory"
                >
                  <Sparkles size={13} />
                  <span>AI Lab ↗</span>
                </button>
              )}
            </div>

            {/* Bottom-Left Floating Widget: Interactive HalftoneReveal */}
            <div className="floating-widget-halftone" aria-label="Disciplined Craft">
              <div className="halftone-widget-header">
                <div className="halftone-widget-title">
                  <span className="halftone-indicator-dot" />
                  <span>Craft Standard</span>
                </div>
                <span className="halftone-tag-pill">HONEST CRAFT</span>
              </div>
              <div className="halftone-canvas-wrap">
                <HalftoneReveal
                  src="https://images.unsplash.com/photo-1693250707557-a846a014b321?q=80&w=1400&auto=format&fit=crop"
                  mode="mono"
                  shape="ellipse"
                  cellSize={7}
                  angle={60}
                  inkColor={isDark ? "#f4f1ea" : "#141413"}
                  paperColor={isDark ? "#120f17" : "#faf9f5"}
                  revealRadius={140}
                  roughness={0.7}
                  clickBurst
                />
              </div>
            </div>

            {/* Bottom-Right Floating Context Stack */}
            <div className="floating-widget-sync" aria-hidden="true">
              <div className="sync-header">Persistent Brand Context</div>
              <div className="sync-icon-row">
                <div className="sync-app-box" title="Brand Strategy">
                  <Palette size={18} />
                </div>
                <div className="sync-app-box" title="Design Systems">
                  <LayoutGrid size={18} />
                </div>
                <div className="sync-app-box" title="Editorial Voice">
                  <PenTool size={18} />
                </div>
              </div>
            </div>
          </section>

          {/* Seamless Overlapping Ribbon: Interactive TextLoop */}
          <div className="hero-textloop-bridge" aria-label="Quiet Studio Ribbon">
            <TextLoop
              text="Quiet Studio ✦ Branding ✦ Design ✦ Writing ✦ Creative Partnerships"
              shape="line"
              speed={110}
              direction="forward"
              separator="✦"
              curviness={90}
              tilt={0}
              fontSize={38}
              fontWeight={800}
              letterSpacing={1}
              uppercase
              ribbon
              ribbonColor="#ff5a36"
              ribbonWidth={74}
              edgeFade={0}
              cross
              crossAngle={14}
              draggable
              scrollBoost={0}
              outline={false}
              pauseOnHover
              color="#120f17"
              crossColor={isDark ? "#222220" : "#000000"}
            />
          </div>

          {/* =====================================================================
              SECTION 03 — THREE CORE SERVICE CARDS (TRUST / WHAT WE DO)
              ===================================================================== */}
          <section
            className="products-section"
            id="services"
            style={{ padding: "7vw 9.2vw", background: "var(--background)" }}
          >
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 01 — WHAT WE DO ]
                </div>
                <h2>
                  Everything your brand
                  <br />
                  <em>needs to communicate well.</em>
                </h2>
                <p className="section-description" style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "520px" }}>
                  From building an identity from scratch to producing everyday creative assets, we bring branding, design and writing together under one roof.
                </p>
              </div>
              <button
                type="button"
                className="outline-button"
                onClick={openProjectModal}
              >
                Find the right service <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="partnership-pricing-grid" style={{ marginTop: "4vw" }}>
              {/* Service 1: Branding */}
              <div className="partnership-plan-card featured-plan">
                <div className="plan-head-row">
                  <span className="status status-orange">DISCIPLINE 01</span>
                  <span style={{ font: "600 11px 'DM Mono', monospace", color: "var(--orange)" }}>IDENTITY</span>
                </div>
                <h3 className="plan-name">Branding &amp; Identity</h3>
                <p style={{ fontSize: "14px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Build a distinctive identity. Strategy, visual language, and persistent brand context that sets you apart.
                </p>
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
                  <div style={{ font: "600 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Core Deliverables
                  </div>
                  <ul className="plan-deliverables-list">
                    <li><span className="tech-pillar-bullet">✦</span> Brand discovery &amp; positioning</li>
                    <li><span className="tech-pillar-bullet">✦</span> Naming and messaging playbook</li>
                    <li><span className="tech-pillar-bullet">✦</span> Logo design &amp; vector suite</li>
                    <li><span className="tech-pillar-bullet">✦</span> Color systems &amp; typography rules</li>
                    <li><span className="tech-pillar-bullet">✦</span> Brand guidelines &amp; stationery</li>
                    <li><span className="tech-pillar-bullet">✦</span> Digital applications &amp; social kit</li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="primary-button"
                  style={{ marginTop: "auto", justifyContent: "center" }}
                  onClick={openProjectModal}
                >
                  Start a branding project <ArrowRight size={13} />
                </button>
              </div>

              {/* Service 2: Design */}
              <div className="partnership-plan-card">
                <div className="plan-head-row">
                  <span className="status status-cream">DISCIPLINE 02</span>
                  <span style={{ font: "600 11px 'DM Mono', monospace", color: "var(--muted-ink)" }}>VISUAL</span>
                </div>
                <h3 className="plan-name">Design Studio</h3>
                <p style={{ fontSize: "14px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Turn ideas into visual experiences. High-craft graphics, presentations, brochures, and digital collateral.
                </p>
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
                  <div style={{ font: "600 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Core Deliverables
                  </div>
                  <ul className="plan-deliverables-list">
                    <li><span className="tech-pillar-bullet">✦</span> Presentation design &amp; pitch decks</li>
                    <li><span className="tech-pillar-bullet">✦</span> Marketing graphics &amp; campaigns</li>
                    <li><span className="tech-pillar-bullet">✦</span> Social media visual suites</li>
                    <li><span className="tech-pillar-bullet">✦</span> Brochures &amp; editorial design</li>
                    <li><span className="tech-pillar-bullet">✦</span> Infographics &amp; technical diagrams</li>
                    <li><span className="tech-pillar-bullet">✦</span> Packaging &amp; business collateral</li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="outline-button"
                  style={{ marginTop: "auto", justifyContent: "center" }}
                  onClick={openProjectModal}
                >
                  Start a design project <ArrowRight size={13} />
                </button>
              </div>

              {/* Service 3: Writing */}
              <div className="partnership-plan-card">
                <div className="plan-head-row">
                  <span className="status status-cream">DISCIPLINE 03</span>
                  <span style={{ font: "600 11px 'DM Mono', monospace", color: "var(--muted-ink)" }}>VOICE</span>
                </div>
                <h3 className="plan-name">Writing Studio</h3>
                <p style={{ fontSize: "14px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Find the right words for your brand. Websites, newsletters, business copy, and founder manifestos without AI fluff.
                </p>
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
                  <div style={{ font: "600 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Core Deliverables
                  </div>
                  <ul className="plan-deliverables-list">
                    <li><span className="tech-pillar-bullet">✦</span> Website &amp; landing page copy</li>
                    <li><span className="tech-pillar-bullet">✦</span> Brand messaging &amp; manifestos</li>
                    <li><span className="tech-pillar-bullet">✦</span> LinkedIn content &amp; founder voice</li>
                    <li><span className="tech-pillar-bullet">✦</span> Email newsletters &amp; campaigns</li>
                    <li><span className="tech-pillar-bullet">✦</span> Case studies &amp; product copy</li>
                    <li><span className="tech-pillar-bullet">✦</span> Editing, tone check &amp; proofreading</li>
                  </ul>
                </div>
                <button
                  type="button"
                  className="outline-button"
                  style={{ marginTop: "auto", justifyContent: "center" }}
                  onClick={openProjectModal}
                >
                  Start a writing project <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================================
              SECTION 04 — WHY QUIET STUDIO (THE OPERATING MODEL DIFFERENCE)
              ===================================================================== */}
          <section
            className="notes-section"
            id="difference"
            style={{ padding: "7vw 9.2vw", background: "var(--card)", borderTop: "1px solid var(--line)" }}
          >
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 02 — WHY QUIET STUDIO ]
                </div>
                <h2>
                  A creative studio
                  <br />
                  <em>built differently.</em>
                </h2>
                <p className="section-description" style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "540px" }}>
                  We combine human creativity with intelligent tools to help businesses build their identities and communicate more effectively.
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="status status-orange">TRADITIONAL VS QUIET STUDIO</span>
              </div>
            </div>

            <div className="comparison-table-wrap" style={{ marginTop: "4vw" }}>
              <div className="comparison-row head">
                <span>Operational Dimension</span>
                <span>Traditional Workflow</span>
                <span>Quiet Studio</span>
              </div>

              <div className="comparison-row">
                <span className="comp-label">Brand Onboarding</span>
                <span style={{ color: "var(--muted-ink)" }}>Repeated onboarding and fragmented context for every new task</span>
                <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Persistent brand context and stored knowledge rules</span>
              </div>

              <div className="comparison-row">
                <span className="comp-label">Drafting Phase</span>
                <span style={{ color: "var(--muted-ink)" }}>Slow, manual first drafts with multi-week waiting periods</span>
                <span style={{ fontWeight: 600, color: "var(--foreground)" }}>AI-assisted rapid production with wide initial exploration</span>
              </div>

              <div className="comparison-row">
                <span className="comp-label">Revision Cycles</span>
                <span style={{ color: "var(--muted-ink)" }}>Disconnected email threads and lost feedback notes</span>
                <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Centralized review and approval workspace</span>
              </div>

              <div className="comparison-row">
                <span className="comp-label">Asset Production</span>
                <span style={{ color: "var(--muted-ink)" }}>Repetitive manual rebuilding for every new banner and format</span>
                <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Reusable workflows, components, and automated variant scaling</span>
              </div>

              <div className="comparison-row">
                <span className="comp-label">Team Capacity</span>
                <span style={{ color: "var(--muted-ink)" }}>Limited agency hours bottlenecked by account managers</span>
                <span style={{ fontWeight: 600, color: "var(--foreground)" }}>Human + AI collaboration delivering consistent momentum</span>
              </div>
            </div>
          </section>

          {/* =====================================================================
              SECTION 05 — SELECTED WORK GALLERY (4-6 PROJECTS)
              ===================================================================== */}
          <section
            className="models-showcase-section"
            id="work"
            style={{ padding: "7vw 9.2vw", background: "var(--background)" }}
          >
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 03 — SELECTED WORK ]
                </div>
                <h2>
                  Proof in
                  <br />
                  <em>the craft.</em>
                </h2>
                <p className="section-description" style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "520px" }}>
                  A selection of recent studio engagements and concept case studies across branding, design, and writing.
                </p>
              </div>

              {/* Filter pills */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(["all", "branding", "design", "writing"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`outline-button ${workFilter === filter ? "active" : ""}`}
                    style={{
                      padding: "8px 14px",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      background: workFilter === filter ? "var(--foreground)" : "transparent",
                      color: workFilter === filter ? "var(--background)" : "var(--muted-ink)",
                      borderColor: workFilter === filter ? "var(--foreground)" : "var(--line)",
                    }}
                    onClick={() => {
                      playClick();
                      setWorkFilter(filter);
                    }}
                  >
                    {filter === "all" ? "All Work" : filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="models-grid" style={{ marginTop: "4vw" }}>
              {filteredWork.map((project) => (
                <div className="model-showcase-card" key={project.id}>
                  <div className="model-head">
                    <span
                      className="model-badge"
                      style={{
                        color: project.label === "CLIENT ENGAGEMENT" ? "#22c55e" : "#fbbf24",
                      }}
                    >
                      {project.label}
                    </span>
                    <span className="model-latency">{project.industry}</span>
                  </div>

                  <h3 style={{ margin: "10px 0 6px" }}>{project.name}</h3>
                  <p className="model-tagline" style={{ color: "var(--orange)" }}>
                    {project.services.join(" · ")}
                  </p>
                  <p style={{ fontSize: "13.5px", color: "var(--muted-ink)", lineHeight: 1.55, margin: "8px 0 16px" }}>
                    {project.description}
                  </p>

                  <div className="model-specs-box">
                    <div className="model-spec-pair">
                      <span>Category</span>
                      <span style={{ textTransform: "capitalize" }}>{project.category}</span>
                    </div>
                    <div className="model-spec-pair">
                      <span>Scope</span>
                      <span>{project.metrics || "End-to-End"}</span>
                    </div>
                    <div className="model-spec-pair">
                      <span>Approach</span>
                      <span>AI + Human Craft</span>
                    </div>
                    <div className="model-spec-pair">
                      <span>Status</span>
                      <span>Archived Case Study</span>
                    </div>
                  </div>

                  <div className="model-actions" style={{ marginTop: "16px" }}>
                    <button
                      type="button"
                      className="outline-button"
                      style={{ width: "100%", justifyContent: "center" }}
                      onClick={openProjectModal}
                    >
                      Start a similar project <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================================================
              SECTION 06 — HOW IT WORKS (FOUR STEPS)
              ===================================================================== */}
          <section
            className="notes-section"
            id="how-it-works"
            style={{ padding: "7vw 9.2vw", background: "var(--card)", borderTop: "1px solid var(--line)" }}
          >
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 04 — HOW IT WORKS ]
                </div>
                <h2>
                  Four steps.
                  <br />
                  <em>Zero friction.</em>
                </h2>
                <p className="section-description" style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "520px" }}>
                  How we move from your brief to approved, production-ready deliverables.
                </p>
              </div>
              <button
                type="button"
                className="primary-button"
                onClick={openProjectModal}
              >
                Submit your brief <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="how-steps-grid">
              <div className="how-step-card">
                <span className="how-step-num">STEP 01</span>
                <h3>Tell us what you need.</h3>
                <p>
                  Share your brief, goals, references, and constraints through our structured intake form or direct conversation.
                </p>
              </div>

              <div className="how-step-card">
                <span className="how-step-num">STEP 02</span>
                <h3>We understand your brand.</h3>
                <p>
                  We synthesize your assets, tone, audience preferences, and visual standards into persistent studio context.
                </p>
              </div>

              <div className="how-step-card">
                <span className="how-step-num">STEP 03</span>
                <h3>We create.</h3>
                <p>
                  AI-assisted workflows accelerate exploratory variations while human creative directors shape the craft, nuance, and execution.
                </p>
              </div>

              <div className="how-step-card">
                <span className="how-step-num">STEP 04</span>
                <h3>You review and approve.</h3>
                <p>
                  Centralized revision rounds, rapid refinements, and direct delivery of production-ready files to your workspace.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================================
              SECTION 07 — THE TECHNOLOGY BEHIND THE STUDIO (AI + HUMAN)
              ===================================================================== */}
          <section
            className="manifesto-section"
            id="operating-model"
            style={{ padding: "7vw 9.2vw" }}
          >
            <div className="section-marker" style={{ color: "var(--orange)" }}>
              [ 05 — THE OPERATING MODEL ]
            </div>

            <div
              className="old-hero-text-block"
              style={{
                margin: "1rem 0 1.5rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid color-mix(in srgb, var(--background) 18%, transparent)",
              }}
            >
              <p
                className="eyebrow"
                style={{
                  color: "var(--orange)",
                  font: "600 11px/1.4 'DM Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "12px",
                }}
              >
                <span className="pulse-dot" /> Production Architecture · Quiet Studio
              </p>
              <h2
                style={{
                  font: "700 clamp(2.2rem, 4.5vw, 4.5rem)/0.92 'Space Grotesk', sans-serif",
                  letterSpacing: "-0.06em",
                  color: "var(--background)",
                  textTransform: "uppercase",
                  margin: "0 0 16px",
                }}
              >
                Intelligent by design.
                <br />
                <em style={{ fontStyle: "italic", fontFamily: "serif", textTransform: "none" }}>
                  Human by intention.
                </em>
              </h2>
              <p
                style={{
                  font: "400 15px/1.6 'DM Sans', sans-serif",
                  color: "color-mix(in srgb, var(--background) 75%, transparent)",
                  maxWidth: "680px",
                  margin: 0,
                }}
              >
                Quiet Studio uses AI to assist with research, ideation, first drafts, variations and repetitive production. Humans remain responsible for creative direction, quality and final judgment.
              </p>
            </div>

            <div className="tech-pillars-grid">
              <div className="tech-pillar-card" style={{ background: "rgba(255, 255, 255, 0.04)", color: "var(--background)", borderColor: "rgba(255, 255, 255, 0.12)" }}>
                <span className="tech-pillar-badge">MACHINE LEVERAGE</span>
                <h3 style={{ color: "var(--background)" }}>What AI Does</h3>
                <p style={{ fontSize: "13.5px", color: "color-mix(in srgb, var(--background) 70%, transparent)", lineHeight: 1.5, margin: 0 }}>
                  Handles the high-volume mechanical lift so creative energy is never wasted on mundane tasks:
                </p>
                <ul style={{ color: "var(--background)" }}>
                  <li><span className="tech-pillar-bullet">✦</span> Synthesizing industry benchmarks and visual research</li>
                  <li><span className="tech-pillar-bullet">✦</span> Rapidly drafting initial layouts and structural skeletons</li>
                  <li><span className="tech-pillar-bullet">✦</span> Exploring dozens of palette and typographic variations</li>
                  <li><span className="tech-pillar-bullet">✦</span> Automating multi-format asset scaling and banner exports</li>
                </ul>
              </div>

              <div className="tech-pillar-card highlight" style={{ background: "rgba(255, 90, 31, 0.08)", color: "var(--background)", borderColor: "rgba(255, 90, 31, 0.4)" }}>
                <span className="tech-pillar-badge">HUMAN DISCERNMENT</span>
                <h3 style={{ color: "var(--background)" }}>What Humans Direct</h3>
                <p style={{ fontSize: "13.5px", color: "color-mix(in srgb, var(--background) 70%, transparent)", lineHeight: 1.5, margin: 0 }}>
                  Provides the critical taste, taste-making, and restraint that machines cannot replicate:
                </p>
                <ul style={{ color: "var(--background)" }}>
                  <li><span className="tech-pillar-bullet">✦</span> Art direction, emotional resonance, and brand positioning</li>
                  <li><span className="tech-pillar-bullet">✦</span> Nuanced typography, layout tension, and physical tactile feel</li>
                  <li><span className="tech-pillar-bullet">✦</span> Honest, human brand copywriting without generic AI slop</li>
                  <li><span className="tech-pillar-bullet">✦</span> Final quality verification, scrutiny, and client alignment</li>
                </ul>
              </div>
            </div>
          </section>

          {/* =====================================================================
              SECTION 08 — ONGOING PARTNERSHIP & PRICING
              ===================================================================== */}
          <section
            className="products-section"
            id="partnerships"
            style={{ padding: "7vw 9.2vw", background: "var(--background)", borderTop: "1px solid var(--line)" }}
          >
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 06 — ONGOING CREATIVE PARTNERSHIPS ]
                </div>
                <h2>
                  More than a
                  <br />
                  <em>one-time project.</em>
                </h2>
                <p className="section-description" style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "520px" }}>
                  An ongoing creative relationship for businesses that regularly need design and writing without hiring in-house or paying agency retainers.
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="status status-orange">PREDICTABLE MONTHLY SPRINT</span>
              </div>
            </div>

            <div className="partnership-pricing-grid" style={{ marginTop: "4vw" }}>
              {/* Plan 1: Sprint */}
              <div className="partnership-plan-card">
                <div className="plan-head-row">
                  <span className="plan-name">Sprint</span>
                  <span className="plan-price-label">Per Asset</span>
                </div>
                <div className="plan-price">
                  $149–249
                </div>
                <p style={{ fontSize: "13px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Fast turnaround for a single high-priority deliverable (pitch deck refresh, landing page copy, or social asset kit).
                </p>
                <ul className="plan-deliverables-list" style={{ marginTop: "12px" }}>
                  <li><Check size={14} color="var(--orange)" /> 1 targeted deliverable</li>
                  <li><Check size={14} color="var(--orange)" /> 48–72 hour turnaround</li>
                  <li><Check size={14} color="var(--orange)" /> 2 revision rounds</li>
                  <li><Check size={14} color="var(--orange)" /> Production-ready source files</li>
                </ul>
                <button
                  type="button"
                  className="outline-button"
                  style={{ marginTop: "auto", justifyContent: "center" }}
                  onClick={openProjectModal}
                >
                  Book a Sprint <ArrowRight size={13} />
                </button>
              </div>

              {/* Plan 2: Creative Pack */}
              <div className="partnership-plan-card featured-plan">
                <div className="plan-head-row">
                  <span className="plan-name">Creative Pack</span>
                  <span className="plan-price-label">Project Scope</span>
                </div>
                <div className="plan-price" style={{ color: "var(--orange)" }}>
                  $399–699
                </div>
                <p style={{ fontSize: "13px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Multi-asset sprint for launches, brand overhauls, complete pitch presentations, or full website copywriting suites.
                </p>
                <ul className="plan-deliverables-list" style={{ marginTop: "12px" }}>
                  <li><Check size={14} color="var(--orange)" /> Complete project scope</li>
                  <li><Check size={14} color="var(--orange)" /> Brand discovery &amp; style curation</li>
                  <li><Check size={14} color="var(--orange)" /> 5–7 business day turnaround</li>
                  <li><Check size={14} color="var(--orange)" /> Comprehensive asset package</li>
                </ul>
                <button
                  type="button"
                  className="primary-button"
                  style={{ marginTop: "auto", justifyContent: "center" }}
                  onClick={openProjectModal}
                >
                  Start Creative Pack <ArrowRight size={13} />
                </button>
              </div>

              {/* Plan 3: Monthly Partnership */}
              <div className="partnership-plan-card">
                <div className="plan-head-row">
                  <span className="plan-name">Monthly</span>
                  <span className="plan-price-label">Ongoing / Mo</span>
                </div>
                <div className="plan-price">
                  $599–999
                </div>
                <p style={{ fontSize: "13px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Your dedicated ongoing creative team across branding, design, and writing with centralized portal requests.
                </p>
                <ul className="plan-deliverables-list" style={{ marginTop: "12px" }}>
                  <li><Check size={14} color="var(--orange)" /> Continuous monthly creative output</li>
                  <li><Check size={14} color="var(--orange)" /> Persistent brand context in portal</li>
                  <li><Check size={14} color="var(--orange)" /> Priority queue &amp; fast turnaround</li>
                  <li><Check size={14} color="var(--orange)" /> Pause or cancel anytime</li>
                </ul>
                <button
                  type="button"
                  className="outline-button"
                  style={{ marginTop: "auto", justifyContent: "center" }}
                  onClick={openProjectModal}
                >
                  Explore Partnership <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================================
              SECTION 09 — TESTIMONIALS & TRUST (STUDIO CONVICTION)
              ===================================================================== */}
          <section
            className="notes-section"
            id="trust"
            style={{ padding: "7vw 9.2vw", background: "var(--card)", borderTop: "1px solid var(--line)", textAlign: "center" }}
          >
            <div className="section-marker" style={{ color: "var(--orange)", justifyContent: "center" }}>
              [ 07 — STUDIO PRINCIPLES &amp; TRUST ]
            </div>

            <blockquote
              style={{
                font: "500 clamp(1.4rem, 2.5vw, 2.4rem)/1.35 'Space Grotesk', sans-serif",
                letterSpacing: "-0.03em",
                color: "var(--foreground)",
                maxWidth: "840px",
                margin: "2vw auto 1.5vw",
              }}
            >
              “The website should feel like a serious creative studio, not a SaaS dashboard pretending to be an agency. We don’t fabricate claims or client logos—just honest, disciplined craft.”
            </blockquote>

            <div style={{ font: "600 11px 'DM Mono', monospace", color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Quiet Studio Principles · thequietstudio.space
            </div>
          </section>

          {/* =====================================================================
              SECTION 10 — FAQ (9 QUESTIONS ACCORDION)
              ===================================================================== */}
          <section
            className="products-section"
            id="faq"
            style={{ padding: "7vw 9.2vw", background: "var(--background)", borderTop: "1px solid var(--line)" }}
          >
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 08 — FREQUENTLY ASKED QUESTIONS ]
                </div>
                <h2>
                  Answers before
                  <br />
                  <em>you ask.</em>
                </h2>
                <p className="section-description" style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "520px" }}>
                  Clear, honest details on how we collaborate, handle revisions, incorporate AI, and deliver files.
                </p>
              </div>
              <button
                type="button"
                className="outline-button"
                onClick={openProjectModal}
              >
                Have another question? Ask us <ArrowRight size={13} />
              </button>
            </div>

            <div className="faq-accordion-list">
              {FAQ_ITEMS.map((item, idx) => (
                <details className="faq-accordion-item" key={item.q} open={idx === 0}>
                  <summary className="faq-accordion-summary" onClick={() => playClick()}>
                    <span>{item.q}</span>
                    <span className="faq-accordion-icon">+</span>
                  </summary>
                  <div className="faq-accordion-body">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* =====================================================================
              SECTION 11 — FINAL CTA
              ===================================================================== */}
          <section className="closing-section" id="cta">
            <div className="closing-ring" />
            <p className="eyebrow" style={{ color: "var(--orange)", textTransform: "uppercase", font: "600 11px 'DM Mono', monospace" }}>
              [ START A PROJECT ]
            </p>
            <h2>
              Let’s make
              <br />
              <em>something meaningful.</em>
            </h2>
            <p style={{ maxWidth: "480px", color: "var(--muted-ink)", fontSize: "15px", lineHeight: 1.5, margin: "-18px 0 28px", position: "relative", zIndex: 2 }}>
              Tell us what you're building. We'll help you bring it to life with thoughtful branding, design, and words.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 10 }}>
              <button
                type="button"
                className="primary-button"
                onClick={openProjectModal}
              >
                Start a project <ArrowUpRight size={16} />
              </button>
              <a
                href="mailto:glexionstriker@gmail.com"
                className="outline-button"
                onClick={() => playClick()}
              >
                Email the studio <Mail size={14} />
              </a>
            </div>
          </section>
        </>
      ) : (
        /* =========================================================================
           AGENT MODE: AI LABORATORY HEADER, RESEARCH MANIFESTO, MODELS & WHITEPAPERS
           ========================================================================= */
        <>
          <div id="overview">
            <QuietStudioLab3D />
          </div>

          <section className="manifesto-section" id="manifesto">
            <div className="section-marker">[ 01 — THE AI LAB MANIFESTO: RESEARCH &amp; MODELS ]</div>

            <div
              className="old-hero-text-block"
              style={{
                margin: "1rem 0 1.5rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid color-mix(in srgb, var(--background) 18%, transparent)",
              }}
            >
              <p
                className="eyebrow"
                style={{
                  color: "var(--orange)",
                  font: "600 11px/1.4 'DM Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                <span className="pulse-dot" /> independent AI research &amp; distilled tensor architectures — 2026
              </p>
              <h2
                style={{
                  font: "700 clamp(2rem, 4vw, 4.2rem)/0.92 'Space Grotesk', sans-serif",
                  letterSpacing: "-0.06em",
                  color: "var(--background)",
                  textTransform: "uppercase",
                  margin: "0 0 14px",
                }}
              >
                A proactive partner in your life
                <span style={{ color: "var(--orange)" }}>,</span>
                <br />
                <em style={{ fontStyle: "italic", fontFamily: "serif", textTransform: "none" }}>
                  vertical for the tasks you need.
                </em>
              </h2>
              <p
                style={{
                  font: "400 15px/1.55 'DM Sans', sans-serif",
                  color: "color-mix(in srgb, var(--background) 70%, transparent)",
                  maxWidth: "680px",
                  margin: 0,
                }}
              >
                The AI Laboratory at Quiet Studio isn’t just working on isolated memory mathematics. Our central goal
                is making artificial intelligence a proactive companion in your daily life: deeply vertical, task-specialized,
                and aware of your context so it executes what you need without syntax gymnastics.
              </p>
            </div>

            <div className="manifesto-layout">
              <p className="manifesto-lead">
                Proactive intelligence <span>tailored to your tasks:</span>
              </p>
              <div className="manifesto-statement">
                <p>from ambient intent detection to deep vertical execution.</p>
                <div className="manifesto-rule" />
                <p className="manifesto-fine">
                  Instead of generalist chatbots that know everything superficially, our laboratory engineers vertical models and long-horizon context architectures (SCTM) that master specific workflows with zero friction and absolute privacy.
                </p>
              </div>
            </div>

            <div className="manifesto-bottom">
              <div className="signal-card">
                <Command size={18} />
                <span>
                  CORE ROLE: PROACTIVE LIFE &amp; WORK PARTNER
                  <br />
                  <b>MODEL ARCHITECTURE: VERTICAL TASK ENGINES</b>
                </span>
              </div>
              <p>
                Proactive instead of reactive.
                <br />
                Vertical models for actual work.
                <br />
                Calm intelligence that gets out of your way.
              </p>
            </div>
          </section>

          <section className="models-showcase-section" id="models" style={{ padding: "7vw 9.2vw", background: "var(--background)" }}>
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 02 — DOMAIN-VERTICAL AI MODELS &amp; INTENT ENGINES ]
                </div>
                <h2>
                  Vertical models &amp;
                  <br />
                  <em>task execution.</em>
                </h2>
                <p
                  className="section-description"
                  style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "520px" }}
                >
                  Moving past generalist chatbots to specialized vertical models tailored for the exact tasks, routines, and decisions you face.
                </p>
              </div>
              <Link href="/blog/why-vertical-models-beat-general-ai" className="outline-button">
                Read Vertical AI Thesis <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="models-grid" style={{ marginTop: "4vw" }}>
              <div className="model-showcase-card">
                <div className="model-head">
                  <span className="model-badge" style={{ color: "#fbbf24" }}>VERTICAL MODEL</span>
                  <span className="model-latency">AMBIENT PARSER</span>
                </div>
                <h3>Aethel Intent Engine</h3>
                <p className="model-tagline">Anticipates user workflow goals before explicit verbal prompts.</p>
                <p style={{ fontSize: "13px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Synthesizes peripheral desktop telemetry, active workspace context, and recent micro-gestures into direct executable intents.
                </p>
                <div className="model-specs-box">
                  <div className="model-spec-pair">
                    <span>Target</span>
                    <span>Zero Prompt UI</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Match Rate</span>
                    <span>99.1% F1</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Deployment</span>
                    <span>Hybrid Local/Edge</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Module</span>
                    <span>Aethel Core v2</span>
                  </div>
                </div>
                <div className="model-actions">
                  <Link href="/products/aethel" className="outline-button" style={{ width: "100%", justifyContent: "center" }}>
                    Examine Aethel Protocol <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              <div className="model-showcase-card">
                <div className="model-head">
                  <span className="model-badge">AI MEMORY SYSTEM</span>
                  <span className="model-latency">&lt; 12ms RETRIEVAL</span>
                </div>
                <h3>SCTM Tensor Memory</h3>
                <p className="model-tagline">Sparse Confident Tensor Memory with Isotropic Whitening.</p>
                <p style={{ fontSize: "13px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Maintains 94.2% retrieval precision over 128k context windows by filtering attention distractor pollution
                  before key-value caching.
                </p>
                <div className="model-specs-box">
                  <div className="model-spec-pair">
                    <span>Window</span>
                    <span>128,000 Tokens</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Precision</span>
                    <span>94.2% Signal</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Framework</span>
                    <span>PyTorch / CUDA</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Status</span>
                    <span>Whitepaper Open</span>
                  </div>
                </div>
                <div className="model-actions">
                  <Link href="/research/sctm-memory-architecture" className="outline-button" style={{ width: "100%", justifyContent: "center" }}>
                    Read Architecture Whitepaper <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="research-preview-section" id="research" style={{ padding: "7vw 9.2vw", background: "var(--card)", borderTop: "1px solid var(--line)" }}>
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker">[ 03 — RESEARCH &amp; WHITEPAPERS ]</div>
                <h2>
                  Theoretical
                  <br />
                  <em>foundations.</em>
                </h2>
                <p className="section-description">
                  Peer-reviewed whitepapers on Sparse Confident Tensor Memory and discrete authority gating.
                </p>
              </div>
              <Link href="/research" className="outline-button">
                View All Research <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="research-preview-card" style={{ marginTop: "4vw" }}>
              <div className="research-preview-index">04 / GATING</div>
              <div className="research-preview-copy">
                <span className="meta-label">ZERO-TRUST SYSTEMS WHITEPAPER</span>
                <h3>Discrete Authority Gating for Proactive Agents</h3>
                <p>
                  A deterministic capability-token runtime enforcing sub-millisecond local cryptographic proofs before ambient agent intents can mutate user environments.
                </p>
                <Link href="/research/discrete-authority-gating" className="note-read">
                  Read Full Paper <ArrowRight size={14} />
                </Link>
              </div>
              <div className="research-preview-art">
                <div className="research-orbit" />
                <div className="research-orbit orbit-b" />
                <span>
                  GATE<span>.</span>
                </span>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export function ProductVisual({ product, compact = false }: { product: any; compact?: boolean }) {
  return (
    <div className={`product-visual visual-${product?.visual || "aethel"} ${compact ? "compact" : ""}`} aria-hidden="true">
      {product?.visual === "learnloop" && (
        <>
          <div className="loop-ring ring-one" />
          <div className="loop-ring ring-two" />
          <div className="loop-core">
            <span>learn</span>
            <span>loop</span>
          </div>
          <div className="loop-node node-one">01</div>
          <div className="loop-node node-two">↗</div>
          <div className="loop-node node-three">02</div>
        </>
      )}
      {product?.visual === "whitespace" && (
        <>
          <div className="window-stack">
            <div className="window-head">
              <i />
              <i />
              <i />
            </div>
            <div className="window-copy">
              <b>context</b>
              <span>saved to whitespace</span>
              <span>⌘ K to recall</span>
            </div>
          </div>
          <div className="ghost-window" />
        </>
      )}
      {product?.visual === "aethel" && (
        <>
          <div className="aethel-sphere">
            <div className="sphere-grid" />
            <div className="sphere-glow" />
          </div>
          <div className="aethel-cross cross-a" />
          <div className="aethel-cross cross-b" />
          <span className="aethel-label">INTENT → ACTION</span>
        </>
      )}
      {product?.visual === "capture" && (
        <>
          <div className="aethel-sphere">
            <div className="sphere-grid" />
            <div className="sphere-glow" />
          </div>
          <span className="aethel-label">LOCAL RUNTIME</span>
        </>
      )}
    </div>
  );
}

