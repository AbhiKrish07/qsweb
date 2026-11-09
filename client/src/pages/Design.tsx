import { ArrowLeft, ArrowRight, ArrowUpRight, Check, LayoutGrid, Monitor, Sparkles, Layers } from "lucide-react";
import { Link } from "wouter";
import { playClick } from "@/lib/sound";

const DESIGN_CATEGORIES = [
  {
    title: "Presentation & Pitch Decks",
    desc: "15 to 25 slide high-stakes decks for Series-A fundraising, board updates, and keynote conferences.",
    deliverables: "Interactive Figma, Keynote, and PDF deck with custom data charts",
    complexity: "Medium to High",
  },
  {
    title: "Marketing Graphics & Campaigns",
    desc: "Visual campaigns designed to convert across digital channels with high typographic standards.",
    deliverables: "Ad sets, hero artwork, product release banners, and feature graphics",
    complexity: "Low to Medium",
  },
  {
    title: "Social Media Design Suites",
    desc: "Consistent, repeatable post templates and carousel formats that elevate company feeds.",
    deliverables: "Figma design system, ready-to-edit templates, and export presets",
    complexity: "Low",
  },
  {
    title: "Editorial Design & Brochures",
    desc: "Longform publication layouts, annual reports, and physical or digital brochures.",
    deliverables: "Multi-page booklet, CMYK print specs, digital flipbook",
    complexity: "Medium to High",
  },
  {
    title: "Infographics & Diagrams",
    desc: "Translating dense technical concepts, system architectures, and workflows into clear schematics.",
    deliverables: "Modular SVG diagram components, light/dark variations",
    complexity: "Medium",
  },
  {
    title: "Packaging & Collateral",
    desc: "Tactile boxes, labels, sleeves, tape, and unboxing collateral for physical products.",
    deliverables: "Dieline files, foil stamps, material & paper specifications",
    complexity: "High",
  },
];

export default function DesignPage() {
  const openProjectModal = () => {
    playClick();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <div className="about-page" style={{ paddingBottom: "6vw" }}>
      {/* Hero */}
      <section className="about-hero">
        <div className="section-marker">[ DESIGN STUDIO ]</div>
        <div className="about-hero-layout">
          <div>
            <p className="about-role">Presentations · Editorial · Digital Collateral · Packaging</p>
            <h1>
              Design that gives
              <br />
              <em>your ideas a visual identity.</em>
            </h1>
            <p className="about-lede">
              We turn complex propositions into clear, commanding visual experiences. High-craft graphics, investor pitch decks, and brand touchpoints delivered without agency friction.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
              <button className="primary-button" onClick={openProjectModal}>
                Start a Design Project <ArrowUpRight size={14} />
              </button>
              <Link href="/work" className="outline-button" onClick={() => playClick()}>
                View Design Case Studies <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="about-photo-wrap" style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "30px", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="status status-orange" style={{ alignSelf: "flex-start" }}>HIGH CRAFT</span>
            <div style={{ font: "700 24px 'Space Grotesk', sans-serif", margin: "14px 0 6px" }}>Precision Visuals</div>
            <p style={{ fontSize: "13px", color: "var(--muted-ink)", margin: 0, lineHeight: 1.5 }}>
              Every layout is engineered with grid rigor, mathematical type scales, and restrained color harmony.
            </p>
          </div>
        </div>
      </section>

      {/* Design Categories Grid */}
      <section className="about-projects" style={{ marginTop: "4vw" }}>
        <div className="section-marker">[ DESIGN DISCIPLINES ]</div>
        <div className="about-project-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {DESIGN_CATEGORIES.map((cat, i) => (
            <div key={cat.title}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="project-index">0{i + 1}</span>
                <span style={{ font: "600 9px 'DM Mono', monospace", color: "var(--orange)", textTransform: "uppercase" }}>
                  {cat.complexity}
                </span>
              </div>
              <h3 style={{ marginTop: "10px" }}>{cat.title}</h3>
              <p>{cat.desc}</p>
              <div style={{ borderTop: "1px solid var(--line)", marginTop: "12px", paddingTop: "8px", font: "500 11px 'DM Mono', monospace", color: "var(--muted-ink)" }}>
                Deliverables: {cat.deliverables}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-Format Extension Callout */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "36px",
          marginTop: "4vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <span className="status status-orange">SYSTEMATIC EXTENSION</span>
          <h3 style={{ font: "700 26px 'Space Grotesk', sans-serif", letterSpacing: "-0.04em", margin: "10px 0 8px" }}>
            Extending one visual identity across all surfaces
          </h3>
          <p style={{ color: "var(--muted-ink)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
            Whether you need a single 18-slide investor pitch deck or a multi-surface marketing campaign, we preserve your exact brand guidelines so every touchpoint looks like it belongs to the same family.
          </p>
        </div>
        <button className="primary-button" onClick={openProjectModal}>
          Request Design Deliverables <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="about-back" style={{ marginTop: "4vw" }}>
        <Link href="/services">
          <ArrowLeft size={14} /> back to services
        </Link>
      </div>
    </div>
  );
}
