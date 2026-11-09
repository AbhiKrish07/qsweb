import { useEffect, useMemo, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, Github, Menu, Moon, Search, Sun, Volume2, VolumeX, X } from "lucide-react";
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
import ClientPortalModal from "./components/ClientPortalModal";
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

function Header({
  dark,
  onToggle,
  onOpenCommand,
  onOpenContact,
  onOpenClientPortal,
  studioMode,
  onStudioModeChange,
}: {
  dark: boolean;
  onToggle: () => void;
  onOpenCommand: () => void;
  onOpenContact: () => void;
  onOpenClientPortal: () => void;
  studioMode: "human" | "agent";
  onStudioModeChange: (mode: "human" | "agent") => void;
}) {
  const [location, setLocation] = useLocation();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isProduct = location.startsWith("/products/");

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const navLinks =
    studioMode === "human"
      ? [
          { label: "Services", href: "/#services" },
          { label: "Our Work", href: "/#work" },
          { label: "How It Works", href: "/#how-it-works" },
          { label: "About", href: "/about" },
        ]
      : [
          { label: "Studio Services", href: "/#services" },
          { label: "AI Lab", href: "/#overview" },
          { label: "Models", href: "/models" },
          { label: "Research", href: "/research" },
          { label: "About", href: "/about" },
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
      if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          if (targetId === "overview") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const target = document.getElementById(targetId);
            if (target) {
              const top = target.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({ top: top - 80, behavior: "smooth" });
            }
          }
        }, 150);
      } else {
        if (targetId === "overview") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const target = document.getElementById(targetId);
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

          {/* Global Studio Mode Switcher */}
          <div className="header-mode-toggle" role="group" aria-label="Studio Mode Switcher">
            <button
              type="button"
              className={`mode-toggle-btn ${studioMode === "human" ? "active" : ""}`}
              onClick={() => {
                playClick();
                onStudioModeChange("human");
              }}
              title="Creative Studio: Branding, Design &amp; Writing"
            >
              <span className="mode-btn-symbol">✦</span>
              <span>Studio</span>
            </button>
            <button
              type="button"
              className={`mode-toggle-btn ${studioMode === "agent" ? "active" : ""}`}
              onClick={() => {
                playClick();
                onStudioModeChange("agent");
              }}
              title="AI Lab: Vertical Models &amp; Research"
            >
              <span className="mode-btn-symbol">✱</span>
              <span>AI Lab</span>
            </button>
          </div>
        </div>

        {/* Center Floating Pod: Interactive GooeyNav from React Bits */}
        <div className="header-floating-pod header-floating-pod--nav">
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
        </div>

        {/* Right Floating Pod: Action Controls */}
        <div className="header-floating-pod header-floating-pod--actions">
          <div className="header-actions">
            <button
              className="client-login-nav-btn"
              onClick={onOpenClientPortal}
              title="Client Workspace &amp; Deliverables"
            >
              Client Login
            </button>

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
              Start a project <ArrowUpRight size={13} />
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

            <div className="mobile-nav-links">
              {navLinks.map((link, idx) => {
                const isActive =
                  link.href === "/#services"
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

            <div className="mobile-nav-foot" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                className="client-login-nav-btn"
                onClick={() => {
                  setMobileNavOpen(false);
                  onOpenClientPortal();
                }}
                style={{ width: "100%", padding: "10px", textAlign: "center" }}
              >
                Client Workspace Login
              </button>
              <button
                className="primary-button"
                onClick={() => {
                  setMobileNavOpen(false);
                  onOpenContact();
                }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Start a project <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Footer({
  onOpenContact,
  onOpenClientPortal,
}: {
  onOpenContact: () => void;
  onOpenClientPortal: () => void;
}) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand"><span className="brand-dot" /> quiet studio</div>
          <p className="footer-line" style={{ maxWidth: "340px", lineHeight: 1.5 }}>
            Branding, design and writing for businesses that want thoughtful creative work without the traditional agency overhead.
          </p>
          <div style={{ marginTop: "14px", font: "600 11px 'DM Mono', monospace", color: "var(--orange)" }}>
            thequietstudio.space
          </div>
        </div>
        <div className="footer-links">
          <div>
            <span className="meta-label">Studio</span>
            <Link href="/about" onClick={() => playClick()}>About</Link>
            <a href="/#services" onClick={() => playClick()}>Services</a>
            <a href="/#work" onClick={() => playClick()}>Our Work</a>
            <a href="/#how-it-works" onClick={() => playClick()}>How It Works</a>
            <button
              onClick={onOpenContact}
              className="footer-contact-link"
              style={{ background: "none", border: 0, padding: 0, cursor: "pointer", textAlign: "left" }}
            >
              Start a Project <ArrowUpRight size={12} />
            </button>
          </div>
          <div>
            <span className="meta-label">Services</span>
            <a href="/#services" onClick={() => playClick()}>Branding &amp; Identity</a>
            <a href="/#services" onClick={() => playClick()}>Design Studio</a>
            <a href="/#services" onClick={() => playClick()}>Writing Studio</a>
            <a href="/#partnerships" onClick={() => playClick()}>Creative Partnerships</a>
          </div>
          <div>
            <span className="meta-label">Resources</span>
            <a href="/#how-it-works" onClick={() => playClick()}>How We Work</a>
            <a href="/#operating-model" onClick={() => playClick()}>Operating Model</a>
            <a href="/#faq" onClick={() => playClick()}>FAQ</a>
            <button
              onClick={onOpenClientPortal}
              className="footer-contact-link"
              style={{ background: "none", border: 0, padding: 0, cursor: "pointer", textAlign: "left" }}
            >
              Client Login <ArrowUpRight size={12} />
            </button>
          </div>
          <div>
            <span className="meta-label">Legal</span>
            <Link href="/thesis" onClick={() => playClick()}>Privacy Policy</Link>
            <Link href="/thesis" onClick={() => playClick()}>Terms of Service</Link>
            <Link href="/thesis" onClick={() => playClick()}>Cookie Policy</Link>
            <a href="https://github.com/AbhiKrish07" target="_blank" rel="noreferrer" style={{ marginTop: "4px" }}>
              GitHub <Github size={12} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Quiet Studio · thequietstudio.space</span>
        <span>Powered by AI. Refined by people.</span>
        <span>India / Worldwide</span>
      </div>
    </footer>
  );
}

function AppShell() {
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
  const [clientPortalOpen, setClientPortalOpen] = useState(false);
  const [studioMode, setStudioMode] = useState<"human" | "agent">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quiet-studio-mode");
      if (saved === "human" || saved === "agent") return saved;
    }
    return "human";
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
    const handleOpenClientPortal = () => setClientPortalOpen(true);
    window.addEventListener("open-command-palette", handleOpenCommand);
    window.addEventListener("open-contact-modal", handleOpenContact);
    window.addEventListener("open-client-portal", handleOpenClientPortal);
    return () => {
      window.removeEventListener("open-command-palette", handleOpenCommand);
      window.removeEventListener("open-contact-modal", handleOpenContact);
      window.removeEventListener("open-client-portal", handleOpenClientPortal);
    };
  }, []);

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header
        dark={dark}
        onToggle={() => setDark((value) => !value)}
        onOpenCommand={() => setCommandOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenClientPortal={() => setClientPortalOpen(true)}
        studioMode={studioMode}
        onStudioModeChange={handleStudioModeChange}
      />
      <main>
        <div key={`${String(location)}-${studioMode}`} className="page-transition">
          <Switch>
            <Route path="/">{() => <Home mode={studioMode} onModeChange={handleStudioModeChange} />}</Route>
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

      <Footer
        onOpenContact={() => setContactOpen(true)}
        onOpenClientPortal={() => setClientPortalOpen(true)}
      />

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <ClientPortalModal
        open={clientPortalOpen}
        onClose={() => setClientPortalOpen(false)}
        onOpenProjectModal={() => setContactOpen(true)}
      />

      <Toaster theme={dark ? "dark" : "light"} position="bottom-right" toastOptions={{ className: "q-toast" }} />
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
