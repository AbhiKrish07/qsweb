import { useEffect, useState } from "react";
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
import Changelog from "./pages/Changelog";
import System from "./pages/System";
import CommandPalette from "./components/CommandPalette";
import ContactModal from "./components/ContactModal";
import { isSoundEnabled, toggleSound, playClick } from "./lib/sound";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Header({
  dark,
  onToggle,
  onOpenCommand,
  onOpenContact,
}: {
  dark: boolean;
  onToggle: () => void;
  onOpenCommand: () => void;
  onOpenContact: () => void;
}) {
  const [location, setLocation] = useLocation();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isProduct = location.startsWith("/products/");

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const navLinks = [
    { label: "Products", href: "/#products" },
    { label: "Thesis", href: "/thesis" },
    { label: "Research", href: "/research" },
    { label: "Notion", href: "/notion-templates" },
    { label: "Prompts", href: "/prompt-templates" },
    { label: "Code", href: "/coding-assets" },
    { label: "Changelog", href: "/changelog" },
    { label: "System", href: "/system" },
    { label: "Notes", href: "/notes" },
    { label: "About", href: "/about" },
  ];

  const handleNavClick = (href: string) => {
    playClick();
    setMobileNavOpen(false);
    if (href.startsWith("/#")) {
      if (location !== "/") {
        setLocation("/");
        setTimeout(() => {
          const el = document.getElementById(href.replace("/#", ""));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(href.replace("/#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation(href);
    }
  };

  return (
    <>
      <header className="site-header">
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
          {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link href="/" className="brand-mark" aria-label="Quiet Studio home">
          <span className="brand-dot" />
          <span>quiet studio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="main-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={
                link.href === "/#products"
                  ? location === "/"
                    ? "active"
                    : ""
                  : location.startsWith(link.href)
                  ? "active"
                  : ""
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="command-trigger-btn" onClick={onOpenCommand} title="Search studio (⌘K)">
            <Search size={14} />
            <span className="kbd-shortcut">⌘K</span>
          </button>

          <button
            className="icon-button"
            onClick={handleSoundToggle}
            title={soundOn ? "Mute studio sound" : "Enable studio sound"}
            aria-label={soundOn ? "Mute studio sound" : "Enable studio sound"}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            className="icon-button"
            onClick={onToggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button className="header-cta" onClick={onOpenContact}>
            Start a conversation <ArrowUpRight size={14} />
          </button>
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
            <a href="/#products">Products</a>
            <a href="/thesis">Thesis</a>
            <a href="/notion-templates">Notion Templates</a>
            <a href="/prompt-templates">Prompt Templates</a>
            <a href="/coding-assets">Coding Assets</a>
            <a href="/changelog">Changelog</a>
            <a href="/system">Design System</a>
            <a href="/notes">Notes</a>
            <a href="/about">About Abhinav</a>
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
  const [dark, setDark] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

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

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header
        dark={dark}
        onToggle={() => setDark((value) => !value)}
        onOpenCommand={() => setCommandOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />
      <main>
        <div key={String(location)} className="page-transition">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/products/:slug" component={ProductPage} />
            <Route path="/research" component={Research} />
            <Route path="/research/:slug" component={ResearchArticle} />
            <Route path="/notion-templates" component={NotionTemplates} />
            <Route path="/prompt-templates" component={PromptTemplates} />
            <Route path="/coding-assets" component={CodingAssets} />
            <Route path="/changelog" component={Changelog} />
            <Route path="/system" component={System} />
            <Route path="/notes" component={Notes} />
            <Route path="/notes/:slug" component={NotesIssue} />
            <Route path="/about" component={About} />
            <Route path="/thesis" component={Thesis} />
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>

      <Footer onOpenContact={() => setContactOpen(true)} />

      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <Toaster theme={dark ? "dark" : "light"} position="bottom-right" toastOptions={{ className: "q-toast" }} />
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
