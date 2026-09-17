import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { ArrowUpRight, Github, Moon, Sun } from "lucide-react";
import { Toaster, toast } from "sonner";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import NotFound from "./pages/NotFound";
import Research, { ResearchArticle } from "./pages/Research";
import About from "./pages/About";
import Notes, { NotesIssue } from "./pages/Notes";
import Thesis from "./pages/Thesis";

function Header({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [location] = useLocation();
  const isProduct = location.startsWith("/products/");

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
        <a href="/notes" className={location.startsWith("/notes") ? "active" : ""}>Notes</a>
        <a href="/about" className={location.startsWith("/about") ? "active" : ""}>About</a>
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={onToggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="header-cta" onClick={() => toast("The signal is open. Tell us what should exist next.")}>Start a conversation <ArrowUpRight size={14} /></button>
      </div>
      {isProduct && <Link href="/" className="mobile-back">← back to studio</Link>}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand"><span className="brand-dot" /> quiet studio</div>
          <p className="footer-line">Making the future feel obvious.</p>
        </div>
        <div className="footer-links">
          <div><span className="meta-label">Explore</span><a href="/#products">Products</a><a href="/#thesis">Thesis</a><a href="/#notes">Notes</a></div>
          <div><span className="meta-label">Elsewhere</span><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <Github size={13} /></a><a href="mailto:glexionstriker@gmail.com">Email <ArrowUpRight size={13} /></a></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Quiet Studio</span><span>Built slowly. Shipped often.</span><span>India / Everywhere</span></div>
    </footer>
  );
}

function AppShell() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div className="app-shell">
      <Header dark={dark} onToggle={() => setDark((value) => !value)} />
      <main>
        <div key={String(location)} className="page-transition">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products/:slug" component={ProductPage} />
          <Route path="/research" component={Research} />
          <Route path="/research/:slug" component={ResearchArticle} />
          <Route path="/notes" component={Notes} />
          <Route path="/notes/:slug" component={NotesIssue} />
          <Route path="/about" component={About} />
          <Route path="/thesis" component={Thesis} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        </div>
      </main>
      <Footer />
      <Toaster theme={dark ? "dark" : "light"} position="bottom-right" toastOptions={{ className: "q-toast" }} />
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
