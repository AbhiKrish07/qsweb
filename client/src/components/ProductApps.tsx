import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Check, CheckSquare, Copy, Cpu, Download, FileText, Globe, Key, Layers, Mic, MicOff, Play, RefreshCw, RotateCcw, Search, Sparkles, Terminal, Trash2, Zap } from "lucide-react";
import { toast } from "sonner";
import { playClick, playSuccess, playTick } from "@/lib/sound";

// ==========================================
// 1. UPGRADED CAPTURE LIVE APP (VECTOR WORKSPACE)
// ==========================================

interface CapturedItem {
  id: string;
  rawText: string;
  mode: "Text" | "Voice" | "Link";
  category: "Action Item" | "Research Insight" | "System Note";
  summary: string;
  actionItems: { text: string; done: boolean }[];
  purityScore: number;
  tags: string[];
  timestamp: string;
}

const initialCaptures: CapturedItem[] = [
  {
    id: "cap-1",
    rawText: "Verify SCTM isotropic whitening alpha threshold with 0.85 tomorrow morning in PyTorch test suite",
    mode: "Text",
    category: "Research Insight",
    summary: "SCTM Isotropic Whitening Threshold Calibration",
    actionItems: [
      { text: "Run PyTorch benchmark on 128k context dataset", done: true },
      { text: "Calibrate authority gate alpha threshold to 0.85", done: false },
    ],
    purityScore: 98,
    tags: ["SCTM", "PyTorch", "Memory"],
    timestamp: "Today, 14:30 IST",
  },
  {
    id: "cap-2",
    rawText: "Redesign LearnLoop concept cards with Space Grotesk typography and living notebook concept connectors",
    mode: "Voice",
    category: "Action Item",
    summary: "LearnLoop Thinking Notebook Refactoring",
    actionItems: [
      { text: "Apply Space Grotesk font hierarchy", done: true },
      { text: "Add concept graph connector lines between paragraphs", done: false },
    ],
    purityScore: 96,
    tags: ["LearnLoop", "UI/UX", "Notebook"],
    timestamp: "Yesterday, 18:15 IST",
  },
];

export function CaptureLiveApp() {
  const [input, setInput] = useState("");
  const [ingestMode, setIngestMode] = useState<"Text" | "Voice" | "Link">("Text");
  const [isRecording, setIsRecording] = useState(false);
  const [captures, setCaptures] = useState<CapturedItem[]>(() => {
    try {
      const saved = localStorage.getItem("quiet_capture_workspace_v2");
      return saved ? JSON.parse(saved) : initialCaptures;
    } catch {
      return initialCaptures;
    }
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    try {
      localStorage.setItem("quiet_capture_workspace_v2", JSON.stringify(captures));
    } catch {
      /* fallback */
    }
  }, [captures]);

  const samples = [
    "Verify SCTM isotropic whitening alpha=0.85 tomorrow in test suite",
    "Redesign LearnLoop concept cards with Space Grotesk font and connectors",
    "Prepare Zen AI local Rust inference benchmark for Friday drop",
  ];

  const toggleActionDone = (itemId: string, actionIdx: number) => {
    playClick();
    setCaptures(
      captures.map((item) => {
        if (item.id === itemId) {
          const newActions = [...item.actionItems];
          newActions[actionIdx] = {
            ...newActions[actionIdx],
            done: !newActions[actionIdx].done,
          };
          return { ...item, actionItems: newActions };
        }
        return item;
      })
    );
  };

  const handleCapture = (textToCapture?: string) => {
    const text = textToCapture || input;
    if (!text.trim() && ingestMode !== "Voice") {
      toast("Enter a thought fragment or link before capturing.");
      return;
    }

    const finalText = text.trim() || "Voice note: Test SCTM vector whitening decorrelation pipeline";

    playClick();
    setIsProcessing(true);
    setPipelineStep(1);

    setTimeout(() => setPipelineStep(2), 200);
    setTimeout(() => setPipelineStep(3), 400);

    setTimeout(() => {
      let cat: CapturedItem["category"] = "System Note";
      let summary = finalText;
      let actions = [{ text: "Review captured fragment", done: false }];
      let tags = ["System"];
      const lower = finalText.toLowerCase();

      if (lower.includes("verify") || lower.includes("test") || lower.includes("sctm") || lower.includes("alpha")) {
        cat = "Research Insight";
        summary = "SCTM Research & Whitening Calibration";
        actions = [
          { text: "Execute vector test benchmark", done: false },
          { text: "Verify matrix whitening decorrelation", done: true },
        ];
        tags = ["SCTM", "Research", "AI Memory"];
      } else if (lower.includes("redesign") || lower.includes("prepare") || lower.includes("fix") || lower.includes("build")) {
        cat = "Action Item";
        summary = "Studio Product & Interface Execution";
        actions = [
          { text: "Draft component specification schema", done: false },
          { text: "Deploy updated build to staging environment", done: false },
        ];
        tags = ["Product", "UI/UX", "Execution"];
      }

      const newItem: CapturedItem = {
        id: `cap-${Date.now()}`,
        rawText: finalText,
        mode: ingestMode,
        category: cat,
        summary,
        actionItems: actions,
        purityScore: Math.floor(Math.random() * 4) + 96,
        tags,
        timestamp: "Just now",
      };

      setCaptures([newItem, ...captures]);
      setIsProcessing(false);
      setPipelineStep(0);
      setInput("");
      setIsRecording(false);
      playSuccess();
      toast("Thought parsed & cached in local vector memory!");
    }, 600);
  };

  const deleteCapture = (id: string) => {
    playClick();
    setCaptures(captures.filter((c) => c.id !== id));
    toast("Capture removed from inbox.");
  };

  const exportMarkdown = () => {
    playClick();
    const md =
      `# Quiet Studio Capture Workspace Export\n\n` +
      captures
        .map(
          (c) =>
            `## [${c.category}] ${c.summary}\n- Mode: ${c.mode}\n- Raw: "${c.rawText}"\n- Actions: ${c.actionItems.map((a) => `${a.done ? "[x]" : "[ ]"} ${a.text}`).join("; ")}\n- Tags: ${c.tags.join(", ")}\n- Purity: ${c.purityScore}%\n- Date: ${c.timestamp}\n`
        )
        .join("\n");
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quiet-capture-export.md";
    a.click();
    URL.revokeObjectURL(url);
    toast("Exported captures to Markdown!");
  };

  const filtered = captures.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchQ = `${c.rawText} ${c.summary} ${c.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="live-app-card capture-app-wrap" style={{ padding: "36px" }}>
      <div className="app-header-bar">
        <div className="app-title">
          <span className="pulse-dot" />
          <span>CAPTURE AI VECTOR WORKSPACE</span>
          <span className="app-ver">v2.4 LOCAL-FIRST</span>
        </div>
        <div className="app-header-actions">
          <button className="outline-button" onClick={exportMarkdown} style={{ padding: "7px 14px", fontSize: "10px" }}>
            Export Markdown <Download size={13} />
          </button>
        </div>
      </div>

      {/* Ingest Mode Tabs */}
      <div className="capture-mode-tabs">
        <button className={`mode-tab ${ingestMode === "Text" ? "active" : ""}`} onClick={() => setIngestMode("Text")}>
          <FileText size={13} /> Text Fragment
        </button>
        <button
          className={`mode-tab ${ingestMode === "Voice" ? "active" : ""}`}
          onClick={() => {
            setIngestMode("Voice");
            setIsRecording(!isRecording);
          }}
        >
          <Mic size={13} /> Voice Note {isRecording ? "(Recording...)" : ""}
        </button>
        <button className={`mode-tab ${ingestMode === "Link" ? "active" : ""}`} onClick={() => setIngestMode("Link")}>
          <Globe size={13} /> Web Link Ingest
        </button>
      </div>

      {/* Input Stage */}
      <div className="capture-input-section">
        <div className="input-prompt-label">
          <span>01 / THOUGHT INGEST LAYER</span>
          <span>PRESS ⌘ ENTER TO CAPTURE</span>
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
            placeholder={
              ingestMode === "Voice"
                ? "Speak your thought... (Simulated voice-to-text active)"
                : ingestMode === "Link"
                ? "Paste URL or article link (e.g. https://arxiv.org/abs/2409...)..."
                : "Type or paste a raw thought fragment without formatting..."
            }
          />
          <button className="primary-button capture-btn" onClick={() => handleCapture()} disabled={isProcessing}>
            {isProcessing ? "Ingesting..." : "Capture Thought"} <ArrowRight size={14} />
          </button>
        </div>

        {/* Real-Time SCTM Processing Pipeline Gauge */}
        {isProcessing && (
          <div className="capture-pipeline-gauge">
            <div className="pipeline-step-item">
              <span className={`step-dot ${pipelineStep >= 1 ? "done" : ""}`} />
              <span>01 INGEST</span>
            </div>
            <div className="pipeline-line" />
            <div className="pipeline-step-item">
              <span className={`step-dot ${pipelineStep >= 2 ? "done" : ""}`} />
              <span>02 ISOTROPIC WHITENING</span>
            </div>
            <div className="pipeline-line" />
            <div className="pipeline-step-item">
              <span className={`step-dot ${pipelineStep >= 3 ? "done" : ""}`} />
              <span>03 AUTHORITY GATE (α=0.85)</span>
            </div>
            <div className="pipeline-line" />
            <div className="pipeline-step-item">
              <span className={`step-dot ${pipelineStep >= 4 ? "done" : ""}`} />
              <span>04 VECTOR STORE</span>
            </div>
          </div>
        )}

        {/* Sample Chips */}
        <div className="sample-chips-row">
          <span className="sample-label">Sample thoughts:</span>
          {samples.map((s) => (
            <button
              key={s}
              className="sample-chip"
              onClick={() => {
                playTick();
                setInput(s);
              }}
            >
              "{s.slice(0, 36)}..."
            </button>
          ))}
        </div>
      </div>

      {/* Captured Vector Inbox */}
      <div className="capture-inbox-section">
        <div className="inbox-head">
          <div className="inbox-title">
            <span className="section-marker">[ LOCAL VECTOR MEMORY INBOX ]</span>
            <span>{filtered.length} items structured</span>
          </div>

          <div className="inbox-controls">
            <div className="inbox-search">
              <Search size={13} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vector memory..." />
            </div>
          </div>
        </div>

        <div className="inbox-items-list">
          {filtered.map((item) => (
            <div className="capture-item-card" key={item.id}>
              <div className="item-meta">
                <span className={`cat-pill cat-${item.category.toLowerCase().replace(" ", "-")}`}>{item.category}</span>
                <span className="purity-badge">{item.purityScore}% SIGNAL PURITY</span>
                <span className="item-time">{item.timestamp}</span>
                <button className="delete-btn" onClick={() => deleteCapture(item.id)} title="Delete capture">
                  <Trash2 size={13} />
                </button>
              </div>

              <h4 className="item-summary">{item.summary}</h4>
              <p className="item-raw">"{item.rawText}"</p>

              <div className="item-actions-list">
                <span className="actions-label">Extracted Checklist (Click to complete):</span>
                {item.actionItems.map((act, idx) => (
                  <div
                    key={idx}
                    className={`action-row ${act.done ? "action-done" : ""}`}
                    onClick={() => toggleActionDone(item.id, idx)}
                    style={{ cursor: "pointer" }}
                  >
                    <CheckSquare size={13} className={`check-icon ${act.done ? "done" : ""}`} />
                    <span>{act.text}</span>
                  </div>
                ))}
              </div>

              <div className="item-tags-row">
                {item.tags.map((t) => (
                  <span key={t} className="item-tag-chip">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && <div className="inbox-empty">No captured thoughts match search.</div>}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. UPGRADED LEARNLOOP LIVE APP (THE THINKING NOTEBOOK)
// ==========================================

interface LivingConceptNode {
  id: string;
  title: string;
  type: "Core Intuition" | "Mathematical Formulation" | "Failure Mode" | "Actionable Takeaway";
  explanation: string;
  masteryStatus: "Mastered" | "Review Needed" | "Struggling";
}

interface NotebookEntry {
  id: string;
  title: string;
  content: string;
  conceptNodes: LivingConceptNode[];
}

const sampleNotebookEntries: Record<string, NotebookEntry> = {
  sctm: {
    id: "sctm",
    title: "Sparse Confident Tensor Memory Architecture",
    content: `Large language model context windows degrade under noise. Standard Softmax attention assigns non-zero probability to distractor tokens, polluting the KV-cache.

SCTM applies isotropic whitening to decorrelate token activations before discrete authority gating evaluates confidence (α = 0.85). Tokens below threshold are masked out, maintaining 94%+ retrieval precision at 128k context lengths.`,
    conceptNodes: [
      {
        id: "c1",
        title: "Softmax KV-Cache Degradation",
        type: "Failure Mode",
        explanation: "Softmax attention never assigns true zero weight. Over long sessions, low-signal tokens compound and degrade factual accuracy.",
        masteryStatus: "Mastered",
      },
      {
        id: "c2",
        title: "Isotropic Whitening Transformation",
        type: "Mathematical Formulation",
        explanation: "Centers activation spaces and decorrelates covariance matrices across hidden dimensions prior to memory projection.",
        masteryStatus: "Review Needed",
      },
      {
        id: "c3",
        title: "Discrete Authority Gating (α = 0.85)",
        type: "Core Intuition",
        explanation: "Masks out token vectors below confidence threshold α = 0.85, eliminating noise before KV-caching.",
        masteryStatus: "Mastered",
      },
    ],
  },
  effortless: {
    id: "effortless",
    title: "Quiet HCI & Intent-Shaped Systems",
    content: `Modern software suffers from notification velocity and turn-based chat friction. Users construct prompts instead of acting directly on intent.

Quiet Studio builds intent-shaped interfaces. Continuous ambient signals anticipate required context without interrupting cognitive focus.`,
    conceptNodes: [
      {
        id: "c4",
        title: "Cognitive Interruption Recovery Tax",
        type: "Failure Mode",
        explanation: "Every red badge pop-up notification requires up to 23 minutes for full cognitive focus recovery.",
        masteryStatus: "Mastered",
      },
      {
        id: "c5",
        title: "Ambient Intent Detection",
        type: "Actionable Takeaway",
        explanation: "Software should act as a quiet reflex, providing context automatically before friction builds.",
        masteryStatus: "Review Needed",
      },
    ],
  },
};

export function LearnLoopLiveApp() {
  const [selectedEntryKey, setSelectedEntryKey] = useState<string>("sctm");
  const [activeEntry, setActiveEntry] = useState<NotebookEntry>(sampleNotebookEntries["sctm"]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>("c1");
  const [velocityScore, setVelocityScore] = useState(88);

  const handleSelectEntry = (key: string) => {
    playClick();
    setSelectedEntryKey(key);
    setActiveEntry(sampleNotebookEntries[key]);
    setActiveNodeId(sampleNotebookEntries[key].conceptNodes[0]?.id || null);
  };

  const handleSynthesizeLoop = () => {
    playClick();
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      playSuccess();
      toast("Notebook synthesized into living concept graph!");
    }, 450);
  };

  const updateNodeMastery = (nodeId: string, status: LivingConceptNode["masteryStatus"]) => {
    playClick();
    const updatedNodes = activeEntry.conceptNodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, masteryStatus: status };
      }
      return node;
    });
    setActiveEntry({ ...activeEntry, conceptNodes: updatedNodes });
    setVelocityScore((prev) => Math.min(99, prev + (status === "Mastered" ? 4 : status === "Review Needed" ? 1 : -2)));
    toast(`Concept node marked as ${status}`);
  };

  const activeNode = activeEntry.conceptNodes.find((n) => n.id === activeNodeId) || activeEntry.conceptNodes[0];

  return (
    <div className="live-app-card learnloop-app-wrap" style={{ padding: "36px" }}>
      <div className="app-header-bar">
        <div className="app-title">
          <span className="pulse-dot" />
          <span>LEARNLOOP: THE THINKING NOTEBOOK</span>
          <span className="app-ver">LIVING CONCEPT GRAPH</span>
        </div>
        <div className="mastery-indicator">
          <span>KNOWLEDGE VELOCITY:</span>
          <strong>{velocityScore}%</strong>
        </div>
      </div>

      {/* Select Sample Notebook Document */}
      <div className="notebook-select-bar">
        <span className="sample-label">Notebook Document:</span>
        <button
          className={`sample-chip ${selectedEntryKey === "sctm" ? "active-chip" : ""}`}
          onClick={() => handleSelectEntry("sctm")}
        >
          SCTM Memory Architecture
        </button>
        <button
          className={`sample-chip ${selectedEntryKey === "effortless" ? "active-chip" : ""}`}
          onClick={() => handleSelectEntry("effortless")}
        >
          Quiet HCI & Intent Systems
        </button>
        <button className="primary-button synth-btn" onClick={handleSynthesizeLoop} disabled={isSynthesizing}>
          {isSynthesizing ? "Synthesizing Loop..." : "Synthesize Living Loop"} <Sparkles size={13} />
        </button>
      </div>

      {/* Thinking Notebook Split Workspace */}
      <div className="notebook-workspace-grid">
        {/* Left Side: Rich Source Notes Editor */}
        <div className="notebook-source-pane">
          <div className="pane-header">
            <BookOpen size={14} className="pane-icon" />
            <span>01 / SOURCE NOTES EDITOR</span>
          </div>

          <div className="notebook-editor">
            <h3>{activeEntry.title}</h3>
            <textarea
              rows={8}
              value={activeEntry.content}
              onChange={(e) => setActiveEntry({ ...activeEntry, content: e.target.value })}
              placeholder="Paste or write your raw research notes here..."
            />
          </div>
        </div>

        {/* Right Side: Living Concept Nodes & Margin Quiz Layer */}
        <div className="notebook-synthesis-pane">
          <div className="pane-header">
            <Layers size={14} className="pane-icon" />
            <span>02 / LIVING CONCEPT NODES</span>
          </div>

          {/* Nodes List */}
          <div className="concept-nodes-list">
            {activeEntry.conceptNodes.map((node) => (
              <div
                key={node.id}
                className={`concept-node-chip ${activeNodeId === node.id ? "selected" : ""}`}
                onClick={() => {
                  playTick();
                  setActiveNodeId(node.id);
                }}
              >
                <div className="node-head">
                  <span className="node-type-tag">{node.type}</span>
                  <span className={`node-status-pill status-${node.masteryStatus.toLowerCase().replace(" ", "-")}`}>
                    {node.masteryStatus}
                  </span>
                </div>
                <div className="node-title">{node.title}</div>
              </div>
            ))}
          </div>

          {/* Active Node Detail & Self-Recall Quiz */}
          {activeNode && (
            <div className="active-node-breakdown">
              <div className="breakdown-header">
                <span className="node-type-tag">{activeNode.type}</span>
                <h4>{activeNode.title}</h4>
              </div>

              <p className="breakdown-text">{activeNode.explanation}</p>

              <div className="node-mastery-actions">
                <span>Evaluate your recall:</span>
                <button
                  className="mastery-btn btn-mastered"
                  onClick={() => updateNodeMastery(activeNode.id, "Mastered")}
                >
                  <Check size={12} /> Mastered
                </button>
                <button
                  className="mastery-btn btn-review"
                  onClick={() => updateNodeMastery(activeNode.id, "Review Needed")}
                >
                  <RefreshCw size={12} /> Review Needed
                </button>
              </div>
            </div>
          )}
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
    <div className="live-app-card zen-app-wrap" style={{ padding: "36px" }}>
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
