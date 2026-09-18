import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Copy, Download, Layers, Palette, Shield, Sparkles, Type } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { playClick } from "@/lib/sound";

export default function System() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { name: "Orange (Primary)", hex: "#ff5a1f", varName: "--orange" },
    { name: "Paper (Background)", hex: "#f0efe9", varName: "--paper" },
    { name: "Ink (Text)", hex: "#111110", varName: "--ink" },
    { name: "Card (Surface)", hex: "#e9e8e1", varName: "--card" },
    { name: "Muted Ink (Secondary)", hex: "#74716a", varName: "--muted-ink" },
  ];

  const handleCopy = (hex: string) => {
    playClick();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast(`Copied ${hex} to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const downloadPressKit = () => {
    playClick();
    toast("Preparing Quiet Studio Press Kit (Brand Guidelines & Assets)...");
    const pressContent = `# Quiet Studio Press Kit & Brand Guidelines (2026)

## About Quiet Studio
Quiet Studio is an independent AI product studio founded by Abhinav Krish.
We explore the edge of effortless software through useful products, open source engines, and AI memory research.

## Core Ecosystem
1. Capture — Thought, without the tax. (Private beta)
2. LearnLoop — Learning, with less ceremony. (In the lab)
3. Zen AI — Serene, local-first open source AI engine. (Open source)
4. Aethel — Intent-shaped ambient interface research. (Research)
5. SCTM — Sparse Confident Tensor Memory architecture. (Research)

## Visual Identity & Tokens
- Primary Accent: #ff5a1f (Studio Orange)
- Background Paper: #f0efe9 / Dark Mode: #111110
- Primary Font: Space Grotesk (700 / 600)
- Code & Meta Font: DM Mono (500)
- Body Font: DM Sans (400)

Contact & Inquiries: glexionstriker@gmail.com
Website: https://quiet-studio.vercel.app
`;
    const blob = new Blob([pressContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiet-studio-press-kit.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="system-page">
      <section className="research-hero">
        <div className="section-marker">[ STUDIO PRESS & DESIGN SYSTEM ]</div>
        <h1>
          Rules of the<br />
          <em>quiet system.</em>
        </h1>
        <p>
          The architectural blueprint, design tokens, typography rules, and ecosystem map that power Quiet Studio.
        </p>
        <div className="research-rule" />
      </section>

      {/* Ecosystem Architecture Map */}
      <section style={{ padding: "6vw 9.2vw", background: "var(--background)", borderBottom: "1px solid var(--line)" }}>
        <div className="section-marker">[ ECOSYSTEM MAP ]</div>
        <h2>One interconnected<br /><em>ecosystem.</em></h2>
        <p style={{ color: "var(--muted-ink)", maxWidth: "520px", fontSize: "14px", marginTop: "12px" }}>
          Quiet Studio is not a collection of random apps. Every tool is an interconnected node feeding into a unified local memory, research framework, and serene workflow.
        </p>

        <div className="ecosystem-map-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px", marginTop: "4vw" }}>
          <div className="eco-map-card">
            <span className="eco-node-num">01</span>
            <h3>Capture</h3>
            <p>Thought ingest layer</p>
            <span className="eco-arrow">→ feeds SCTM Vector Cache</span>
          </div>
          <div className="eco-map-card">
            <span className="eco-node-num">02</span>
            <h3>SCTM Engine</h3>
            <p>Memory & Context Gating</p>
            <span className="eco-arrow">→ powers Zen AI & LearnLoop</span>
          </div>
          <div className="eco-map-card">
            <span className="eco-node-num">03</span>
            <h3>LearnLoop</h3>
            <p>Knowledge Synthesis</p>
            <span className="eco-arrow">→ distills raw capture into mastery</span>
          </div>
          <div className="eco-map-card">
            <span className="eco-node-num">04</span>
            <h3>Zen AI</h3>
            <p>On-Device Execution</p>
            <span className="eco-arrow">→ zero-latency local worker</span>
          </div>
        </div>
      </section>

      {/* Color Tokens Showcase */}
      <section style={{ padding: "6vw 9.2vw", background: "var(--card)" }}>
        <div className="section-marker">[ COLOR TOKENS ]</div>
        <h2>Palette &<br /><em>variables.</em></h2>

        <div className="color-swatch-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "4vw" }}>
          {colors.map((col) => (
            <div
              key={col.hex}
              className="color-swatch-card"
              onClick={() => handleCopy(col.hex)}
              title="Click to copy HEX code"
            >
              <div className="swatch-preview" style={{ background: col.hex }} />
              <div className="swatch-info">
                <strong>{col.name}</strong>
                <code>{col.hex}</code>
                <span className="var-code">{col.varName}</span>
                {copiedHex === col.hex && <span className="copied-tag">Copied <Check size={10} /></span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Tokens */}
      <section style={{ padding: "6vw 9.2vw", background: "var(--foreground)", color: "var(--background)" }}>
        <div className="section-marker" style={{ color: "var(--orange)" }}>[ TYPOGRAPHY SYSTEM ]</div>
        <h2>Modern,<br /><em>editorial type.</em></h2>

        <div className="type-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "30px", marginTop: "4vw" }}>
          <div className="type-card">
            <span className="type-tag" style={{ color: "var(--orange)" }}>Display / Headings</span>
            <h3 style={{ font: "700 32px 'Space Grotesk', sans-serif", letterSpacing: "-.06em", color: "var(--background)" }}>
              Space Grotesk
            </h3>
            <p style={{ color: "color-mix(in srgb, var(--background) 60%, transparent)", fontSize: "13px" }}>
              Bold, geometric, and high-impact headlines that project clarity and studio intention.
            </p>
          </div>

          <div className="type-card">
            <span className="type-tag" style={{ color: "var(--orange)" }}>Code & Labels</span>
            <h3 style={{ font: "500 24px 'DM Mono', monospace", color: "var(--background)" }}>
              DM Mono
            </h3>
            <p style={{ color: "color-mix(in srgb, var(--background) 60%, transparent)", fontSize: "13px" }}>
              Monospaced accuracy for metadata tags, status pills, shortcuts, and terminal install commands.
            </p>
          </div>

          <div className="type-card">
            <span className="type-tag" style={{ color: "var(--orange)" }}>Body Copy</span>
            <h3 style={{ font: "400 24px 'DM Sans', sans-serif", color: "var(--background)" }}>
              DM Sans
            </h3>
            <p style={{ color: "color-mix(in srgb, var(--background) 60%, transparent)", fontSize: "13px" }}>
              Clean, legible prose for research essays, product explanations, and notes.
            </p>
          </div>
        </div>

        {/* Press Kit Download */}
        <div style={{ marginTop: "6vw", paddingTop: "4vw", borderTop: "1px solid color-mix(in srgb, var(--background) 20%, transparent)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ font: "700 28px 'Space Grotesk', sans-serif", textTransform: "uppercase", margin: 0, color: "var(--background)" }}>
              Download Studio Press Kit
            </h3>
            <p style={{ color: "color-mix(in srgb, var(--background) 60%, transparent)", margin: "6px 0 0", fontSize: "13px" }}>
              Official brand guidelines, logo vector marks, press bios, and token specifications.
            </p>
          </div>
          <button className="primary-button" onClick={downloadPressKit} style={{ background: "var(--orange)" }}>
            Download Kit (.md) <Download size={14} />
          </button>
        </div>
      </section>

      <div className="about-back" style={{ padding: "0 9.2vw 6vw" }}>
        <Link href="/">
          <ArrowLeft size={14} /> back to studio
        </Link>
      </div>
    </div>
  );
}
