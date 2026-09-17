import { FormEvent, useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Command, ExternalLink, LoaderCircle, Mail, MoveUpRight, Search, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { categories, getCategoryLabel, products, type Product, type ProductCategory } from "@/lib/products";
import { toast } from "sonner";

function ProductVisual({ product, compact = false }: { product: Product; compact?: boolean }) {
  return <div className={`product-visual visual-${product.visual} ${compact ? "compact" : ""}`} aria-hidden="true">
    {product.visual === "capture" && <><div className="capture-card"><span className="tiny-orange" /><span className="tiny-line long" /><span className="tiny-line" /><div className="capture-wave" /></div><div className="capture-orbit orbit-one" /><div className="capture-orbit orbit-two" /><div className="visual-code">01 / THINK<br /><span>→ saved</span></div></>}
    {product.visual === "learnloop" && <><div className="loop-ring ring-one" /><div className="loop-ring ring-two" /><div className="loop-core"><span>learn</span><span>loop</span></div><div className="loop-node node-one">01</div><div className="loop-node node-two">↗</div><div className="loop-node node-three">02</div></>}
    {product.visual === "whitespace" && <><div className="window-stack"><div className="window-head"><i /><i /><i /></div><div className="window-copy"><b>context</b><span>saved to whitespace</span><span>⌘ K to recall</span></div></div><div className="ghost-window" /></>}
    {product.visual === "aethel" && <><div className="aethel-sphere"><div className="sphere-grid" /><div className="sphere-glow" /></div><div className="aethel-cross cross-a" /><div className="aethel-cross cross-b" /><span className="aethel-label">INTENT → ACTION</span></>}
  </div>;
}

function CategoryTab({ category, active, onClick }: { category: (typeof categories)[number]; active: boolean; onClick: () => void }) {
  return <button className={`category-tab ${active ? "active" : ""}`} onClick={onClick} aria-pressed={active}><span className="tab-number">{category.count}</span><span>{category.label}</span><ArrowRight size={14} className="tab-arrow" /></button>;
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return <Link href={`/products/${product.slug}`} className={`product-card ${featured ? "featured" : ""}`}><div className="card-meta"><span>{product.index} — {getCategoryLabel(product.category)}</span><span className={`status status-${product.color}`}>{product.status}</span></div><ProductVisual product={product} compact={!featured} /><div className="card-copy"><div><h3>{product.name}</h3><p>{product.oneLiner}</p></div><span className="circle-arrow"><MoveUpRight size={16} /></span></div><div className="card-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></Link>;
}

const noteContent = [
  { type: "ESSAY — 06.09.26", title: "The case for building less software.", excerpt: "Why the next generation of tools should feel more like a reflex than a destination.", body: "The best product is often the layer you no longer notice. Quiet Studio is interested in the small, capable objects that keep you moving without asking you to become their operator. Less surface area. More trust. Fewer decisions between an intention and the thing itself." },
  { type: "LOG — 28.08.26", title: "What one useful thing looks like.", excerpt: "A shipping rule for a studio of one.", body: "One useful thing is specific enough to use today and opinionated enough to remember tomorrow. It should solve a real problem, have a point of view, and leave the rest of the roadmap alone until the signal is clear." },
  { type: "RESEARCH — 14.08.26", title: "When AI stops feeling like AI.", excerpt: "Early observations from Aethel.", body: "The magic is not in making systems speak more. It is in making them understand when language is unnecessary. Aethel is a running set of experiments around intent, timing, and the dignity of not being interrupted." },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Enter a valid email address to subscribe.");
      return;
    }
    setState("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, page: "Home", target: "glexionstriker@gmail.com" }),
      });
    } catch {
      /* fallback graceful handler */
    }
    setState("done");
    toast("You’re on the list! Welcome to the quiet.");
  };
  if (state === "done") return <div className="newsletter-success success-pop"><Check size={15} /> You’re on the list.</div>;
  return <form className={`newsletter-form ${state === "loading" ? "is-loading" : ""}`} onSubmit={submit}><Mail size={15} /><input aria-label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" type="email" disabled={state === "loading"} /><button aria-label="Subscribe" type="submit" disabled={state === "loading"}>{state === "loading" ? <LoaderCircle className="spin" size={15} /> : <ArrowUpRight size={16} />}</button></form>;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("flagship");
  const [query, setQuery] = useState("");
  const [openNote, setOpenNote] = useState<number | null>(null);
  const filtered = useMemo(() => products.filter((product) => product.category === activeCategory && `${product.name} ${product.oneLiner} ${product.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [activeCategory, query]);

  return <div className="home-page">
    <section className="hero-section"><div className="hero-grid-mark" aria-hidden="true" /><div className="hero-copy"><p className="eyebrow"><span className="pulse-dot" /> independent research & open source <span className="eyebrow-slash">—</span> 2026</p><h1>Technology<br /><em>should get</em><br />out of your way<span className="orange-period">.</span></h1><p className="hero-sub">Quiet Studio is a one-person AI product studio exploring the edge of effortless—through useful products, open source, and research that makes the complex feel calm.</p><div className="hero-actions"><a href="#products" className="primary-button">See what’s taking shape <ArrowDownRight size={16} /></a><a href="#thesis" className="text-button">Read the thesis <ArrowRight size={15} /></a></div></div><div className="hero-object-wrap"><div className="macbook-scene"><div className="macbook-screen"><div className="macbook-camera" /><div className="macbook-ui"><span className="ui-dot" /><span className="ui-line ui-line-wide" /><span className="ui-line" /><div className="ui-note">make space<br /><b>for the useful.</b></div><span className="ui-cursor">↗</span></div></div><div className="macbook-base"><div className="macbook-keyline" /></div><div className="macbook-shadow" /></div><div className="hero-orbit orbit-x" /><div className="hero-orbit orbit-y" /><div className="hero-coordinate">18° 31' N<br />73° 51' E</div><span className="hero-float-label label-top">LESS FRICTION</span><span className="hero-float-label label-bottom">MORE POSSIBILITY</span></div><div className="hero-foot"><span>Scroll to explore</span><span className="scroll-line" /><span>01—04</span></div></section>

    <section className="manifesto-section" id="thesis"><div className="section-marker">[ 00 — THE THESIS ]</div><div className="manifesto-layout"><p className="manifesto-lead">We’re building <span>small proofs</span> of a bigger idea:</p><div className="manifesto-statement"><p>the best technology doesn’t ask to be noticed.</p><div className="manifesto-rule" /><p className="manifesto-fine">It becomes a quiet extension of what you were already trying to do.</p></div></div><div className="manifesto-bottom"><div className="signal-card"><Command size={18} /><span>NO DASHBOARD<br /><b>JUST MOMENTUM</b></span></div><p>Research is the compass.<br />Open source is the proof.<br />Products are the invitation.</p></div></section>

    <section className="products-section" id="products"><div className="section-heading"><div><div className="section-marker">[ 01 — THE WORK ]</div><h2>Things in<br /><em>motion.</em></h2></div><div className="archive-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive" aria-label="Search the product archive" />{query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}</div></div><div className="category-tabs" role="tablist" aria-label="Product categories">{categories.map((category) => <CategoryTab key={category.id} category={category} active={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} />)}</div><div className={`product-grid ${filtered.length === 1 ? "single-product" : ""}`}>{filtered.length ? filtered.map((product, index) => <ProductCard key={product.slug} product={product} featured={index === 0 && activeCategory === "flagship"} />) : <div className="archive-empty">No projects match “{query}”. Try another signal.</div>}</div><div className="products-foot"><span>Showing {String(filtered.length).padStart(2, "0")} of {String(products.length).padStart(2, "0")} projects</span><span>Every project starts with a question <Sparkles size={14} /></span></div></section>

    <section className="signal-section"><div className="signal-number">02</div><div className="signal-copy"><div className="section-marker">[ 02 — THE NEWSLETTER ]</div><h2>Notes for<br /><span>more life.</span></h2><p>Quiet Studio Notes is an occasional newsletter about useful software, AI research, and the ideas we’re testing in public.</p><a href="#notes" className="text-button">See the latest note <ArrowRight size={15} /></a></div><div className="signal-stamp">Q<br /><span>NOTES</span></div></section>

    <section className="research-preview-section"><div className="section-heading compact-heading"><div><div className="section-marker">[ 03 — THE RESEARCH JOURNAL ]</div><h2>Questions<br /><em>in public.</em></h2></div><Link href="/research" className="outline-button">Open the journal <ArrowUpRight size={14} /></Link></div><Link href="/research/interface-as-reflex" className="research-preview-card"><div className="research-preview-index">01</div><div className="research-preview-copy"><span className="note-type">ESSAY — 06.09.26 / 7 MIN READ</span><h3>When AI stops<br />feeling like AI.</h3><p>The next interface is not a chat window. It is the moment the system understands what you meant before you explain it.</p><span className="note-read">Read the essay <ArrowRight size={14} /></span></div><div className="research-preview-art"><div className="research-orbit orbit-a" /><div className="research-orbit orbit-b" /><span>R<span>/</span>01</span></div></Link></section>

    <section className="notes-section" id="notes"><div className="section-heading compact-heading"><div><div className="section-marker">[ 04 — NOTES / NEWSLETTER ]</div><h2>Thinking<br /><em>out loud.</em></h2><p className="section-description">Notes is the Quiet Studio newsletter: occasional writing on research, products, and building in public.</p></div><div className="newsletter-box"><span>Subscribe to Notes</span><NewsletterForm /></div></div><div className="notes-grid">{noteContent.map((note, index) => <article className={`note-card ${index === 0 ? "note-featured" : ""} ${index === 2 ? "note-dark" : ""} ${openNote === index ? "note-open" : ""}`} key={note.title}><span className="note-type">{note.type}</span><h3>{note.title}</h3><p>{openNote === index ? note.body : note.excerpt}</p><button className="note-read" onClick={() => setOpenNote(openNote === index ? null : index)}>{openNote === index ? "Close note" : "Read note"} <ArrowRight size={14} /></button></article>)}</div></section>

    <section className="closing-section"><div className="closing-ring" /><p className="eyebrow">If this sounds like your kind of quiet</p><h2>Let’s make<br /><em>something useful.</em></h2><button className="primary-button" onClick={() => toast("Message the studio at glexionstriker@gmail.com")}>glexionstriker@gmail.com <ArrowUpRight size={16} /></button></section>
  </div>;
}

export { ProductVisual };
