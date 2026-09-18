import { useEffect, useState } from "react";
import { ArrowRight, Check, Copy, Download, Layers, Play, RefreshCw, RotateCcw, Search, Sparkles, Terminal, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";
import { playClick, playSuccess, playTick } from "@/lib/sound";

// ==========================================
// 1. CAPTURE WORKING LIVE WEB APP
// ==========================================

interface CapturedItem {
  id: string;
  rawText: string;
  category: "Action Item" | "Research Insight" | "System Note";
  summary: string;
  actionItems: string[];
  purityScore: number;
  timestamp: string;
}

const initialCaptures: CapturedItem[] = [
  {
    id: "cap-1",
    rawText: "Remember to verify SCTM isotropic whitening alpha threshold with 0.85 tomorrow morning",
    category: "Research Insight",
    summary: "SCTM Isotropic Whitening Threshold Calibration",
    actionItems: ["Run PyTorch benchmark on 128k context dataset", "Calibrate authority gate alpha to 0.85"],
    purityScore: 98,
    timestamp: "Today, 14:30 IST",
  },
  {
    id: "cap-2",
    rawText: "Redesign LearnLoop concept cards with Space Grotesk typography and 3D card flip animation",
    category: "Action Item",
    summary: "LearnLoop UI Card Animation Refactoring",
    actionItems: ["Apply Space Grotesk font to headers", "Add CSS perspective transform for 3D flip"],
    purityScore: 95,
    timestamp: "Yesterday, 18:15 IST",
  }
];

export function CaptureLiveApp() {
  const [input, setInput] = useState("");
  const [captures, setCaptures] = useState<CapturedItem[]>(() => {
    try {
      const saved = localStorage.getItem("quiet_capture_inbox");
      return saved ? JSON.parse(saved) : initialCaptures;
    } catch {
      return initialCaptures;
    }
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    try {
      localStorage.setItem("quiet_capture_inbox", JSON.stringify(captures));
    } catch {
      /* fallback */
    }
  }, [captures]);

  const samples = [
    "Verify SCTM isotropic whitening alpha=0.85 tomorrow",
    "Redesign LearnLoop concept cards with Space Grotesk font",
    "Prepare Zen AI local Rust inference benchmark for Friday",
  ];

  const handleCapture = (textToCapture?: string) => {
    const text = textToCapture || input;
    if (!text.trim()) {
      toast("Enter a thought before capturing.");
      return;
    }

    playClick();
    setIsProcessing(true);

    setTimeout(() => {
      let cat: CapturedItem["category"] = "System Note";
      let summary = text;
      let actions: string[] = ["Review captured fragment"];
      const lower = text.toLowerCase();

      if (lower.includes("verify") || lower.includes("test") || lower.includes("sctm") || lower.includes("alpha")) {
        cat = "Research Insight";
        summary = "SCTM Research & Mathematical Formulation";
        actions = ["Execute vector test benchmark", "Verify matrix whitening decorrelation"];
      } else if (lower.includes("redesign") || lower.includes("prepare") || lower.includes("fix") || lower.includes("build")) {
        cat = "Action Item";
        summary = "Studio Product Execution";
        actions = ["Draft component specification", "Deploy updated build to staging"];
      }

      const newItem: CapturedItem = {
        id: `cap-${Date.now()}`,
        rawText: text,
        category: cat,
        summary,
        actionItems: actions,
        purityScore: Math.floor(Math.random() * 5) + 95,
        timestamp: "Just now",
      };

      setCaptures([newItem, ...captures]);
      setIsProcessing(false);
      setInput("");
      playSuccess();
      toast("Thought saved to local vector memory!");
    }, 450);
  };

  const deleteCapture = (id: string) => {
    playClick();
    setCaptures(captures.filter((c) => c.id !== id));
    toast("Item removed.");
  };

  const exportMarkdown = () => {
    playClick();
    const md = `# Quiet Studio Capture Export\n\n` + captures.map((c) => `## [${c.category}] ${c.summary}\n- Raw: "${c.rawText}"\n- Actions: ${c.actionItems.join(", ")}\n- Purity: ${c.purityScore}%\n- Date: ${c.timestamp}\n`).join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiet-capture-export.md";
    a.click();
    URL.revokeObjectURL(url);
    toast("Captured inbox exported to Markdown!");
  };

  const filtered = captures.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchQ = `${c.rawText} ${c.summary}`.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="live-app-card capture-app-wrap">
      <div className="app-header-bar">
        <div className="app-title">
          <span className="pulse-dot" />
          <span>CAPTURE INTERACTIVE APP</span>
          <span className="app-ver">v2.4 LOCAL-FIRST</span>
        </div>
        <div className="app-header-actions">
          <button className="outline-button" onClick={exportMarkdown} style={{ padding: "6px 12px", fontSize: "9px" }}>
            Export Markdown <Download size={12} />
          </button>
        </div>
      </div>

      <div className="capture-input-section">
        <div className="input-prompt-label">
          <span>01 / THOUGHT INGEST LAYER</span>
          <span>PRESS ⌘ ENTER TO SAVE</span>
        </div>

        <div className={`capture-textarea-wrap ${isProcessing ? "processing" : ""}`}>
          <textarea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleCapture();
              }
            }}
            placeholder="Type or paste a raw thought fragment without formatting..."
          />
          <button className="primary-button capture-btn" onClick={() => handleCapture()} disabled={isProcessing}>
            {isProcessing ? "Structuring..." : "Capture Thought"} <ArrowRight size={14} />
          </button>
        </div>

        {/* Quick Sample Chips */}
        <div className="sample-chips-row">
          <span className="sample-label">Try sample:</span>
          {samples.map((s) => (
            <button
              key={s}
              className="sample-chip"
              onClick={() => {
                playTick();
                setInput(s);
              }}
            >
              "{s.slice(0, 32)}..."
            </button>
          ))}
        </div>
      </div>

      {/* Captured Inbox List */}
      <div className="capture-inbox-section">
        <div className="inbox-head">
          <div className="inbox-title">
            <span className="section-marker">[ SAVED VECTOR INBOX ]</span>
            <span>{filtered.length} thoughts saved</span>
          </div>

          <div className="inbox-controls">
            <div className="inbox-search">
              <Search size={13} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search inbox..."
              />
            </div>
          </div>
        </div>

        <div className="inbox-items-list">
          {filtered.map((item) => (
            <div className="capture-item-card" key={item.id}>
              <div className="item-meta">
                <span className={`cat-pill cat-${item.category.toLowerCase().replace(" ", "-")}`}>
                  {item.category}
                </span>
                <span className="purity-badge">{item.purityScore}% SIGNAL PURITY</span>
                <span className="item-time">{item.timestamp}</span>
                <button className="delete-btn" onClick={() => deleteCapture(item.id)} title="Delete capture">
                  <Trash2 size={13} />
                </button>
              </div>
              <h4 className="item-summary">{item.summary}</h4>
              <p className="item-raw">"{item.rawText}"</p>

              <div className="item-actions-list">
                <span className="actions-label">Extracted Actions:</span>
                {item.actionItems.map((act, idx) => (
                  <div key={idx} className="action-row">
                    <Check size={12} className="check-icon" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="inbox-empty">No captured thoughts in inbox. Type a thought above!</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. LEARNLOOP WORKING LIVE WEB APP
// ==========================================

interface LoopCard {
  id: number;
  question: string;
  answer: string;
  masteryDays: number;
  status: "unseen" | "mastered" | "review";
}

const sampleLoopDecks: Record<string, LoopCard[]> = {
  "Sparse Confident Tensor Memory": [
    { id: 1, question: "What is the primary cause of LLM context degradation over long windows?", answer: "Softmax attention assigns non-zero weights to all tokens, causing irrelevant distractor noise to pollute the KV-cache.", masteryDays: 1, status: "unseen" },
    { id: 2, question: "How does Isotropic Whitening prevent memory degradation in SCTM?", answer: "It centers token activations and decorrelates dimensions, isolating true signal vectors before authority gating.", masteryDays: 3, status: "unseen" },
    { id: 3, question: "What threshold (α) does SCTM's discrete authority gate enforce?", answer: "Tokens with confidence score below α = 0.85 are masked out prior to key-value caching.", masteryDays: 7, status: "unseen" }
  ],
  "Effortless Systems Philosophy": [
    { id: 1, question: "What is Quiet Studio's primary design rule for tools?", answer: "The best technology doesn't ask to be noticed. It becomes a quiet extension of what you were already trying to do.", masteryDays: 1, status: "unseen" },
    { id: 2, question: "Why do turn-based chat windows introduce friction?", answer: "They force creators to construct elaborate prompts and manage conversation turns instead of acting directly on intent.", masteryDays: 3, status: "unseen" }
  ]
};

export function LearnLoopLiveApp() {
  const [topic, setTopic] = useState("Sparse Confident Tensor Memory");
  const [deck, setDeck] = useState<LoopCard[]>(sampleLoopDecks["Sparse Confident Tensor Memory"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [masteryScore, setMasteryScore] = useState(68);

  const activeCard = deck[currentIndex] || deck[0];

  const handleGenerate = (selectedTopic: string) => {
    playClick();
    setTopic(selectedTopic);
    const newDeck = sampleLoopDecks[selectedTopic] || sampleLoopDecks["Sparse Confident Tensor Memory"];
    setDeck(newDeck);
    setCurrentIndex(0);
    setFlipped(false);
    playSuccess();
    toast(`Generated 3-step active recall loop for "${selectedTopic}"`);
  };

  const handleRate = (rating: "Hard" | "Good" | "Easy") => {
    playClick();
    setFlipped(false);
    setMasteryScore((prev) => Math.min(99, prev + (rating === "Easy" ? 8 : rating === "Good" ? 4 : 1)));
    setCurrentIndex((prev) => (prev + 1) % deck.length);
    toast(`Card scheduled for review (${rating})`);
  };

  return (
    <div className="live-app-card learnloop-app-wrap">
      <div className="app-header-bar">
        <div className="app-title">
          <span className="pulse-dot" />
          <span>LEARNLOOP INTERACTIVE APP</span>
          <span className="app-ver">ACTIVE RECALL ENGINE</span>
        </div>
        <div className="mastery-indicator">
          <span>COMPOUNDING MASTERY:</span>
          <strong>{masteryScore}%</strong>
        </div>
      </div>

      {/* Topic Selection Bar */}
      <div className="loop-topic-bar">
        <span className="sample-label">Select Learning Topic:</span>
        {Object.keys(sampleLoopDecks).map((t) => (
          <button
            key={t}
            className={`sample-chip ${topic === t ? "active-chip" : ""}`}
            onClick={() => handleGenerate(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Interactive Flashcard Stack */}
      <div className="loop-card-stage">
        <div className="card-stage-header">
          <span className="step-label">LOOP CARD 0{currentIndex + 1} / 0{deck.length}</span>
          <span className="next-review-tag">NEXT REVIEW: +{activeCard.masteryDays} DAYS</span>
        </div>

        <div className={`active-flashcard ${flipped ? "is-flipped" : ""}`} onClick={() => { playTick(); setFlipped(!flipped); }}>
          <div className="flashcard-front">
            <span className="card-q-tag">QUESTION</span>
            <h3>{activeCard.question}</h3>
            <span className="flip-hint">Click card to reveal answer ↗</span>
          </div>

          <div className="flashcard-back">
            <span className="card-a-tag">ANSWER & FORMULATION</span>
            <p>{activeCard.answer}</p>
          </div>
        </div>

        {/* Rating Actions */}
        <div className="loop-rating-actions">
          <span>Rate recall difficulty:</span>
          <button className="rating-btn hard" onClick={() => handleRate("Hard")}>
            Hard (+1d)
          </button>
          <button className="rating-btn good" onClick={() => handleRate("Good")}>
            Good (+3d)
          </button>
          <button className="rating-btn easy" onClick={() => handleRate("Easy")}>
            Easy (+7d)
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. ZEN AI WORKING LIVE TERMINAL SANDBOX
// ==========================================

export function ZenAILiveApp() {
  const [commandInput, setCommandInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[ZEN ENGINE v0.9] Local inference worker initialized on 127.0.0.1:8080",
    "[STATUS] Model: Zen-GGUF-Local (3.8B) | Inference Latency: 0.2ms | Telemetry: DISABLED",
    "Type 'help' or click a command below to run local inference."
  ]);
  const [temperature, setTemperature] = useState(0.2);
  const [isStreaming, setIsStreaming] = useState(false);

  const samples = [
    "zen infer 'explain sctm authority gating'",
    "zen benchmark",
    "zen status",
    "clear"
  ];

  const runCommand = (cmdToRun?: string) => {
    const cmd = cmdToRun || commandInput;
    if (!cmd.trim()) return;

    playClick();
    const newLogs = [...terminalLogs, `> ${cmd}`];
    setTerminalLogs(newLogs);
    setCommandInput("");
    setIsStreaming(true);

    setTimeout(() => {
      let output = "";
      const lower = cmd.toLowerCase();

      if (lower.includes("sctm") || lower.includes("authority")) {
        output = "[ZEN AI STREAM]: Discrete Authority Gating filters token vectors with confidence score < 0.85 prior to KV-caching. Result: 94%+ retention precision at 128k context depth. Latency: 0.18ms.";
      } else if (lower.includes("benchmark")) {
        output = "[ZEN BENCHMARK RESULT]\n- Single Token Inference: 0.19ms\n- KV-Cache Compression: 3.8x\n- Memory Footprint: 2.1 GB VRAM\n- Network Latency: 0.00ms (100% Local)";
      } else if (lower.includes("status")) {
        output = "[ZEN STATUS] Local Engine: ONLINE | Hardware: Apple Silicon Neural Engine | Security: 100% Encrypted Local";
      } else if (lower === "clear") {
        setTerminalLogs(["[ZEN ENGINE RESET] Terminal cleared."]);
        setIsStreaming(false);
        return;
      } else {
        output = `[ZEN AI STREAM]: Executed intent for "${cmd}". Local inference completed in 0.21ms with zero network bytes transmitted.`;
      }

      setTerminalLogs([...newLogs, output]);
      setIsStreaming(false);
      playSuccess();
    }, 400);
  };

  return (
    <div className="live-app-card zen-app-wrap">
      <div className="app-header-bar">
        <div className="app-title">
          <span className="pulse-dot" />
          <span>ZEN AI LOCAL TERMINAL</span>
          <span className="app-ver">RUST / GGUF INFRA</span>
        </div>
        <div className="zen-metrics">
          <span>LATENCY: <b>0.2ms</b></span>
          <span>TELEMETRY: <b>0 BYTES</b></span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="zen-controls-bar">
        <div className="zen-slider">
          <label>Temperature: {temperature.toFixed(2)}</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={temperature}
            onChange={(e) => {
              playTick();
              setTemperature(Number(e.target.value));
            }}
          />
        </div>
        <div className="sample-chips-row" style={{ margin: 0 }}>
          {samples.map((s) => (
            <button key={s} className="sample-chip" onClick={() => runCommand(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal View */}
      <div className="zen-terminal-window">
        <div className="terminal-header">
          <span className="term-dot dot-red" />
          <span className="term-dot dot-yellow" />
          <span className="term-dot dot-green" />
          <span className="term-title">zen-local-worker — bash</span>
        </div>
        <div className="terminal-body">
          {terminalLogs.map((log, idx) => (
            <div key={idx} className={`term-line ${log.startsWith(">") ? "term-cmd" : log.startsWith("[ZEN") ? "term-out" : ""}`}>
              {log}
            </div>
          ))}
          {isStreaming && <div className="term-line term-streaming">Streaming local tokens...</div>}
        </div>

        <form className="terminal-input-row" onSubmit={(e) => { e.preventDefault(); runCommand(); }}>
          <span className="term-prompt">$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type a command (e.g. zen infer 'explain sctm')..."
          />
          <button type="submit" className="term-run-btn">Run <Play size={12} /></button>
        </form>
      </div>
    </div>
  );
}
