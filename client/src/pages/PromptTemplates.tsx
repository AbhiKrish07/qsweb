import { useMemo, useState } from "react";
import { ArrowLeft, Check, Copy, ExternalLink, Play, Search, Terminal, X } from "lucide-react";
import { Link } from "wouter";
import { promptTemplates, type PromptTemplate } from "@/lib/resources";
import { toast } from "sonner";

export default function PromptTemplates() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [activePrompt, setActivePrompt] = useState<PromptTemplate | null>(null);
  const [varValues, setVarValues] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", "AI Architecture", "Engineering", "Product Strategy", "Research"];

  const filtered = useMemo(() => {
    return promptTemplates.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesQuery = `${item.title} ${item.tagline} ${item.promptText} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenPlayground = (prompt: PromptTemplate) => {
    setActivePrompt(prompt);
    const initialVars: Record<string, string> = {};
    prompt.variables.forEach((v) => {
      initialVars[v.name] = "";
    });
    setVarValues(initialVars);
  };

  const getRenderedPrompt = () => {
    if (!activePrompt) return "";
    let result = activePrompt.promptText;
    activePrompt.variables.forEach((v) => {
      const val = varValues[v.name] || `{{${v.name}}}`;
      result = result.replaceAll(`{{${v.name}}}`, val);
    });
    return result;
  };

  return (
    <div className="prompt-templates-page">
      <section className="research-hero">
        <div className="section-marker">[ 06 — PROMPT TEMPLATES ]</div>
        <h1>
          Language,<br />
          <em>engineered.</em>
        </h1>
        <p>
          High-precision system prompts and task frameworks designed for Claude 3.7, GPT-4o, DeepSeek, and Zen AI.
        </p>
        <div className="research-rule" />
      </section>

      <section className="research-index">
        <div className="research-index-head">
          <div>
            <div className="section-marker">[ PROMPT ARCHIVE ]</div>
            <h2>
              Select a<br />
              <em>framework.</em>
            </h2>
          </div>
          <div className="archive-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts..."
              aria-label="Search prompt templates"
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
            <article className="resource-card prompt-card" key={item.id}>
              <div className="resource-card-head">
                <span className="resource-category-tag">{item.category}</span>
                <span className="resource-target-model">{item.targetModel}</span>
              </div>
              <div className="prompt-code-snippet">
                <pre>{item.promptText.slice(0, 180)}...</pre>
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
                  <button className="outline-button" onClick={() => handleOpenPlayground(item)}>
                    Test Variables <Play size={13} />
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => copyToClipboard(item.id, item.promptText)}
                  >
                    {copiedId === item.id ? (
                      <>
                        Copied <Check size={13} />
                      </>
                    ) : (
                      <>
                        Copy Prompt <Copy size={13} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="archive-empty">No prompt templates match “{query}”.</div>
          )}
        </div>
      </section>

      {/* Interactive Variable Playground Modal */}
      {activePrompt && (
        <div className="resource-modal-overlay" onClick={() => setActivePrompt(null)}>
          <div className="resource-modal prompt-playground-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="resource-category-tag">{activePrompt.category}</span>
                <h2>{activePrompt.title}</h2>
              </div>
              <button className="modal-close" onClick={() => setActivePrompt(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="playground-vars">
                <h4>Fill Variables</h4>
                {activePrompt.variables.map((v) => (
                  <div key={v.name} className="playground-field">
                    <label>{v.label}</label>
                    <textarea
                      rows={2}
                      placeholder={v.placeholder}
                      value={varValues[v.name] || ""}
                      onChange={(e) =>
                        setVarValues({ ...varValues, [v.name]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="playground-output">
                <h4>Rendered Prompt Output</h4>
                <div className="prompt-preview-box">
                  <pre>{getRenderedPrompt()}</pre>
                </div>
              </div>
            </div>
            <div className="modal-foot">
              <button
                className="primary-button"
                onClick={() => copyToClipboard(activePrompt.id, getRenderedPrompt())}
              >
                Copy Rendered Prompt <Copy size={14} />
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
