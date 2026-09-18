import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, LayoutGrid, Layers, Search, Sparkles, X } from "lucide-react";
import { Link } from "wouter";
import { notionTemplates, type NotionTemplate } from "@/lib/resources";
import { toast } from "sonner";

export default function NotionTemplates() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<NotionTemplate | null>(null);

  const categories = ["All", "Operating System", "Research", "Product Studio", "Knowledge"];

  const filtered = useMemo(() => {
    return notionTemplates.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesQuery = `${item.title} ${item.tagline} ${item.description} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const handleDuplicate = (template: NotionTemplate) => {
    toast(`Opening ${template.title} on Notion...`);
    window.open(template.duplicateUrl, "_blank", "noreferrer");
  };

  return (
    <div className="notion-templates-page">
      <section className="research-hero">
        <div className="section-marker">[ 05 — NOTION TEMPLATES ]</div>
        <h1>
          Systems for<br />
          <em>your mind.</em>
        </h1>
        <p>
          Minimalist, high-yield Notion workspaces crafted for research, product specs, deep capture, and personal momentum.
        </p>
        <div className="research-rule" />
      </section>

      <section className="research-index">
        <div className="research-index-head">
          <div>
            <div className="section-marker">[ WORKSPACE ARCHIVE ]</div>
            <h2>
              Select a<br />
              <em>template.</em>
            </h2>
          </div>
          <div className="archive-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates..."
              aria-label="Search Notion templates"
            />
            {query && <button onClick={() => setQuery("")}>×</button>}
          </div>
        </div>

        <div className="category-tabs" style={{ marginTop: "4vw" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="resource-grid">
          {filtered.map((item) => (
            <article className="resource-card" key={item.id}>
              <div className="resource-card-head">
                <span className="resource-category-tag">{item.category}</span>
                <span className="resource-version">{item.version}</span>
              </div>
              <div className="resource-visual-preview" style={{ background: item.visualBg }}>
                <LayoutGrid size={28} className="preview-icon" />
                <span className="preview-bg-text">NOTION</span>
              </div>
              <div className="resource-card-body">
                <h3>{item.title}</h3>
                <p>{item.tagline}</p>
                <div className="resource-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="resource-card-actions">
                  <button className="outline-button" onClick={() => setSelectedTemplate(item)}>
                    Preview <Layers size={13} />
                  </button>
                  <button className="primary-button" onClick={() => handleDuplicate(item)}>
                    Duplicate <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="archive-empty">No Notion templates match “{query}”.</div>
          )}
        </div>
      </section>

      {/* Modal Preview */}
      {selectedTemplate && (
        <div className="resource-modal-overlay" onClick={() => setSelectedTemplate(null)}>
          <div className="resource-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="resource-category-tag">{selectedTemplate.category}</span>
                <h2>{selectedTemplate.title}</h2>
              </div>
              <button className="modal-close" onClick={() => setSelectedTemplate(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedTemplate.description}</p>
              <div className="modal-features">
                <h4>Core Workspace Features</h4>
                <ul>
                  {selectedTemplate.features.map((feat, i) => (
                    <li key={i}>
                      <Check size={14} className="check-icon" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-foot">
              <button className="primary-button" onClick={() => handleDuplicate(selectedTemplate)}>
                Duplicate to Notion <ExternalLink size={14} />
              </button>
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
