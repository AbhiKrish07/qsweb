import { FormEvent, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code,
  Copy,
  ExternalLink,
  Github,
  LayoutGrid,
  Search,
  Sparkles,
  Star,
  Terminal,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  notionTemplates,
  promptTemplates,
  codingAssets,
  type NotionTemplate,
  type PromptTemplate,
  type CodingAsset,
} from "@/lib/resources";
import { playClick, playSuccess } from "@/lib/sound";

type ResourceType = "all" | "notion" | "prompt" | "code";

function getCodePreview(snippet: string, maxLines = 5): string {
  const lines = snippet.split("\n");
  return lines.slice(0, maxLines).join("\n");
}

export default function Templates() {
  const [activeTab, setActiveTab] = useState<ResourceType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [selectedCodeAsset, setSelectedCodeAsset] = useState<CodingAsset | null>(null);

  const handleCopyPrompt = (id: string, text: string) => {
    playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playSuccess();
    toast("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyInstall = (id: string, cmd: string) => {
    playClick();
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    playSuccess();
    toast("Install command copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyCode = (id: string, code: string) => {
    playClick();
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    playSuccess();
    toast("Code snippet copied!");
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const filteredNotion = useMemo(() => {
    if (activeTab === "prompt" || activeTab === "code") return [];
    return notionTemplates.filter((item) =>
      `${item.title} ${item.tagline} ${item.description} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery]);

  const filteredPrompts = useMemo(() => {
    if (activeTab === "notion" || activeTab === "code") return [];
    return promptTemplates.filter((item) =>
      `${item.title} ${item.tagline} ${item.description} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery]);

  const filteredCode = useMemo(() => {
    if (activeTab === "notion" || activeTab === "prompt") return [];
    return codingAssets.filter((item) =>
      `${item.title} ${item.tagline} ${item.description} ${item.tags.join(" ")} ${item.language}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [activeTab, searchQuery]);

  const totalCount = filteredNotion.length + filteredPrompts.length + filteredCode.length;

  return (
    <div className="templates-page">
      {/* Page Header */}
      <section className="templates-hero-header">
        <div className="section-marker">[ 03 — UNIFIED RESOURCE TEMPLATES ]</div>
        <h1 className="templates-title">
          Systems, Prompts<br />
          <em>& Code.</em>
        </h1>
        <p className="templates-lead">
          Minimalist Notion workspaces, system prompt frameworks, and open source developer kits—built for speed, clarity, and deep focus.
        </p>

        {/* Filter Tabs & Search Row */}
        <div className="templates-controls-row">
          <div className="templates-tabs-group" role="tablist">
            <button
              className={`templates-tab-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => {
                playClick();
                setActiveTab("all");
              }}
            >
              All Templates ({notionTemplates.length + promptTemplates.length + codingAssets.length})
            </button>
            <button
              className={`templates-tab-btn ${activeTab === "notion" ? "active" : ""}`}
              onClick={() => {
                playClick();
                setActiveTab("notion");
              }}
            >
              Notion ({notionTemplates.length})
            </button>
            <button
              className={`templates-tab-btn ${activeTab === "prompt" ? "active" : ""}`}
              onClick={() => {
                playClick();
                setActiveTab("prompt");
              }}
            >
              Prompts ({promptTemplates.length})
            </button>
            <button
              className={`templates-tab-btn ${activeTab === "code" ? "active" : ""}`}
              onClick={() => {
                playClick();
                setActiveTab("code");
              }}
            >
              Code ({codingAssets.length})
            </button>
          </div>

          <div className="templates-search-box">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter Notion, Prompts, or Code..."
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery("")}>
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="templates-main-content">
        {/* Section 1: Notion Workspaces */}
        {filteredNotion.length > 0 && (
          <section className="template-group-block">
            <div className="group-heading">
              <span className="group-marker">[ NOTION WORKSPACES ]</span>
              <h2>Organized for momentum.</h2>
            </div>

            <div className="templates-cards-grid">
              {filteredNotion.map((item) => (
                <article key={item.id} className="resource-card notion-resource-card">
                  <div className="resource-card-head">
                    <span className="resource-category-tag">{item.category}</span>
                    <span className="resource-version">{item.version}</span>
                  </div>

                  <div className="resource-visual-preview" style={{ background: item.visualBg }}>
                    <LayoutGrid size={26} className="preview-icon" />
                    <span className="preview-bg-text">{item.coverBannerText || "NOTION"}</span>
                  </div>

                  <div className="resource-card-body">
                    <h3>{item.title}</h3>
                    <p className="card-tagline">{item.tagline}</p>
                    <p className="card-desc">{item.description}</p>

                    <div className="features-list">
                      {item.features.slice(0, 3).map((f) => (
                        <div key={f} className="feature-item">
                          <Check size={12} className="check-icon" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="card-tags-row">
                      {item.tags.map((t) => (
                        <span key={t} className="tag-chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="resource-card-actions">
                      <a
                        href={item.duplicateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="outline-button full-width-btn"
                        onClick={() => playClick()}
                      >
                        Duplicate Template ({item.price}) <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: System Prompt Frameworks */}
        {filteredPrompts.length > 0 && (
          <section className="template-group-block">
            <div className="group-heading">
              <span className="group-marker">[ SYSTEM PROMPTS & FRAMEWORKS ]</span>
              <h2>Language, engineered.</h2>
            </div>

            <div className="templates-cards-grid">
              {filteredPrompts.map((item) => (
                <article key={item.id} className="resource-card prompt-card">
                  <div className="resource-card-head">
                    <span className="resource-category-tag">{item.category}</span>
                    <span className="resource-target-model">{item.targetModel}</span>
                  </div>

                  <div className="prompt-code-snippet">
                    <pre>{item.promptText.slice(0, 180)}...</pre>
                  </div>

                  <div className="resource-card-body">
                    <h3>{item.title}</h3>
                    <p className="card-tagline">{item.tagline}</p>
                    <p className="card-desc">{item.description}</p>

                    <div className="variables-chips-row">
                      <span className="var-label">Variables:</span>
                      {item.variables.map((v) => (
                        <span key={v.name} className="var-chip">
                          {v.name}
                        </span>
                      ))}
                    </div>

                    <div className="resource-card-actions">
                      <button
                        className="primary-button full-width-btn"
                        onClick={() => handleCopyPrompt(item.id, item.promptText)}
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={13} /> Copied to Clipboard
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
            </div>
          </section>
        )}

        {/* Section 3: Open Source Code Assets */}
        {filteredCode.length > 0 && (
          <section className="template-group-block">
            <div className="group-heading">
              <span className="group-marker" style={{ color: "var(--orange)" }}>
                [ OPEN SOURCE CODE KITS ]
              </span>
              <h2>Proof in the code.</h2>
            </div>

            <div className="templates-cards-grid code-assets-grid">
              {filteredCode.map((item) => (
                <article key={item.id} className="resource-card code-card">
                  <div className="resource-card-head">
                    <div className="code-card-tags">
                      <span className="resource-category-tag">{item.category}</span>
                      <span className="code-lang-badge">{item.language}</span>
                    </div>
                    <div className="star-badge" title={`${item.stars} GitHub stars`}>
                      <Star size={11} fill="currentColor" /> {item.stars}
                    </div>
                  </div>

                  <div className="resource-card-body">
                    <h3 className="code-card-title">{item.title}</h3>
                    <p className="card-tagline">{item.tagline}</p>

                    <div className="code-install-bar">
                      <span className="terminal-prompt">$</span>
                      <code>{item.installCommand}</code>
                      <button
                        className="copy-mini-btn"
                        onClick={() => handleCopyInstall(item.id, item.installCommand)}
                        title="Copy install command"
                        aria-label="Copy install command"
                      >
                        {copiedId === item.id ? (
                          <span className="copied-tag">
                            <Check size={11} /> Copied
                          </span>
                        ) : (
                          <>
                            <Copy size={11} /> Copy
                          </>
                        )}
                      </button>
                    </div>

                    <div className="code-snippet-box">
                      <div className="snippet-head">
                        <span className="snippet-filename">
                          <Code size={11} className="file-icon" />
                          {item.filename}
                        </span>
                        <button
                          type="button"
                          className="snippet-copy-btn"
                          onClick={() => handleCopyCode(`snip-${item.id}`, item.codeSnippet)}
                          title="Copy snippet"
                        >
                          {copiedCodeId === `snip-${item.id}` ? (
                            <span className="copied-tag">
                              <Check size={10} /> Copied
                            </span>
                          ) : (
                            <>
                              <Copy size={10} /> Copy snippet
                            </>
                          )}
                        </button>
                      </div>
                      <div className="snippet-code-wrap">
                        <pre className="snippet-pre">{getCodePreview(item.codeSnippet)}</pre>
                      </div>
                    </div>

                    <div className="card-tags-row">
                      {item.tags.map((t) => (
                        <span key={t} className="tag-chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="resource-card-actions code-actions-row">
                      <button
                        type="button"
                        className="code-view-btn"
                        onClick={() => {
                          playClick();
                          setSelectedCodeAsset(item);
                        }}
                      >
                        Inspect Source <Code size={13} />
                      </button>
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="code-github-btn"
                        onClick={() => playClick()}
                      >
                        GitHub <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {totalCount === 0 && (
          <div className="templates-empty-state">
            <Sparkles size={24} className="empty-icon" />
            <p>No template resources match “{searchQuery}”. Try clearing your search.</p>
            <button className="outline-button" onClick={() => setSearchQuery("")}>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Code Inspector Modal */}
      {selectedCodeAsset && (
        <div className="resource-modal-overlay" onClick={() => setSelectedCodeAsset(null)}>
          <div className="resource-modal code-inspector-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="resource-category-tag" style={{ color: "var(--orange)" }}>
                  {selectedCodeAsset.language} // {selectedCodeAsset.category}
                </span>
                <h2>{selectedCodeAsset.title}</h2>
              </div>
              <button className="modal-close" onClick={() => setSelectedCodeAsset(null)} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <p className="modal-description">{selectedCodeAsset.description}</p>

            <div className="code-install-bar" style={{ margin: "0 0 16px" }}>
              <span className="terminal-prompt">$</span>
              <code>{selectedCodeAsset.installCommand}</code>
              <button
                className="copy-mini-btn"
                onClick={() => handleCopyInstall(`modal-${selectedCodeAsset.id}`, selectedCodeAsset.installCommand)}
              >
                {copiedId === `modal-${selectedCodeAsset.id}` ? (
                  <span className="copied-tag">
                    <Check size={11} /> Copied
                  </span>
                ) : (
                  <>
                    <Copy size={11} /> Copy command
                  </>
                )}
              </button>
            </div>

            <div className="modal-body">
              <div className="snippet-head" style={{ borderRadius: "8px 8px 0 0" }}>
                <span className="snippet-filename">
                  <Code size={12} className="file-icon" />
                  {selectedCodeAsset.filename}
                </span>
                <button
                  type="button"
                  className="snippet-copy-btn"
                  onClick={() => handleCopyCode(`modal-code-${selectedCodeAsset.id}`, selectedCodeAsset.codeSnippet)}
                >
                  {copiedCodeId === `modal-code-${selectedCodeAsset.id}` ? (
                    <span className="copied-tag">
                      <Check size={11} /> Copied full file
                    </span>
                  ) : (
                    <>
                      <Copy size={11} /> Copy full file
                    </>
                  )}
                </button>
              </div>
              <div
                className="snippet-code-wrap"
                style={{
                  maxHeight: "380px",
                  borderRadius: "0 0 8px 8px",
                  background: "#090a0d",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <pre className="snippet-pre" style={{ fontSize: "12px", lineHeight: "1.6" }}>
                  {selectedCodeAsset.codeSnippet}
                </pre>
              </div>
            </div>

            <div className="modal-foot" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
              <a
                href={selectedCodeAsset.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
                style={{ flex: 1, justifyContent: "center" }}
              >
                View Repository on GitHub <ExternalLink size={14} />
              </a>
              <button className="outline-button" onClick={() => setSelectedCodeAsset(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
