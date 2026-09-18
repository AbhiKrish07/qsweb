import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, GitCommit, GitPullRequest, Layers, Package, Search, Sparkles, Tag } from "lucide-react";
import { Link } from "wouter";

interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  title: string;
  category: "Product Release" | "Open Source" | "Research Paper" | "Milestone";
  ecosystemComponent: string;
  summary: string;
  changes: string[];
  link?: string;
}

const changelogEntries: ChangelogEntry[] = [
  {
    id: "sctm-v1",
    version: "v1.0.0",
    date: "18.09.2026",
    title: "SCTM Sparse Confident Tensor Memory Architecture Whitepaper & PyTorch Module",
    category: "Research Paper",
    ecosystemComponent: "SCTM Memory Engine",
    summary: "Released the flagship SCTM research whitepaper and PyTorch layer implementing isotropic whitening decorrelation and discrete authority gating.",
    changes: [
      "Published isotropic whitening algorithm formulation and proof",
      "Released drop-in PyTorch SCTMMemoryGate layer on GitHub",
      "Interactive context memory decay simulator deployed to Quiet Studio Journal",
      "Integrated SCTM memory gating into Capture & Zen AI background workers"
    ],
    link: "/research/sctm-memory-architecture"
  },
  {
    id: "capture-v24",
    version: "v2.4.0",
    date: "12.09.2026",
    title: "Capture Desktop & Mobile Private Beta Cohort #2 Enrolled",
    category: "Product Release",
    ecosystemComponent: "Capture",
    summary: "Expanded Capture private beta to 100 total testers with zero-latency local vector indexing.",
    changes: [
      "Added 1-key instant capture overlay for macOS & Linux",
      "Sub-millisecond local vector index search using pure TypeScript engine",
      "Automatic context clustering into Action Items and Key Insights",
      "End-to-end local encryption for all captured thoughts"
    ],
    link: "/products/capture"
  },
  {
    id: "zen-ai-v09",
    version: "v0.9.2",
    date: "28.08.2026",
    title: "Zen Local AI Inference Engine Rust Worker Release",
    category: "Open Source",
    ecosystemComponent: "Zen AI",
    summary: "Serene local-first open source AI engine layer running entirely on-device with sub-millisecond inference latency.",
    changes: [
      "Built streaming token pipeline using Rust and Axum web framework",
      "Zero telemetry network calls with 100% on-device GGUF model support",
      "Published MIT licensed cargo binary crate `zen-ai-worker`"
    ],
    link: "/products/zen-ai"
  },
  {
    id: "learnloop-v05",
    version: "v0.5.0",
    date: "14.08.2026",
    title: "LearnLoop Adaptive Recall Engine & Concept Maps",
    category: "Product Release",
    ecosystemComponent: "LearnLoop",
    summary: "Frictionless loop engine for converting raw articles and research into durable knowledge.",
    changes: [
      "Concept map visualization of connected active recall prompts",
      "Spaced repetition scheduling without productivity theatre",
      "One-click web clipper integration for LearnLoop"
    ],
    link: "/products/learnloop"
  }
];

export default function Changelog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categories = ["All", "Product Release", "Open Source", "Research Paper", "Milestone"];

  const filtered = useMemo(() => {
    return changelogEntries.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesQuery = `${item.title} ${item.version} ${item.summary} ${item.ecosystemComponent}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="changelog-page">
      <section className="research-hero">
        <div className="section-marker">[ STUDIO CHANGELOG & SHIP FEED ]</div>
        <h1>
          Built slowly.<br />
          <em>Shipped often.</em>
        </h1>
        <p>
          A public timeline logging every Quiet Studio release, open source commit, research whitepaper, and ecosystem milestone.
        </p>
        <div className="research-rule" />
      </section>

      <section className="research-index">
        <div className="research-index-head">
          <div>
            <div className="section-marker">[ ECOSYSTEM MOMENTUM ]</div>
            <h2>
              The studio<br />
              <em>ship log.</em>
            </h2>
          </div>
          <div className="archive-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search changelog..."
              aria-label="Search changelog entries"
            />
            {query && <button onClick={() => setQuery("")}>×</button>}
          </div>
        </div>

        <div className="category-tabs" style={{ marginTop: "4vw" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="changelog-timeline" style={{ marginTop: "5vw" }}>
          {filtered.map((entry) => (
            <article className="changelog-card" key={entry.id}>
              <div className="changelog-card-meta">
                <span className="changelog-version-tag">{entry.version}</span>
                <span className="changelog-date">{entry.date}</span>
                <span className="changelog-category">{entry.category}</span>
                <span className="changelog-eco-tag">{entry.ecosystemComponent}</span>
              </div>
              <div className="changelog-card-content">
                <h3>{entry.title}</h3>
                <p className="changelog-summary">{entry.summary}</p>
                <ul className="changelog-changes-list">
                  {entry.changes.map((ch, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={13} className="check-icon" /> {ch}
                    </li>
                  ))}
                </ul>
                {entry.link && (
                  <Link href={entry.link} className="text-button" style={{ marginTop: "16px" }}>
                    Inspect Release <ArrowUpRight size={13} />
                  </Link>
                )}
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="archive-empty">No changelog entries match “{query}”.</div>
          )}
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
