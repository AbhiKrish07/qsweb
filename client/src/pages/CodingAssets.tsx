import { useMemo, useState } from "react";
import { ArrowLeft, Check, Code, Copy, ExternalLink, Github, Search, Star, Terminal, X } from "lucide-react";
import { Link } from "wouter";
import { codingAssets, type CodingAsset } from "@/lib/resources";
import { toast } from "sonner";

export default function CodingAssets() {
  const [activeLanguage, setActiveLanguage] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<CodingAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const languages = ["All", "TypeScript", "Python / PyTorch", "Rust", "Flutter / Dart"];

  const filtered = useMemo(() => {
    return codingAssets.filter((item) => {
      const matchesLang = activeLanguage === "All" || item.language.includes(activeLanguage);
      const matchesQuery = `${item.title} ${item.tagline} ${item.description} ${item.tags.join(" ")} ${item.language}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesLang && matchesQuery;
    });
  }, [activeLanguage, query]);

  const copyText = (id: string, text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="coding-assets-page">
      <section className="research-hero">
        <div className="section-marker">[ 07 — CODING ASSETS ]</div>
        <h1>
          Proof in<br />
          <em>the code.</em>
        </h1>
        <p>
          Open source UI kits, Rust local AI workers, PyTorch tensor modules, and micro-libraries designed for high-performance applications.
        </p>
        <div className="research-rule" />
      </section>

      <section className="research-index">
        <div className="research-index-head">
          <div>
            <div className="section-marker">[ CODE ARCHIVE ]</div>
            <h2>
              Select an<br />
              <em>asset.</em>
            </h2>
          </div>
          <div className="archive-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search code assets..."
              aria-label="Search coding assets"
            />
            {query && <button onClick={() => setQuery("")}>×</button>}
          </div>
        </div>

        <div className="category-tabs" style={{ marginTop: "4vw" }}>
          {languages.map((lang) => (
            <button
              key={lang}
              className={`category-tab ${activeLanguage === lang ? "active" : ""}`}
              onClick={() => setActiveLanguage(lang)}
            >
              <span>{lang}</span>
            </button>
          ))}
        </div>

        <div className="resource-grid">
          {filtered.map((item) => (
            <article className="resource-card code-card" key={item.id}>
              <div className="resource-card-head">
                <span className="resource-category-tag">{item.category}</span>
                <span className="resource-lang-tag">{item.language}</span>
              </div>
              <div className="code-install-bar">
                <Terminal size={13} />
                <code>{item.installCommand}</code>
                <button
                  className="icon-copy"
                  onClick={() => copyText(`inst-${item.id}`, item.installCommand, "Install command")}
                  title="Copy command"
                >
                  {copiedId === `inst-${item.id}` ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
              <div className="resource-card-body">
                <div className="card-title-row">
                  <h3>{item.title}</h3>
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="star-badge"
                    title="View GitHub repository"
                  >
                    <Star size={12} /> {item.stars}
                  </a>
                </div>
                <p>{item.tagline}</p>
                <div className="resource-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="resource-card-actions">
                  <button className="outline-button" onClick={() => setSelectedAsset(item)}>
                    View Code <Code size={13} />
                  </button>
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="primary-button"
                  >
                    GitHub <Github size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="archive-empty">No coding assets match “{query}”.</div>
          )}
        </div>
      </section>

      {/* Code Inspector Modal */}
      {selectedAsset && (
        <div className="resource-modal-overlay" onClick={() => setSelectedAsset(null)}>
          <div className="resource-modal code-inspector-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="resource-category-tag">{selectedAsset.language}</span>
                <h2>{selectedAsset.title}</h2>
              </div>
              <button className="modal-close" onClick={() => setSelectedAsset(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-file-bar">
                <span>{selectedAsset.filename}</span>
                <button
                  className="text-button"
                  onClick={() => copyText(`code-${selectedAsset.id}`, selectedAsset.codeSnippet, "Code snippet")}
                >
                  {copiedId === `code-${selectedAsset.id}` ? (
                    <>
                      Copied <Check size={13} />
                    </>
                  ) : (
                    <>
                      Copy Code <Copy size={13} />
                    </>
                  )}
                </button>
              </div>
              <div className="prompt-preview-box code-preview-box">
                <pre>{selectedAsset.codeSnippet}</pre>
              </div>
            </div>
            <div className="modal-foot">
              <a
                href={selectedAsset.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
              >
                View Repository on GitHub <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="about-back" style={{ padding: "0 9.2vw 6vw" }}>
        <Link href="/">
          <ArrowLeft size={14} /> back to studio
        </Link>
      </div>
    </div>
  );
}
