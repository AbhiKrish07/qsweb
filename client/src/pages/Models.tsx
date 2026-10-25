import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code, Cpu, Download, ExternalLink, Filter, Layers, Search, Sparkles, Terminal, Zap } from "lucide-react";
import { Link } from "wouter";
import { playClick } from "@/lib/sound";
import { toast } from "sonner";

export interface AIModel {
  id: string;
  name: string;
  tagline: string;
  category: "Intent Parsing" | "Memory System" | "Local Runtime" | "Safety & Gating";
  latency: string;
  contextWindow: string;
  precision: string;
  parameters: string;
  architecture: string;
  license: string;
  description: string;
  useCase: string;
  specs: { label: string; value: string }[];
  codeSnippet: string;
  paperUrl?: string;
  appUrl?: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "aethel-intent-v2",
    name: "Aethel Intent Engine v2.4",
    tagline: "Synthesizes workspace telemetry and micro-gestures into executable intents.",
    category: "Intent Parsing",
    latency: "< 14ms",
    contextWindow: "32,000 Tokens",
    precision: "99.1% F1 Score",
    parameters: "1.8B Distilled",
    architecture: "Multi-Head Intent Transformer",
    license: "MIT / Open Weights",
    description: "Aethel moves past conversational textboxes into ambient intent parsing. It passively aggregates peripheral active editor tokens, window focus patterns, and user micro-gestures to predict and construct workflow intentions before explicit verbal prompts are required.",
    useCase: "Zero-prompt desktop orchestration, contextual app switching, proactive workspace assistance.",
    specs: [
      { label: "Target", value: "Zero Prompt UI" },
      { label: "Inference", value: "Local Edge / NPU" },
      { label: "Quantization", value: "GGUF Q4_K_M" },
      { label: "Framework", value: "C++ / ONNX" },
    ],
    codeSnippet: `import { AethelClient } from "@quiet-studio/aethel";

const client = new AethelClient({
  runtime: "local-first",
  latencyBudgetMs: 15,
});

// Stream ambient intention from workspace telemetry
client.onIntent((intent) => {
  if (intent.confidence > 0.94) {
    console.log("Predicted Action:", intent.action);
    intent.execute();
  }
});`,
    paperUrl: "/research/interface-as-reflex",
    appUrl: "/products/aethel",
  },
  {
    id: "sctm-memory-v1",
    name: "SCTM Tensor Memory System",
    tagline: "Sparse Confident Tensor Memory with Isotropic Whitening for long-horizon context.",
    category: "Memory System",
    latency: "< 12ms",
    contextWindow: "128,000 Tokens",
    precision: "94.2% Signal Retention",
    parameters: "3.2B Embedding Head",
    architecture: "Whitened Sparse Tensor KV",
    license: "Apache 2.0",
    description: "Solves attention pollution across long conversational sessions. While standard Softmax attention degrades severely under distractor noise, SCTM applies isotropic whitening and dynamic discrete authority gating to discard low-confidence tokens before key-value caching.",
    useCase: "Persistent memory across months of workspace history, multi-document research synthesis, long-horizon dialogue.",
    specs: [
      { label: "Noise Filter", value: "Isotropic Whitening" },
      { label: "Gate Threshold", value: "α = 0.85 Confident" },
      { label: "Cache Tax", value: "3.8x RAM Reduction" },
      { label: "Runtime", value: "PyTorch / CUDA" },
    ],
    codeSnippet: `import torch
from sctm_tensor import IsotropicWhiteningGate, SCTMMemory

# Initialize SCTM memory bank with 128k context
memory = SCTMMemory(dim=4096, max_tokens=128000)
gate = IsotropicWhiteningGate(threshold=0.85)

# Whiten incoming activations to decorrelate noise
clean_kv = gate.forward_filter(token_activations)
memory.insert(clean_kv)`,
    paperUrl: "/research/sctm-memory-architecture",
    appUrl: "/research",
  },
  {
    id: "zen-kernel-v1",
    name: "Zen OS Local Runtime",
    tagline: "Ultra-compact Apple Silicon and Linux edge NPU kernel with zero telemetry.",
    category: "Local Runtime",
    latency: "0.2ms",
    contextWindow: "16,000 Tokens",
    precision: "100% Deterministic",
    parameters: "450M Edge Core",
    architecture: "Quantized Rust Core Engine",
    license: "MIT",
    description: "The core engine powering Zen AI. Engineered entirely in Rust, it executes compiled quantization weights directly on edge hardware with zero background analytics, zero cloud latency, and complete cryptographic privacy.",
    useCase: "Offline local-first assistants, personal data processing, embedded hardware control.",
    specs: [
      { label: "Language", value: "Pure Rust 2024" },
      { label: "Telemetry", value: "Strict Zero" },
      { label: "RAM Footprint", value: "< 240 MB" },
      { label: "Platform", value: "macOS / Linux" },
    ],
    codeSnippet: `// Rust Zero-Telemetry Runtime
use zen_ai_core::{Kernel, InferenceConfig};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let kernel = Kernel::load_quantized("weights/zen-v1.gguf")?;
    let response = kernel.infer("ambient::summarize_thread")?;
    println!("Execution Latency: {}us", response.latency_micros);
    Ok(())
}`,
    paperUrl: "/blog/why-vertical-models-beat-general-ai",
    appUrl: "/products/zen-ai",
  },
  {
    id: "discrete-gating-v1",
    name: "Discrete Authority Gating Engine",
    tagline: "Cryptographic capability validation prior to autonomous agent workspace mutations.",
    category: "Safety & Gating",
    latency: "< 0.4ms",
    contextWindow: "Unlimited (Token Guard)",
    precision: "100% Proof Verification",
    parameters: "Deterministic C++ Rulehead",
    architecture: "Cryptographic Capability Proofs",
    license: "BSD-3-Clause",
    description: "Traditional LLM guardrails rely on post-generation classifiers that are vulnerable to prompt injection. Discrete Authority Gating mathematically verifies cryptographic capability tokens before any agent intent can issue disk writes, shell commands, or network requests.",
    useCase: "Autonomous agent execution sandboxing, safe tool mutation, multi-agent authority delegation.",
    specs: [
      { label: "Security Proof", value: "Zero-Trust Ed25519" },
      { label: "Execution Gate", value: "Pre-Mutation Check" },
      { label: "Overhead", value: "< 400 microseconds" },
      { label: "Boundary", value: "OS Kernel Isolator" },
    ],
    codeSnippet: `import { AuthorityGate } from "@quiet-studio/authority-gating";

const gate = new AuthorityGate({ strictMode: true });

// Verify capability token before filesystem mutation
const proof = await gate.proveAction({
  action: "filesystem::write",
  targetPath: "/workspace/config.json",
});

if (proof.isValid) {
  gate.dispatchExecution(proof);
}`,
    paperUrl: "/research/discrete-authority-gating",
    appUrl: "/system",
  },
];

export default function Models() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModelForCode, setSelectedModelForCode] = useState<AIModel | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ["All", "Intent Parsing", "Memory System", "Local Runtime", "Safety & Gating"];

  const filteredModels = useMemo(() => {
    return AI_MODELS.filter((model) => {
      const matchesCategory = activeCategory === "All" || model.category === activeCategory;
      const matchesSearch = `${model.name} ${model.tagline} ${model.description} ${model.architecture}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopy = (code: string) => {
    playClick();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    toast("Code snippet copied to clipboard");
    setTimeout(() => setCopiedCode(false), 2200);
  };

  return (
    <div className="models-page">
      {/* Hero Header */}
      <section className="research-hero">
        <div className="section-marker">[ 02 — DOMAIN-VERTICAL AI MODELS & INTENT ENGINES ]</div>
        <h1>
          Vertical models &amp;<br />
          <em>task execution.</em>
        </h1>
        <p>
          Moving past generalist chatbots that know everything superficially. Our laboratory engineers specialized vertical models and long-horizon context architectures tailored for the exact tasks, routines, and decisions you face.
        </p>
        <div className="research-rule" />
      </section>

      {/* Control Bar: Categories & Search */}
      <section style={{ padding: "4vw 9.2vw 2vw", background: "var(--background)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div className="category-tabs" style={{ margin: 0, border: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat);
                }}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <div className="archive-search" style={{ margin: 0 }}>
            <Search size={14} />
            <input
              type="text"
              placeholder="SEARCH VERTICAL MODELS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search vertical models"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}>
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section style={{ padding: "6vw 9.2vw 10vw", background: "var(--card)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {filteredModels.map((model) => (
            <article
              key={model.id}
              className="model-showcase-card"
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--background)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                padding: "28px",
                position: "relative",
              }}
            >
              {/* Card Head */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span
                  style={{
                    font: "600 10px 'DM Mono', monospace",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--orange)",
                    padding: "4px 8px",
                    background: "color-mix(in srgb, var(--orange) 10%, transparent)",
                    borderRadius: "4px",
                  }}
                >
                  {model.category}
                </span>
                <span style={{ font: "500 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase" }}>
                  {model.latency} LATENCY
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 style={{ font: "700 clamp(1.6rem, 2.4vw, 2.2rem)/1.1 'Space Grotesk', sans-serif", letterSpacing: "-0.05em", margin: "0 0 10px" }}>
                {model.name}
              </h2>
              <p style={{ font: "500 13px/1.45 'Space Grotesk', sans-serif", color: "var(--orange)", margin: "0 0 14px" }}>
                {model.tagline}
              </p>
              <p style={{ fontSize: "13px", lineHeight: "1.55", color: "var(--muted-ink)", margin: "0 0 20px" }}>
                {model.description}
              </p>

              {/* Hardware & Parameter Specs Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  padding: "16px",
                  background: "var(--card)",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ font: "500 9px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase" }}>Context Window</span>
                  <strong style={{ font: "600 11px 'DM Mono', monospace" }}>{model.contextWindow}</strong>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ font: "500 9px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase" }}>Precision F1</span>
                  <strong style={{ font: "600 11px 'DM Mono', monospace", color: "var(--orange)" }}>{model.precision}</strong>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ font: "500 9px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase" }}>Weights</span>
                  <strong style={{ font: "600 11px 'DM Mono', monospace" }}>{model.parameters}</strong>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ font: "500 9px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase" }}>License</span>
                  <strong style={{ font: "600 11px 'DM Mono', monospace" }}>{model.license}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <button
                    type="button"
                    className="outline-button"
                    style={{ justifyContent: "center", width: "100%", padding: "10px 12px" }}
                    onClick={() => {
                      playClick();
                      setSelectedModelForCode(model);
                    }}
                  >
                    SDK Snippet <Code size={12} />
                  </button>

                  {model.paperUrl && (
                    <Link
                      href={model.paperUrl}
                      className="outline-button"
                      style={{ justifyContent: "center", width: "100%", padding: "10px 12px" }}
                      onClick={() => playClick()}
                    >
                      Whitepaper <ArrowRight size={12} />
                    </Link>
                  )}
                </div>

                {model.appUrl && (
                  <Link
                    href={model.appUrl}
                    className="primary-button"
                    style={{ justifyContent: "center", width: "100%", padding: "11px 16px" }}
                    onClick={() => playClick()}
                  >
                    Examine Architecture &amp; App <ArrowUpRight size={14} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Back Link */}
        <div style={{ marginTop: "6vw", paddingTop: "24px", borderTop: "1px solid var(--line)" }}>
          <Link href="/" className="article-back" onClick={() => playClick()}>
            <ArrowLeft size={14} /> Back to Studio Overview
          </Link>
        </div>
      </section>

      {/* Code Inspector Modal */}
      {selectedModelForCode && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedModelForCode(null)}
        >
          <div
            className="code-inspector-modal"
            style={{
              background: "var(--background)",
              border: "1px solid var(--line)",
              borderRadius: "14px",
              padding: "32px",
              maxWidth: "600px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span className="section-marker">[ SDK INTEGRATION ]</span>
                <h3 style={{ font: "700 22px 'Space Grotesk', sans-serif", margin: "6px 0 0" }}>
                  {selectedModelForCode.name}
                </h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedModelForCode(null)}
                style={{ cursor: "pointer" }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                padding: "16px",
                overflowX: "auto",
                marginBottom: "20px",
              }}
            >
              <pre
                style={{
                  margin: 0,
                  font: "400 12px/1.6 'DM Mono', monospace",
                  color: "var(--foreground)",
                }}
              >
                {selectedModelForCode.codeSnippet}
              </pre>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                type="button"
                className="primary-button"
                onClick={() => handleCopy(selectedModelForCode.codeSnippet)}
              >
                {copiedCode ? (
                  <>
                    <Check size={14} /> Copied Snippet
                  </>
                ) : (
                  <>
                    Copy Code <Code size={14} />
                  </>
                )}
              </button>

              <button
                type="button"
                className="outline-button"
                onClick={() => setSelectedModelForCode(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
