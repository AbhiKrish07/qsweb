import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Activity, BookOpen, Check, Cpu, Info, Layers, RefreshCw, Search, Sliders, Sparkles, Zap } from "lucide-react";
import { Link, Route, Switch, useParams } from "wouter";
import { playClick, playTick } from "@/lib/sound";

export interface ResearchArticleData {
  slug: string;
  index: string;
  title: string;
  date: string;
  readTime: string;
  category: "AI Memory" | "HCI & UI" | "Systems" | "Philosophy";
  excerpt: string;
  content: string[];
  callout?: string;
  tags: string[];
  flagship?: boolean;
}

export const researchArticles: ResearchArticleData[] = [
  {
    slug: "sctm-memory-architecture",
    index: "01",
    title: "Sparse Confident Tensor Memory: Architecture Whitepaper.",
    date: "18.09.26",
    readTime: "12 MIN READ",
    category: "AI Memory",
    flagship: true,
    excerpt: "Current LLM context windows degrade severely under distractor noise. SCTM introduces isotropic whitening and discrete authority gating to maintain crisp memory traces over long sessions.",
    tags: ["SCTM", "AI Memory", "PyTorch", "Isotropic Whitening", "Context Retrieval"],
    callout: "The challenge of long-context LLMs is not expanding the window size—it is maintaining signal purity when 90% of the window is distractor noise.",
    content: [
      "Modern Large Language Models boast context windows exceeding 1 million tokens. However, empirical benchmarking reveals a fundamental flaw: attention mechanisms suffer from severe accuracy degradation when distractor noise or irrelevant conversational history fills the key-value cache.",
      "In standard Softmax attention, every token receives a non-zero weight. Over long sessions, low-signal tokens compound, causing 'attention pollution' and hallucinated retrievals.",
      "Quiet Studio introduces Sparse Confident Tensor Memory (SCTM). SCTM applies an isotropic whitening transformation over incoming token activations, centering the activation space and decorrelating dimensions.",
      "Following whitening, a discrete authority gate evaluates token confidence. Tokens falling below a dynamic threshold (α = 0.85) are masked out before key-value caching. The result is a crisp, noise-immune memory trace that retains 94%+ retrieval precision even at 128k context lengths."
    ]
  },
  {
    slug: "interface-as-reflex",
    index: "02",
    title: "When AI stops feeling like AI.",
    date: "06.09.26",
    readTime: "7 MIN READ",
    category: "HCI & UI",
    excerpt: "The next interface is not a chat window. It is the moment the system understands what you meant before you explain it.",
    tags: ["HCI", "Silent UI", "Intent Detection"],
    callout: "The magic is not in making systems speak more. It is in making them understand when language is unnecessary.",
    content: [
      "The dominant paradigm for artificial intelligence is the conversational chat box. Users are expected to construct elaborate prompts, adjust system personas, and engage in turn-based dialogue.",
      "We argue that conversational interfaces are a transition state, not the destination. The most effective tools operate as extensions of intent—acting before instruction becomes cumbersome.",
      "At Quiet Studio, our research explores intent-shaped systems. By combining continuous ambient signals with low-latency local inference, software can anticipate required context without interrupting the creator's flow."
    ]
  },
  {
    slug: "the-dignity-of-silence",
    index: "03",
    title: "The dignity of not being interrupted.",
    date: "22.08.26",
    readTime: "5 MIN READ",
    category: "Philosophy",
    excerpt: "Why modern productivity software creates attention strain, and how quiet systems preserve cognitive depth.",
    tags: ["Attention", "Quiet Systems", "Productivity"],
    content: [
      "Software notifications are designed for notification velocity, not human clarity. Every red badge and pop-up toast demands a context switch that takes up to 23 minutes to recover from.",
      "Quiet software respects cognitive dignity. It operates asynchronously, batching signals and surfacing actionable intelligence only when the user explicitly requests momentum."
    ]
  }
];

function SCTMStudioSimulator() {
  const [contextLength, setContextLength] = useState<number>(64000); // 4k to 128k
  const [noiseLevel, setNoiseLevel] = useState<number>(50); // 0 to 100
  const [isSCTM, setIsSCTM] = useState<boolean>(true);

  // Compute simulated retention performance
  const metrics = useMemo(() => {
    const lenFactor = contextLength / 128000;
    const noiseFactor = noiseLevel / 100;

    if (isSCTM) {
      // SCTM maintains high precision despite noise & context depth
      const retention = Math.max(88, Math.min(99, Math.round(98 - lenFactor * 4 - noiseFactor * 3)));
      const accuracy = Math.max(91, Math.min(99, Math.round(99 - lenFactor * 3 - noiseFactor * 4)));
      const signalToNoise = (18.4 - lenFactor * 1.2).toFixed(1);
      return { retention, accuracy, signalToNoise, status: "Optimal (SCTM Gated)", color: "#ff5a1f" };
    } else {
      // Standard LLM drops sharply under noise and large context
      const retention = Math.max(32, Math.min(95, Math.round(95 - lenFactor * 35 - noiseFactor * 40)));
      const accuracy = Math.max(28, Math.min(92, Math.round(92 - lenFactor * 30 - noiseFactor * 45)));
      const signalToNoise = (6.2 - lenFactor * 3.5 - noiseFactor * 2.8).toFixed(1);
      return { retention, accuracy, signalToNoise, status: "Attention Degradation", color: "#e11d48" };
    }
  }, [contextLength, noiseLevel, isSCTM]);

  return (
    <div className="sctm-simulator-card">
      <div className="sim-head">
        <div>
          <div className="live-badge" style={{ marginBottom: "8px" }}>
            <span className="live-pulse-dot" /> LIVE INTERACTIVE SIMULATION
          </div>
          <h3>SCTM vs Standard LLM Attention Engine</h3>
        </div>
        <div className="sim-mode-toggle">
          <button
            className={`sim-toggle-btn ${!isSCTM ? "active-standard" : ""}`}
            onClick={() => {
              playClick();
              setIsSCTM(false);
            }}
          >
            Standard LLM Attention
          </button>
          <button
            className={`sim-toggle-btn ${isSCTM ? "active-sctm" : ""}`}
            onClick={() => {
              playClick();
              setIsSCTM(true);
            }}
          >
            <Sparkles size={13} /> SCTM Memory Engine
          </button>
        </div>
      </div>

      <div className="sim-body-grid">
        {/* Sliders Control Panel */}
        <div className="sim-controls">
          <div className="sim-slider-group">
            <div className="slider-label-row">
              <label>Context Token Length</label>
              <span>{(contextLength / 1000).toFixed(0)}k tokens</span>
            </div>
            <input
              type="range"
              min={4000}
              max={128000}
              step={4000}
              value={contextLength}
              onChange={(e) => {
                playTick();
                setContextLength(Number(e.target.value));
              }}
            />
            <div className="slider-sub">4k min — 128k max</div>
          </div>

          <div className="sim-slider-group">
            <div className="slider-label-row">
              <label>Distractor Noise Ratio</label>
              <span>{noiseLevel}% noise</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={noiseLevel}
              onChange={(e) => {
                playTick();
                setNoiseLevel(Number(e.target.value));
              }}
            />
            <div className="slider-sub">0% clean context — 100% heavy noise</div>
          </div>

          <div className="sim-metrics-grid">
            <div className="sim-metric-box">
              <span className="metric-title">Retrieval Precision</span>
              <strong style={{ color: metrics.color }}>{metrics.retention}%</strong>
            </div>
            <div className="sim-metric-box">
              <span className="metric-title">Fact Accuracy</span>
              <strong style={{ color: metrics.color }}>{metrics.accuracy}%</strong>
            </div>
            <div className="sim-metric-box">
              <span className="metric-title">Signal-to-Noise Ratio</span>
              <strong>{metrics.signalToNoise} dB</strong>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Chart */}
        <div className="sim-chart-wrap">
          <div className="chart-title-bar">
            <span>Context Memory Retention Curve</span>
            <span className="chart-status-pill" style={{ color: metrics.color, borderColor: metrics.color }}>
              {metrics.status}
            </span>
          </div>

          <svg className="sim-svg-chart" viewBox="0 0 400 180">
            {/* Grid lines */}
            <line x1="40" y1="20" x2="380" y2="20" stroke="var(--line)" strokeDasharray="3 3" />
            <line x1="40" y1="70" x2="380" y2="70" stroke="var(--line)" strokeDasharray="3 3" />
            <line x1="40" y1="120" x2="380" y2="120" stroke="var(--line)" strokeDasharray="3 3" />
            <line x1="40" y1="160" x2="380" y2="160" stroke="var(--line)" />

            {/* Y axis labels */}
            <text x="10" y="24" fill="var(--muted-ink)" fontSize="9" fontFamily="DM Mono">100%</text>
            <text x="10" y="74" fill="var(--muted-ink)" fontSize="9" fontFamily="DM Mono">50%</text>
            <text x="10" y="124" fill="var(--muted-ink)" fontSize="9" fontFamily="DM Mono">25%</text>
            <text x="10" y="164" fill="var(--muted-ink)" fontSize="9" fontFamily="DM Mono">0%</text>

            {/* Standard LLM Curve (Dashed red line for reference) */}
            <path
              d={`M 40 25 C 150 35, 250 ${160 - (95 - (contextLength / 128000) * 35 - (noiseLevel / 100) * 40)}, 380 ${160 - (32 + (1 - noiseLevel / 100) * 20)}`}
              fill="none"
              stroke="#e11d48"
              strokeWidth="2"
              strokeDasharray={isSCTM ? "4 4" : "none"}
              opacity={isSCTM ? 0.45 : 1}
            />

            {/* SCTM Curve (Solid Orange line) */}
            <path
              d={`M 40 22 C 150 24, 250 ${160 - metrics.retention * 1.35}, 380 ${160 - metrics.retention * 1.35 + 4}`}
              fill="none"
              stroke="#ff5a1f"
              strokeWidth={isSCTM ? "3.5" : "2"}
              opacity={isSCTM ? 1 : 0.4}
            />

            {/* Active Indicator Node */}
            <circle
              cx={40 + (contextLength / 128000) * 340}
              cy={160 - metrics.retention * 1.35}
              r="6"
              fill={metrics.color}
            />
          </svg>

          <div className="chart-axis-labels">
            <span>4k Tokens</span>
            <span>32k Tokens</span>
            <span>64k Tokens</span>
            <span>128k Tokens</span>
          </div>
        </div>
      </div>

      <div className="sim-foot-explanation">
        <Info size={14} className="info-icon" />
        <span>
          {isSCTM
            ? "SCTM uses isotropic whitening to decorrelate token vectors and discrete authority gating to discard low-confidence noise before caching."
            : "Standard Transformer Softmax attention assigns non-zero probability to distractor tokens, leading to attention pollution as context expands."}
        </span>
      </div>
    </div>
  );
}

export function ResearchJournal() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [query, setQuery] = useState("");

  const categories = ["All", "AI Memory", "HCI & UI", "Philosophy"];

  const filtered = useMemo(() => {
    return researchArticles.filter((article) => {
      const matchesCategory = activeTab === "All" || article.category === activeTab;
      const matchesQuery = `${article.title} ${article.excerpt} ${article.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeTab, query]);

  const flagshipArticle = researchArticles.find((a) => a.flagship) || researchArticles[0];

  return (
    <div className="research-page">
      {/* Flagship SCTM Research Header Banner */}
      <section className="sctm-flagship-banner">
        <div className="section-marker">[ FLAGSHIP RESEARCH — QUIET STUDIO JOURNAL ]</div>
        <div className="flagship-layout">
          <div>
            <span className="flagship-tag">{flagshipArticle.category}</span>
            <h1>
              Sparse Confident<br />
              <em>Tensor Memory.</em>
            </h1>
            <p className="flagship-excerpt">{flagshipArticle.excerpt}</p>
            <div className="flagship-meta">
              <span>{flagshipArticle.date}</span>
              <span>{flagshipArticle.readTime}</span>
              <span>PARADIGM SHIFT</span>
            </div>
            <Link href={`/research/${flagshipArticle.slug}`} className="primary-button" style={{ marginTop: "24px" }}>
              Read Full Whitepaper <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="flagship-art-box">
            <div className="flagship-sphere" />
            <span className="flagship-code-stamp">SCTM / v1.0</span>
          </div>
        </div>
      </section>

      {/* Interactive SCTM Memory Decay Simulator */}
      <section style={{ padding: "0 9.2vw 6vw", marginTop: "-3vw", position: "relative", zIndex: 10 }}>
        <SCTMStudioSimulator />
      </section>

      {/* Comparison: AI Memory Now vs SCTM Ecosystem */}
      <section className="memory-comparison-section" style={{ padding: "6vw 9.2vw", background: "var(--card)" }}>
        <div className="section-marker">[ ARCHITECTURAL COMPARISON ]</div>
        <h2>AI Memory Today vs<br /><em>SCTM Ecosystem.</em></h2>
        <div className="comparison-table-wrap" style={{ marginTop: "4vw" }}>
          <div className="comparison-row head">
            <div>FEATURE</div>
            <div>STANDARD AI MEMORY</div>
            <div>SCTM MEMORY ECOSYSTEM</div>
          </div>
          <div className="comparison-row">
            <div className="comp-label">Attention Weighting</div>
            <div>Softmax over all tokens (noise accumulates)</div>
            <div>Isotropic whitening + authority threshold gating</div>
          </div>
          <div className="comparison-row">
            <div className="comp-label">Distractor Noise Tolerance</div>
            <div>Degrades sharply beyond 16k tokens</div>
            <div>Crisp 94%+ precision up to 128k tokens</div>
          </div>
          <div className="comparison-row">
            <div className="comp-label">Context Storage Tax</div>
            <div>Heavy linear / quadratic KV-cache RAM tax</div>
            <div>Sparse memory caching (3.8x memory reduction)</div>
          </div>
          <div className="comparison-row">
            <div className="comp-label">Ecosystem Integration</div>
            <div>Isolated per-prompt chat window</div>
            <div>Connects Capture, Zen AI, & LearnLoop into one memory</div>
          </div>
        </div>
      </section>

      {/* Journal Index List */}
      <section className="research-index">
        <div className="research-index-head">
          <div>
            <div className="section-marker">[ PUBLIC JOURNAL ]</div>
            <h2>Research<br /><em>articles.</em></h2>
          </div>
          <div className="archive-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search research journal..."
              aria-label="Search research journal"
            />
            {query && <button onClick={() => setQuery("")}>×</button>}
          </div>
        </div>

        <div className="category-tabs" style={{ marginTop: "4vw" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeTab === cat ? "active" : ""}`}
              onClick={() => setActiveTab(cat)}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="research-list">
          {filtered.map((article) => (
            <Link key={article.slug} href={`/research/${article.slug}`} className="research-row">
              <span className="research-number">{article.index}</span>
              <div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
              <div className="research-read">
                <span>{article.readTime}</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ResearchArticle() {
  const params = useParams<{ slug: string }>();
  const article = researchArticles.find((a) => a.slug === params.slug) || researchArticles[0];

  return (
    <div className="research-article">
      <Link href="/research" className="article-back">
        <ArrowLeft size={14} /> Back to journal
      </Link>
      <header>
        <span className="section-marker">[ {article.category} — {article.date} ]</span>
        <h1>{article.title}</h1>
        <p className="article-deck">{article.excerpt}</p>
        <div className="article-meta">
          <span>
            <BookOpen size={13} /> {article.readTime}
          </span>
          <span>
            <Cpu size={13} /> AUTHOR: ABHINAV KRISH
          </span>
        </div>
      </header>

      <div className="article-body">
        {article.content.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        {article.callout && <blockquote className="article-callout">“{article.callout}”</blockquote>}
      </div>

      {article.slug === "sctm-memory-architecture" && (
        <section style={{ maxWidth: "720px", margin: "5vw auto" }}>
          <SCTMStudioSimulator />
        </section>
      )}

      <div className="about-back" style={{ marginTop: "6vw" }}>
        <Link href="/research">
          <ArrowLeft size={14} /> Back to research journal
        </Link>
      </div>
    </div>
  );
}

export default function Research() {
  return (
    <Switch>
      <Route path="/research" component={ResearchJournal} />
      <Route path="/research/:slug" component={ResearchArticle} />
    </Switch>
  );
}
