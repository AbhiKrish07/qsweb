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
import GooeyNav from "./components/GooeyNav";
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
    lead: "Three disciplines, one",
    leadHighlight: "studio",
    allLink: { text: "All our services", href: "/#expertises" },
    items: [
      {
        title: "Branding & Identity",
        desc: "Strategy, visual systems, naming, typography & comprehensive brand guidelines.",
        href: "/#expertises",
        shape: "sceau",
        color: "#b4a0e5",
      },
      {
        title: "Brand & Creative",
        desc: "Digital and physical experiences that elevate your brand and captivate users.",
        href: "/#expertises",
        shape: "fleur",
        color: "#ff5a1f",
      },
      {
        title: "Writing & Content",
        desc: "Finding the right words to make your brand understood, trusted, and remembered.",
        href: "/#expertises",
        shape: "etoile-huit",
        color: "#eab308",
      },
      {
        title: "Creative Production",
        desc: "Dedicated squads, rapid sprint delivery, bespoke components & AI workflows.",
        href: "/#expertises",
        shape: "trefle",
        color: "#22c55e",
      },
    ],
  },
  work: {
    lead: "Thoughtful work, lasting",
    leadHighlight: "impact",
    allLink: { text: "View all work", href: "/#realisations" },
    items: [
      {
        title: "Project Atlas",
        desc: "Autonomous AI sprint platform for engineering & product squads.",
        href: "/#realisations",
        shape: "eclat",
        color: "#ff5a1f",
      },
      {
        title: "Fintech Identity",
        desc: "Minimalist high-trust design system & motion identity for global finance.",
        href: "/#realisations",
        shape: "sceau",
        color: "#38bdf8",
      },
      {
        title: "Product Brand",
        desc: "Spatial brand language and tactile UI for next-generation intelligence.",
        href: "/#realisations",
        shape: "etoile-dix",
        color: "#a855f7",
      },
      {
        title: "Startup Presentation",
        desc: "High-conversion interactive pitch deck & editorial founder story.",
        href: "/#realisations",
        shape: "fleur",
        color: "#f97316",
      },
      {
        title: "Digital Editorial",
        desc: "Custom typography, reading mechanics, and digital publishing architecture.",
        href: "/#realisations",
        shape: "soleil",
        color: "#eab308",
      },
    ],
  },
  about: {
    lead: "Quiet Studio, that's",
    leadHighlight: "us",
    allLink: { text: "About the studio", href: "/#agence" },
    items: [
      {
        title: "About Quiet Studio",
        desc: "Independent creative studio combining human taste with AI workflows.",
        href: "/#agence",
        shape: "fleur",
        color: "#ff5a1f",
      },
      {
        title: "Our Thesis",
        desc: "Why quiet, crafted software and typography beat noisy generative slop.",
        href: "/thesis",
        shape: "etoile-quatre",
        color: "#a855f7",
      },
      {
        title: "Commitments & Impact",
        desc: "Direct partner access, transparent pricing, zero agency waste.",
        href: "/#engagements",
        shape: "trefle",
        color: "#22c55e",
      },
      {
        title: "Client Portal & Sprint Hub",
        desc: "Real-time sprint tracker and artifact delivery hub for active partners.",
        href: "#contact",
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

  const gooeyItems = useMemo(() => {
    return navLinks.map((link) => ({
      label: link.label,
      href: link.href,
      onClick: () => {
        handleNavClick(link.href);
      },
    }));
  }, [navLinks]);

  const activeNavIndex = useMemo(() => {
    if (location === "/" || location === "") {
      return 0;
    }
    const idx = navLinks.findIndex((l) => {
      if (l.href === location) return true;
      if (!l.href.startsWith("/#") && location.startsWith(l.href)) return true;
      return false;
    });
    return idx >= 0 ? idx : 0;
  }, [location, navLinks]);

  return (
    <>
      <header className="site-header site-header--floating">
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

        {/* Left Floating Pod: Brand Mark + Studio Mode Switcher */}
        <div className="header-floating-pod header-floating-pod--brand">
          <Link href="/" className="brand-mark" aria-label="Quiet Studio home" onClick={() => playClick()}>
            <span className="brand-dot" />
            <span>quiet studio</span>
          </Link>

          {/* Global Studio Mode Switcher: Products vs Agency */}
          <div className="header-mode-toggle" role="group" aria-label="Studio Mode Switcher">
            <button
              type="button"
              className={`mode-toggle-btn ${studioMode === "human" ? "active" : ""}`}
              onClick={() => {
                playClick();
                onStudioModeChange("human");
              }}
              title="Products: Open Core Apps & Software"
            >
              <span className="mode-btn-symbol">✦</span>
              <span>Products</span>
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${studioMode === "agent" ? "active" : ""}`}
              onClick={() => {
                playClick();
                onStudioModeChange("agent");
              }}
              title="Quiet Studio Agency: Dedicated Design & Engineering Sprints"
            >
              <span className="mode-btn-symbol">✱</span>
              <span>Agency</span>
            </button>
          </div>
        </div>

        {/* Center Floating Pod: Agency Nav with Dropdowns OR Products GooeyNav */}
        <div className="header-floating-pod header-floating-pod--nav">
          {studioMode === "agent" ? (
            <div className="agency-nav-pod" onMouseLeave={handleDropdownLeave}>
              <button
                type="button"
                className={`agency-nav-btn ${location === "/" && !activeDropdown ? "is-active" : ""}`}
                onClick={() => handleNavClick("/#hh")}
              >
                Overview
              </button>

              <div className="agency-nav-item-wrap">
                <button
                  type="button"
                  className={`agency-nav-btn ${activeDropdown === "services" ? "is-open" : ""}`}
                  onMouseEnter={() => handleDropdownEnter("services")}
                  onClick={() => handleNavClick("/#expertises")}
                  aria-expanded={activeDropdown === "services"}
                >
                  Services <ChevronDown size={12} className="nav-chevron" />
                </button>
              </div>

              <div className="agency-nav-item-wrap">
                <button
                  type="button"
                  className={`agency-nav-btn ${activeDropdown === "work" ? "is-open" : ""}`}
                  onMouseEnter={() => handleDropdownEnter("work")}
                  onClick={() => handleNavClick("/#realisations")}
                  aria-expanded={activeDropdown === "work"}
                >
                  Work <ChevronDown size={12} className="nav-chevron" />
                </button>
              </div>

              <div className="agency-nav-item-wrap">
                <button
                  type="button"
                  className={`agency-nav-btn ${activeDropdown === "about" ? "is-open" : ""}`}
                  onMouseEnter={() => handleDropdownEnter("about")}
                  onClick={() => handleNavClick("/#agence")}
                  aria-expanded={activeDropdown === "about"}
                >
                  About <ChevronDown size={12} className="nav-chevron" />
                </button>
              </div>

              <button
                type="button"
                className="agency-nav-btn"
                onClick={() => handleNavClick("/blog")}
              >
                Insights
              </button>

              <button
                type="button"
                className="agency-nav-btn"
                onClick={() => handleNavClick("/#engagements")}
              >
                Impact
              </button>

              {/* Mega-Menu Dropdown Panel */}
              {activeDropdown && MEGA_MENUS[activeDropdown] && (
                <div
                  className="agency-mega-menu"
                  onMouseEnter={() => {
                    if (dropdownTimerRef.current) {
                      clearTimeout(dropdownTimerRef.current);
                      dropdownTimerRef.current = null;
                    }
                  }}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="agency-mega-aside">
                    <div>
                      <p className="agency-mega-lead">
                        {MEGA_MENUS[activeDropdown].lead}{" "}
                        <span className="highlight">
                          {MEGA_MENUS[activeDropdown].leadHighlight}
                          <span className="highlight-star" />
                        </span>
                      </p>
                    </div>
                    <a
                      href={MEGA_MENUS[activeDropdown].allLink.href}
                      className="agency-mega-all"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDropdownItemClick(MEGA_MENUS[activeDropdown].allLink.href);
                      }}
                    >
                      {MEGA_MENUS[activeDropdown].allLink.text}
                      <ArrowUpRight size={13} />
                    </a>
                  </div>

                  <div className="agency-mega-main">
                    {MEGA_MENUS[activeDropdown].items.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="agency-mega-item"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDropdownItemClick(item.href);
                        }}
                      >
                        <div className="agency-mega-item-txt">
                          <span className="agency-mega-item-title">
                            <span
                              className="agency-mega-glyph"
                              style={{
                                WebkitMaskImage: `url(/assets/img/formes/${item.shape}.svg)`,
                                maskImage: `url(/assets/img/formes/${item.shape}.svg)`,
                                backgroundColor: item.color,
                              }}
                            />
                            {item.title}
                          </span>
                          <span className="agency-mega-item-desc">{item.desc}</span>
                        </div>
                        <ArrowUpRight size={15} className="agency-mega-item-arrow" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <GooeyNav
              items={gooeyItems}
              activeIndex={activeNavIndex}
              theme={dark ? "dark" : "light"}
              color="#ff5a1f"
              activeTextColor="#ffffff"
              colors={["#ff5a1f", "#ff844b", "#ffa07a"]}
              size="sm"
              frame={true}
              particleCount={14}
              spread={48}
              animationTime={520}
              timeVariance={250}
              gooeyness={0.5}
              wobble={0.45}
              hoverEffect={true}
              onChange={(index) => {
                const item = gooeyItems[index];
                if (item?.href) handleNavClick(item.href);
              }}
            />
          )}
        </div>

        {/* Right Floating Pod: Action Controls */}
        <div className="header-floating-pod header-floating-pod--actions">
          <div className="header-actions">
            <button className="command-trigger-btn" onClick={onOpenCommand} title="Search studio (⌘K)">
              <Search size={13} />
              <span className="kbd-shortcut">⌘K</span>
            </button>

            <button
              className="icon-button"
              onClick={handleSoundToggle}
              title={soundOn ? "Mute studio sound" : "Enable studio sound"}
              aria-label={soundOn ? "Mute studio sound" : "Enable studio sound"}
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            <button
              className="icon-button"
              onClick={onToggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button className="header-cta" onClick={onOpenContact}>
              Start a conversation <ArrowUpRight size={13} />
            </button>
          </div>
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
