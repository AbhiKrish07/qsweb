import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code,
  Command,
  Cpu,
  FileCode,
  Github,
  Globe,
  Layers,
  LayoutGrid,
  LoaderCircle,
  Mail,
  MoveUpRight,
  Search,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { Link } from "wouter";
import { categories, getCategoryLabel, products, type Product, type ProductCategory } from "@/lib/products";
import { toast } from "sonner";
import { playClick } from "@/lib/sound";
import QuietStudioLab3D from "@/components/QuietStudioLab3D";
import FluxLines from "@/components/FluxLines";
import ElectricLogo from "@/components/ElectricLogo";
import Strands from "@/components/Strands";
import HalftoneReveal from "@/components/HalftoneReveal";
import TextLoop from "@/components/TextLoop";
import { BLOG_POSTS } from "@/pages/Notes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <div className={`product-visual visual-${product.visual} ${compact ? "compact" : ""}`} aria-hidden="true">
      {product.visual === "learnloop" && (
        <>
          <div className="loop-ring ring-one" />
          <div className="loop-ring ring-two" />
          <div className="loop-core">
            <span>learn</span>
            <span>loop</span>
          </div>
          <div className="loop-node node-one">01</div>
          <div className="loop-node node-two">↗</div>
          <div className="loop-node node-three">02</div>
        </>
      )}
      {product.visual === "whitespace" && (
        <>
          <div className="window-stack">
            <div className="window-head">
              <i />
              <i />
              <i />
            </div>
            <div className="window-copy">
              <b>context</b>
              <span>saved to whitespace</span>
              <span>⌘ K to recall</span>
            </div>
          </div>
          <div className="ghost-window" />
        </>
      )}
      {product.visual === "aethel" && (
        <>
          <div className="aethel-sphere">
            <div className="sphere-grid" />
            <div className="sphere-glow" />
          </div>
          <div className="aethel-cross cross-a" />
          <div className="aethel-cross cross-b" />
          <span className="aethel-label">INTENT → ACTION</span>
        </>
      )}
      {product.visual === "capture" && (
        <>
          <div className="aethel-sphere">
            <div className="sphere-grid" />
            <div className="sphere-glow" />
          </div>
          <span className="aethel-label">LOCAL RUNTIME</span>
        </>
      )}
    </div>
  );
}

function CategoryTab({
  category,
  active,
  onClick,
}: {
  category: (typeof categories)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`category-tab ${active ? "active" : ""}`} onClick={onClick} aria-pressed={active}>
      <span className="tab-number">{category.count}</span>
      <span>{category.label}</span>
      <ArrowRight size={14} className="tab-arrow" />
    </button>
  );
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const projectHref = `/products/${product.slug}`;
  const codeHref = product.github || `https://github.com/AbhiKrish07/${product.slug}`;
  
  // Distinct rationale/essay link per product
  const rationaleHref =
    product.slug === "zen-ai"
      ? "/blog/ai-as-a-proactive-life-partner"
      : product.slug === "learnloop"
      ? "/blog/why-vertical-models-beat-general-ai"
      : product.slug === "aethel"
      ? "/research/interface-as-reflex"
      : "/thesis";

  // Distinct system/specs link per product
  const specsHref =
    product.slug === "zen-ai"
      ? "/system"
      : product.slug === "learnloop"
      ? "/templates"
      : "/research";

  return (
    <div className={`product-card ${featured ? "featured" : ""}`}>
      <div className="card-meta">
        <span>
          {product.index} — {getCategoryLabel(product.category)}
        </span>
        <span className={`status status-${product.color}`}>{product.status}</span>
      </div>

      <Link href={projectHref}>
        <ProductVisual product={product} compact={!featured} />
      </Link>

      <div className="card-copy">
        <div>
          <Link href={projectHref}>
            <h3>{product.name}</h3>
          </Link>
          <p>{product.oneLiner}</p>
        </div>
        <Link href={projectHref} className="circle-arrow" aria-label={`Open ${product.name}`}>
          <MoveUpRight size={16} />
        </Link>
      </div>

      <div className="card-tags">
        {product.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-card-interactive-links">
        <Link href={projectHref} className="project-quick-link" title="Open Interactive App & Demo">
          <Globe size={12} />
          <span>Interactive App</span>
        </Link>
        <a href={codeHref} target="_blank" rel="noreferrer" className="project-quick-link" title="View Source Code on GitHub">
          <Github size={12} />
          <span>Source Code</span>
        </a>
        <Link href={rationaleHref} className="project-quick-link" title="Read Architectural Rationale">
          <FileCode size={12} />
          <span>Why Needed</span>
        </Link>
        <Link href={specsHref} className="project-quick-link" title="View System Architecture & Specs">
          <Layers size={12} />
          <span>System Specs</span>
        </Link>
      </div>
    </div>
  );
}

const noteContent = [
  {
    type: "ESSAY — 06.09.26",
    title: "The case for building less software.",
    excerpt: "Why the next generation of tools should feel more like a reflex than a destination.",
    body: "The best product is often the layer you no longer notice. Quiet Studio is interested in the small, capable objects that keep you moving without asking you to become their operator. Less surface area. More trust. Fewer decisions between an intention and the thing itself.",
  },
  {
    type: "LOG — 28.08.26",
    title: "What one useful thing looks like.",
    excerpt: "A shipping rule for a studio of one.",
    body: "One useful thing is specific enough to use today and opinionated enough to remember tomorrow. It should solve a real problem, have a point of view, and leave the rest of the roadmap alone until the signal is clear.",
  },
  {
    type: "RESEARCH — 14.08.26",
    title: "When AI stops feeling like AI.",
    excerpt: "Early observations from Aethel.",
    body: "The magic is not in making systems speak more. It is in making them understand when language is unnecessary. Aethel is a running set of experiments around intent, timing, and the dignity of not being interrupted.",
  },
];

const LOOPS_FORM_ACTION = "https://app.loops.so/api/newsletter-form/cmatylqt31ghsxb0izxxyerf0";

function StudioWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast("Please enter a valid email address.");
      return;
    }

    // Rate limiting check: 60s cooldown per Loops instructions
    const now = Date.now();
    const previousTimestamp = localStorage.getItem("loops-form-timestamp");
    if (previousTimestamp && Number(previousTimestamp) + 60000 > now) {
      setStatus("error");
      setErrorMessage("Too many signups, please try again in a little while");
      return;
    }
    localStorage.setItem("loops-form-timestamp", String(now));

    setStatus("loading");
    playClick();

    let loopSuccess = false;
    let localSuccess = false;

    // 1. Submit directly to Loops endpoint with urlencoded form
    try {
      const formBody = "userGroup=&mailingLists=&email=" + encodeURIComponent(cleanEmail);
      const res = await fetch(LOOPS_FORM_ACTION, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });
      if (res.ok) {
        loopSuccess = true;
      }
    } catch (err) {
      console.warn("Client Loops fetch failed or blocked by CORS/Adblocker:", err);
    }

    // 2. Submit to Quiet Studio server: stores in data/waitlist.json, logs alert to glexionstriker@gmail.com, and serves as server-side backup forwarder to Loops
    try {
      const localRes = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          source: "First Page Hero Waitlist",
          ownerNotification: "glexionstriker@gmail.com",
        }),
      });
      if (localRes.ok) {
        localSuccess = true;
      }
    } catch (err) {
      console.error("Local waitlist API error:", err);
    }

    if (loopSuccess || localSuccess) {
      setStatus("success");
      toast("You're on the waitlist! We'll be in touch.");
    } else {
      setStatus("error");
      setErrorMessage("Oops! Something went wrong, please try again");
      localStorage.setItem("loops-form-timestamp", "");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setEmail("");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className="hero-waitlist-success-badge">
        <div className="waitlist-success-icon">
          <Check size={16} />
        </div>
        <div className="waitlist-success-text">
          <strong>You're on the waitlist!</strong>
          <span>We'll email updates and early access invites directly to your inbox.</span>
        </div>
        <button type="button" onClick={handleReset} className="waitlist-back-btn">
          Add another &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="hero-waitlist-container">
      <form className={`hero-waitlist-form ${status === "loading" ? "is-loading" : ""}`} onSubmit={handleSubmit}>
        <div className="hero-waitlist-input-wrap">
          <Mail size={16} className="hero-waitlist-icon" />
          <input
            type="email"
            className="hero-waitlist-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading"}
            aria-label="Join the Quiet Studio Waitlist"
          />
        </div>
        <button
          type="submit"
          className="hero-waitlist-submit-btn"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <LoaderCircle size={15} className="spin" />
              <span>Joining...</span>
            </>
          ) : (
            <>
              <span>Join Waitlist</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </form>
      {status === "error" && (
        <div className="hero-waitlist-error">
          <span>{errorMessage}</span>
          <button type="button" onClick={handleReset} className="waitlist-try-again-btn">
            Try again
          </button>
        </div>
      )}
      <div className="hero-waitlist-sub-micro">
        <span className="dot-pulse" />
        <span>Get studio updates, early access to apps, and labs research. No spam.</span>
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      toast("Enter a valid email address to subscribe.");
      return;
    }
    setState("loading");

    // Submit to Loops
    try {
      await fetch(LOOPS_FORM_ACTION, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "userGroup=&mailingLists=&email=" + encodeURIComponent(cleanEmail),
      });
    } catch {
      /* ignore client-side CORS errors */
    }

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, source: "Home Footer Newsletter", target: "glexionstriker@gmail.com" }),
      });
    } catch {
      /* fallback graceful handler */
    }
    setState("done");
    toast("You’re on the list! Welcome to the quiet.");
  };

  if (state === "done") {
    return (
      <div className="newsletter-success success-pop">
        <Check size={15} /> You’re on the list.
      </div>
    );
  }

  return (
    <form className={`newsletter-form ${state === "loading" ? "is-loading" : ""}`} onSubmit={submit}>
      <Mail size={15} />
      <input
        aria-label="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="your@email.com"
        type="email"
        disabled={state === "loading"}
      />
      <button aria-label="Subscribe" type="submit" disabled={state === "loading"}>
        {state === "loading" ? <LoaderCircle className="spin" size={15} /> : <ArrowUpRight size={16} />}
      </button>
    </form>
  );
}

export default function Home({
  mode = "human",
  onModeChange,
  defaultSection,
}: {
  mode?: "human" | "agent";
  onModeChange?: (m: "human" | "agent") => void;
  defaultSection?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("flagship");
  const [query, setQuery] = useState("");
  const [openNote, setOpenNote] = useState<number | null>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!defaultSection || typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const target = document.getElementById(defaultSection);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - 80, behavior: "smooth" });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [defaultSection]);

  // Filter products across categories with search support
  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          product.category === activeCategory &&
          `${product.name} ${product.oneLiner} ${product.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
      ),
    [activeCategory, query]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Refresh ScrollTrigger when DOM layout switches modes
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      // 1. Manifesto Parallax Scrub (kinetic text & rule reveal)
      if (document.querySelector(".manifesto-section")) {
        gsap.fromTo(
          ".manifesto-section .old-hero-text-block",
          { opacity: 0.2, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: ".manifesto-section",
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".manifesto-lead",
          { y: 40, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: ".manifesto-layout",
              start: "top 85%",
              end: "center center",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".manifesto-statement > p",
          { y: 35, opacity: 0.25 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".manifesto-statement",
              start: "top 80%",
              end: "center 50%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".manifesto-rule",
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            scrollTrigger: {
              trigger: ".manifesto-statement",
              start: "top 75%",
              end: "bottom 75%",
              scrub: 1,
            },
          }
        );
      }

      // 2. Models Showcase 3D Angle Glide
      if (document.querySelector(".model-showcase-card")) {
        gsap.utils.toArray<HTMLElement>(".model-showcase-card").forEach((card, i) => {
          const angle = i === 0 ? -4 : i === 2 ? 4 : 0;
          gsap.fromTo(
            card,
            { y: 60, rotateY: angle, opacity: 0.3 },
            {
              y: 0,
              rotateY: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 45%",
                scrub: 1,
              },
            }
          );
        });
      }

      // 3. Open Source Product Cards Parallax Scrub
      if (document.querySelector(".product-card")) {
        gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0.35 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
        });
      }

      // 4. Notes Grid Stagger Scrub
      if (document.querySelector(".note-card")) {
        gsap.utils.toArray<HTMLElement>(".note-card").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 35, opacity: 0.4 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 60%",
                scrub: 1,
              },
            }
          );
        });
      }

      // 5. Closing Studio Ring Kinetic Rotation Scrub
      if (document.querySelector(".closing-ring")) {
        gsap.to(".closing-ring", {
          rotate: 240,
          scale: 1.35,
          scrollTrigger: {
            trigger: ".closing-section",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }
    }, homeRef);

    // Dynamic 3D magnetic tilt & cursor spotlight on cards
    const handleCardPointerMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest(".product-card, .model-showcase-card, .note-card") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const handleCardPointerLeave = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest(".product-card, .model-showcase-card, .note-card") as HTMLElement | null;
      if (!card) return;
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    };

    document.addEventListener("mousemove", handleCardPointerMove, { passive: true });
    document.addEventListener("mouseout", handleCardPointerLeave, { passive: true });

    return () => {
      clearTimeout(timer);
      ctx.revert();
      document.removeEventListener("mousemove", handleCardPointerMove);
      document.removeEventListener("mouseout", handleCardPointerLeave);
    };
  }, [mode]);

  return (
    <div className="home-page" ref={homeRef}>
      {mode === "human" ? (
        /* =========================================================================
           HUMAN MODE: SPATIAL HERO (STUDIO MANIFESTO), OPEN CORE APPS & ESSAYS
           Tactile floating widgets, QuietStudio manifesto content, and local-first software
           ========================================================================= */
        <>
          {/* Spatial Prioritize-Inspired Hero with Studio Manifesto Content */}
          <section className="human-spatial-canvas" id="overview">
            {/* Interactive FluxLines Background from React Bits */}
            <div className="hero-flux-backdrop" aria-hidden="true">
              <FluxLines
                colors={
                  isDark
                    ? ["#ff5a1f", "#ff844b", "#ffffff", "#fb923c"]
                    : ["#ff5a1f", "#3f3f46", "#ea580c", "#71717a"]
                }
                dpr={1}
                glow={2}
                rimWidth={0.2}
                lineWidth={1}
                speed={0.45}
                scale={1.5}
                turbulence={0.9}
                fluidity={0.12}
                flowDirection="down"
                mouseInteraction
                clickSwirl
                lightMode={!isDark}
                transparent
                opacity={isDark ? 0.9 : 0.65}
              />
            </div>

            {/* Top-Left Floating Post-It Sticky Note */}
            <div className="floating-widget-note" aria-hidden="true">
              <div className="pin-dot" />
              <p>
                The best technology doesn’t ask to be noticed. It becomes a quiet extension of what you were already trying to do.
              </p>
            </div>

            {/* Mid-Left Floating Widget: Interactive Strands Glass Orb from React Bits */}
            <div className="floating-widget-strands" aria-label="Interactive Strands Glass Orb" title="Click or hover to stir strands">
              <Strands
                colors={["#ff5a1f", "#ff7849", "#ffa07a", "#fff4ed", "#38bdf8", "#2563eb", "#1d4ed8"]}
                glass={true}
                glassSize={1.05}
                energy={0.7}
                maxDevicePixelRatio={1}
                interactive
                clickPulse
                lightMode={!isDark}
              />
            </div>

            {/* Top-Right Floating Widget: Interactive ElectricLogo from React Bits */}
            <div className="floating-widget-electric" aria-label="Zen AI Electric Runtime">
              <div className="electric-widget-header">
                <div className="electric-widget-title">
                  <span className="electric-live-dot" />
                  <span>Zen AI Runtime</span>
                </div>
                <span className="electric-tag-pill">QUANTIZED</span>
              </div>
              <div className="electric-logo-canvas-wrap">
                <ElectricLogo
                  color={isDark ? "#ffffff" : "#ff5a1f"}
                  glowColor={isDark ? "#ff5a1f" : "#ff7849"}
                  scale={0.75}
                  strands={4}
                  bend={0.6}
                  crackle={1.5}
                  arcs={1}
                  speed={2.2}
                  interactive
                  theme={isDark ? "dark" : "light"}
                />
              </div>
            </div>

            {/* Center Hero Content (Quiet Studio Manifesto Content) */}
            <div className="human-hero-brand-badge">
              <span className="brand-dot" />
            </div>

            <h1 className="human-hero-headline-prioritize">
              Technology should
              <span className="headline-light-line">get out of your way</span>
            </h1>

            <p className="human-hero-sub-prioritize">
              Quiet Studio is a one-person product studio exploring open-core apps, local-first computing, and tools
              that make the complex feel calm—without dashboards or productivity theatre.
            </p>

            <div className="human-hero-cta-group">
              <a
                href="#apps"
                className="human-hero-cta-btn"
                onClick={(e) => {
                  e.preventDefault();
                  playClick();
                  document.getElementById("apps")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Explore Open Core Apps</span>
                <ArrowRight size={14} />
              </a>
              <Link
                href="/thesis"
                className="human-hero-secondary-btn"
                onClick={() => playClick()}
              >
                <span>Read Studio Thesis</span>
                <ArrowUpRight size={13} />
              </Link>
              {onModeChange && (
                <button
                  type="button"
                  className="human-hero-secondary-btn"
                  onClick={() => {
                    playClick();
                    onModeChange("agent");
                  }}
                  title="Switch to AI Laboratory: Models & Research"
                >
                  <Sparkles size={13} />
                  <span>AI Lab ↗</span>
                </button>
              )}
            </div>

            {/* Bottom-Left Floating Widget: Interactive HalftoneReveal from React Bits */}
            <div className="floating-widget-halftone" aria-label="Interactive Halftone Reveal">
              <div className="halftone-widget-header">
                <div className="halftone-widget-title">
                  <span className="halftone-indicator-dot" />
                  <span>Halftone Reveal</span>
                </div>
                <span className="halftone-tag-pill">SCREEN // 60°</span>
              </div>
              <div className="halftone-canvas-wrap">
                <HalftoneReveal
                  src="https://images.unsplash.com/photo-1693250707557-a846a014b321?q=80&w=1400&auto=format&fit=crop"
                  mode="mono"
                  shape="ellipse"
                  cellSize={7}
                  angle={60}
                  inkColor={isDark ? "#f4f1ea" : "#141413"}
                  paperColor={isDark ? "#120f17" : "#faf9f5"}
                  revealRadius={140}
                  roughness={0.7}
                  clickBurst
                />
              </div>
            </div>

            {/* Bottom-Right Floating Sync Widget */}
            <div className="floating-widget-sync" aria-hidden="true">
              <div className="sync-header">Open Core Stack</div>
              <div className="sync-icon-row">
                <div className="sync-app-box" title="Rust Inference">
                  <Terminal size={18} />
                </div>
                <div className="sync-app-box" title="Local Intelligence">
                  <Cpu size={18} />
                </div>
                <div className="sync-app-box" title="Zero Telemetry">
                  <Zap size={18} />
                </div>
              </div>
            </div>
          </section>

          {/* Seamless Overlapping Ribbon: Interactive TextLoop from React Bits */}
          <div className="hero-textloop-bridge" aria-label="QuietStudio Labs Ribbon">
            <TextLoop
              text="QuietStudio ✦ Labs"
              shape="line"
              speed={120}
              direction="forward"
              separator="✦"
              curviness={90}
              tilt={0}
              fontSize={40}
              fontWeight={800}
              letterSpacing={1}
              uppercase
              ribbon
              ribbonColor="#ff5a36"
              ribbonWidth={76}
              edgeFade={0}
              cross
              crossAngle={14}
              draggable
              scrollBoost={0}
              outline={false}
              pauseOnHover
              color="#120f17"
              crossColor={isDark ? "#222220" : "#000000"}
            />
          </div>

          {/* Section 1: Open Source Applications & Software */}
          <section
            className="products-section"
            id="apps"
            style={{ padding: "7vw 9.2vw", background: "var(--background)" }}
          >
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 01 — OPEN CORE APPLICATIONS &amp; SOFTWARE ]
                </div>
                <h2>
                  Things in
                  <br />
                  <em>motion.</em>
                </h2>
                <p className="section-description" style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "440px" }}>
                  Open-core, local-first applications built for zero friction, complete privacy, and continuous flow.
                </p>
              </div>
              <a
                href="https://github.com/AbhiKrish07"
                target="_blank"
                rel="noreferrer"
                className="outline-button"
              >
                Browse All on GitHub <Github size={14} />
              </a>
            </div>

            <div className="product-grid" style={{ marginTop: "4vw" }}>
              {products.slice(0, 2).map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  featured={index === 0}
                />
              ))}
            </div>
          </section>

          {/* Section 2: Blog & Research Journal */}
          <section className="notes-section" id="notes" style={{ padding: "7vw 9.2vw", background: "var(--card)", borderTop: "1px solid var(--line)" }}>
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker">[ 02 — THE RESEARCH JOURNAL &amp; BLOG ]</div>
                <h2>
                  Thinking
                  <br />
                  <em>out loud.</em>
                </h2>
                <p className="section-description">
                  In-depth essays and working notes on making AI a proactive life partner, building domain-vertical models, and the craft of calm software.
                </p>
                <div style={{ marginTop: "18px" }}>
                  <Link href="/blog" className="primary-button" style={{ padding: "10px 18px", fontSize: "11px" }}>
                    <span>Browse All Blog Essays</span> <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
              <div className="newsletter-box">
                <span>Subscribe to Essays</span>
                <NewsletterForm />
              </div>
            </div>

            <div className="notes-grid" style={{ marginTop: "4vw" }}>
              {BLOG_POSTS.slice(0, 3).map((post, index) => (
                <article
                  className={`note-card ${index === 0 ? "note-featured" : ""} ${index === 2 ? "note-dark" : ""}`}
                  key={post.slug}
                >
                  <span className="note-type">{post.category} — {post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px" }}>
                    <span style={{ font: "500 10px 'DM Mono', monospace", color: "var(--muted-ink)", textTransform: "uppercase" }}>
                      {post.readTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="note-read"
                    >
                      Read full essay <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* =========================================================================
           AGENT MODE: AI LABORATORY HEADER, RESEARCH MANIFESTO, MODELS & WHITEPAPERS
           Cinematic dark header, theoretical foundations, sparse tensor memory & intent models
           ========================================================================= */
        <>
          {/* Section 1: The 3D Interactive AI Laboratory */}
          <div id="overview">
            <QuietStudioLab3D />
          </div>

          {/* Section 2: AI Lab Manifesto (In Terms of Models and Research Papers) */}
          <section className="manifesto-section" id="manifesto">
            <div className="section-marker">[ 01 — THE AI LAB MANIFESTO: RESEARCH &amp; MODELS ]</div>

            <div
              className="old-hero-text-block"
              style={{
                margin: "1rem 0 1.5rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid color-mix(in srgb, var(--background) 18%, transparent)",
              }}
            >
              <p
                className="eyebrow"
                style={{
                  color: "var(--orange)",
                  font: "600 11px/1.4 'DM Mono', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                <span className="pulse-dot" /> independent AI research &amp; distilled tensor architectures — 2026
              </p>
              <h2
                style={{
                  font: "700 clamp(2rem, 4vw, 4.2rem)/0.92 'Space Grotesk', sans-serif",
                  letterSpacing: "-0.06em",
                  color: "var(--background)",
                  textTransform: "uppercase",
                  margin: "0 0 14px",
                }}
              >
                A proactive partner in your life
                <span style={{ color: "var(--orange)" }}>,</span>
                <br />
                <em style={{ fontStyle: "italic", fontFamily: "serif", textTransform: "none" }}>
                  vertical for the tasks you need.
                </em>
              </h2>
              <p
                style={{
                  font: "400 15px/1.55 'DM Sans', sans-serif",
                  color: "color-mix(in srgb, var(--background) 70%, transparent)",
                  maxWidth: "680px",
                  margin: 0,
                }}
              >
                The AI Laboratory at Quiet Studio isn’t just working on isolated memory mathematics. Our central goal
                is making artificial intelligence a proactive companion in your daily life: deeply vertical, task-specialized,
                and aware of your context so it executes what you need without syntax gymnastics.
              </p>
            </div>

            <div className="manifesto-layout">
              <p className="manifesto-lead">
                Proactive intelligence <span>tailored to your tasks:</span>
              </p>
              <div className="manifesto-statement">
                <p>from ambient intent detection to deep vertical execution.</p>
                <div className="manifesto-rule" />
                <p className="manifesto-fine">
                  Instead of generalist chatbots that know everything superficially, our laboratory engineers vertical models and long-horizon context architectures (SCTM) that master specific workflows with zero friction and absolute privacy.
                </p>
              </div>
            </div>

            <div className="manifesto-bottom">
              <div className="signal-card">
                <Command size={18} />
                <span>
                  CORE ROLE: PROACTIVE LIFE &amp; WORK PARTNER
                  <br />
                  <b>MODEL ARCHITECTURE: VERTICAL TASK ENGINES</b>
                </span>
              </div>
              <p>
                Proactive instead of reactive.
                <br />
                Vertical models for actual work.
                <br />
                Calm intelligence that gets out of your way.
              </p>
            </div>
          </section>

          {/* Section 3: Vertical AI Models & Intent Engines */}
          <section className="models-showcase-section" id="models" style={{ padding: "7vw 9.2vw", background: "var(--background)" }}>
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker" style={{ color: "var(--orange)" }}>
                  [ 02 — DOMAIN-VERTICAL AI MODELS &amp; INTENT ENGINES ]
                </div>
                <h2>
                  Vertical models &amp;
                  <br />
                  <em>task execution.</em>
                </h2>
                <p
                  className="section-description"
                  style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "520px" }}
                >
                  Moving past generalist chatbots to specialized vertical models tailored for the exact tasks, routines, and decisions you face.
                </p>
              </div>
              <Link href="/blog/why-vertical-models-beat-general-ai" className="outline-button">
                Read Vertical AI Thesis <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="models-grid" style={{ marginTop: "4vw" }}>
              {/* Model 1: Aethel Intent Engine */}
              <div className="model-showcase-card">
                <div className="model-head">
                  <span className="model-badge" style={{ color: "#fbbf24" }}>VERTICAL MODEL</span>
                  <span className="model-latency">AMBIENT PARSER</span>
                </div>
                <h3>Aethel Intent Engine</h3>
                <p className="model-tagline">Anticipates user workflow goals before explicit verbal prompts.</p>
                <p style={{ fontSize: "13px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Synthesizes peripheral desktop telemetry, active workspace context, and recent micro-gestures into direct executable intents.
                </p>
                <div className="model-specs-box">
                  <div className="model-spec-pair">
                    <span>Target</span>
                    <span>Zero Prompt UI</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Match Rate</span>
                    <span>99.1% F1</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Deployment</span>
                    <span>Hybrid Local/Edge</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Module</span>
                    <span>Aethel Core v2</span>
                  </div>
                </div>
                <div className="model-actions">
                  <Link href="/products/aethel" className="outline-button" style={{ width: "100%", justifyContent: "center" }}>
                    Examine Aethel Protocol <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* Model 2: SCTM Tensor Memory */}
              <div className="model-showcase-card">
                <div className="model-head">
                  <span className="model-badge">AI MEMORY SYSTEM</span>
                  <span className="model-latency">&lt; 12ms RETRIEVAL</span>
                </div>
                <h3>SCTM Tensor Memory</h3>
                <p className="model-tagline">Sparse Confident Tensor Memory with Isotropic Whitening.</p>
                <p style={{ fontSize: "13px", color: "var(--muted-ink)", lineHeight: 1.5, margin: 0 }}>
                  Maintains 94.2% retrieval precision over 128k context windows by filtering attention distractor pollution
                  before key-value caching.
                </p>
                <div className="model-specs-box">
                  <div className="model-spec-pair">
                    <span>Window</span>
                    <span>128,000 Tokens</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Precision</span>
                    <span>94.2% Signal</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Framework</span>
                    <span>PyTorch / CUDA</span>
                  </div>
                  <div className="model-spec-pair">
                    <span>Status</span>
                    <span>Whitepaper Open</span>
                  </div>
                </div>
                <div className="model-actions">
                  <Link href="/research/sctm-memory-architecture" className="outline-button" style={{ width: "100%", justifyContent: "center" }}>
                    Read Architecture Whitepaper <ArrowRight size={13} />
                  </Link>
                </div>
              </div>


            </div>
          </section>

          {/* Section 4: AI Research & Architecture Whitepapers */}
          <section className="research-preview-section" id="research" style={{ padding: "7vw 9.2vw", background: "var(--card)", borderTop: "1px solid var(--line)" }}>
            <div className="section-heading compact-heading">
              <div>
                <div className="section-marker">[ 03 — RESEARCH &amp; WHITEPAPERS ]</div>
                <h2>
                  Theoretical
                  <br />
                  <em>foundations.</em>
                </h2>
                <p className="section-description">
                  Peer-reviewed whitepapers on Sparse Confident Tensor Memory and discrete authority gating.
                </p>
              </div>
              <Link href="/research" className="outline-button">
                View All Research <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="research-preview-card" style={{ marginTop: "4vw" }}>
              <div className="research-preview-index">04 / GATING</div>
              <div className="research-preview-copy">
                <span className="meta-label">ZERO-TRUST SYSTEMS WHITEPAPER</span>
                <h3>Discrete Authority Gating for Proactive Agents</h3>
                <p>
                  A deterministic capability-token runtime enforcing sub-millisecond local cryptographic proofs before ambient agent intents can mutate user environments.
                </p>
                <Link href="/research/discrete-authority-gating" className="note-read">
                  Read Full Paper <ArrowRight size={14} />
                </Link>
              </div>
              <div className="research-preview-art">
                <div className="research-orbit" />
                <div className="research-orbit orbit-b" />
                <span>
                  GATE<span>.</span>
                </span>
              </div>
            </div>
          </section>
        </>
      )}

      {/* =========================================================================
          CLOSING STUDIO FOOTER (UNIFIED ACROSS MODES)
          ========================================================================= */}
      <section className="closing-section">
        <div className="closing-ring" />
        <p className="eyebrow">If this sounds like your kind of quiet</p>
        <h2>
          Let’s make
          <br />
          <em>something useful.</em>
        </h2>
        <div style={{ maxWidth: "480px", width: "100%", margin: "0 auto 32px" }}>
          <StudioWaitlistForm />
        </div>
        <a
          href="mailto:glexionstriker@gmail.com"
          className="primary-button"
          onClick={() => {
            playClick();
          }}
        >
          Message the studio <ArrowUpRight size={16} />
        </a>
      </section>
    </div>
  );
}

export { ProductVisual };
