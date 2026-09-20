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
  Terminal,
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

export default function Templates() {
  const [activeTab, setActiveTab] = useState<ResourceType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

            <div className="templates-cards-grid">
              {filteredCode.map((item) => (
                <article key={item.id} className="resource-card code-card dark-code-card">
                  <div className="resource-card-head">
                    <span className="resource-category-tag" style={{ color: "var(--orange)" }}>
                      {item.category}
                    </span>
                    <span className="resource-lang-tag">{item.language}</span>
                  </div>

                  <div className="code-install-bar">
                    <Terminal size={13} className="terminal-icon" />
                    <code>{item.installCommand}</code>
                    <button
                      className="copy-mini-btn"
                      onClick={() => handleCopyInstall(item.id, item.installCommand)}
                      title="Copy install command"
                    >
                      <Copy size={11} />
                    </button>
                  </div>

                  <div className="resource-card-body">
                    <h3>{item.title}</h3>
                    <p className="card-tagline">{item.tagline}</p>
                    <p className="card-desc">{item.description}</p>

                    <div className="code-snippet-box">
                      <div className="snippet-filename">{item.filename}</div>
                      <pre>{item.codeSnippet.slice(0, 150)}...</pre>
                    </div>

                    <div className="resource-card-actions">
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="outline-button full-width-btn dark-outline"
                        onClick={() => playClick()}
                      >
                        View Code on GitHub <Github size={13} />
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
    </div>
  );
}
