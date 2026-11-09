import { ArrowLeft, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "wouter";
import abhinavImg from "@/assets/abhinav.png";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="section-marker">[ 01 — ABOUT QUIET STUDIO ]</div>
        <div className="about-hero-layout">
          <div>
            <p className="about-role">Independent Creative Studio · Founded by Abhinav Krish</p>
            <h1>
              A different kind of
              <br />
              <em>creative studio.</em>
            </h1>
            <p className="about-lede">
              Quiet Studio was built around a simple idea: creative work should be thoughtful, accessible and efficient. We combine human creativity with intelligent tools to help businesses build their identities and communicate more effectively.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "16px" }}>
              <a
                className="primary-button"
                href="mailto:glexionstriker@gmail.com"
              >
                Message the Studio <Mail size={15} />
              </a>
              <a
                className="outline-button"
                href="https://www.linkedin.com/in/abhinav-krish-639bab314/"
                target="_blank"
                rel="noreferrer"
              >
                Founder LinkedIn <Linkedin size={15} />
              </a>
            </div>
          </div>
          <div className="about-photo-wrap">
            <img src={abhinavImg} alt="Abhinav Krish — Founder of Quiet Studio" />
            <span>ABHINAV KRISH / FOUNDER</span>
          </div>
        </div>
      </section>

      {/* Philosophy & How It Operates */}
      <section className="about-body">
        <div className="about-sidebar">
          <span className="meta-label">The short version</span>
          <span>Quiet Studio</span>
          <span>Branding, Design &amp; Writing</span>
          <span>Abhinav Krish (Founder)</span>
          <span>VIT + IIT Madras</span>
          <span>AI + Human Collaboration</span>
          <span>India / Worldwide</span>
        </div>
        <div className="about-copy">
          <p>
            Traditional creative agencies are often weighed down by repeated onboarding, bloated account management layers, disconnected revision cycles, and high retainer markups. At the same time, purely automated AI tools generate generic, soulless slop that fails to reflect what makes a brand memorable.
          </p>
          <p>
            Quiet Studio was created as an independent, evolving creative studio to bridge that gap. We use artificial intelligence as a rapid production engine for research, variations, and first drafts, while human creative direction retains full responsibility for strategy, tone, aesthetic judgment, and final craft.
          </p>
          <div className="about-quote">
            “The website should feel like a serious creative studio, not a SaaS dashboard pretending to be an agency.”
          </div>
          <p>
            Quiet Studio is led by Abhinav Krish, an independent designer, developer, and researcher currently pursuing a B.Tech in Computer Science and Quantum Computing at Vellore Institute of Technology, Chennai, alongside a BS in Data Science and Applications at IIT Madras.
          </p>
          <p>
            Rather than claiming a bloated agency headcount, we operate with radical honesty: a streamlined studio model delivering high-craft branding, presentation design, and strategic copy for ambitious businesses worldwide.
          </p>
        </div>
      </section>

      {/* Core Studio Disciplines */}
      <section className="about-projects">
        <div className="section-marker">[ CORE STUDIO DISCIPLINES ]</div>
        <div className="about-project-grid">
          <div>
            <span className="project-index">01</span>
            <h3>Branding &amp; Identity</h3>
            <p>Distinctive visual identities, logos, color systems, typography, and brand voice guidelines.</p>
          </div>
          <div>
            <span className="project-index">02</span>
            <h3>Design Studio</h3>
            <p>Pitch decks, marketing collateral, social suites, editorial layouts, and digital brand surfaces.</p>
          </div>
          <div>
            <span className="project-index">03</span>
            <h3>Writing Studio</h3>
            <p>Websites, landing pages, founder manifestos, newsletters, and business copy that speaks with honest tone.</p>
          </div>
        </div>
      </section>

      {/* Studio Timeline */}
      <section className="timeline-section">
        <div className="section-marker">[ THE THREAD SO FAR ]</div>
        <div className="timeline">
          <div className="timeline-item">
            <span>2023</span>
            <div>
              <h3>Foundations &amp; Storytelling</h3>
              <p>Published books, digital zines, and creative publications while building a foundation across design and code.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span>2025</span>
            <div>
              <h3>AI Systems &amp; Real Shipping</h3>
              <p>Built generative AI applications at the Gen AI Exchange Hackathon and engineered event software for 200+ participants.</p>
            </div>
          </div>
          <div className="timeline-item active">
            <span>NOW</span>
            <div>
              <h3>Quiet Studio Launch</h3>
              <p>Establishing the AI + Human creative studio model for branding, design, writing, and client partnerships at thequietstudio.space.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span>NEXT</span>
            <div>
              <h3>Product-Led Retention</h3>
              <p>Expanding the client workspace, asset library, and persistent brand context platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social / Contact */}
      <section className="about-links">
        <span className="section-marker">[ GET IN TOUCH ]</span>
        <div>
          <a href="https://www.linkedin.com/in/abhinav-krish-639bab314/" target="_blank" rel="noreferrer">
            LinkedIn <ExternalLink size={15} />
          </a>
          <a href="https://github.com/AbhiKrish07" target="_blank" rel="noreferrer">
            GitHub <Github size={15} />
          </a>
          <a href="mailto:glexionstriker@gmail.com">
            Email <Mail size={15} />
          </a>
        </div>
      </section>

      <div className="about-back">
        <Link href="/">
          <ArrowLeft size={14} /> back to studio
        </Link>
      </div>
    </div>
  );
}
