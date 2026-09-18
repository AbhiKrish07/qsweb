import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { ArrowUpRight, Github, Moon, Search, Sun, Volume2, VolumeX } from "lucide-react";
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
import { isSoundEnabled, toggleSound } from "./lib/sound";

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
  const [location] = useLocation();
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const isProduct = location.startsWith("/products/");

  const handleSoundToggle = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  return (
    <header className="site-header">
      <Link href="/" className="brand-mark" aria-label="Quiet Studio home">
        <span className="brand-dot" />
        <span>quiet studio</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="/#products" className={location === "/" ? "active" : ""}>Products</a>
        <a href="/thesis" className={location.startsWith("/thesis") ? "active" : ""}>Thesis</a>
        <a href="/research" className={location.startsWith("/research") ? "active" : ""}>Research</a>
        <a href="/notion-templates" className={location.startsWith("/notion-templates") ? "active" : ""}>Notion</a>
        <a href="/prompt-templates" className={location.startsWith("/prompt-templates") ? "active" : ""}>Prompts</a>
        <a href="/coding-assets" className={location.startsWith("/coding-assets") ? "active" : ""}>Code</a>
        <a href="/changelog" className={location.startsWith("/changelog") ? "active" : ""}>Changelog</a>
        <a href="/system" className={location.startsWith("/system") ? "active" : ""}>System</a>
        <a href="/notes" className={location.startsWith("/notes") ? "active" : ""}>Notes</a>
        <a href="/about" className={location.startsWith("/about") ? "active" : ""}>About</a>
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
