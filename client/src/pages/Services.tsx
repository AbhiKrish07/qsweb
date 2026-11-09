import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Palette, PenTool, LayoutGrid, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { playClick } from "@/lib/sound";

export default function ServicesPage() {
  const openProjectModal = () => {
    playClick();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <div className="about-page" style={{ paddingBottom: "6vw" }}>
      {/* Services Hero */}
      <section className="about-hero">
        <div className="section-marker">[ 02 — SERVICE DIRECTORY ]</div>
        <div className="about-hero-layout">
          <div>
            <p className="about-role">Branding · Design Studio · Writing Studio · Creative Partnerships</p>
            <h1>
              Creative services for
              <br />
              <em>businesses building what comes next.</em>
            </h1>
            <p className="about-lede">
              From building a brand identity from scratch to producing everyday creative assets, we bring branding, design and writing together under one roof with AI speed and human craft.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
              <button className="primary-button" onClick={openProjectModal}>
                Start a Project <ArrowUpRight size={14} />
              </button>
              <Link href="/pricing" className="outline-button" onClick={() => playClick()}>
                View Pricing Packages <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="about-photo-wrap" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "var(--card)", border: "1px solid var(--line)", padding: "30px", borderRadius: "12px" }}>
            <div style={{ font: "700 36px 'Space Grotesk', sans-serif", color: "var(--orange)", letterSpacing: "-0.05em" }}>03</div>
            <div style={{ font: "600 12px 'DM Mono', monospace", color: "var(--foreground)", textTransform: "uppercase", marginTop: "6px" }}>Core Disciplines</div>
            <div style={{ font: "500 11px 'DM Mono', monospace", color: "var(--muted-ink)", marginTop: "4px" }}>Persistent Brand Context</div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="about-projects" style={{ marginTop: "4vw" }}>
        <div className="section-marker">[ DISCIPLINE DIRECTORY ]</div>
        <div className="partnership-pricing-grid" style={{ marginTop: "2vw" }}>
          {/* Branding */}
          <div className="partnership-plan-card featured-plan">
            <div className="plan-head-row">
              <span className="status status-orange">DISCIPLINE 01</span>
              <span style={{ font: "600 11px 'DM Mono', monospace", color: "var(--orange)" }}>STARTING AT $399</span>
            </div>
            <h3 className="plan-name">Branding &amp; Identity</h3>
            <p style={{ fontSize: "14px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
              Build a distinctive identity. Strategy, visual language, naming, and guidelines that position your company decisively.
            </p>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
              <div style={{ font: "600 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase", marginBottom: "8px" }}>
                Typical Deliverables
              </div>
              <ul className="plan-deliverables-list">
                <li><span className="tech-pillar-bullet">✦</span> Brand discovery &amp; positioning deck</li>
                <li><span className="tech-pillar-bullet">✦</span> Naming, tagline &amp; core messaging</li>
                <li><span className="tech-pillar-bullet">✦</span> Primary &amp; secondary logo suite</li>
                <li><span className="tech-pillar-bullet">✦</span> Typographic rules &amp; color palettes</li>
                <li><span className="tech-pillar-bullet">✦</span> Stationery &amp; digital social kit</li>
              </ul>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "12px" }}>
              <Link href="/branding" className="primary-button" style={{ flex: 1, justifyContent: "center" }} onClick={() => playClick()}>
                Explore Branding <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Design */}
          <div className="partnership-plan-card">
            <div className="plan-head-row">
              <span className="status status-cream">DISCIPLINE 02</span>
              <span style={{ font: "600 11px 'DM Mono', monospace", color: "var(--muted-ink)" }}>STARTING AT $149</span>
            </div>
            <h3 className="plan-name">Design Studio</h3>
            <p style={{ fontSize: "14px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
              Turn ideas into visual experiences. Investor pitch decks, marketing collateral, social assets, and brochures.
            </p>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
              <div style={{ font: "600 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase", marginBottom: "8px" }}>
                Typical Deliverables
              </div>
              <ul className="plan-deliverables-list">
                <li><span className="tech-pillar-bullet">✦</span> Series-A &amp; seed investor decks</li>
                <li><span className="tech-pillar-bullet">✦</span> Marketing graphics &amp; campaign suites</li>
                <li><span className="tech-pillar-bullet">✦</span> Editorial publications &amp; brochures</li>
                <li><span className="tech-pillar-bullet">✦</span> Infographics &amp; architectural visuals</li>
                <li><span className="tech-pillar-bullet">✦</span> Packaging &amp; print specifications</li>
              </ul>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "12px" }}>
              <Link href="/design" className="outline-button" style={{ flex: 1, justifyContent: "center" }} onClick={() => playClick()}>
                Explore Design <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Writing */}
          <div className="partnership-plan-card">
            <div className="plan-head-row">
              <span className="status status-cream">DISCIPLINE 03</span>
              <span style={{ font: "600 11px 'DM Mono', monospace", color: "var(--muted-ink)" }}>STARTING AT $149</span>
            </div>
            <h3 className="plan-name">Writing Studio</h3>
            <p style={{ fontSize: "14px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
              Find the right words for your brand. Websites, newsletters, business copy, and founder manifestos without generic AI fluff.
            </p>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
              <div style={{ font: "600 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase", marginBottom: "8px" }}>
                Typical Deliverables
              </div>
              <ul className="plan-deliverables-list">
                <li><span className="tech-pillar-bullet">✦</span> Website copywriting &amp; landing pages</li>
                <li><span className="tech-pillar-bullet">✦</span> Brand messaging &amp; founder manifestos</li>
                <li><span className="tech-pillar-bullet">✦</span> Email campaigns &amp; newsletter issues</li>
                <li><span className="tech-pillar-bullet">✦</span> Case studies &amp; business narratives</li>
                <li><span className="tech-pillar-bullet">✦</span> Tone check, editing &amp; proofreading</li>
              </ul>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "12px" }}>
              <Link href="/writing" className="outline-button" style={{ flex: 1, justifyContent: "center" }} onClick={() => playClick()}>
                Explore Writing <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Creative Partnerships Row */}
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            borderRadius: "12px",
            padding: "36px",
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ maxWidth: "580px" }}>
            <span className="status status-orange">ONGOING COLLABORATION</span>
            <h3 style={{ font: "700 28px 'Space Grotesk', sans-serif", letterSpacing: "-0.04em", margin: "10px 0 8px" }}>
              Creative Partnerships
            </h3>
            <p style={{ color: "var(--muted-ink)", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              For growing teams that need regular design and writing output across disciplines without the bloat, communication layers, and markups of traditional agency retainers.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/pricing" className="outline-button" onClick={() => playClick()}>
              View Monthly Plans
            </Link>
            <button className="primary-button" onClick={openProjectModal}>
              Discuss a Partnership <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <div className="about-back" style={{ marginTop: "4vw" }}>
        <Link href="/">
          <ArrowLeft size={14} /> back to home
        </Link>
      </div>
    </div>
  );
}
