import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, ChevronDown, Github, Menu, Moon, Search, Sun, Volume2, VolumeX, X } from "lucide-react";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Research, { ResearchArticle } from "./pages/Research";
import About from "./pages/About";
import Notes, { NotesIssue } from "./pages/Notes";
import Thesis from "./pages/Thesis";
import NotionTemplates from "./pages/NotionTemplates";
import PromptTemplates from "./pages/PromptTemplates";
import CodingAssets from "./pages/CodingAssets";
import Templates from "./pages/Templates";
import Changelog from "./pages/Changelog";
import System from "./pages/System";
import Models from "./pages/Models";
import CommandPalette from "./components/CommandPalette";
import ContactModal from "./components/ContactModal";
import { isSoundEnabled, toggleSound, playClick } from "./lib/sound";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

const MEGA_MENUS = {
  services: {
    lead: "Four practices, one",
    leadHighlight: "studio",
    allLink: { text: "All practices", href: "/#expertises" },
    items: [
      {
        title: "Product Strategy & Design",
        desc: "PRDs, UX/UI, wireframes, interaction design, token systems & prototypes.",
        href: "/#expertises",
        shape: "sceau",
        color: "#b4a0e5",
      },
      {
        title: "Software & Product Engineering",
        desc: "Full-stack Next.js 15, TypeScript, PostgreSQL, low-latency APIs & dashboards.",
        href: "/#expertises",
        shape: "fleur",
        color: "#ff5a1f",
      },
      {
        title: "Applied AI & Intelligent Systems",
        desc: "RAG architectures, multi-agent workflows, quantized edge inference & pipelines.",
        href: "/#expertises",
        shape: "etoile-huit",
        color: "#eab308",
      },
      {
        title: "Brand, Experience & Launch",
        desc: "Product positioning, design systems, narrative, landing pages & conversion.",
        href: "/#expertises",
        shape: "trefle",
        color: "#22c55e",
      },
    ],
  },
  work: {
    lead: "Software & systems built to",
    leadHighlight: "work",
    allLink: { text: "Selected work", href: "/#realisations" },
    items: [
      {
        title: "Capture Desktop",
        desc: "In-house product · Local-first desktop OS and cognitive workspace.",
        href: "/#realisations",
        shape: "sceau",
        color: "#38bdf8",
      },
      {
        title: "Aethel Runtime",
        desc: "AI system · Context-aware multi-agent orchestration and discrete authority.",
        href: "/#realisations",
        shape: "fleur",
        color: "#ff5a1f",
      },
      {
        title: "Resonance OS",
        desc: "Studio product · Adaptive intelligence and evidence-based learning platform.",
        href: "/#realisations",
        shape: "eclat",
        color: "#f97316",
      },
      {
        title: "Zen AI Engine",
        desc: "Core technology · Quantized edge inference running on Apple Silicon & WebGPU.",
        href: "/#realisations",
        shape: "soleil",
        color: "#eab308",
      },
      {
        title: "Titan Analytics",
        desc: "Product build · Real-time financial intelligence dashboard & anomaly detection.",
        href: "/#realisations",
        shape: "etoile-dix",
        color: "#a855f7",
      },
    ],
  },
  about: {
    lead: "Quiet Studio, that's",
    leadHighlight: "us",
    allLink: { text: "About the studio", href: "/#agence" },
    items: [
      {
        title: "Studio Philosophy",
        desc: "Good products begin with good questions: Strategy, Design, Engineering & AI.",
        href: "/#agence",
        shape: "fleur",
        color: "#ff5a1f",
      },
      {
        title: "The Autonomous Squad",
        desc: "Dedicated senior squads shipping high-velocity product sprints.",
        href: "/#squad",
        shape: "etoile-quatre",
        color: "#a855f7",
      },
      {
        title: "The Method",
        desc: "6-stage product lifecycle: Discover, Define, Design, Engineer, Validate, Launch.",
        href: "/#method",
        shape: "trefle",
        color: "#22c55e",
      },
      {
        title: "Frequently Asked Questions",
        desc: "Answers about product sprints, technology stacks, IP ownership & collaboration.",
        href: "/#faq",
        shape: "soleil",
        color: "#eab308",
      },
    ],
  },
};

function Header({
  dark,
  onToggle,
  onOpenCommand,
  onOpenContact,
  studioMode,
  onStudioModeChange,
}: {
  dark: boolean;
  onToggle: () => void;
  onOpenCommand: () => void;
  onOpenContact: () => void;
  studioMode: "human" | "agent";
  onStudioModeChange: (mode: "human" | "agent") => void;
}) {
  const [location, setLocation] = useLocation();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"services" | "work" | "about" | null>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isProduct = location.startsWith("/products/");

  // Navigation active tabs & sliding orange highlight pill state
  const [activeProductsKey, setActiveProductsKey] = useState<string>("apps");
  const [activeAgencyKey, setActiveAgencyKey] = useState<string>("services");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Sync active key with route/hash
  useEffect(() => {
    if (location.startsWith("/blog") || location.startsWith("/notes")) {
      setActiveProductsKey("blog");
      setActiveAgencyKey("news");
    } else if (location.startsWith("/about")) {
      setActiveProductsKey("about");
      setActiveAgencyKey("about");
    } else if (location === "/") {
      if (studioMode === "human") {
        setActiveProductsKey("apps");
      }
    }
  }, [location, studioMode]);

  // Recalculate indicator position on active tab or mode change
  const updateIndicator = () => {
    const currentKey = studioMode === "human" ? activeProductsKey : activeAgencyKey;
    const currentBtn = itemRefs.current[currentKey];
    const container = navContainerRef.current;
    if (currentBtn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = currentBtn.getBoundingClientRect();
      if (btnRect.width > 0) {
        setIndicatorStyle({
          left: btnRect.left - containerRect.left,
          top: btnRect.top - containerRect.top,
          width: btnRect.width,
          height: btnRect.height,
          opacity: 1,
        });
      }
    }
  };

  useEffect(() => {
    updateIndicator();
    const t1 = setTimeout(updateIndicator, 40);
    const t2 = setTimeout(updateIndicator, 150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [studioMode, activeProductsKey, activeAgencyKey, location]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [studioMode, activeProductsKey, activeAgencyKey]);

  const handleDropdownEnter = (menu: "services" | "work" | "about") => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 240);
  };

  const handleDropdownItemClick = (href: string) => {
    playClick();
    setActiveDropdown(null);
    if (href === "#contact" || href === "/#contact") {
      onOpenContact();
      return;
    }
    handleNavClick(href);
  };

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const navLinks =
    studioMode === "human"
      ? [
          { label: "Open Core Apps", href: "/#apps" },
          { label: "Blog & Notes", href: "/blog" },
          { label: "Foundations", href: "/#foundations" },
          { label: "About", href: "/about" },
        ]
      : [
          { label: "Overview", href: "/#hh" },
          { label: "Services", href: "/#expertises" },
          { label: "Work", href: "/#realisations" },
          { label: "Agency", href: "/#agence" },
          { label: "Impact", href: "/#engagements" },
        ];

  const handleNavClick = (href: string) => {
    playClick();
    setMobileNavOpen(false);

    // Auto-switch studioMode if navigating across mode sections
    if (
      href.startsWith("/#expertises") ||
      href.startsWith("/#realisations") ||
      href.startsWith("/#agence") ||
      href.startsWith("/#faq") ||
      href.startsWith("/#hh")
    ) {
      if (studioMode !== "agent") {
        onStudioModeChange("agent");
      }
    } else if (href.startsWith("/#apps") || href.startsWith("/#foundations")) {
      if (studioMode !== "human") {
        onStudioModeChange("human");
      }
    }

    if (href === "/models" || href === "/#models") {
      setLocation("/models");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const findElement = (id: string) => {
        if (id === "engagements") {
          return document.getElementById("engagements") || document.getElementById("confiance") || document.getElementById("actualites");
        }
        return document.getElementById(id);
      };

      if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          if (targetId === "overview" || targetId === "hh") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const target = findElement(targetId);
            if (target) {
              const top = target.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: top - 80, behavior: "smooth" });
            }
          }
        }, 150);
      } else {
        if (targetId === "overview" || targetId === "hh") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const target = findElement(targetId);
          if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top - 80, behavior: "smooth" });
          }
        }
      }
      return;
    }

    setLocation(href);
  };

  return (
    <>
      <header className="site-header site-header--capsule">
        {/* Three Line Collapsible Menu Icon (Mobile Left) */}
        <button
          className="mobile-menu-toggle"
          onClick={() => {
            playClick();
            setMobileNavOpen(!mobileNavOpen);
          }}
          aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
          title="Toggle Navigation Menu"
        >
          {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Floating Rounded Capsule Navigation (Exact Quiet Studio Reference) */}
        <div className="quiet-capsule-bar">
          {/* Brand Logo */}
          <Link
            href="/"
            className="capsule-logo"
            aria-label="Quiet Studio home"
            onClick={() => {
              playClick();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="capsule-logo-dot" />
            <span className="capsule-logo-text">quiet studio</span>
          </Link>

          {/* Studio Mode Switcher: Products vs Agency (Placed right after Logo) */}
          <div className="capsule-mode-toggle" role="group" aria-label="Studio Mode Switcher">
            <button
              type="button"
              className={`capsule-mode-btn ${studioMode === "human" ? "active mode-products" : ""}`}
              onClick={() => {
                playClick();
                onStudioModeChange("human");
              }}
              title="Products: Open Core Apps & Systems"
            >
              <span className="capsule-mode-symbol">✦</span>
              <span>PRODUCTS</span>
            </button>
            <button
              type="button"
              className={`capsule-mode-btn ${studioMode === "agent" ? "active mode-agency" : ""}`}
              onClick={() => {
                playClick();
                onStudioModeChange("agent");
              }}
              title="Agency: Independent Design & Software Studio"
            >
              <span className="capsule-mode-symbol">✱</span>
              <span>AGENCY</span>
            </button>
          </div>

          {/* Nav Links with Animated Sliding Orange Pill Highlight */}
          <nav className="capsule-links" ref={navContainerRef} onMouseLeave={handleDropdownLeave}>
            {/* The sliding animated orange highlight pill */}
            <span
              className="capsule-sliding-indicator"
              style={{
                transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
                width: `${indicatorStyle.width}px`,
                height: `${indicatorStyle.height}px`,
                opacity: indicatorStyle.opacity,
              }}
            />

            {studioMode === "agent" ? (
              <>
                {/* Services Dropdown */}
                <div className="capsule-nav-item">
                  <button
                    ref={(el) => { itemRefs.current["services"] = el; }}
                    type="button"
                    className={`capsule-nav-btn ${activeAgencyKey === "services" ? "is-active" : ""} ${activeDropdown === "services" ? "is-open" : ""}`}
                    onMouseEnter={() => handleDropdownEnter("services")}
                    onClick={() => {
                      setActiveAgencyKey("services");
                      handleNavClick("/#expertises");
                    }}
                    aria-expanded={activeDropdown === "services"}
                  >
                    Services <ChevronDown size={11} className="capsule-chevron" />
                  </button>
                </div>

                {/* Work Dropdown */}
                <div className="capsule-nav-item">
                  <button
                    ref={(el) => { itemRefs.current["work"] = el; }}
                    type="button"
                    className={`capsule-nav-btn ${activeAgencyKey === "work" ? "is-active" : ""} ${activeDropdown === "work" ? "is-open" : ""}`}
                    onMouseEnter={() => handleDropdownEnter("work")}
                    onClick={() => {
                      setActiveAgencyKey("work");
                      handleNavClick("/#realisations");
                    }}
                    aria-expanded={activeDropdown === "work"}
                  >
                    Work <ChevronDown size={11} className="capsule-chevron" />
                  </button>
                </div>

                {/* About Dropdown */}
                <div className="capsule-nav-item">
                  <button
                    ref={(el) => { itemRefs.current["about"] = el; }}
                    type="button"
                    className={`capsule-nav-btn ${activeAgencyKey === "about" ? "is-active" : ""} ${activeDropdown === "about" ? "is-open" : ""}`}
                    onMouseEnter={() => handleDropdownEnter("about")}
                    onClick={() => {
                      setActiveAgencyKey("about");
                      handleNavClick("/#agence");
                    }}
                    aria-expanded={activeDropdown === "about"}
                  >
                    About <ChevronDown size={11} className="capsule-chevron" />
                  </button>
                </div>

                {/* News */}
                <div className="capsule-nav-item">
                  <button
                    ref={(el) => { itemRefs.current["news"] = el; }}
                    type="button"
                    className={`capsule-nav-btn ${activeAgencyKey === "news" ? "is-active" : ""}`}
                    onClick={() => {
                      setActiveAgencyKey("news");
                      handleNavClick("/blog");
                    }}
                  >
                    News
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Products Mode Nav Links */}
                <div className="capsule-nav-item">
                  <button
                    ref={(el) => { itemRefs.current["apps"] = el; }}
                    type="button"
                    className={`capsule-nav-btn ${activeProductsKey === "apps" ? "is-active" : ""}`}
                    onClick={() => {
                      setActiveProductsKey("apps");
                      handleNavClick("/#apps");
                    }}
                  >
                    Open Core Apps
                  </button>
                </div>
                <div className="capsule-nav-item">
                  <button
                    ref={(el) => { itemRefs.current["blog"] = el; }}
                    type="button"
                    className={`capsule-nav-btn ${activeProductsKey === "blog" ? "is-active" : ""}`}
                    onClick={() => {
                      setActiveProductsKey("blog");
                      handleNavClick("/blog");
                    }}
                  >
                    Blog &amp; Notes
                  </button>
                </div>
                <div className="capsule-nav-item">
                  <button
                    ref={(el) => { itemRefs.current["foundations"] = el; }}
                    type="button"
                    className={`capsule-nav-btn ${activeProductsKey === "foundations" ? "is-active" : ""}`}
                    onClick={() => {
                      setActiveProductsKey("foundations");
                      handleNavClick("/#foundations");
                    }}
                  >
                    Foundations
                  </button>
                </div>
                <div className="capsule-nav-item">
                  <button
                    ref={(el) => { itemRefs.current["about"] = el; }}
                    type="button"
                    className={`capsule-nav-btn ${activeProductsKey === "about" ? "is-active" : ""}`}
                    onClick={() => {
                      setActiveProductsKey("about");
                      handleNavClick("/about");
                    }}
                  >
                    About
                  </button>
                </div>
              </>
            )}
          </nav>

          {/* Action Controls */}
          <div className="capsule-actions">
            <button className="capsule-icon-btn" onClick={onOpenCommand} title="Search studio (⌘K)">
              <Search size={13} />
            </button>

            <button
              className="capsule-icon-btn"
              onClick={handleSoundToggle}
              title={soundOn ? "Mute studio sound" : "Enable studio sound"}
              aria-label={soundOn ? "Mute studio sound" : "Enable studio sound"}
            >
              {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            <button
              className="capsule-icon-btn"
              onClick={onToggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          </div>

          {/* Mega-Menu Dropdown Panel */}
          {activeDropdown && MEGA_MENUS[activeDropdown] && (
            <div
              className="capsule-mega-dropdown"
              onMouseEnter={() => {
                if (dropdownTimerRef.current) {
                  clearTimeout(dropdownTimerRef.current);
                  dropdownTimerRef.current = null;
                }
              }}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="capsule-mega-aside">
                <div>
                  <span className="capsule-mega-kicker">DISCIPLINE OVERVIEW</span>
                  <p className="capsule-mega-lead">
                    {MEGA_MENUS[activeDropdown].lead}{" "}
                    <span className="capsule-mega-highlight">
                      {MEGA_MENUS[activeDropdown].leadHighlight}
                      <span className="capsule-mega-star">✦</span>
                    </span>
                  </p>
                </div>
                <a
                  href={MEGA_MENUS[activeDropdown].allLink.href}
                  className="capsule-mega-all"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDropdownItemClick(MEGA_MENUS[activeDropdown].allLink.href);
                  }}
                >
                  {MEGA_MENUS[activeDropdown].allLink.text}
                  <ArrowRight size={13} />
                </a>
              </div>

              <div className="capsule-mega-main">
                {MEGA_MENUS[activeDropdown].items.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="capsule-mega-row"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDropdownItemClick(item.href);
                    }}
                  >
                    <div className="capsule-mega-row-txt">
                      <span className="capsule-mega-row-title">
                        <span
                          className="capsule-glyph"
                          style={{
                            WebkitMaskImage: `url(/assets/img/formes/${item.shape}.svg)`,
                            maskImage: `url(/assets/img/formes/${item.shape}.svg)`,
                            backgroundColor: item.color,
                          }}
                        />
                        {item.title}
                      </span>
                      <span className="capsule-mega-row-desc">{item.desc}</span>
                    </div>
                    <ArrowRight size={14} className="capsule-mega-arrow" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {isProduct && <Link href="/" className="mobile-back">← back to studio</Link>}
      </header>

      {/* Collapsible Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="mobile-nav-drawer-overlay" onClick={() => setMobileNavOpen(false)}>
          <div className="mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-head">
              <span className="section-marker">[ NAVIGATION MENU ]</span>
              <button className="icon-button" onClick={() => setMobileNavOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Mobile Studio Mode Switcher */}
            <div style={{ padding: "16px 0 6px" }}>
              <div className="header-mode-toggle" style={{ width: "100%", justifyContent: "center" }} role="group" aria-label="Mobile Studio Mode Switcher">
                <button
                  type="button"
                  className={`mode-toggle-btn ${studioMode === "human" ? "active" : ""}`}
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => {
                    playClick();
                    onStudioModeChange("human");
                    setMobileNavOpen(false);
                  }}
                >
                  <span className="mode-btn-symbol">✦</span>
                  <span>Products</span>
                </button>
                <button
                  type="button"
                  className={`mode-toggle-btn ${studioMode === "agent" ? "active" : ""}`}
                  style={{ flex: 1, justifyContent: "center" }}
                  onClick={() => {
                    playClick();
                    onStudioModeChange("agent");
                    setMobileNavOpen(false);
                  }}
                >
                  <span className="mode-btn-symbol">✱</span>
                  <span>Agency</span>
                </button>
              </div>
            </div>

            <div className="mobile-nav-links">
              {navLinks.map((link, idx) => {
                const isActive =
                  link.href === "/#products"
                    ? location === "/"
                    : location.startsWith(link.href);
                return (
                  <button
                    key={link.href}
                    className={`mobile-nav-link-btn ${isActive ? "active" : ""}`}
                    onClick={() => handleNavClick(link.href)}
                  >
                    <span className="nav-idx">0{idx + 1}</span>
                    <span className="nav-label">{link.label}</span>
                    {isActive && <span className="active-tag">CURRENT</span>}
                    <ArrowRight size={16} className="nav-arrow" />
                  </button>
                );
              })}
            </div>

            <div className="mobile-nav-foot">
              <button className="primary-button" onClick={() => { setMobileNavOpen(false); onOpenContact(); }} style={{ width: "100%", justifyContent: "center" }}>
                Start a conversation <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Footer({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand"><span className="brand-dot" /> quiet studio</div>
          <p className="footer-line">Making the future feel obvious.</p>
        </div>
        <div className="footer-links">
          <div>
            <span className="meta-label">Explore</span>
            <Link href="/" onClick={() => playClick()}>Products</Link>
            <Link href="/thesis" onClick={() => playClick()}>Thesis</Link>
            <Link href="/research" onClick={() => playClick()}>Research</Link>
            <Link href="/templates" onClick={() => playClick()}>Templates</Link>
            <Link href="/changelog" onClick={() => playClick()}>Changelog</Link>
            <Link href="/system" onClick={() => playClick()}>Design System</Link>
            <Link href="/notes" onClick={() => playClick()}>Notes</Link>
            <Link href="/about" onClick={() => playClick()}>About Abhinav</Link>
          </div>
          <div>
            <span className="meta-label">Elsewhere</span>
            <a href="https://github.com/AbhiKrish07" target="_blank" rel="noreferrer">GitHub <Github size={13} /></a>
            <button onClick={onOpenContact} className="footer-contact-link">
              Contact <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Quiet Studio</span><span>Built slowly. Shipped often.</span><span>India / Everywhere</span></div>
    </footer>
  );
}

function AppShell() {
  const [location] = useLocation();
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quiet-studio-theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });
  const [commandOpen, setCommandOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [studioMode, setStudioMode] = useState<"human" | "agent">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quiet-studio-mode");
      if (saved === "human" || saved === "agent") return saved;
    }
    return "agent";
  });

  const handleStudioModeChange = (nextMode: "human" | "agent") => {
    playClick();
    setStudioMode(nextMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("quiet-studio-mode", nextMode);
      document.documentElement.setAttribute("data-studio-mode", nextMode);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("quiet-studio-theme", dark ? "dark" : "light");
    }
  }, [dark]);

  useEffect(() => {
    document.documentElement.setAttribute("data-studio-mode", studioMode);
  }, [studioMode]);

  useEffect(() => {
    const handleOpenCommand = () => setCommandOpen(true);
    const handleOpenContact = () => setContactOpen(true);
    window.addEventListener("open-command-palette", handleOpenCommand);
    window.addEventListener("open-contact-modal", handleOpenContact);
    return () => {
      window.removeEventListener("open-command-palette", handleOpenCommand);
      window.removeEventListener("open-contact-modal", handleOpenContact);
    };
  }, []);

  const isAgencyHome = studioMode === "agent" && location === "/";

  return (
    <div className={`app-shell ${isAgencyHome ? "agency-shell" : ""}`}>
      <ScrollToTop />
      <Header
        dark={dark}
        onToggle={() => setDark((value) => !value)}
        onOpenCommand={() => setCommandOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        studioMode={studioMode}
        onStudioModeChange={handleStudioModeChange}
      />
      <main>
        <div key={`${String(location)}-${studioMode}`} className="page-transition">
          <Switch>
            <Route path="/">{() => <Home mode={studioMode} onModeChange={handleStudioModeChange} onOpenContact={() => setContactOpen(true)} />}</Route>
            <Route path="/models" component={Models} />
            <Route path="/products/:slug" component={ProductPage} />
            <Route path="/research" component={Research} />
            <Route path="/research/:slug" component={ResearchArticle} />
            <Route path="/templates" component={Templates} />
            <Route path="/notion-templates" component={Templates} />
            <Route path="/prompt-templates" component={Templates} />
            <Route path="/coding-assets" component={Templates} />
            <Route path="/changelog" component={Changelog} />
            <Route path="/system" component={System} />
            <Route path="/blog" component={Notes} />
            <Route path="/blog/:slug" component={NotesIssue} />
            <Route path="/notes" component={Notes} />
            <Route path="/notes/:slug" component={NotesIssue} />
            <Route path="/about" component={About} />
            <Route path="/thesis" component={Thesis} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>

      {!isAgencyHome && <Footer onOpenContact={() => setContactOpen(true)} />}

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <Toaster theme={dark ? "dark" : "light"} position="bottom-right" toastOptions={{ className: "q-toast" }} />
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
