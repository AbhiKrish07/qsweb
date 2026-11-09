import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Palette, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { playClick } from "@/lib/sound";

export default function BrandingPage() {
  const openProjectModal = () => {
    playClick();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <div className="about-page" style={{ paddingBottom: "6vw" }}>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="section-marker">[ BRANDING &amp; IDENTITY ]</div>
        <div className="about-hero-layout">
          <div>
            <p className="about-role">Strategy · Visual Identity · Persistent Systems</p>
            <h1>
              Build a brand
              <br />
              <em>people recognize.</em>
            </h1>
            <p className="about-lede">
              A distinctive brand isn’t just a logo file. It’s the visual language, typography, color tension, and voice that makes what you do feel obvious, durable, and impossible to confuse with anyone else.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
              <button className="primary-button" onClick={openProjectModal}>
                Start a Branding Project <ArrowUpRight size={14} />
              </button>
              <Link href="/work" className="outline-button" onClick={() => playClick()}>
                View Brand Case Studies <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="about-photo-wrap" style={{ background: "var(--card)", border: "1px solid var(--line)", padding: "30px", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="status status-orange" style={{ alignSelf: "flex-start" }}>STRATEGY + IDENTITY</span>
            <div style={{ font: "700 24px 'Space Grotesk', sans-serif", margin: "14px 0 6px" }}>Distinctive by Design</div>
            <p style={{ fontSize: "13px", color: "var(--muted-ink)", margin: 0, lineHeight: 1.5 }}>
              We clearly separate strategic positioning from visual execution so your brand carries substance before aesthetics.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Positioning vs Visual Identity */}
      <section className="about-body" style={{ marginTop: "4vw" }}>
        <div className="about-sidebar">
          <span className="meta-label">The Principle</span>
          <span>Strategy First</span>
          <span>Visual Cohesion</span>
          <span>Persistent Guidelines</span>
          <span>Tactile Physicality</span>
          <span>Production Ready</span>
        </div>
        <div className="about-copy">
          <p>
            <b>Why strategic branding matters:</b> Most businesses mistakenly treat branding as an afterthought cosmetic sticker. But without a coherent strategy and distinct visual rules, you spend twice as much on advertising trying to establish recognition that should have come organically.
          </p>
          <div className="about-quote">
            “Strategic brand development and visual identity design are related, but not interchangeable.”
          </div>
          <p>
            At Quiet Studio, we distinguish between <b>Strategic Brand Development</b> (discovering your core differentiation, market positioning, and tone) and <b>Visual Identity Design</b> (vector logos, typographic hierarchy, color chemistry, and digital guidelines). One gives the brand gravity; the other gives it form.
          </p>
        </div>
      </section>

      {/* Deliverables Matrix */}
      <section className="about-projects" style={{ marginTop: "4vw" }}>
        <div className="section-marker">[ COMPLETE DELIVERABLES ]</div>
        <div className="about-project-grid">
          <div>
            <span className="project-index">01</span>
            <h3>Strategic Brand Foundation</h3>
            <p>Brand discovery sessions, competitive landscape audit, customer persona positioning, and strategic messaging pillar deck.</p>
          </div>
          <div>
            <span className="project-index">02</span>
            <h3>Logo Architecture</h3>
            <p>Primary mark, secondary badge, responsive micro-favicons, wordmark variations, and vector files (SVG/EPS/PDF).</p>
          </div>
          <div>
            <span className="project-index">03</span>
            <h3>Color &amp; Type Systems</h3>
            <p>Primary ink and warm paper backgrounds, functional accent tokens, webfont pairings, and KaTeX / mono typesetting specs.</p>
          </div>
          <div>
            <span className="project-index">04</span>
            <h3>Brand Guidelines Portal</h3>
            <p>Interactive brand guidelines, usage rules, do's &amp; don'ts, export standards, and centralized asset repository.</p>
          </div>
          <div>
            <span className="project-index">05</span>
            <h3>Stationery &amp; Print</h3>
            <p>Foil-stamped business cards, letterheads, invoice templates, and physical paper stock recommendations.</p>
          </div>
          <div>
            <span className="project-index">06</span>
            <h3>Digital Applications</h3>
            <p>Social media avatars, banner templates, email signature kits, and Open Graph share cards for web deployment.</p>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "40px",
          marginTop: "4vw",
          textAlign: "center",
        }}
      >
        <span className="status status-orange">START YOUR IDENTITY SPRINT</span>
        <h2 style={{ font: "700 clamp(2rem, 4vw, 3.5rem) 'Space Grotesk', sans-serif", letterSpacing: "-0.05em", margin: "16px 0 12px" }}>
          Ready to build your distinctive identity?
        </h2>
        <p style={{ maxWidth: "520px", margin: "0 auto 24px", color: "var(--muted-ink)", fontSize: "14px" }}>
          Packages start at $399. Proposals returned within 24–48 hours with transparent milestone scopes.
        </p>
        <button className="primary-button" onClick={openProjectModal} style={{ margin: "0 auto" }}>
          Start a Branding Project <ArrowUpRight size={14} />
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
