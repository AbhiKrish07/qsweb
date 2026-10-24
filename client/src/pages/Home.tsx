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
import QuietStudioPhysicsCanvas from "@/components/QuietStudioPhysicsCanvas";
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
  const codeHref = product.github || "https://github.com/AbhiKrish07";
  const blogHref = product.slug === "aethel" ? "/research/cognitive-resonance" : "/thesis";
  const docsHref = product.github || "/thesis";

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
        <Link href={projectHref} className="project-quick-link" title="Open Project App">
          <Globe size={12} />
          <span>Project App</span>
        </Link>
        <a href={codeHref} target="_blank" rel="noreferrer" className="project-quick-link" title="Open Source Code">
          <Github size={12} />
          <span>Source Code</span>
        </a>
        <Link href={blogHref} className="project-quick-link" title="Blog / Why Needed">
          <FileCode size={12} />
          <span>Why Needed</span>
        </Link>
        <Link href={docsHref} className="project-quick-link" title="Documentation & Specs">
          <Command size={12} />
          <span>Docs & Specs</span>
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
}: {
  mode?: "human" | "agent";
  onModeChange?: (m: "human" | "agent") => void;
}) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("flagship");
  const [query, setQuery] = useState("");
  const [openNote, setOpenNote] = useState<number | null>(null);
  const homeRef = useRef<HTMLDivElement>(null);

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
    <div className="quiet-physics-site" ref={homeRef}>
      {/* Three.js 3D Sphere Physics Interactive Simulation */}
      <QuietStudioPhysicsCanvas />

      {/* Top Fixed Frosted Header */}
      <header className="physics-header">
        <a className="wm" href="#">
          QUIET STUDIO
        </a>
        <nav className="physics-nav">
          <a href="#work" onClick={() => playClick()}>
            Work
          </a>
          <a href="#research" onClick={() => playClick()}>
            Research
          </a>
          <a href="/notes" onClick={() => playClick()}>
            Notes
          </a>
          <a href="#now" onClick={() => playClick()}>
            Now
          </a>
          <a href="#about" onClick={() => playClick()}>
            About
          </a>
        </nav>
        <div className="rt">
          <a
            className="physics-see-code"
            href="https://github.com/AbhiKrish07"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
          >
            <span>See the code</span>
            <span className="orb">
              <ArrowRight size={16} />
            </span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="s hero-physics" id="overview">
        <div className="hr">
          <div className="pa">
            <div className="eb">[ One-person studio ]</div>
            <h1>Build quiet. Ship open.</h1>
          </div>
          <div className="hs pa">
            <p>
              One person building open-source tools, research and a flagship that get out of your way.
            </p>
            <div className="cr">© 2026 — Building in public, Bengaluru</div>
            <div className="cue">
              <ArrowRight size={14} style={{ transform: "rotate(90deg)" }} />
              <span>Scroll</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Work / Open Source Section */}
      <section className="s drop" id="work">
        <div className="physics-grid">
          <div className="pa">
            <div className="lb">[ 02 — Open source ]</div>
            <h2 className="big" style={{ marginTop: "24px" }}>
              Small tools,
              <br />
              shipped in the open.
            </h2>
            <p className="bd" style={{ marginTop: "32px", maxWidth: "34rem" }}>
              Keep scrolling and the field lets go. Every project here solves one small problem, lives in its own repo,
              and gets its own page — a growing ecosystem of modules that quietly make the bigger things better.
            </p>
          </div>
          <div className="physics-cards pa">
            <Link href="/products/learnloop" className="physics-card">
              <div>
                <div className="ch">
                  <b>01</b>Work<i />
                </div>
                <strong>LearnLoop — Local AI Audio Memory</strong>
                <span>Continuous cognitive flow without conversational friction.</span>
              </div>
            </Link>
            <Link href="/research/sctm-memory-architecture" className="physics-card">
              <div>
                <div className="ch">
                  <b>02</b>Research<i />
                </div>
                <strong>SCTM — Full Paper Written</strong>
                <span>Sparse Confident Tensor Memory with Isotropic Whitening.</span>
              </div>
            </Link>
            <Link href="/products/whitespace" className="physics-card">
              <div>
                <div className="ch">
                  <b>03</b>Flagship<i />
                </div>
                <strong>Capture — In Progress</strong>
                <span>The local-first AI second brain everything points toward.</span>
              </div>
            </Link>
            <Link href="/products/aethel" className="physics-card">
              <div>
                <div className="ch">
                  <b>04</b>Intent Engine<i />
                </div>
                <strong>Aethel — Discrete Authority Gating</strong>
                <span>Zero telemetry air-gapped intent parser.</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 03 Research Section */}
      <section className="s shape" id="research">
        <div className="pa">
          <div className="lb">[ 03 — Research ]</div>
          <h2 className="big" style={{ marginTop: "24px", maxWidth: "42rem" }}>
            Scattered, then simple.
          </h2>
        </div>
        <div className="sb pa">
          <p className="bd">
            Out of many projects, one philosophy: minimal, effortless design. Research pushes the frontier; open
            source turns it into something you can actually use. Move your cursor through it and watch the order
            recover.
          </p>
          <div className="pl">
            <Sparkles size={14} />
            <span>Move through it</span>
          </div>
        </div>
      </section>

      {/* 04 Now Section */}
      <section className="s rel" id="now">
        <div className="pa">
          <div className="lb">[ 04 — Now ]</div>
          <h2 className="big" style={{ marginTop: "28px" }}>
            And then,
            <br />
            effortless.
          </h2>
          <p className="bd" style={{ margin: "32px auto 0", maxWidth: "30rem" }}>
            The goal is simple: technology that lifts off your screen and out of your way. Right now: LearnLoop first,
            then open-source work and research, then the Capture beta. Less noise.
          </p>
        </div>
      </section>

      {/* Footer / About Section */}
      <footer className="physics-footer" id="about">
        <div className="mq">
          <div className="mt">
            <span>Build quiet</span>
            <span>Ship open</span>
            <span>Make life effortless</span>
            <span>Let’s build</span>
            <span>Build quiet</span>
            <span>Ship open</span>
            <span>Make life effortless</span>
            <span>Let’s build</span>
          </div>
        </div>
        <div className="fb">
          <div className="fg">
            <div>
              <div className="fl">[ Let’s collaborate ]</div>
              <h2>
                Building something
                <br />
                useful? Come build with me.
              </h2>
              <a
                className="em"
                href="https://github.com/AbhiKrish07"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
              >
                <span>github.com/AbhiKrish07</span>
                <span className="orb">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </div>
            <div className="cols">
              <div>
                <h4>Studio</h4>
                <a href="#work" onClick={() => playClick()}>
                  Work
                </a>
                <a href="#research" onClick={() => playClick()}>
                  Research
                </a>
                <a href="/notes" onClick={() => playClick()}>
                  Notes
                </a>
                <a href="#now" onClick={() => playClick()}>
                  Now
                </a>
              </div>
              <div>
                <h4>Products</h4>
                <Link href="/products/whitespace" onClick={() => playClick()}>
                  Capture
                </Link>
                <Link href="/products/learnloop" onClick={() => playClick()}>
                  LearnLoop
                </Link>
                <Link href="/products/aethel" onClick={() => playClick()}>
                  Aethel
                </Link>
                <a href="#work" onClick={() => playClick()}>
                  Open-source modules
                </a>
              </div>
              <div id="notes">
                <h4>Elsewhere</h4>
                <a href="https://github.com/AbhiKrish07" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <Link href="/thesis" onClick={() => playClick()}>
                  Studio Thesis
                </Link>
                <Link href="/changelog" onClick={() => playClick()}>
                  Build Log
                </Link>
              </div>
            </div>
          </div>

          {/* Studio Waitlist Form */}
          <div style={{ maxWidth: "480px", margin: "48px 0 0" }}>
            <StudioWaitlistForm />
          </div>

          <div className="bt">
            <div>
              <span className="wm">QUIET STUDIO</span>
              <small>© 2026 — One person, building in public.</small>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href="https://github.com/AbhiKrish07"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.75)",
                }}
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>    </div>
  );
}

export { ProductVisual };
