import { FormEvent, useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Code, Command, Copy, ExternalLink, LayoutGrid, LoaderCircle, Mail, MoveUpRight, Search, Sparkles, Terminal } from "lucide-react";
import { Link } from "wouter";
import { categories, getCategoryLabel, products, type Product, type ProductCategory } from "@/lib/products";
import { notionTemplates, promptTemplates, codingAssets } from "@/lib/resources";
import { toast } from "sonner";
import { CaptureHeroSection } from "@/components/CaptureExperience";

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
        body: JSON.stringify({ email, page: "Home Newsletter", target: "glexionstriker@gmail.com" }),
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
  const filtered = useMemo(() => products.filter((product) => product.slug !== "capture" && product.category === activeCategory && `${product.name} ${product.oneLiner} ${product.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [activeCategory, query]);

  return <div className="home-page">
    {/* 1. MASTER UNIFIED 3D HERO SECTION (T3 CODE STYLE)
        Floating Parallax Icons + Centered Headline + 3D MacBook holding THIS IS CAPTURE OS */}
    <CaptureHeroSection />

    {/* 2. STUDIO THESIS / MANIFESTO */}
    <section className="manifesto-section" id="thesis">
      <div className="section-marker">[ 00 — THE THESIS ]</div>

      {/* Old Hero Text Block */}
      <div className="old-hero-text-block" style={{ margin: "1rem 0 1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid color-mix(in srgb, var(--background) 18%, transparent)" }}>
        <p className="eyebrow" style={{ color: "var(--orange)", font: "600 11px/1.4 'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <span className="pulse-dot" /> independent research & open source — 2026
        </p>
        <h2 style={{ font: "700 clamp(2rem, 4vw, 4.2rem)/0.92 'Space Grotesk', sans-serif", letterSpacing: "-0.06em", color: "var(--background)", textTransform: "uppercase", margin: "0 0 14px" }}>
          Technology <em style={{ fontStyle: "italic", fontFamily: "serif", textTransform: "none" }}>should get</em><br />
          out of your way<span style={{ color: "var(--orange)" }}>.</span>
        </h2>
        <p style={{ font: "400 15px/1.55 'DM Sans', sans-serif", color: "color-mix(in srgb, var(--background) 70%, transparent)", maxWidth: "660px", margin: 0 }}>
          Quiet Studio is a one-person AI product studio exploring the edge of effortless—through useful products, open source, and research that makes the complex feel calm.
        </p>
      </div>

      <div className="manifesto-layout">
        <p className="manifesto-lead">We’re building <span>small proofs</span> of a bigger idea:</p>
        <div className="manifesto-statement">
          <p>the best technology doesn’t ask to be noticed.</p>
          <div className="manifesto-rule" />
          <p className="manifesto-fine">It becomes a quiet extension of what you were already trying to do.</p>
        </div>
      </div>
      <div className="manifesto-bottom">
        <div className="signal-card">
          <Command size={18} />
          <span>NO DASHBOARD<br /><b>JUST MOMENTUM</b></span>
        </div>
        <p>Research is the compass.<br />Open source is the proof.<br />Products are the invitation.</p>
      </div>
    </section>

    {/* 3. PRODUCT ARCHIVE */}
    <section className="products-section" id="products"><div className="section-heading"><div><div className="section-marker">[ 01 — THE WORK ]</div><h2>Things in<br /><em>motion.</em></h2></div><div className="archive-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the archive" aria-label="Search the product archive" />{query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}</div></div><div className="category-tabs" role="tablist" aria-label="Product categories">{categories.map((category) => <CategoryTab key={category.id} category={category} active={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} />)}</div><div className={`product-grid ${filtered.length === 1 ? "single-product" : ""}`}>{filtered.length ? filtered.map((product, index) => <ProductCard key={product.slug} product={product} featured={index === 0 && activeCategory === "flagship"} />) : <div className="archive-empty">No projects match “{query}”. Try another signal.</div>}</div><div className="products-foot"><span>Showing {String(filtered.length).padStart(2, "0")} of {String(products.length).padStart(2, "0")} projects</span><span>Every project starts with a question <Sparkles size={14} /></span></div></section>

    {/* 4. RESEARCH JOURNAL */}
    <section className="research-preview-section"><div className="section-heading compact-heading"><div><div className="section-marker">[ 02 — THE RESEARCH JOURNAL ]</div><h2>Questions<br /><em>in public.</em></h2></div><Link href="/research" className="outline-button">Open the journal <ArrowUpRight size={14} /></Link></div><Link href="/research/interface-as-reflex" className="research-preview-card"><div className="research-preview-index">01</div><div className="research-preview-copy"><span className="note-type">ESSAY — 06.09.26 / 7 MIN READ</span><h3>When AI stops<br />feeling like AI.</h3><p>The next interface is not a chat window. It is the moment the system understands what you meant before you explain it.</p><span className="note-read">Read the essay <ArrowRight size={14} /></span></div><div className="research-preview-art"><div className="research-orbit orbit-a" /><div className="research-orbit orbit-b" /><span>R<span>/</span>01</span></div></Link></section>

    {/* 5. NOTION TEMPLATES */}
    <section className="notion-preview-section" style={{ padding: "8vw 9.2vw", background: "var(--background)", borderTop: "1px solid var(--line)" }}>
      <div className="section-heading compact-heading">
        <div>
          <div className="section-marker">[ 03 — NOTION TEMPLATES ]</div>
          <h2>Systems for<br /><em>your mind.</em></h2>
          <p className="section-description" style={{ marginTop: "12px", color: "var(--muted-ink)", maxWidth: "420px" }}>
            Minimalist Notion workspaces built for research, product specifications, capture, and commonplace reading.
          </p>
        </div>
        <Link href="/notion-templates" className="outline-button">Explore all templates <ArrowUpRight size={14} /></Link>
      </div>

      <div className="home-resource-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "4vw" }}>
        {notionTemplates.slice(0, 3).map((item) => (
          <div className="resource-card" key={item.id}>
            <div className="resource-card-head">
              <span className="resource-category-tag">{item.category}</span>
              <span className="resource-version">{item.version}</span>
            </div>
            <div className="resource-visual-preview" style={{ background: item.visualBg }}>
              <LayoutGrid size={26} className="preview-icon" />
              <span className="preview-bg-text">NOTION</span>
            </div>
            <div className="resource-card-body">
              <h3>{item.title}</h3>
              <p>{item.tagline}</p>
              <div className="resource-card-actions">
                <Link href="/notion-templates" className="outline-button" style={{ width: "100%", justifyContent: "center" }}>
                  Duplicate Template <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 6. CODING ASSETS */}
    <section className="code-preview-section" style={{ padding: "8vw 9.2vw", background: "var(--foreground)", color: "var(--background)" }}>
      <div className="section-heading compact-heading">
        <div>
          <div className="section-marker" style={{ color: "var(--orange)" }}>[ 04 — CODING ASSETS ]</div>
          <h2>Proof in<br /><em>the code.</em></h2>
          <p className="section-description" style={{ marginTop: "12px", color: "color-mix(in srgb, var(--background) 65%, transparent)", maxWidth: "420px" }}>
            Open source UI kits, Rust inference servers, PyTorch memory modules, and TypeScript micro-libraries.
          </p>
        </div>
        <Link href="/coding-assets" className="outline-button" style={{ borderColor: "color-mix(in srgb, var(--background) 30%, transparent)", color: "var(--background)" }}>
          View all code <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="home-resource-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "4vw" }}>
        {codingAssets.slice(0, 3).map((item) => (
          <div className="resource-card code-card dark-code-card" key={item.id} style={{ background: "color-mix(in srgb, var(--background) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--background) 15%, transparent)" }}>
            <div className="resource-card-head">
              <span className="resource-category-tag" style={{ color: "var(--orange)" }}>{item.category}</span>
              <span className="resource-lang-tag" style={{ color: "color-mix(in srgb, var(--background) 60%, transparent)" }}>{item.language}</span>
            </div>
            <div className="code-install-bar" style={{ background: "color-mix(in srgb, var(--background) 12%, transparent)", borderColor: "color-mix(in srgb, var(--background) 18%, transparent)" }}>
              <Terminal size={13} style={{ color: "var(--orange)" }} />
              <code style={{ color: "var(--background)" }}>{item.installCommand}</code>
            </div>
            <div className="resource-card-body">
              <h3 style={{ color: "var(--background)" }}>{item.title}</h3>
              <p style={{ color: "color-mix(in srgb, var(--background) 65%, transparent)" }}>{item.tagline}</p>
              <div className="resource-card-actions">
                <Link href="/coding-assets" className="outline-button" style={{ width: "100%", justifyContent: "center", borderColor: "color-mix(in srgb, var(--background) 30%, transparent)", color: "var(--background)" }}>
                  Explore Code <Code size={13} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 7. NEWSLETTER SECTION (PLACED AT THE VERY END BEFORE CLOSING) */}
    <section className="notes-section" id="notes" style={{ padding: "8vw 9.2vw", background: "var(--card)", borderTop: "1px solid var(--line)" }}>
      <div className="section-heading compact-heading">
        <div>
          <div className="section-marker">[ 05 — THE NEWSLETTER ]</div>
          <h2>Thinking<br /><em>out loud.</em></h2>
          <p className="section-description">Notes is the Quiet Studio newsletter: occasional writing on research, products, and building in public.</p>
        </div>
        <div className="newsletter-box">
          <span>Subscribe to Notes</span>
          <NewsletterForm />
        </div>
      </div>
      <div className="notes-grid" style={{ marginTop: "4vw" }}>
        {noteContent.map((note, index) => (
          <article className={`note-card ${index === 0 ? "note-featured" : ""} ${index === 2 ? "note-dark" : ""} ${openNote === index ? "note-open" : ""}`} key={note.title}>
            <span className="note-type">{note.type}</span>
            <h3>{note.title}</h3>
            <p>{openNote === index ? note.body : note.excerpt}</p>
            <button className="note-read" onClick={() => setOpenNote(openNote === index ? null : index)}>
              {openNote === index ? "Close note" : "Read note"} <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>
    </section>

    {/* 8. CLOSING STUDIO FOOTER */}
    <section className="closing-section">
      <div className="closing-ring" />
      <p className="eyebrow">If this sounds like your kind of quiet</p>
      <h2>Let’s make<br /><em>something useful.</em></h2>
      <button className="primary-button" onClick={() => toast("Message the studio at glexionstriker@gmail.com")}>
        glexionstriker@gmail.com <ArrowUpRight size={16} />
      </button>
    </section>
  </div>;
}

export { ProductVisual };
