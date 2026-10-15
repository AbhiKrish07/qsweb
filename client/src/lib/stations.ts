export interface StationData {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  accent: string;
  accentRgb: string;
  tags: string[];
  specs: { label: string; value: string }[];
  metricGauge: {
    percentage: number;
    value: string;
    label: string;
    sublabel: string;
  };
  primaryAction: { label: string; href: string; external?: boolean };
  secondaryAction?: { label: string; href: string; external?: boolean };
}

export const STATIONS: StationData[] = [
  {
    id: "partner",
    index: "01",
    name: "Proactive AI Life Partner",
    subtitle: "AMBIENT & CONTEXTUAL COMPANION",
    tagline: "AI that anticipates your daily tasks, context, and focus—without requiring prompts.",
    description:
      "Moving beyond reactive text chats into proactive life partnership. We engineer persistent contextual awareness, ambient intent recognition, and background workflow execution so AI works alongside your real-world routine.",
    accent: "#ff5a1f",
    accentRgb: "255, 90, 31",
    tags: ["Proactive Partner", "Life Context", "Ambient Reflexes", "Zero Prompt"],
    specs: [
      { label: "Role", value: "Proactive Life Partner" },
      { label: "Anticipation", value: "Ambient Context" },
      { label: "Latency", value: "< 14ms Intent Parse" },
    ],
    metricGauge: {
      percentage: 96,
      value: "96.4%",
      label: "Proactive Intent Fidelity",
      sublabel: "Zero-Prompt Life Reflexes",
    },
    primaryAction: { label: "Read Life Partner Essay", href: "/blog/ai-as-a-proactive-life-partner" },
    secondaryAction: { label: "Architecture Thesis", href: "/thesis" },
  },
  {
    id: "vertical",
    index: "02",
    name: "Domain-Vertical Task Models",
    subtitle: "SURGICAL TASK SPECIALIZATION",
    tagline: "Task-shaped vertical models engineered for the exact workflows and problems you face.",
    description:
      "Aethel Intent Engine and specialized vertical model checkpoints. Moving past generalist LLMs that know everything superficially toward domain-specific vertical intelligences that master high-stakes tasks with zero hallucination.",
    accent: "#fbbf24",
    accentRgb: "251, 191, 36",
    tags: ["Vertical Models", "Aethel Engine", "Task Checkpoints", "Distilled Weights"],
    specs: [
      { label: "Specialization", value: "Domain Task-Specific" },
      { label: "Reasoning", value: "Structured Intent" },
      { label: "Precision", value: "99.1% F1 Task Match" },
    ],
    metricGauge: {
      percentage: 99,
      value: "99.1%",
      label: "Task Execution Precision",
      sublabel: "Zero-Hallucination Vertical Heads",
    },
    primaryAction: { label: "Read Vertical AI Thesis", href: "/blog/why-vertical-models-beat-general-ai" },
    secondaryAction: { label: "Examine Aethel Model", href: "/products/aethel" },
  },
  {
    id: "sctm",
    index: "03",
    name: "Cognitive Architecture & SCTM",
    subtitle: "SPARSE TENSOR MEMORY RETENTION",
    tagline: "128,000 token context retention with isotropic attention whitening and zero distractor noise.",
    description:
      "Sparse Confident Tensor Memory (SCTM) architecture engineered in public. Prevents KV-cache distractor pollution across long-horizon human tasks, giving your proactive partner lasting context of decisions made weeks or months ago.",
    accent: "#ff5a1f",
    accentRgb: "255, 90, 31",
    tags: ["SCTM Memory", "Isotropic Whitening", "128k Context", "PyTorch / CUDA"],
    specs: [
      { label: "Context Window", value: "128,000 Tokens" },
      { label: "Signal Purity", value: "94.2% Precision" },
      { label: "Memory Retention", value: "Zero Distractor Noise" },
    ],
    metricGauge: {
      percentage: 94,
      value: "94.2%",
      label: "Context Signal Retention",
      sublabel: "Attention Whitening Active",
    },
    primaryAction: { label: "Read SCTM Whitepaper", href: "/research/sctm-memory-architecture" },
    secondaryAction: { label: "All Research Papers", href: "/research" },
  },
  {
    id: "gating",
    index: "04",
    name: "Discrete Authority Gating",
    subtitle: "ZERO-TRUST PROACTIVE SAFETY",
    tagline: "Cryptographic capability validation prior to autonomous workspace execution.",
    description:
      "Formal action-validation runtime for proactive life-partner agents. Enforces discrete capability tokens and zero-trust verification before ambient intents mutate user environments.",
    accent: "#38bdf8",
    accentRgb: "56, 189, 248",
    tags: ["Authority Gating", "Zero-Trust Agent", "Cryptographic Bounds", "Formal Safety"],
    specs: [
      { label: "Verification Latency", value: "< 0.4ms Local" },
      { label: "Trust Vector", value: "Strict Zero-Trust" },
      { label: "Runtime Guard", value: "Deterministic C++" },
    ],
    metricGauge: {
      percentage: 100,
      value: "100%",
      label: "Zero-Trust Boundary Proof",
      sublabel: "Pre-Execution Gate Active",
    },
    primaryAction: { label: "Read Gating Whitepaper", href: "/research/discrete-authority-gating" },
    secondaryAction: { label: "All Research Papers", href: "/research" },
  },
];
