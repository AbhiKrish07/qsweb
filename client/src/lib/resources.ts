export interface NotionTemplate {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  category: "Operating System" | "Research" | "Product Studio" | "Knowledge";
  price: string;
  isPremium?: boolean;
  description: string;
  features: string[];
  tags: string[];
  views: number;
  downloads: number;
  duplicateUrl: string;
  version: string;
  visualBg: string;
  coverBannerText?: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  targetModel: "Claude 3.7 / GPT-4o" | "Local LLM / Zen AI" | "DeepSeek R1" | "Universal";
  category: "AI Architecture" | "Engineering" | "Product Strategy" | "Research";
  description: string;
  variables: { name: string; label: string; placeholder: string }[];
  promptText: string;
  tags: string[];
  copies: number;
}

export interface CodingAsset {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  language: "TypeScript" | "Python / PyTorch" | "Rust" | "Flutter / Dart" | "CSS";
  category: "UI Kits" | "AI / ML Modules" | "Local Infrastructure" | "Mobile";
  description: string;
  installCommand: string;
  githubUrl: string;
  stars: number;
  tags: string[];
  codeSnippet: string;
  filename: string;
}

const GUMROAD_STORE_URL = "https://quietstudioo.gumroad.com/";

export const notionTemplates: NotionTemplate[] = [
  {
    id: "quietstudio-os",
    title: "QuietStudio OS",
    slug: "quietstudio-os",
    tagline: "The flagship complete developer & product studio workspace.",
    category: "Product Studio",
    price: "₹4,699.30",
    isPremium: true,
    description: "A complete developer command center, thoughtfully designed for coders and project leaders. Integrate your coding workspace, innovation bank, task lists, metric tracking, and project execution in one organized space.",
    features: [
      "Integrated Developer Command Center & Task Matrix",
      "Innovation Bank & Raw Capture Repository",
      "Project Timeline & Milestone Tracking",
      "Third-Party Integration & API Schema Mapper"
    ],
    tags: ["Developer OS", "Product Studio", "Flagship", "Notion"],
    views: 5420,
    downloads: 1890,
    duplicateUrl: GUMROAD_STORE_URL,
    version: "v3.2",
    visualBg: "linear-gradient(135deg, #111110 0%, #1c261e 100%)",
    coverBannerText: "QUIETSTUDIO OS"
  },
  {
    id: "aesthetic-os",
    title: "Aesthetic OS",
    slug: "aesthetic-os",
    tagline: "Dark-themed student & creator life dashboard.",
    category: "Operating System",
    price: "Free (₹0+)",
    description: "Designed to streamline your student and creative life, helping you track your progress and manage your time effectively. Dive in, customize your sections, and turn late-night strides into productive goals.",
    features: [
      "Dark-Themed Task List & Daily Matrix",
      "Live Weather & Time Widget Embeds",
      "Built-In Dictionary & Reference Notebook",
      "Goal Tracker & Productivity Streaks"
    ],
    tags: ["Student OS", "Aesthetic", "Minimal", "Notion"],
    views: 4890,
    downloads: 2410,
    duplicateUrl: GUMROAD_STORE_URL,
    version: "v2.0",
    visualBg: "linear-gradient(135deg, #181716 0%, #282420 100%)",
    coverBannerText: "GET SHIT DONE."
  },
  {
    id: "creator-os",
    title: "Creator OS",
    slug: "creator-os",
    tagline: "Business command center for digital creators & builders.",
    category: "Operating System",
    price: "Free (₹0+)",
    description: "Your complete business command center, thoughtfully designed for creators and digital founders. From managing digital products and content planning to tracking life goals and Pomodoro timers.",
    features: [
      "Digital Product & Revenue Pipeline",
      "Content Calendar & Editorial Matrix",
      "Integrated Pomodoro Timer & Focus Log",
      "Creator Business Command Center"
    ],
    tags: ["Creator OS", "Business", "Content", "Founders"],
    views: 3950,
    downloads: 1980,
    duplicateUrl: GUMROAD_STORE_URL,
    version: "v1.8",
    visualBg: "linear-gradient(135deg, #1e1e1e 0%, #343230 100%)",
    coverBannerText: "CREATOR OS"
  },
  {
    id: "minimalist-weekly-planner",
    title: "Minimalist Weekly Planner",
    slug: "minimalist-weekly-planner",
    tagline: "Designed to maintain simplicity & clarity in daily life.",
    category: "Operating System",
    price: "Free (₹0+)",
    description: "Minimalist Weekly Planner helps you stay organized while maintaining absolute simplicity. Feel free to customize any section—from categories and tasks to whatever best suits your workflow.",
    features: [
      "Clean Weekly & Daily Task Columns",
      "Weather & Location Embed Support",
      "In Progress / Completed Status Tags",
      "Minimalist Zero-Clutter Interface"
    ],
    tags: ["Planner", "Weekly", "Minimal", "Focus"],
    views: 3100,
    downloads: 1650,
    duplicateUrl: GUMROAD_STORE_URL,
    version: "v1.2",
    visualBg: "linear-gradient(135deg, #111110 0%, #202020 100%)",
    coverBannerText: "WEEKLY PLANNER"
  },
  {
    id: "the-annual-reset",
    title: "The Annual Reset",
    slug: "the-annual-reset",
    tagline: "Personal space for annual reflection, review, & renewal.",
    category: "Knowledge",
    price: "Free (₹0+)",
    description: "Designed to help you process your past year and set your vision for the upcoming year. Whether you've had a year of triumphs, challenges, or somewhere in between, use this space for meaningful momentum.",
    features: [
      "Looking Back & Moving Forward Prompts",
      "Triumphs & Challenge Reflection Matrix",
      "Embedded Deep Focus Playlist",
      "Vision Setting for the Year Ahead"
    ],
    tags: ["Annual Reset", "Reflection", "Journal", "Goals"],
    views: 2840,
    downloads: 1420,
    duplicateUrl: GUMROAD_STORE_URL,
    version: "v1.0",
    visualBg: "linear-gradient(135deg, #1c1428 0%, #39194d 100%)",
    coverBannerText: "ANNUAL RESET"
  },
  {
    id: "phone-ui",
    title: "Phone UI",
    slug: "phone-ui",
    tagline: "Minimalist phone launcher interface template inside Notion.",
    category: "Operating System",
    price: "Free (₹0+)",
    description: "A serene phone launcher style layout built within Notion. Features dark minimalist typography quotes ('Be the best version of yourself'), weather widgets, task lists, and focus zones.",
    features: [
      "Phone Launcher Minimal Layout",
      "Dark Typography & Quote Wall",
      "Task List & Quick Notes",
      "Serene Mobile Aesthetic"
    ],
    tags: ["Phone UI", "Mobile", "Minimal", "Launcher"],
    views: 2410,
    downloads: 1280,
    duplicateUrl: GUMROAD_STORE_URL,
    version: "v1.5",
    visualBg: "linear-gradient(135deg, #0d0d0d 0%, #1f1e1d 100%)",
    coverBannerText: "PHONE UI"
  },
  {
    id: "startup-ui",
    title: "Startup UI",
    slug: "startup-ui",
    tagline: "Complete startup command center for founders & entrepreneurs.",
    category: "Product Studio",
    price: "Free (₹0+)",
    description: "Thoughtfully designed for founders and entrepreneurs. From tracking key metrics to managing tasks and capturing critical notes, everything you need to build your startup is organized in one place.",
    features: [
      "Startup Command Center & Roadmap",
      "Task Status (Not Started, In Progress, Completed)",
      "Critical Notes & Decision Log",
      "Process & Moving Parts Matrix"
    ],
    tags: ["Startup UI", "Founders", "Business", "Product"],
    views: 3200,
    downloads: 1750,
    duplicateUrl: GUMROAD_STORE_URL,
    version: "v2.1",
    visualBg: "linear-gradient(135deg, #1f1a24 0%, #3a2238 100%)",
    coverBannerText: "STARTUP UI"
  },
  {
    id: "team-ui",
    title: "Team UI",
    slug: "team-ui",
    tagline: "Team management hub for project leaders & managers.",
    category: "Product Studio",
    price: "Free (₹0+)",
    description: "Thoughtfully designed for leaders and project managers. From tracking timelines to monitoring progress metrics and facilitating collaboration, everything you need to lead your team smoothly.",
    features: [
      "Team Management Hub & Mission Statement",
      "Vision, Values, & Goals Architecture",
      "Project & Meeting Logs",
      "Collaboration & Progress Metrics"
    ],
    tags: ["Team UI", "Management", "Projects", "Leadership"],
    views: 2750,
    downloads: 1390,
    duplicateUrl: GUMROAD_STORE_URL,
    version: "v1.4",
    visualBg: "linear-gradient(135deg, #111a24 0%, #1e2e3d 100%)",
    coverBannerText: "TEAM UI"
  }
];

export const promptTemplates: PromptTemplate[] = [
  {
    id: "sctm-context-gating",
    title: "SCTM Context Gating Prompt",
    slug: "sctm-context-gating",
    tagline: "Force LLMs to maintain a crisp memory trace over long sessions.",
    targetModel: "Claude 3.7 / GPT-4o",
    category: "AI Architecture",
    description: "Applies Sparse Confident Tensor Memory principles to system prompts, preventing context window degradation and enforcing high-precision retrieval.",
    variables: [
      { name: "context_payload", label: "Long Context / Memory Log", placeholder: "Paste raw background document or session logs..." },
      { name: "query", label: "Target Query", placeholder: "What specific decision or fact needs extraction?" }
    ],
    promptText: `[SYSTEM CONSTRAINTS: SCTM MEMORY GATING]
You are operating under Sparse Confident Tensor Memory (SCTM) retrieval rules.
1. Perform isotropic whitening over the context payload below: discard conversational filler, boilerplate greetings, and non-authoritative conjecture.
2. Authority Gating: Only rely on explicit, verifiable statements in the payload. If confidence < 90%, output: "SIGNAL_UNCERTAIN: [reason]".
3. Structure your response into exactly 3 sections:
   - AUTHORITATIVE FACTS (Bullet points of exact evidence)
   - INFERRED INTENT (Minimal synthesis)
   - DIRECT ANSWER TO QUERY

[CONTEXT PAYLOAD]:
{{context_payload}}

[QUERY]:
{{query}}`,
    tags: ["AI Memory", "System Prompt", "High Precision", "Context Compression"],
    copies: 1420
  },
  {
    id: "deep-code-auditor",
    title: "Deep Code Auditor & Architect",
    slug: "deep-code-auditor",
    tagline: "Zero-fluff technical review for performance & security.",
    targetModel: "Universal",
    category: "Engineering",
    description: "Audits source code snippets for memory leaks, race conditions, type safety, and architectural anti-patterns without unnecessary fluff.",
    variables: [
      { name: "language", label: "Programming Language", placeholder: "e.g. TypeScript, Rust, PyTorch" },
      { name: "code_snippet", label: "Source Code", placeholder: "Paste the code to audit here..." }
    ],
    promptText: `[ROLE]: Senior Systems Architect & Security Engineer
[LANGUAGE]: {{language}}

Analyze the provided code snippet below under strict production constraints:
1. IDENTIFY: Memory leaks, unhandled async failures, race conditions, or dynamic state mutations.
2. REFACTORED CODE: Provide the drop-in refactored replacement.
3. BENCHMARK & MEMORY IMPACT: Briefly explain the hardware/CPU runtime efficiency gain.

[CODE SNIPPET]:
{{code_snippet}}`,
    tags: ["Code Review", "Security", "Performance", "Refactoring"],
    copies: 2890
  },
  {
    id: "product-spec-gen",
    title: "1-Line to PRD Spec Generator",
    slug: "product-spec-gen",
    tagline: "Turns vague product ideas into full technical blueprints.",
    targetModel: "Claude 3.7 / GPT-4o",
    category: "Product Strategy",
    description: "Transforms a short product concept into a complete product requirements document including problem statement, core user loops, and API contracts.",
    variables: [
      { name: "idea", label: "Product Concept", placeholder: "e.g. A local-first voice note app that summarizes daily meetings..." }
    ],
    promptText: `[TASK]: Convert product concept into an effortless, minimal PRD.
[CONCEPT]: {{idea}}

Format output using Markdown with strict headers:
1. ONE-LINER THESIS: (Under 15 words)
2. CORE PROBLEM & FRICTION TAX
3. THE CALM SOLUTION (Smallest surface area)
4. DATA SCHEMA & API CONTRACT (JSON format)
5. VERIFICATION & SUCCESS METRICS`,
    tags: ["PRD", "Product Design", "AI Founder", "Specs"],
    copies: 1950
  },
  {
    id: "paper-intuition-distiller",
    title: "Research Paper Intuition Distiller",
    slug: "paper-intuition-distiller",
    tagline: "Distills dense math & AI papers into core intuition.",
    targetModel: "DeepSeek R1",
    category: "Research",
    description: "Translates complex arXiv papers and tensor equations into intuitive mental models, trade-offs, and practical code implementations.",
    variables: [
      { name: "abstract_or_paper", label: "Paper Abstract / Excerpt", placeholder: "Paste paper abstract or key equations here..." }
    ],
    promptText: `[ROLE]: Theoretical Computer Scientist & AI Researcher

Analyze this paper excerpt:
{{abstract_or_paper}}

Break down the core contribution:
1. THE CORE INTUITION (Explain like I am building the system tomorrow)
2. MATHEMATICAL FORMULATION (Key equation & what each symbol means)
3. WHAT BREAKS (Known limitations & edge cases)
4. PSEUDOCODE IMPLEMENTATION (Clean 15-line algorithm sketch)`,
    tags: ["Research", "Paper Summary", "Machine Learning", "Mathematics"],
    copies: 1180
  }
];

export const codingAssets: CodingAsset[] = [
  {
    id: "quiet-ui-kit",
    title: "Quiet UI Component Kit",
    slug: "quiet-ui-kit",
    tagline: "Minimalist React + CSS glassmorphism & typography components.",
    language: "TypeScript",
    category: "UI Kits",
    description: "A serene, production-ready React component set featuring Space Grotesk typography, subtle hover borders, glassmorphic cards, and dark mode variables.",
    installCommand: "npm install @quiet-studio/ui-kit",
    githubUrl: "https://github.com/quiet-studio/ui-kit",
    stars: 340,
    tags: ["React", "CSS", "UI Kit", "Dark Mode"],
    filename: "QuietButton.tsx",
    codeSnippet: `import React from "react";

interface QuietButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text";
  icon?: React.ReactNode;
}

export const QuietButton: React.FC<QuietButtonProps> = ({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}) => {
  return (
    <button className={\`q-btn q-btn-\${variant} \${className}\`} {...props}>
      <span>{children}</span>
      {icon && <span className="q-btn-icon">{icon}</span>}
    </button>
  );
};`
  },
  {
    id: "local-ai-worker",
    title: "Zen Local AI Inference Worker",
    slug: "local-ai-worker",
    tagline: "Rust zero-latency local LLM inference server boilerplate.",
    language: "Rust",
    category: "Local Infrastructure",
    description: "Ultra-fast local AI server built in Rust for streaming GGUF/llama.cpp inference with sub-millisecond response parsing and zero external calls.",
    installCommand: "cargo install zen-ai-worker",
    githubUrl: "https://github.com/quiet-studio/zen-ai",
    stars: 890,
    tags: ["Rust", "Local AI", "llama.cpp", "Streaming"],
    filename: "main.rs",
    codeSnippet: `use axum::{routing::post, Json, Router};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[derive(Deserialize)]
struct InferRequest {
    prompt: String,
    max_tokens: usize,
}

#[derive(Serialize)]
struct InferResponse {
    token_stream: String,
    latency_ms: f64,
}

async fn handle_infer(Json(payload): Json<InferRequest>) -> Json<InferResponse> {
    let start = std::time::Instant::now();
    // Local inference pipeline execution
    Json(InferResponse {
        token_stream: format!("Zen AI: Processed '{}'", payload.prompt),
        latency_ms: start.elapsed().as_secs_f64() * 1000.0,
    })
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/infer", post(handle_infer));
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
    println!("Zen Local Engine listening on {}", addr);
    axum::Server::bind(&addr).serve(app.into_make_service()).await.unwrap();
}`
  },
  {
    id: "sctm-pytorch-core",
    title: "SCTM PyTorch Core Module",
    slug: "sctm-pytorch-core",
    tagline: "Isotropic whitening & authority gating PyTorch layer.",
    language: "Python / PyTorch",
    category: "AI / ML Modules",
    description: "Drop-in PyTorch module implementing Sparse Confident Tensor Memory gating to stabilize context retrieval in long-context models.",
    installCommand: "pip install sctm-pytorch",
    githubUrl: "https://github.com/quiet-studio/sctm-pytorch",
    stars: 620,
    tags: ["PyTorch", "AI Memory", "Tensor Math", "SCTM"],
    filename: "sctm_layer.py",
    codeSnippet: `import torch
import torch.nn as nn
import torch.nn.functional as F

class SCTMMemoryGate(nn.Module):
    def __init__(self, d_model: int, confidence_threshold: float = 0.85):
        super().__init__()
        self.d_model = d_model
        self.threshold = confidence_threshold
        self.whitening_proj = nn.Linear(d_model, d_model, bias=False)
        self.authority_gate = nn.Sequential(
            nn.Linear(d_model, d_model // 4),
            nn.GELU(),
            nn.Linear(d_model // 4, 1),
            nn.Sigmoid()
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # Isotropic whitening projection
        mean = x.mean(dim=-1, keepdim=True)
        std = x.std(dim=-1, keepdim=True) + 1e-5
        whitened = (x - mean) / std
        projected = self.whitening_proj(whitened)

        # Discrete authority gating score
        confidence = self.authority_gate(projected)
        mask = (confidence >= self.threshold).float()
        
        return projected * mask`
  },
  {
    id: "fast-vector-index",
    title: "Fast Local Vector Index Micro-Lib",
    slug: "fast-vector-index",
    tagline: "Single-file 0-dependency TypeScript vector similarity search.",
    language: "TypeScript",
    category: "UI Kits",
    description: "Pure TypeScript cosine similarity and HNSW-lite vector search index for browser & local-first Node apps without heavy native dependencies.",
    installCommand: "npm install @quiet-studio/vector-index",
    githubUrl: "https://github.com/quiet-studio/vector-index",
    stars: 410,
    tags: ["TypeScript", "Vector Search", "Local First", "Browser"],
    filename: "vector_index.ts",
    codeSnippet: `export class FastVectorIndex {
  private index: Map<string, { vector: number[]; metadata: Record<string, any> }> = new Map();

  public add(id: string, vector: number[], metadata: Record<string, any> = {}): void {
    this.index.set(id, { vector, metadata });
  }

  public search(queryVector: number[], topK = 5): { id: string; score: number; metadata: any }[] {
    const results: { id: string; score: number; metadata: any }[] = [];
    for (const [id, entry] of this.index.entries()) {
      const score = this.cosineSimilarity(queryVector, entry.vector);
      results.push({ id, score, metadata: entry.metadata });
    }
    return results.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0, normA = 0, normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-8);
  }
}`
  }
];
