import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, Clock3, LoaderCircle, Mail, Search, Share2, Sparkles, Tag } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { playClick } from "@/lib/sound";

export interface BlogPost {
  slug: string;
  number: string;
  date: string;
  category: "Essay" | "Vertical AI" | "Research" | "Studio Log";
  title: string;
  subtitle: string;
  excerpt: string;
  readTime: string;
  author: string;
  tags: string[];
  featured?: boolean;
  sections: {
    heading?: string;
    paragraphs: string[];
    callout?: string;
    bulletPoints?: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-as-a-proactive-life-partner",
    number: "01",
    date: "14.10.26",
    category: "Vertical AI",
    title: "AI as a proactive life partner, not a reactive chatbox.",
    subtitle: "Why the next leap in computing isn't a smarter text box, but an ambient partner that understands what you need before you ask.",
    excerpt: "Prompting is friction. True intelligence doesn't wait for human syntax gymnastics—it maintains persistent context, detects ambient friction, and steps forward as a quiet partner.",
    readTime: "6 min read",
    author: "Abhinav / Quiet Studio",
    tags: ["Life Partner AI", "Proactive Agents", "Zero Prompt", "Context Systems"],
    featured: true,
    sections: [
      {
        heading: "The tyranny of the blank input prompt",
        paragraphs: [
          "For the past three years, the dominant paradigm of artificial intelligence has been the chat interface: a blank input box waiting for human instruction. You open a tab, frame a question, craft a multi-paragraph prompt with few-shot examples, wait for token streaming, and then manually copy-paste the output into your actual software.",
          "This is not a partnership. It is a digital command-line terminal masquerading as an intelligence. It requires the human to carry the entirety of the cognitive load: knowing what needs to be done, knowing when to invoke the tool, knowing how to formulate the request, and evaluating whether the result can be trusted.",
          "At Quiet Studio, our core conviction is that machine intelligence should feel like a partner in your daily life. An ambient collaborator that works quietly alongside you—aware of your active projects, anticipating the friction in your routine, and proactively executing the tasks that consume your focus.",
        ],
        callout: "The highest goal of AI is not to answer arbitrary questions. It is to know you well enough that the questions become unnecessary.",
      },
      {
        heading: "From reactive responses to proactive execution",
        paragraphs: [
          "What separates an assistant from a partner is proactivity. A reactive tool does nothing until provoked. A partner observes the flow of work and prepares what is needed ahead of time.",
          "Consider what proactive partnership looks like in practice. When you are preparing for a difficult architectural review, a proactive partner doesn't wait for you to prompt: 'Summarize past API decisions.' It has already cross-referenced previous RFC discussions, flagged contradicting schema changes across your repositories, and synthesized a one-page brief on your desk before you open the meeting.",
          "When you are writing, it doesn't interrupt your train of thought with suggestions. It stays completely quiet until you pause, and then offers contextually anchored citations or counter-arguments you were about to search for.",
        ],
        bulletPoints: [
          "Persistent Long-Horizon Context: Remembering decisions made three months ago across disconnected documents.",
          "Zero-Prompt Reflexes: Action triggered by subtle environmental cues rather than explicit textual commands.",
          "Calm Invisibility: Never seeking attention or demanding engagement when the human is in deep flow.",
        ],
      },
      {
        heading: "Vertical intelligence tailored to your actual life",
        paragraphs: [
          "General-purpose frontier models know everything about medieval history and quantum mechanics, but they know nothing about your team's specific naming conventions, your personal threshold for cognitive overload, or how you like to structure your mornings.",
          "To be a genuine life partner, AI must be vertical: shaped specifically around the exact tasks, domains, and idiosyncratic routines that constitute your actual day.",
          "This is what our AI Laboratory builds. Not another conversational chatbot to waste time with, but vertical intent engines and ambient runtimes that lift the background weight of daily life so you can do your best work in peace.",
        ],
      },
    ],
  },
  {
    slug: "why-vertical-models-beat-general-ai",
    number: "02",
    date: "28.09.26",
    category: "Vertical AI",
    title: "Why domain-vertical models will run the world.",
    subtitle: "The fallacy of the monolithic 400B parameter generalist for specialized human tasks.",
    excerpt: "A generalist model knows everything superficially. A vertical model knows your specific task with surgical depth, zero hallucination, and instantaneous local speed.",
    readTime: "7 min read",
    author: "Abhinav / Quiet Studio",
    tags: ["Vertical Models", "Local-First", "Rust Runtimes", "Distillation"],
    sections: [
      {
        heading: "The limits of generalist scale",
        paragraphs: [
          "The tech industry has spent billions optimizing for general intelligence benchmarks: solving MMLU tests, passing medical board exams, and writing poetry about quantum electrodynamics. But when a creative practitioner or engineer sits down to build, generalist knowledge is often irrelevant or counterproductive.",
          "A generalist model suffers from distractor pollution. When asked to evaluate an API contract, its attention heads are diluted by tokens related to web forums, Wikipedia articles, and irrelevant code paradigms. The result is latency, cost, and subtle hallucinations.",
        ],
        callout: "A 3-billion parameter vertical model, fine-tuned exclusively on verified systems engineering patterns, consistently outperforms a 70B generalist in precision, predictability, and runtime speed.",
      },
      {
        heading: "Task-shaped architectures",
        paragraphs: [
          "Vertical AI isn't just about fine-tuning weights; it is about designing the entire inference stack around the shape of a single task. In Zen AI, our local-first engine, we removed the web-scale tokenizers and replaced them with task-specific grammar parsers that execute directly on local silicon in under 0.2 milliseconds.",
          "When you eliminate the need to know everything, you can optimize for perfection in the few things that matter: absolute privacy, zero network latency, and deterministic output.",
        ],
      },
    ],
  },
  {
    slug: "building-less-software",
    number: "03",
    date: "06.09.26",
    category: "Essay",
    title: "The case for building less software.",
    subtitle: "Why the next generation of digital tools should feel more like a reflex than a destination.",
    excerpt: "The instinct to add features is understandable: a roadmap is easier to explain when it keeps getting longer. But usefulness rarely comes from volume.",
    readTime: "5 min read",
    author: "Abhinav / Quiet Studio",
    tags: ["Product Philosophy", "Calm Technology", "Studio Craft"],
    sections: [
      {
        heading: "The weight of unnecessary interface",
        paragraphs: [
          "Every button added to a toolbar is a micro-decision demanded from the user. Every notification badge is a bid for attention. Every configuration dropdown is an admission that the product team didn't have the conviction to choose.",
          "Most modern software feels like a destination you have to visit, manage, and tend to. You have to learn its hotkeys, organize its folders, configure its dashboards, and adjust its notification settings.",
          "Quiet Studio operates on the inverse thesis: the best software is the layer you no longer notice. It gets out of the way. It reduces the distance between intention and outcome to near zero.",
        ],
        callout: "A smaller product can have a stronger point of view. It can say no with confidence. It can make the important path feel inevitable.",
      },
      {
        heading: "The studio rule: one useful thing",
        paragraphs: [
          "Our shipping rule for a studio of one is straightforward: build one useful thing, make it feel obvious, and let real human signal determine what comes next.",
          "When you refuse to pad a product with feature bloat, you are forced to make the core mechanism flawless. You obsess over the feel of a transition, the clarity of typography, and the silent reliability of background sync.",
        ],
      },
    ],
  },
  {
    slug: "what-one-useful-thing-looks-like",
    number: "04",
    date: "18.08.26",
    category: "Studio Log",
    title: "What one useful thing looks like.",
    subtitle: "A shipping manifesto for independent studios and solo creators.",
    excerpt: "One useful thing is specific enough to use today and opinionated enough to remember tomorrow. It solves a real problem and leaves the rest of the roadmap alone.",
    readTime: "4 min read",
    author: "Abhinav / Quiet Studio",
    tags: ["Studio Log", "Solo Studio", "Execution"],
    sections: [
      {
        heading: "Specificity over scope",
        paragraphs: [
          "When you are an independent studio, your advantage is not headcount or compute clusters. Your advantage is taste, focus, and the freedom to ignore enterprise checklist feature requests.",
          "One useful thing solves one acute point of friction so cleanly that the user never has to think about that problem again. It doesn't attempt to be your calendar, your task manager, your note-taker, and your social network all at once.",
        ],
        callout: "Research is not a performance of certainty. It is a way to make better questions visible.",
      },
    ],
  },
  {
    slug: "ambient-intent-and-zero-prompts",
    number: "05",
    date: "02.08.26",
    category: "Research",
    title: "Zero-prompt interfaces: When AI stops asking.",
    subtitle: "Moving from command-response syntax to ambient cognitive resonance.",
    excerpt: "Investigating how peripheral signals and micro-intent detection allow machine intelligence to act as a seamless extension of human thought.",
    readTime: "7 min read",
    author: "Abhinav / Quiet Studio",
    tags: ["Aethel Engine", "Ambient Intent", "Cognitive Resonance"],
    sections: [
      {
        heading: "The friction of articulation",
        paragraphs: [
          "Human thought does not begin as grammatically complete text strings. When you are deep in a creative or analytical flow, your intention is visceral, non-linear, and fluid. Forcing a human to stop, open a chat dialog, formulate a prompt, and parse a verbose answer shatters the flow state.",
          "In the AI Lab, our Aethel engine explores ambient intent recognition: interpreting peripheral workspace telemetry, cursor dynamics, and active document state to anticipate user needs with zero explicit prompting.",
        ],
        callout: "The goal is not an AI that talks more. It is an AI that understands when language is completely unnecessary.",
      },
    ],
  },
];

const CATEGORIES = ["All", "Vertical AI", "Essay", "Research", "Studio Log"] as const;

function Subscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, page: "Notes Blog", target: "glexionstriker@gmail.com" }),
      });
    } catch {
      /* graceful fallback */
    }
    setState("done");
    toast("You’re subscribed to the Quiet Studio Blog & Journal.");
  };

  if (state === "done") {
    return (
      <div className="newsletter-success success-pop">
        <Check size={15} /> You’re subscribed. Next issue arrives when there is something useful to say.
      </div>
    );
  }

  return (
    <form className={`notes-subscribe ${state === "loading" ? "is-loading" : ""}`} onSubmit={submit}>
      <Mail size={16} />
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="your@email.com"
        aria-label="Email address"
        disabled={state === "loading"}
      />
      <button type="submit" disabled={state === "loading"}>
        {state === "loading" ? (
          <>
            <LoaderCircle className="spin" size={14} /> Joining…
          </>
        ) : (
          <>
            Subscribe to Essays <ArrowRight size={14} />
          </>
        )}
      </button>
    </form>
  );
}

export default function Notes() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCat = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        query === "" ||
        `${post.title} ${post.subtitle} ${post.excerpt} ${post.tags.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, query]);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  return (
    <div className="notes-archive-page">
      {/* Editorial Blog Hero Header */}
      <section className="notes-archive-hero">
        <div className="section-marker">[ THE QUIET STUDIO JOURNAL &amp; ESSAYS ]</div>
        <h1>
          Writing on
          <br />
          <em>vertical AI &amp; quiet craft.</em>
        </h1>
        <p>
          In-depth essays, architectural notes, and research logs on making AI a proactive partner in your life, building
          domain-vertical models for actual tasks, and the discipline of calm software.
        </p>
        <Subscribe />
      </section>

      {/* Featured Leading Essay */}
      {featuredPost && activeCategory === "All" && query === "" && (
        <section className="blog-featured-section" style={{ padding: "4vw 9.2vw 2vw" }}>
          <div className="section-marker" style={{ marginBottom: "16px" }}>[ FEATURED ESSAY ]</div>
          <Link href={`/blog/${featuredPost.slug}`} className="featured-blog-card">
            <div className="featured-blog-meta">
              <span className="badge-featured">{featuredPost.category}</span>
              <span>{featuredPost.date}</span>
              <span>•</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <h2 className="featured-blog-title">{featuredPost.title}</h2>
            <p className="featured-blog-subtitle">{featuredPost.subtitle}</p>
            <p className="featured-blog-excerpt">{featuredPost.excerpt}</p>
            <div className="featured-blog-foot">
              <span className="read-full-link">
                Read Full Essay <ArrowRight size={15} />
              </span>
              <div className="blog-tags-row">
                {featuredPost.tags.map((t) => (
                  <span key={t} className="blog-tag-pill">{t}</span>
                ))}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Blog Index Section */}
      <section className="notes-issue-list">
        <div className="section-heading compact-heading">
          <div>
            <div className="section-marker">[ ESSAY ARCHIVE ]</div>
            <h2>
              All articles &amp;
              <br />
              <em>field notes.</em>
            </h2>
          </div>
          <span className="notes-count">
            {String(filtered.length).padStart(2, "0")} essays available
          </span>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="notes-filters">
          <label className="notes-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by topic, tag, or title..."
              aria-label="Search essays"
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search">
                ×
              </button>
            )}
          </label>

          <div className="notes-filter-tabs" role="tablist" aria-label="Filter essays">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                className={activeCategory === item ? "active" : ""}
                onClick={() => {
                  playClick();
                  setActiveCategory(item);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Publication Essay Feed */}
        <div className="blog-feed-list" style={{ marginTop: "3vw" }}>
          {filtered.length > 0 ? (
            filtered.map((post) => (
              <article key={post.slug} className="blog-feed-item">
                <Link href={`/blog/${post.slug}`} className="blog-feed-link">
                  <div className="blog-feed-top">
                    <span className="blog-num">{post.number}</span>
                    <span className="blog-cat-badge">{post.category}</span>
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-time">
                      <Clock3 size={12} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="blog-feed-title">{post.title}</h3>
                  <p className="blog-feed-subtitle">{post.subtitle}</p>
                  <p className="blog-feed-excerpt">{post.excerpt}</p>

                  <div className="blog-feed-bottom">
                    <span className="blog-action-btn">
                      Read Complete Article <ArrowRight size={14} />
                    </span>
                    <div className="blog-tags-row">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="archive-empty">
              No articles match "{query}". Try searching for "Vertical AI", "Proactive", or "Life Partner".
            </div>
          )}
        </div>
      </section>

      {/* Return to Studio */}
      <div className="notes-back">
        <Link href="/">
          <ArrowLeft size={14} /> Back to Quiet Studio
        </Link>
      </div>
    </div>
  );
}

export function NotesIssue() {
  const [, paramsBlog] = useRoute("/blog/:slug");
  const [, paramsNotes] = useRoute("/notes/:slug");
  const slug = paramsBlog?.slug || paramsNotes?.slug;

  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="not-found-page">
        <p className="eyebrow">404 — ESSAY NOT FOUND</p>
        <h1>
          That essay
          <br />
          <em>is quiet.</em>
        </h1>
        <p style={{ color: "var(--muted-ink)", margin: "20px 0 30px", maxWidth: "420px" }}>
          The article you are looking for may have been moved or renamed in our journal archive.
        </p>
        <Link href="/blog" className="primary-button">
          Browse All Essays <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  const handleShare = async () => {
    playClick();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      toast("Article link copied to clipboard!");
    }
  };

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="note-article">
      <div className="article-nav-bar">
        <Link href="/blog" className="article-back">
          <ArrowLeft size={14} /> Quiet Studio Journal &amp; Blog
        </Link>
        <button onClick={handleShare} className="article-share-btn" title="Share article link">
          <Share2 size={13} /> Share Essay
        </button>
      </div>

      <header className="article-full-header">
        <div className="article-meta-badges">
          <span className="badge-featured">{post.category}</span>
          <span className="meta-dot">•</span>
          <span>{post.date}</span>
          <span className="meta-dot">•</span>
          <span>
            <Clock3 size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
            {post.readTime}
          </span>
        </div>

        <h1 className="article-full-title">{post.title}</h1>
        <p className="article-deck">{post.subtitle}</p>

        <div className="article-meta-row">
          <span className="article-author">By {post.author}</span>
          <div className="article-tags-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag-pill">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="article-body">
        {post.sections.map((section, idx) => (
          <section key={idx} className="article-section-block">
            {section.heading && <h2 className="article-subheading">{section.heading}</h2>}

            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}

            {section.callout && (
              <blockquote className="article-callout">
                {section.callout}
              </blockquote>
            )}

            {section.bulletPoints && (
              <ul className="article-bullet-list">
                {section.bulletPoints.map((pt, bIdx) => (
                  <li key={bIdx}>{pt}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="article-footer-card">
          <h3>Quiet Studio Research &amp; Notes</h3>
          <p>
            We write occasionally about domain-vertical intelligence, local-first runtime systems, and calm design. No spam,
            no algorithmic engagement loops.
          </p>
          <Subscribe />
        </div>

        {related.length > 0 && (
          <div className="related-articles-section">
            <div className="section-marker" style={{ marginBottom: "20px" }}>[ CONTINUE READING ]</div>
            <div className="related-articles-grid">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="related-card">
                  <span className="rel-cat">{rel.category} — {rel.date}</span>
                  <h4>{rel.title}</h4>
                  <p>{rel.excerpt}</p>
                  <span className="rel-link">
                    Read Article <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
