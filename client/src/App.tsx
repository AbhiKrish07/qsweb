import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, ChevronDown, Github, Menu, Moon, Search, Sun, Volume2, VolumeX, X } from "lucide-react";
import { Toaster } from "sonner";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import ServicePage from "./pages/ServicePage";
import CommandPalette from "./components/CommandPalette";
import ContactModal from "./components/ContactModal";
import GooeyNav, { GooeyNavItem } from "./components/GooeyNav";
import { isSoundEnabled, toggleSound, playClick } from "./lib/sound";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
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
        href: "/services/product-strategy-design",
        shape: "sceau",
        color: "#b4a0e5",
      },
      {
        title: "Software & Product Engineering",
        desc: "Full-stack Next.js 15, TypeScript, PostgreSQL, low-latency APIs & dashboards.",
        href: "/services/software-product-engineering",
        shape: "fleur",
        color: "#ff5a1f",
      },
      {
        title: "Applied AI & Intelligent Systems",
        desc: "RAG architectures, multi-agent workflows, quantized edge inference & pipelines.",
        href: "/services/applied-ai-intelligent-systems",
        shape: "etoile-huit",
        color: "#eab308",
      },
      {
        title: "Brand, Experience & Launch",
        desc: "Product positioning, design systems, narrative, landing pages & conversion.",
        href: "/services/brand-experience-launch",
        shape: "trefle",
        color: "#22c55e",
      },
    ],
  },
  work: {
    lead: "Living brand systems built to",
    leadHighlight: "move",
    allLink: { text: "All Selected Work", href: "/#realisations" },
    items: [
      {
        title: "Zen AI Engine",
        desc: "Local-first neural runtime with 0.2ms inference latency and zero telemetry.",
        href: "/products/zen-ai",
        shape: "sceau",
        color: "#ff5a1f",
      },
      {
        title: "LearnLoop Platform",
        desc: "Cognitive feedback loops turning curiosity into durable knowledge.",
        href: "/products/learnloop",
        shape: "fleur",
        color: "#ff5a1f",
      },
      {
        title: "Aethel Runtime",
        desc: "Multi-agent pipelines generating on-brand production creative.",
        href: "/products/aethel",
        shape: "eclat",
        color: "#ff5a1f",
      },
      {
        title: "Capture Desktop",
        desc: "Ambient screen context and intent capture built for macOS.",
        href: "/products/capture",
        shape: "soleil",
        color: "#ff5a1f",
      },
      {
        title: "TrendCulture Radar",
        desc: "Cultural shift detection and emerging creative signal telemetry.",
        href: "/products/trendculture",
        shape: "etoile-dix",
        color: "#ff5a1f",
      },
    ],
  },
  about: {
    lead: "Quiet Studio, that's",
    leadHighlight: "us",
    allLink: { text: "About the studio", href: "/about" },
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
        href: "/about",
        shape: "etoile-quatre",
        color: "#a855f7",
      },
      {
        title: "The Method & Principles",
        desc: "6-stage product lifecycle: Discover, Define, Design, Engineer, Validate, Launch.",
        href: "/thesis",
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

  // Sync active key with route/hash
  useEffect(() => {
    if (location.startsWith("/blog") || location.startsWith("/notes")) {
      setActiveProductsKey("blog");
      setActiveAgencyKey("news");
    } else if (location.startsWith("/research") || location.startsWith("/foundations")) {
      setActiveProductsKey("foundations");
      if (studioMode !== "human") {
        onStudioModeChange("human");
      }
    } else if (location.startsWith("/about") || location.startsWith("/thesis")) {
      setActiveProductsKey("about");
      setActiveAgencyKey("about");
    } else if (location.startsWith("/services")) {
      setActiveAgencyKey("services");
    } else if (location === "/") {
      if (studioMode === "human") {
        setActiveProductsKey("apps");
      }
    }
  }, [location, studioMode, onStudioModeChange]);

  const gooeyItems: GooeyNavItem[] = useMemo(() => {
    if (studioMode === "human") {
      return [
        {
          label: "Open Core Apps",
          href: "/#apps",
          onClick: () => {
            setActiveProductsKey("apps");
            handleNavClick("/#apps");
          },
        },
        {
          label: "Blog & Notes",
          href: "/blog",
          onClick: () => {
            setActiveProductsKey("blog");
            handleNavClick("/blog");
          },
        },
        {
          label: "Foundations",
          href: "/research",
          onClick: () => {
            setActiveProductsKey("foundations");
            handleNavClick("/research");
          },
        },
        {
          label: "About",
          href: "/about",
          onClick: () => {
            setActiveProductsKey("about");
            handleNavClick("/about");
          },
        },
      ];
    } else {
      return [
        {
          label: "Services",
          href: "/#expertises",
          icon: <ChevronDown size={11} className="capsule-chevron" />,
          iconPosition: "end",
          onMouseEnter: () => handleDropdownEnter("services"),
          onClick: () => {
            setActiveAgencyKey("services");
            handleNavClick("/#expertises");
          },
        },
        {
          label: "Work",
          href: "/#realisations",
          icon: <ChevronDown size={11} className="capsule-chevron" />,
          iconPosition: "end",
          onMouseEnter: () => handleDropdownEnter("work"),
          onClick: () => {
            setActiveAgencyKey("work");
            handleNavClick("/#realisations");
          },
        },
        {
          label: "About",
          href: "/#agence",
          icon: <ChevronDown size={11} className="capsule-chevron" />,
          iconPosition: "end",
          onMouseEnter: () => handleDropdownEnter("about"),
          onClick: () => {
            setActiveAgencyKey("about");
            handleNavClick("/#agence");
          },
        },
        {
          label: "News",
          href: "/blog",
          onClick: () => {
            setActiveAgencyKey("news");
            handleNavClick("/blog");
          },
        },
      ];
    }
  }, [studioMode, location]);

  const activeNavIndex = useMemo(() => {
    if (studioMode === "human") {
      if (location.startsWith("/blog") || location.startsWith("/notes")) return 1;
      if (
        location.startsWith("/research") ||
        location.startsWith("/foundations") ||
        activeProductsKey === "foundations"
      )
        return 2;
      if (location.startsWith("/about") || location.startsWith("/thesis")) return 3;
      return 0; // Open Core Apps
    } else {
      if (location.startsWith("/blog") || location.startsWith("/notes")) return 3;
      if (activeAgencyKey === "work") return 1;
      if (activeAgencyKey === "about" || location.startsWith("/about")) return 2;
      return 0; // Services
    }
  }, [studioMode, location, activeAgencyKey, activeProductsKey]);

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
          { label: "Research", href: "/research" },
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

    if (href === "/#foundations" || href === "/foundations" || href === "/research") {
      if (studioMode !== "human") {
        onStudioModeChange("human");
      }
      setActiveProductsKey("foundations");
      setLocation("/research");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href === "/#squad") {
      setLocation("/about");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href === "/#method") {
      setLocation("/thesis");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href === "/#apps" || href === "/#products") {
      if (studioMode !== "human") {
        onStudioModeChange("human");
      }
      if (location !== "/") {
        setLocation("/");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

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
          return document.getElementById("pricing") || document.getElementById("confiance") || document.getElementById("workspace");
        }
        return document.getElementById(id);
      };

      const scrollToTarget = (id: string) => {
        if (id === "overview" || id === "hh") {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return;
        }
        const target = findElement(id);
        if (target) {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(target, { offset: -80, duration: 1.2 });
          } else {
            const top = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: top - 80, behavior: "smooth" });
          }
        }
      };

      if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          scrollToTarget(targetId);
        }, 150);
      } else {
        scrollToTarget(targetId);
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

          {/* Nav Links with GooeyNav Particle Animation */}
          <div className="capsule-gooey-nav-wrap" onMouseLeave={handleDropdownLeave}>
            <GooeyNav
              items={gooeyItems}
              activeIndex={activeNavIndex}
              theme={dark ? "dark" : "light"}
              color="#ff5a1f"
              activeTextColor="#ffffff"
              colors={["#ff5a1f", "#ff844b", "#ffa07a"]}
              size="sm"
              frame={false}
              particleCount={14}
              spread={48}
              animationTime={520}
              timeVariance={250}
              gooeyness={0.5}
              wobble={0.45}
              hoverEffect={true}
              onChange={(index) => {
                const item = gooeyItems[index];
                if (item?.onClick) {
                  item.onClick();
                } else if (item?.href) {
                  handleNavClick(item.href);
                }
              }}
            />
          </div>

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
      const p = window.location.pathname;
      if (
        p.startsWith("/research") ||
        p.startsWith("/foundations") ||
        p.startsWith("/about") ||
        p.startsWith("/blog") ||
        p.startsWith("/thesis") ||
        p.startsWith("/products")
      ) {
        return "human";
      }
      const saved = localStorage.getItem("quiet-studio-mode");
      if (saved === "human" || saved === "agent") return saved;
    }
    return "agent";
  });

  useEffect(() => {
    if (
      location.startsWith("/research") ||
      location.startsWith("/foundations") ||
      location.startsWith("/about") ||
      location.startsWith("/blog") ||
      location.startsWith("/thesis") ||
      location.startsWith("/products")
    ) {
      if (studioMode !== "human") {
        setStudioMode("human");
      }
    }
  }, [location, studioMode]);

  const handleStudioModeChange = (nextMode: "human" | "agent") => {
    playClick();
    setStudioMode(nextMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("quiet-studio-mode", nextMode);
      document.documentElement.setAttribute("data-studio-mode", nextMode);

      if (nextMode === "human") {
        const bitwipGlobals = document.querySelectorAll(
          '.curseur, .jonctions, .portail, .sillage, .eclat, .visionneuse'
        );
        bitwipGlobals.forEach((el) => el.remove());
        document.documentElement.classList.remove('has-curseur', 'curseur-tenu', 'js', 'is-ready');
        // Disable Bitwip stylesheets so Products mode is pure
        document.querySelectorAll('link[data-bitwip-href]').forEach((el) => {
          (el as HTMLLinkElement).disabled = true;
        });
      } else {
        // Re-enable Bitwip stylesheets for instant Agency mode
        document.documentElement.classList.add('js', 'is-ready');
        document.querySelectorAll('link[data-bitwip-href]').forEach((el) => {
          (el as HTMLLinkElement).disabled = false;
        });
      }
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

  // Coordinated Architectural Site Reveal Curtain
  useEffect(() => {
    const curtain = document.getElementById("qs-reveal-curtain");
    if (!curtain) return;

    const statusText = document.getElementById("qs-curtain-status-text");

    const tStatus = setTimeout(() => {
      if (statusText) statusText.textContent = "SYSTEM READY // REVEALING";
    }, 850);

    const tReveal = setTimeout(() => {
      curtain.classList.add("is-revealed");
    }, 1150);

    const tCleanup = setTimeout(() => {
      curtain.remove();
      const styleEl = document.getElementById("qs-curtain-styles");
      if (styleEl) styleEl.remove();
    }, 2200);

    return () => {
      clearTimeout(tStatus);
      clearTimeout(tReveal);
      clearTimeout(tCleanup);
    };
  }, []);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize Lenis smooth scroll for butter-smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis through GSAP's 120fps hardware-synced ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Global smooth anchor link scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const elem = document.querySelector(href);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem as HTMLElement, { offset: -70, duration: 1.2 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      delete (window as any).lenis;
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
            <Route path="/contact">
              {() => {
                setTimeout(() => setContactOpen(true), 50);
                return <Home mode={studioMode} onModeChange={handleStudioModeChange} onOpenContact={() => setContactOpen(true)} />;
              }}
            </Route>
            <Route path="/en/contact">
              {() => {
                setTimeout(() => setContactOpen(true), 50);
                return <Home mode={studioMode} onModeChange={handleStudioModeChange} onOpenContact={() => setContactOpen(true)} />;
              }}
            </Route>
            <Route path="/services/:slug">
              {() => <ServicePage onOpenContact={() => setContactOpen(true)} />}
            </Route>
            <Route path="/models" component={Models} />
            <Route path="/products/:slug" component={ProductPage} />
            <Route path="/research" component={Research} />
            <Route path="/research/:slug" component={ResearchArticle} />
            <Route path="/foundations" component={Research} />
            <Route path="/foundations/:slug" component={ResearchArticle} />
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
