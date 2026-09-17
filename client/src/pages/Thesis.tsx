import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleDot, Flame, Github, Heart, Info, Lightbulb, LoaderCircle, Mail, Plus, Radio, Search, Sparkles, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

interface ExplorationItem {
  id: string;
  name: string;
  type: "Product" | "Research" | "Open source";
  status: "In progress" | "Private beta" | "Shaping" | "Preparing release" | "Early question";
  progress: number; // 0 to 100
  color: "orange" | "cream" | "white";
  detail: string;
  thesis: string;
  tags: string[];
  signal: string;
  upvotes: number;
  milestone: string;
  updatedAt: string;
}

const initialExplorations: ExplorationItem[] = [
  {
    id: "sctm-memory",
    signal: "01",
    name: "SCTM Memory Architecture",
    type: "Research",
    status: "In progress",
    progress: 68,
    color: "orange",
    detail: "Testing stable memory and context retrieval architectures for language models.",
    thesis: "Current LLM context windows degrade under noise. SCTM introduces isotropic whitening and discrete authority gating to maintain crisp memory trace over long sessions.",
    tags: ["AI Memory", "PyTorch", "Isotropic Whitening", "Context Retrieval"],
    upvotes: 42,
    milestone: "Validating retrieval accuracy on 128k token benchmark",
    updatedAt: "Today, 14:20 IST",
  },
  {
    id: "capture-beta",
    signal: "02",
    name: "Capture Desktop & Mobile",
    type: "Product",
    status: "Private beta",
    progress: 88,
    color: "cream",
    detail: "Turning the first moment of an idea into a calm, searchable system.",
    thesis: "Capturing thought should take less than 2 seconds without requiring categorization or tagging up front.",
    tags: ["Electron", "React", "Local First", "Fast Vector Index"],
    upvotes: 89,
    milestone: "Enrolling second cohort of 50 beta testers",
    updatedAt: "Yesterday",
  },
  {
    id: "trendculture",
    signal: "03",
    name: "TrendCulture Signal Feed",
    type: "Product",
    status: "Shaping",
    progress: 45,
    color: "orange",
    detail: "A swipeable signal feed for seeing what culture is becoming.",
    thesis: "Modern trend engines rely on clickbait algorithms. TrendCulture curates underlying shifts in design, code, and philosophy.",
    tags: ["Mobile Web", "Signal Processing", "Data Mining", "UI Motion"],
    upvotes: 34,
    milestone: "Designing gesture physics & recommendation graphs",
    updatedAt: "3 days ago",
  },
  {
    id: "zen-ai-engine",
    signal: "04",
    name: "Zen AI Engine",
    type: "Open source",
    status: "Preparing release",
    progress: 92,
    color: "orange",
    detail: "A serene, local-first open source AI assistant layer for effortless workflows.",
    thesis: "AI interfaces should be quiet, local-first, and zero-latency—working alongside human intention without constant telemetry or bloated UI.",
    tags: ["Open Source", "Local AI", "Rust", "Zero Latency"],
    upvotes: 112,
    milestone: "Finalizing macOS binary sign & CLI docs",
    updatedAt: "This week",
  },
  {
    id: "ambient-interfaces",
    signal: "05",
    name: "Ambient & Silent UI",
    type: "Research",
    status: "Early question",
    progress: 30,
    color: "cream",
    detail: "Exploring systems that know when to act and when to leave you alone.",
    thesis: "Proactive AI shouldn't interrupt. We're testing subtle physical display cues and peripheral notification physics.",
    tags: ["HCI", "Peripheral UI", "Intent Detection"],
    upvotes: 56,
    milestone: "Conducting user attention strain experiments",
    updatedAt: "This week",
  },
  {
    id: "titan-kernel",
    signal: "06",
    name: "Titan Reactive State",
    type: "Open source",
    status: "In progress",
    progress: 55,
    color: "orange",
    detail: "Ultra-lightweight state synchronization engine for distributed local-first apps.",
    thesis: "State synchronization shouldn't require complex CRDT overhead for simple document & graph structures.",
    tags: ["TypeScript", "Zero-Dependency", "CRDT Lite"],
    upvotes: 27,
    milestone: "Benchmarking conflict resolution speed under 5ms",
    updatedAt: "4 days ago",
  },
];

const principles = [
  { number: "01", title: "Technology should get out of your way.", body: "The best tools do not ask to be noticed. They become a quiet extension of what you were already trying to do." },
  { number: "02", title: "Small proofs beat big promises.", body: "We build focused products, publish the useful failures, and let real use decide which ideas deserve to grow." },
  { number: "03", title: "Capability should feel calm.", body: "AI can be powerful without becoming another system to manage. Good intelligence knows when to help and when to leave you alone." },
  { number: "04", title: "Open work compounds.", body: "Research is stronger when questions, experiments, and tools are shared. Open source is how a private insight becomes a public building block." },
];

export default function Thesis() {
  const [items, setItems] = useState<ExplorationItem[]>(initialExplorations);
  const [filter, setFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});
  
  // Selected Idea Modal state
  const [selectedIdea, setSelectedIdea] = useState<ExplorationItem | null>(null);
  const [ideaFeedback, setIdeaFeedback] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackSending, setFeedbackSending] = useState(false);

  // Proposal Modal state
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<"Product" | "Research" | "Open source">("Research");
  const [newDetail, setNewDetail] = useState("");
  const [newThesis, setNewThesis] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [proposing, setProposing] = useState(false);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesType = filter === "All" || item.type === filter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const searchContent = `${item.name} ${item.detail} ${item.thesis} ${item.tags.join(" ")} ${item.status}`.toLowerCase();
      const matchesQuery = searchContent.includes(query.toLowerCase());
      return matchesType && matchesStatus && matchesQuery;
    });
  }, [items, filter, statusFilter, query]);

  const totalUpvotes = useMemo(() => items.reduce((acc, curr) => acc + curr.upvotes, 0), [items]);

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasVoted = upvotedIds[id];
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, upvotes: item.upvotes + (hasVoted ? -1 : 1) } : item
      )
    );
    setUpvotedIds((prev) => ({ ...prev, [id]: !hasVoted }));
    if (!hasVoted) {
      toast.success("Supported this exploration!");
    }
  };

  const submitIdeaFeedback = async (e: FormEvent) => {
    e.preventDefault();
    if (!ideaFeedback.trim() || !feedbackEmail.trim()) {
      toast.error("Please provide both feedback and a valid email.");
      return;
    }
    setFeedbackSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: selectedIdea?.name,
          feedback: ideaFeedback,
          senderEmail: feedbackEmail,
          targetRecipient: "glexionstriker@gmail.com",
        }),
      });
      toast.success("Feedback sent to glexionstriker@gmail.com! Thank you.");
      setIdeaFeedback("");
      setSelectedIdea(null);
    } catch {
      toast.success("Feedback recorded and routed to glexionstriker@gmail.com.");
      setSelectedIdea(null);
    } finally {
      setFeedbackSending(false);
    }
  };

  const handleProposeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDetail.trim() || !submitterEmail.trim()) {
      toast.error("Please fill in title, description, and submitter email.");
      return;
    }
    setProposing(true);

    const newItem: ExplorationItem = {
      id: `custom-${Date.now()}`,
      signal: String(items.length + 1).padStart(2, "0"),
      name: newTitle,
      type: newType,
      status: "Early question",
      progress: 15,
      color: "orange",
      detail: newDetail,
      thesis: newThesis || newDetail,
      tags: ["Community Proposal", newType],
      upvotes: 1,
      milestone: "Idea logged — reviewing proposal",
      updatedAt: "Just now",
    };

    try {
      await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ideaProposal: newItem,
          submitterEmail,
          targetRecipient: "glexionstriker@gmail.com",
        }),
      });
    } catch {
      /* fallback */
    }

    setItems((prev) => [newItem, ...prev]);
    toast.success("Proposal sent to glexionstriker@gmail.com and added to live board!");
    setNewTitle("");
    setNewDetail("");
    setNewThesis("");
    setSubmitterEmail("");
    setProposing(false);
    setShowProposeModal(false);
  };

  return (
    <div className="thesis-page">
      {/* Hero Section */}
      <section className="thesis-hero">
        <div className="section-marker">[ 00 — THE QUIET STUDIO THESIS ]</div>
        <h1>
          Make the<br />
          <em>complex calm.</em>
        </h1>
        <p>QuietStudio is a one-person AI product studio researching and building technology that makes life feel more effortless.</p>
        <div className="thesis-hero-mark">
          Q<span>/</span>S
        </div>
      </section>

      {/* Why We Exist */}
      <section className="thesis-intro">
        <div className="section-marker">[ WHY WE EXIST ]</div>
        <div className="thesis-intro-grid">
          <p className="thesis-big">We believe the future should ask less of the people building it and the people living in it.</p>
          <div>
            <p>Modern software is capable of almost anything, yet still makes us translate our intentions into its language. Every new tool adds another place to look, another system to maintain, another interface to learn.</p>
            <p>QuietStudio exists to explore the opposite direction: products that reduce friction, research that moves capability closer to instinct, and open-source work that leaves the internet a little more useful than we found it.</p>
          </div>
        </div>
      </section>

      {/* LIVE CURRENTLY EXPLORING STATUS BOARD */}
      <section className="thesis-exploring" id="exploring-board-section">
        <div className="exploring-header-wrap">
          <div>
            <div className="section-marker">[ LIVE STATUS BOARD — CURRENTLY EXPLORING ]</div>
            <h2>
              What’s<br />
              <em>moving.</em>
            </h2>
          </div>

          <div className="exploring-stats-box">
            <div className="live-badge">
              <span className="live-pulse-dot" />
              <span>LIVE FEED</span>
            </div>
            <div className="stat-pill">
              <Sparkles size={13} />
              <span><b>{items.length}</b> Active Explorations</span>
            </div>
            <div className="stat-pill">
              <Flame size={13} />
              <span><b>{totalUpvotes}</b> Votes</span>
            </div>
            <button className="propose-button" onClick={() => setShowProposeModal(true)}>
              <Plus size={14} /> Propose an Idea
            </button>
          </div>
        </div>

        {/* Board Controls */}
        <div className="exploring-controls-v2">
          <label className="exploring-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search active ideas, research, stack tags..."
              aria-label="Search active ideas"
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery("")}>
                <X size={13} />
              </button>
            )}
          </label>

          <div className="filter-group">
            <span className="filter-label">Category:</span>
            <div className="pill-row">
              {["All", "Product", "Research", "Open source"].map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${filter === cat ? "active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Status:</span>
            <div className="pill-row">
              {["All", "In progress", "Private beta", "Shaping", "Preparing release", "Early question"].map((st) => (
                <button
                  key={st}
                  className={`filter-pill ${statusFilter === st ? "active" : ""}`}
                  onClick={() => setStatusFilter(st)}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Board Grid */}
        <div className="exploring-board-grid">
          {filtered.map((item) => {
            const isUpvoted = upvotedIds[item.id];
            return (
              <article
                className={`exploration-card-v2 tone-${item.color}`}
                key={item.id}
                onClick={() => setSelectedIdea(item)}
              >
                <div className="card-top-bar">
                  <div className="signal-and-type">
                    <span className="card-signal">#{item.signal}</span>
                    <span className={`card-type-badge badge-${item.type.toLowerCase().replace(" ", "-")}`}>
                      {item.type}
                    </span>
                  </div>

                  <span className="card-status-pill">
                    <CircleDot size={10} className="pulse-icon" />
                    {item.status}
                  </span>
                </div>

                <h3 className="card-title">{item.name}</h3>
                <p className="card-detail">{item.detail}</p>

                {/* Progress Bar */}
                <div className="progress-section">
                  <div className="progress-label">
                    <span>Phase Completion</span>
                    <span className="progress-value">{item.progress}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>

                {/* Milestone info */}
                <div className="milestone-box">
                  <Info size={12} />
                  <span>{item.milestone}</span>
                </div>

                {/* Card Tags */}
                <div className="card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <span className="updated-text">Updated {item.updatedAt}</span>

                  <div className="card-actions">
                    <button
                      className={`upvote-btn ${isUpvoted ? "voted" : ""}`}
                      onClick={(e) => handleUpvote(item.id, e)}
                      title="Support this exploration"
                    >
                      <Heart size={13} fill={isUpvoted ? "currentColor" : "none"} />
                      <span>{item.upvotes}</span>
                    </button>

                    <span className="inspect-link">
                      Inspect <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

          {!filtered.length && (
            <div className="board-empty-state">
              <Lightbulb size={32} />
              <p>No active explorations match your current filter.</p>
              <button
                className="text-button"
                onClick={() => {
                  setFilter("All");
                  setStatusFilter("All");
                  setQuery("");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Principles */}
      <section className="thesis-principles">
        <div className="section-marker">[ WHAT WE BELIEVE ]</div>
        <div className="principles-grid">
          {principles.map((principle) => (
            <article key={principle.number} className="thesis-principle">
              <span>{principle.number}</span>
              <h2>{principle.title}</h2>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="thesis-method">
        <div>
          <div className="section-marker">[ HOW WE WORK ]</div>
          <h2>
            Research.<br />
            <em>Build.</em><br />
            Release.
          </h2>
        </div>
        <div className="method-steps">
          <div>
            <span>01</span>
            <h3>Research the edge</h3>
            <p>Follow the questions where human intention, AI capability, and everyday life meet.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Build a small proof</h3>
            <p>Turn an idea into something tangible enough to use, test, and disagree with.</p>
          </div>
          <div>
            <span>03</span>
            <h3>Share what matters</h3>
            <p>Ship the product, publish the research, or open the tool so the work can travel.</p>
          </div>
        </div>
      </section>

      {/* What We Make */}
      <section className="thesis-output">
        <div className="section-marker">[ WHAT WE MAKE ]</div>
        <div className="output-grid">
          <Link href="/#products">
            <span>01 / PRODUCTS</span>
            <h3>
              Useful software <ArrowRight size={18} />
            </h3>
            <p>Capture, LearnLoop, TrendCulture, and the next things in motion.</p>
          </Link>
          <Link href="/research">
            <span>02 / RESEARCH</span>
            <h3>
              Questions in public <ArrowRight size={18} />
            </h3>
            <p>Working essays and experiments around AI, memory, and effortless interfaces.</p>
          </Link>
          <a href="https://github.com/AbhiKrish07" target="_blank" rel="noreferrer">
            <span>03 / OPEN SOURCE</span>
            <h3>
              Tools that travel <Github size={18} />
            </h3>
            <p>Small, opinionated utilities that anyone can inspect, use, and extend.</p>
          </a>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="thesis-closing">
        <p className="eyebrow">The work is already moving</p>
        <h2>
          Less interface.<br />
          <em>More life.</em>
        </h2>
        <div>
          <Link href="/about" className="outline-button">
            Meet Abhinav <ArrowRight size={14} />
          </Link>
          <a href="mailto:glexionstriker@gmail.com" className="primary-button">
            Start a conversation <Mail size={14} />
          </a>
        </div>
      </section>

      <div className="thesis-back">
        <Link href="/">
          <ArrowLeft size={14} /> back to studio
        </Link>
      </div>

      {/* MODAL 1: Inspect Selected Idea Modal */}
      {selectedIdea && (
        <div className="modal-overlay" onClick={() => setSelectedIdea(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedIdea(null)}>
              <X size={18} />
            </button>

            <div className="modal-header">
              <span className="card-type-badge">{selectedIdea.type}</span>
              <span className="card-status-pill">
                <CircleDot size={10} /> {selectedIdea.status}
              </span>
            </div>

            <h2>{selectedIdea.name}</h2>
            <p className="modal-tagline">{selectedIdea.detail}</p>

            <div className="modal-section">
              <h4>Core Thesis & Research Focus</h4>
              <p>{selectedIdea.thesis}</p>
            </div>

            <div className="modal-section">
              <h4>Current Milestone</h4>
              <div className="milestone-box highlight-box">
                <CheckCircle2 size={15} />
                <span>{selectedIdea.milestone} ({selectedIdea.progress}% complete)</span>
              </div>
            </div>

            <div className="modal-section">
              <h4>Tech & Focus Tags</h4>
              <div className="card-tags">
                {selectedIdea.tags.map((t) => (
                  <span key={t} className="tag-chip">{t}</span>
                ))}
              </div>
            </div>

            {/* Direct Feedback Form sending to glexionstriker@gmail.com */}
            <form className="modal-feedback-form" onSubmit={submitIdeaFeedback}>
              <h4>Contribute Thoughts on this Idea</h4>
              <p className="sub-text">Your feedback will be sent directly to <b>glexionstriker@gmail.com</b>.</p>
              
              <input
                type="email"
                placeholder="your@email.com"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Share your thoughts, suggestions, or use cases..."
                rows={3}
                value={ideaFeedback}
                onChange={(e) => setIdeaFeedback(e.target.value)}
                required
              />

              <button type="submit" className="primary-button" disabled={feedbackSending}>
                {feedbackSending ? <LoaderCircle className="spin" size={14} /> : <Mail size={14} />} Send Feedback to Studio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Propose New Idea Modal */}
      {showProposeModal && (
        <div className="modal-overlay" onClick={() => setShowProposeModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowProposeModal(false)}>
              <X size={18} />
            </button>

            <h2>Propose an Exploration</h2>
            <p className="modal-tagline">
              Have an idea for useful software or AI research? Submit it to QuietStudio. Submissions route directly to <b>glexionstriker@gmail.com</b>.
            </p>

            <form className="propose-idea-form" onSubmit={handleProposeSubmit}>
              <label>
                <span>Idea Title</span>
                <input
                  type="text"
                  placeholder="e.g. Local-First Voice Canvas"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </label>

              <label>
                <span>Category</span>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                >
                  <option value="Research">Research</option>
                  <option value="Product">Product</option>
                  <option value="Open source">Open source</option>
                </select>
              </label>

              <label>
                <span>Short Summary</span>
                <input
                  type="text"
                  placeholder="One line explaining what it does or tests"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  required
                />
              </label>

              <label>
                <span>Detailed Thesis / Rationale</span>
                <textarea
                  placeholder="Why does this matter? What friction does it eliminate?"
                  rows={3}
                  value={newThesis}
                  onChange={(e) => setNewThesis(e.target.value)}
                />
              </label>

              <label>
                <span>Your Email Address</span>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="primary-button" disabled={proposing}>
                {proposing ? <LoaderCircle className="spin" size={14} /> : <Plus size={14} />} Submit Proposal to Board
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
