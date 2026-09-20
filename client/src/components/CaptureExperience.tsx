import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code,
  Command,
  Copy,
  Cpu,
  Download,
  FileText,
  Filter,
  Github,
  Globe,
  Layers,
  Lock,
  Mic,
  MoveUpRight,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trash2,
  Upload,
  User,
  Wifi,
  WifiOff,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { playClick, playSuccess, playTick } from "@/lib/sound";

// ==========================================
// TYPES & DATA STRUCTURES FOR CAPTURE OS
// ==========================================

export interface CaptureItem {
  id: string;
  type: "PDF" | "SCREENSHOT" | "VOICE" | "NOTES" | "LINK";
  title: string;
  excerpt: string;
  workspace: string; // e.g., "Trip to Goa", "Developer Workspace", etc.
  tags: string[];
  entities: string[];
  date: string;
  synced: boolean;
  contradictionAlert?: string;
}

const defaultGoaCaptures: CaptureItem[] = [
  {
    id: "cap-goa-1",
    type: "PDF",
    title: "Flight Confirmation PDF (Air India AI-842)",
    excerpt: "Goa trip record: Flight Confirmation PDF (Air India AI-842)",
    workspace: "Trip to Goa",
    tags: ["TRIP TO GOA", "@GOA TRIP", "@AIR INDIA", "+2"],
    entities: ["@Goa Trip", "@Air India", "@Oct 13"],
    date: "Sep 1, 2026",
    synced: true,
    contradictionAlert:
      "Flight AI-842 scheduled arrival is 14:30 IST on Oct 13, but Scooter Rental booking starts at 12:00 IST.",
  },
  {
    id: "cap-goa-2",
    type: "SCREENSHOT",
    title: "WhatsApp Group Chat Screenshot: Ticket Reschedule to Oct 13",
    excerpt: "Goa trip record: WhatsApp Group Chat Screenshot: Ticket Reschedule to Oct 13",
    workspace: "Trip to Goa",
    tags: ["TRIP TO GOA", "@GOA TRIP", "@AIR INDIA", "+2"],
    entities: ["@Goa Trip", "@Oct 13"],
    date: "Sep 2, 2026",
    synced: true,
  },
  {
    id: "cap-goa-3",
    type: "VOICE",
    title: "Trip Budget & Scooter Rental Audio Memo",
    excerpt: "Goa trip record: Trip Budget & Scooter Rental Audio Memo",
    workspace: "Trip to Goa",
    tags: ["TRIP TO GOA", "@GOA TRIP", "@AIR INDIA", "+2"],
    entities: ["@Goa Trip"],
    date: "Sep 3, 2026",
    synced: true,
  },
  {
    id: "cap-goa-4",
    type: "PDF",
    title: "Taj Exotica Hotel Reservation Voucher (Oct 13 - Oct 16)",
    excerpt: "Goa trip record: Taj Exotica Hotel Reservation Voucher (Oct 13 - Oct 16)",
    workspace: "Trip to Goa",
    tags: ["TRIP TO GOA", "@GOA TRIP", "@AIR INDIA", "+2"],
    entities: ["@Goa Trip", "@Taj Exotica", "@Oct 13"],
    date: "Sep 4, 2026",
    synced: true,
  },
  {
    id: "cap-goa-5",
    type: "NOTES",
    title: "South Goa Beach Shack Recommendations & Cash Payment Notes",
    excerpt: "Goa trip record: South Goa Beach Shack Recommendations & Cash Payment Notes",
    workspace: "Trip to Goa",
    tags: ["TRIP TO GOA", "@GOA TRIP", "@AIR INDIA", "+2"],
    entities: ["@Goa Trip"],
    date: "Sep 5, 2026",
    synced: true,
  },
  {
    id: "cap-goa-6",
    type: "NOTES",
    title: "Royal Enfield Classic 350 Rental Agreement near Dabolim",
    excerpt: "Goa trip record: Royal Enfield Classic 350 Rental Agreement near Dabolim",
    workspace: "Trip to Goa",
    tags: ["TRIP TO GOA", "@GOA TRIP", "@AIR INDIA", "+2"],
    entities: ["@Goa Trip"],
    date: "Sep 6, 2026",
    synced: true,
  },
];

const defaultDevCaptures: CaptureItem[] = [
  {
    id: "cap-dev-1",
    type: "NOTES",
    title: "PyTorch Isotropic Whitening Benchmark Strategy",
    excerpt: "Developer Workspace: Whitening alpha parameter tuning (α = 0.85) on 128k context dataset",
    workspace: "Developer Workspace",
    tags: ["DEV", "@REDIS", "@CI-CD", "+1"],
    entities: ["@Redis", "@CI-CD"],
    date: "Sep 10, 2026",
    synced: true,
  },
  {
    id: "cap-dev-2",
    type: "PDF",
    title: "SCTM Architecture Whitepaper Draft v2.4",
    excerpt: "Developer Workspace: Isotropic Whitening and Discrete Authority Gating mathematical proofs",
    workspace: "Developer Workspace",
    tags: ["DEV", "@ARXIV", "@MICROPROCESSORS"],
    entities: ["@arXiv", "@Microprocessors"],
    date: "Sep 12, 2026",
    synced: true,
  },
];

// ==========================================
// 1. UNIFIED 3D HERO SECTION (T3 CODE STYLE)
// With cursor parallax floating icons & 3D MacBook centerpiece
// ==========================================

export function CaptureHeroSection() {
  const [email, setEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Parallax Cursor Tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40; // +/- 20px offset
      const y = (e.clientY / innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Please enter a valid email address.");
      return;
    }
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, page: "T3 Style Capture Hero", target: "glexionstriker@gmail.com" }),
      });
    } catch {
      /* fallback */
    }
    setWaitlistSubmitted(true);
    playSuccess();
    toast("You're on the Capture private beta waitlist!");
  };

  return (
    <section className="t3-hero-master-wrap">
      {/* Dark Mesh Grid Background Overlay */}
      <div className="t3-grid-backdrop" aria-hidden="true" />

      {/* Floating 3D Ecosystem Module Cards (Mouse Parallax Animated) */}
      <div className="floating-icons-container">
        {/* Top-Left: LearnLoop */}
        <div
          className="t3-float-icon icon-learnloop"
          style={{
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0) rotate(-6deg)`,
          }}
        >
          <div className="float-icon-inner glow-orange">
            <Layers size={22} className="text-orange" />
            <span>LearnLoop</span>
          </div>
        </div>

        {/* Top-Right: MCP & Claude Protocol */}
        <div
          className="t3-float-icon icon-mcp"
          style={{
            transform: `translate3d(${mousePos.x * -0.9}px, ${mousePos.y * 0.7}px, 0) rotate(8deg)`,
          }}
        >
          <div className="float-icon-inner glow-cyan">
            <Terminal size={22} className="text-cyan" />
            <span>MCP Sync</span>
          </div>
        </div>

        {/* Middle-Left: Contradiction Engine */}
        <div
          className="t3-float-icon icon-contradictions"
          style={{
            transform: `translate3d(${mousePos.x * 1.1}px, ${mousePos.y * -0.8}px, 0) rotate(4deg)`,
          }}
        >
          <div className="float-icon-inner glow-rose">
            <ShieldCheck size={22} className="text-rose" />
            <span>Sanity Gate</span>
          </div>
        </div>

        {/* Middle-Right: Zen AI Local */}
        <div
          className="t3-float-icon icon-zen"
          style={{
            transform: `translate3d(${mousePos.x * -1.2}px, ${mousePos.y * -1.1}px, 0) rotate(-7deg)`,
          }}
        >
          <div className="float-icon-inner glow-amber">
            <Cpu size={22} className="text-amber" />
            <span>Zen Local</span>
          </div>
        </div>

        {/* Bottom-Left: Ask & Semantic Search */}
        <div
          className="t3-float-icon icon-search"
          style={{
            transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 1.2}px, 0) rotate(-4deg)`,
          }}
        >
          <div className="float-icon-inner glow-blue">
            <Search size={22} className="text-blue" />
            <span>⌘K Search</span>
          </div>
        </div>

        {/* Bottom-Right: Whiteboard Workspaces */}
        <div
          className="t3-float-icon icon-whiteboard"
          style={{
            transform: `translate3d(${mousePos.x * -0.7}px, ${mousePos.y * 0.9}px, 0) rotate(5deg)`,
          }}
        >
          <div className="float-icon-inner glow-purple">
            <FileText size={22} className="text-purple" />
            <span>Whiteboards</span>
          </div>
        </div>
      </div>

      {/* Hero Headline & Subtitle (Centered like T3 Code) */}
      <div className="t3-hero-centered-content">
        <div className="hero-status-pill">
          <span className="pulse-dot" />
          <span>CAPTURE OS — MEMORY PLATFORM</span>
        </div>

        <h1 className="t3-hero-headline">
          Capture anything.<br />
          <em className="orange-text">Find everything later.</em>
        </h1>

        <p className="t3-hero-subtitle">
          The newest memory platform for human & AI intelligence. Import PDFs, voice memos, screenshots, and raw thoughts. Connect them and get the job done directly through LearnLoop, Zen and your whiteboards.
        </p>

        {/* CTA Actions Bar */}
        <div className="t3-hero-actions-group">
          {waitlistSubmitted ? (
            <div className="waitlist-success-pill">
              <CheckCircle2 size={16} className="text-orange" />
              <span>You're reserved on the private beta signal list!</span>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="t3-cta-form">
              <div className="t3-input-box">
                <Search size={14} className="input-search-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <button type="submit" className="t3-primary-cta">
                 Request Access <ArrowRight size={14} />
              </button>
              <Link href="/products/capture" className="t3-learn-more-btn">
                Learn More <ArrowRight size={14} />
              </Link>
            </form>
          )}

          <div className="t3-sub-links-row">
            <a href="https://github.com/AbhiKrish07" target="_blank" rel="noreferrer" className="t3-text-link">
              <Github size={13} /> Steal our code (legally) ↗
            </a>
            <span className="dot-divider">•</span>
            <span className="t3-platform-tag">Currently in Testing</span>
          </div>
        </div>
      </div>

      {/* Centerpiece 3D MacBook Frame holding THIS IS CAPTURE OS */}
      <div className="t3-macbook-stage">
        <div className="macbook-3d-chassis">
          {/* MacBook Screen Bezel & Lid */}
          <div className="macbook-3d-screen">
            <div className="macbook-camera-dot" />
            <div className="macbook-screen-glass">
              {/* THIS IS CAPTURE Live OS Embedded Inside MacBook Display */}
              <CaptureOSWorkspaceEmbedded />
            </div>
          </div>
          {/* MacBook Aluminum Base & Trackpad Notch */}
          <div className="macbook-3d-base">
            <div className="macbook-notch" />
          </div>
          <div className="macbook-3d-shadow" />
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 2. ECOSYSTEM SECTION: CAPTURE AS THE BASE
// ==========================================

export function CaptureEcosystemSection() {
  const [selectedModule, setSelectedModule] = useState<string>("learnloop");

  const modules = [
    {
      id: "learnloop",
      name: "LearnLoop App",
      badge: "THINKING NOTEBOOK",
      desc: "Turns raw captured research notes and PDFs into active recall concept cards and knowledge velocity metrics.",
      icon: Layers,
    },
    {
      id: "contradictions",
      name: "Contradiction Engine",
      badge: "REAL-TIME SANITY CHECK",
      desc: "Cross-references all newly ingested items against your existing vector store to instantly flag conflicting dates, locations, or facts.",
      icon: ShieldCheck,
    },
    {
      id: "semantic-search",
      name: "Ask & Semantic Search",
      badge: "UNIVERSAL ⌘K QUERY",
      desc: "Natural language query interface across all your whiteboards, PDFs, screenshots, and audio memos with 0.2ms local latency.",
      icon: Search,
    },
    {
      id: "mcp-hub",
      name: "MCP & Sync Hub",
      badge: "MODEL CONTEXT PROTOCOL",
      desc: "Exposes Capture's local vector memory directly to Claude Desktop, Cursor IDE, ChatGPT, and custom AI subagents.",
      icon: Terminal,
    },
    {
      id: "spatial-whiteboards",
      name: "Spatial Workspaces",
      badge: "DYNAMIC WHITEBOARD PAGES",
      desc: "Dedicated context containers (e.g. Trip to Goa, AI Research Lab, AUTONAV) that partition memory into clear mental workspaces.",
      icon: FileText,
    },
  ];

  return (
    <section className="capture-ecosystem-wrap">
      <div className="section-marker">[ 02 — THE CAPTURE ECOSYSTEM ]</div>
      <h2 className="ecosystem-heading">
        Capture is the base.<br />
        <em className="orange-text">Everything else is an app on top.</em>
      </h2>
      <p className="ecosystem-lead">
        Rather than building separate, disconnected tools, Capture acts as your central semantic memory layer.
        Modules like LearnLoop, Contradiction Detection, and MCP protocol hubs operate as lightweight views built on top
        of Capture's unified memory.
      </p>

      {/* Interactive Architecture Diagram */}
      <div className="ecosystem-diagram-container">
        {/* Layer 1: Apps & Modules Layer */}
        <div className="diagram-apps-layer">
          <div className="layer-title-bar">
            <span>LAYER 01 / MODULES & APPS (VIEW LAYER)</span>
            <span>BUILT ON CAPTURE MEMORY</span>
          </div>

          <div className="diagram-module-grid">
            {modules.map((m) => {
              const IconComp = m.icon;
              const isSelected = selectedModule === m.id;
              return (
                <div
                  key={m.id}
                  className={`diagram-module-card ${isSelected ? "selected-module" : ""}`}
                  onClick={() => {
                    playTick();
                    setSelectedModule(m.id);
                  }}
                >
                  <div className="module-head">
                    <IconComp size={16} className="module-icon" />
                    <span className="module-badge">{m.badge}</span>
                  </div>
                  <h4 className="module-name">{m.name}</h4>
                  <p className="module-desc">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Signal Connection Lines */}
        <div className="diagram-connector-row">
          <div className="connector-line line-pulse" />
          <div className="connector-hub-pill">
            <RefreshCw size={13} className="spin-slow" />
            <span>LOCAL VECTOR INTERACTION BUS</span>
          </div>
          <div className="connector-line line-pulse" />
        </div>

        {/* Layer 0: Capture Foundation Platform */}
        <div className="diagram-base-layer">
          <div className="base-platform-card">
            <div className="base-badge">
              <span className="pulse-dot" />
              <span>LAYER 00 / CAPTURE BASE PLATFORM</span>
            </div>
            <h3>CAPTURE UNIFIED VECTOR & SEMANTIC MEMORY OS</h3>
            <p>
              Local SQLite Vector DB · Isotropic Whitening Matrix · Encrypted Ingestion Engine for PDF, Screenshots, Audio & Web
            </p>
            <div className="base-tech-chips">
              <span>● Isotropic Whitening α=0.85</span>
              <span>● Offline Airplane Mode</span>
              <span>● Multi-Modal Parser</span>
              <span>● MCP Protocol Server</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. THIS IS CAPTURE OS WORKSPACE EMBEDDED
// Pixel-perfect replica matching user screenshot
// ==========================================

export function CaptureOSWorkspaceEmbedded() {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeWorkspace, setActiveWorkspace] = useState("Trip to Goa");
  const [activeEntity, setActiveEntity] = useState("All (1205)");
  const [activeNavTab, setActiveNavTab] = useState("Home");
  const [ingestInput, setIngestInput] = useState("");
  const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState("Trip to Goa");
  const [captures, setCaptures] = useState<CaptureItem[]>(defaultGoaCaptures);

  const workspaceCaptures =
    activeWorkspace === "Trip to Goa"
      ? captures
      : activeWorkspace === "Developer Workspace"
      ? defaultDevCaptures
      : [];

  const entitiesList = [
    "All (1205)",
    "@Goa Trip",
    "@Air India",
    "@Taj Exotica",
    "@Oct 13",
    "@Redis",
    "@CI-CD",
    "@Microprocessors",
    "@Attendance",
    "@arXiv",
  ];

  const handleInstantIngest = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!ingestInput.trim()) {
      toast("Type a thought, paste a link, or note a fragment before ingesting.");
      return;
    }

    playClick();
    const newCap: CaptureItem = {
      id: `cap-${Date.now()}`,
      type: ingestInput.toLowerCase().includes("pdf") ? "PDF" : "NOTES",
      title: ingestInput.slice(0, 48) + (ingestInput.length > 48 ? "..." : ""),
      excerpt: `${selectedCategoryDropdown}: ${ingestInput}`,
      workspace: selectedCategoryDropdown,
      tags: [selectedCategoryDropdown.toUpperCase().replace(/\s+/g, " "), "@GOA TRIP", "+1"],
      entities: ["@Goa Trip", "@Oct 13"],
      date: "Just now",
      synced: !airplaneMode,
    };

    setCaptures([newCap, ...captures]);
    setIngestInput("");
    playSuccess();
    toast(`Ingested into ${selectedCategoryDropdown}!`);
  };

  const filteredCaptures = workspaceCaptures.filter((c) => {
    const matchSearch =
      `${c.title} ${c.excerpt} ${c.tags.join(" ")}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchEntity =
      activeEntity === "All (1205)" ||
      c.entities.includes(activeEntity) ||
      (activeEntity === "@Goa Trip" && c.tags.includes("@GOA TRIP"));
    return matchSearch && matchEntity;
  });

  return (
    <div className="capture-app-window" id="this-is-capture-os">
      {/* Sidebar (Left) */}
      <aside className="capture-sidebar">
        <div className="sidebar-brand">
          <span className="brand-star">✶</span>
          <div className="brand-copy">
            <h2>CAPTURE.</h2>
            <p>Your scattered information, finally connected.</p>
          </div>
        </div>

        <div className="sidebar-search-wrap">
          <Search size={13} className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Deep semantic search... (⌘K)"
          />
        </div>

        <nav className="sidebar-nav-menu">
          <button
            className={`nav-item ${activeNavTab === "Home" ? "active" : ""}`}
            onClick={() => {
              playClick();
              setActiveNavTab("Home");
            }}
          >
            <span className="nav-label">Home</span>
            <span className="nav-badge count-badge">1205</span>
          </button>

          <button
            className={`nav-item ${activeNavTab === "Contradictions" ? "active" : ""}`}
            onClick={() => {
              playClick();
              setActiveNavTab("Contradictions");
            }}
          >
            <span className="nav-label">Contradictions</span>
            <span className="nav-badge alert-badge">1 Active</span>
          </button>

          <button
            className={`nav-item ${activeNavTab === "Ask" ? "active" : ""}`}
            onClick={() => {
              playClick();
              setActiveNavTab("Ask");
            }}
          >
            <span className="nav-label">Ask & Semantic Search</span>
          </button>

          <button
            className={`nav-item ${activeNavTab === "Analytics" ? "active" : ""}`}
            onClick={() => {
              playClick();
              setActiveNavTab("Analytics");
            }}
          >
            <span className="nav-label">Analytics & Metrics</span>
          </button>

          <button
            className={`nav-item ${activeNavTab === "MCP" ? "active" : ""}`}
            onClick={() => {
              playClick();
              setActiveNavTab("MCP");
            }}
          >
            <span className="nav-label">MCP & Sync Hub</span>
          </button>
        </nav>

        <div className="sidebar-whiteboard-section">
          <div className="whiteboard-header">
            <span>WHITEBOARD PAGES</span>
            <button
              className="add-page-btn"
              onClick={() => {
                playClick();
                toast("Created new Whiteboard page: Research Sprint");
              }}
            >
              + New Page
            </button>
          </div>

          <div className="whiteboard-pages-list">
            {[
              "Trip to Goa",
              "Developer Workspace",
              "AI Research Lab",
              "Semester 3 (Student)",
              "AUTONAV Project",
            ].map((page) => (
              <button
                key={page}
                className={`whiteboard-page-item ${activeWorkspace === page ? "active" : ""}`}
                onClick={() => {
                  playClick();
                  setActiveWorkspace(page);
                }}
              >
                <span>{page}</span>
                {activeWorkspace === page && <X size={12} className="close-page-icon" />}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-user-footer">
          <div className="user-avatar">
            <User size={14} />
          </div>
          <div className="user-info">
            <span className="user-name">Abhinav Krish</span>
            <span className="user-tier">Supermemory Context Tier</span>
          </div>
        </div>
      </aside>

      {/* Main Content Pane (Right) */}
      <main className="capture-main-pane">
        <header className="main-top-bar">
          <h1 className="pane-title">Capture anything. Find everything later.</h1>

          <button
            className={`airplane-mode-toggle ${airplaneMode ? "mode-on" : "mode-off"}`}
            onClick={() => {
              playClick();
              setAirplaneMode(!airplaneMode);
              toast(
                airplaneMode
                  ? "Airplane Mode OFF: Cloud vector sync active."
                  : "Airplane Mode ON: 100% Local encrypted storage active."
              );
            }}
          >
            {airplaneMode ? <WifiOff size={13} /> : <Wifi size={13} />}
            <span>Airplane Mode: <b>{airplaneMode ? "ON" : "OFF"}</b></span>
          </button>
        </header>

        {activeNavTab === "Contradictions" && (
          <div className="contradiction-banner">
            <div className="banner-title">
              <ShieldCheck size={16} className="text-orange" />
              <span>1 ACTIVE CONTRADICTION DETECTED</span>
            </div>
            <p>
              <b>Flight Air India AI-842:</b> Scheduled arrival at 14:30 IST (Oct 13)<br />
              <b>Scooter Rental:</b> Pickup requested at 12:00 IST (Oct 13)<br />
              <i>Recommendation: Adjust scooter pickup time to 15:30 IST at Dabolim Airport.</i>
            </p>
          </div>
        )}

        <div className="ingest-box-container">
          <textarea
            rows={3}
            value={ingestInput}
            onChange={(e) => setIngestInput(e.target.value)}
            placeholder="Type thoughts, paste links, or drag & drop any file (PDF, image, audio, doc)..."
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                handleInstantIngest();
              }
            }}
          />

          <div className="ingest-actions-bar">
            <button
              type="button"
              className="upload-file-btn"
              onClick={() => {
                playClick();
                toast("Simulated File Upload: Select PDF, PNG, or WAV file");
              }}
            >
              Upload Any File
            </button>
            <span className="drop-hint">or drop images / audio / documents</span>

            <div className="ingest-right-controls">
              <div className="select-workspace-dropdown">
                <select
                  value={selectedCategoryDropdown}
                  onChange={(e) => setSelectedCategoryDropdown(e.target.value)}
                >
                  <option value="Trip to Goa">Trip to Goa</option>
                  <option value="Developer Workspace">Developer Workspace</option>
                  <option value="AI Research Lab">AI Research Lab</option>
                  <option value="Semester 3 (Student)">Semester 3 (Student)</option>
                  <option value="AUTONAV Project">AUTONAV Project</option>
                </select>
                <ChevronDown size={12} className="dropdown-icon" />
              </div>

              <button
                type="button"
                className="instant-ingest-btn"
                onClick={() => handleInstantIngest()}
              >
                Instant Ingest
              </button>
            </div>
          </div>
        </div>

        <div className="entities-filter-bar">
          <span className="entities-label">AI Extracted Entities:</span>
          <div className="chips-scroll-wrap">
            {entitiesList.map((ent) => (
              <button
                key={ent}
                className={`entity-chip ${activeEntity === ent ? "active" : ""}`}
                onClick={() => {
                  playTick();
                  setActiveEntity(ent);
                }}
              >
                {ent}
              </button>
            ))}
          </div>
        </div>

        <div className="captures-feed-container">
          <div className="feed-header">
            <h2>Recent Captures Feed</h2>
            <div className="feed-count">
              <span>
                Showing {filteredCaptures.length} of 1205 captures
              </span>
              <button
                className="show-all-btn"
                onClick={() => {
                  playClick();
                  setActiveEntity("All (1205)");
                  setSearchQuery("");
                }}
              >
                Show All
              </button>
            </div>
          </div>

          <div className="captures-cards-grid">
            {filteredCaptures.map((item) => (
              <article key={item.id} className="capture-feed-card">
                <div className="card-top-head">
                  <span className="type-badge">{item.type}</span>
                  <span className="synced-badge">
                    {item.synced ? "SYNCED" : "OFFLINE LOCAL"}
                  </span>
                </div>

                <h3 className="card-title">{item.title}</h3>
                <p className="card-excerpt">{item.excerpt}</p>

                <div className="card-bottom-tags">
                  <div className="tags-row">
                    {item.tags.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="card-date">{item.date}</span>
                </div>
              </article>
            ))}

            {filteredCaptures.length === 0 && (
              <div className="feed-empty-state">
                <FileText size={24} className="empty-icon" />
                <p>No captures match entity or search query in {activeWorkspace}.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export function CaptureOSWorkspace() {
  return <CaptureOSWorkspaceEmbedded />;
}
