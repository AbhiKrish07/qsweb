import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, BookOpen, Code, Command, FileText, Layers, LayoutGrid, Search, Sparkles, X } from "lucide-react";
import { products } from "@/lib/products";
import { notionTemplates, promptTemplates, codingAssets } from "@/lib/resources";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Page" | "Product" | "Notion" | "Prompt" | "Code" | "Research";
  url: string;
  icon: typeof Command;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allItems: SearchItem[] = useMemo(() => {
    const pages: SearchItem[] = [
      { id: "page-home", title: "Home", subtitle: "Quiet Studio home page & thesis overview", category: "Page", url: "/", icon: Command },
      { id: "page-thesis", title: "Thesis Status Board", subtitle: "Live signal tracker & research exploration board", category: "Page", url: "/thesis", icon: Sparkles },
      { id: "page-research", title: "Research Journal", subtitle: "Independent AI & HCI research essays", category: "Page", url: "/research", icon: BookOpen },
      { id: "page-notion", title: "Notion Templates", subtitle: "Minimalist Notion workspaces & OS templates", category: "Page", url: "/notion-templates", icon: LayoutGrid },
      { id: "page-prompts", title: "Prompt Templates", subtitle: "Engineering system prompts & task frameworks", category: "Page", url: "/prompt-templates", icon: FileText },
      { id: "page-code", title: "Coding Assets", subtitle: "Open source UI kits, Rust servers, & PyTorch modules", category: "Page", url: "/coding-assets", icon: Code },
      { id: "page-notes", title: "Notes & Newsletter", subtitle: "Occasional newsletter archives", category: "Page", url: "/notes", icon: BookOpen },
      { id: "page-about", title: "About Abhinav Krish", subtitle: "Founder bio, timeline, skills, and contact", category: "Page", url: "/about", icon: Command },
    ];

    const prodItems: SearchItem[] = products.map((p) => ({
      id: `prod-${p.slug}`,
      title: p.name,
      subtitle: p.oneLiner,
      category: "Product",
      url: `/products/${p.slug}`,
      icon: Sparkles,
    }));

    const notionItems: SearchItem[] = notionTemplates.map((n) => ({
      id: `notion-${n.id}`,
      title: n.title,
      subtitle: n.tagline,
      category: "Notion",
      url: "/notion-templates",
      icon: LayoutGrid,
    }));

    const promptItems: SearchItem[] = promptTemplates.map((pr) => ({
      id: `prompt-${pr.id}`,
      title: pr.title,
      subtitle: pr.tagline,
      category: "Prompt",
      url: "/prompt-templates",
      icon: FileText,
    }));

    const codeItems: SearchItem[] = codingAssets.map((c) => ({
      id: `code-${c.id}`,
      title: c.title,
      subtitle: c.tagline,
      category: "Code",
      url: "/coding-assets",
      icon: Code,
    }));

    return [...pages, ...prodItems, ...notionItems, ...promptItems, ...codeItems];
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) onClose();
        else {
          // Toggle command palette
          const event = new CustomEvent("open-command-palette");
          window.dispatchEvent(event);
        }
      }

      if (!open) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          setLocation(filtered[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, selectedIndex, onClose, setLocation]);

  if (!open) return null;

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette-modal" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette-input-wrap">
          <Search size={18} className="search-icon" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search studio assets..."
            aria-label="Search studio assets"
          />
          <span className="kbd-badge">ESC</span>
          <button className="command-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="command-palette-results">
          {filtered.length > 0 ? (
            filtered.map((item, index) => {
              const IconComp = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`command-item ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setLocation(item.url);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="command-item-left">
                    <span className="command-icon-badge">
                      <IconComp size={14} />
                    </span>
                    <div>
                      <div className="command-item-title">{item.title}</div>
                      <div className="command-item-sub">{item.subtitle}</div>
                    </div>
                  </div>
                  <div className="command-item-right">
                    <span className="command-category-pill">{item.category}</span>
                    <ArrowRight size={13} className="item-arrow" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="command-empty">No results matching “{query}”.</div>
          )}
        </div>

        <div className="command-palette-foot">
          <span>
            <b>↑ ↓</b> to navigate
          </span>
          <span>
            <b>↵</b> to select
          </span>
          <span>
            <b>ESC</b> to close
          </span>
        </div>
      </div>
    </div>
  );
}
