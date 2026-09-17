import { ArrowLeft, ArrowRight, Check, Clock3, LoaderCircle, Mail, Search } from "lucide-react";
import { Link, useRoute } from "wouter";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";

const issues = [
  { slug: "building-less-software", number: "06", date: "06.09.26", type: "Essay", title: "The case for building less software.", excerpt: "Why the next generation of tools should feel more like a reflex than a destination.", time: "5 min read", body: ["The instinct to add features is understandable: a roadmap is easier to explain when it keeps getting longer. But usefulness rarely comes from volume. It comes from reducing the distance between intention and outcome.", "A smaller product can have a stronger point of view. It can say no with confidence. It can make the important path feel inevitable.", "This is our shipping rule for a studio of one: build one useful thing, make it feel obvious, then let the signal decide what comes next."] },
  { slug: "one-useful-thing", number: "05", date: "28.08.26", type: "Log", title: "What one useful thing looks like.", excerpt: "A shipping rule for a studio of one.", time: "4 min read", body: ["One useful thing is specific enough to use today and opinionated enough to remember tomorrow. It solves a real problem and leaves the rest of the roadmap alone until the signal is clear.", "Research is not a performance of certainty. It is a way to make better questions visible."] },
  { slug: "when-ai-stops", number: "04", date: "14.08.26", type: "Research", title: "When AI stops feeling like AI.", excerpt: "Early observations from Aethel.", time: "7 min read", body: ["The magic is not in making systems speak more. It is in making them understand when language is unnecessary.", "Aethel is a running set of experiments around intent, timing, and the dignity of not being interrupted."] },
  { slug: "quiet-progress", number: "03", date: "01.08.26", type: "Field note", title: "A working definition of quiet progress.", excerpt: "How to tell the difference between motion and momentum.", time: "3 min read", body: ["Quiet progress is the work that leaves a trace: a shipped thing, a useful conversation, a better question. It is not measured by how busy the week looked."] },
];
const issueTypes = ["All", "Essay", "Research", "Log", "Field note"];

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
        body: JSON.stringify({ email, page: "Notes", target: "glexionstriker@gmail.com" }),
      });
    } catch {
      /* fallback */
    }
    setState("done");
    toast("You’re on the Notes list!");
  };
  if (state === "done") return <div className="newsletter-success success-pop"><Check size={15} /> You’re on the list.</div>;
  return <form className={`notes-subscribe ${state === "loading" ? "is-loading" : ""}`} onSubmit={submit}><Mail size={16} /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="your@email.com" aria-label="Email address" disabled={state === "loading"} /><button type="submit" disabled={state === "loading"}>{state === "loading" ? <><LoaderCircle className="spin" size={14} /> Joining…</> : <>Subscribe <ArrowRight size={14} /></>}</button></form>;
}

export default function Notes() { const [query, setQuery] = useState(""); const [type, setType] = useState("All"); const [page, setPage] = useState(1); const pageSize = 3; const filtered = useMemo(() => issues.filter((issue) => (type === "All" || issue.type === type) && `${issue.title} ${issue.excerpt} ${issue.type}`.toLowerCase().includes(query.toLowerCase())), [query, type]); const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize)); const visible = filtered.slice((page - 1) * pageSize, page * pageSize); const updateQuery = (value: string) => { setQuery(value); setPage(1); }; const updateType = (value: string) => { setType(value); setPage(1); }; return <div className="notes-archive-page"><section className="notes-archive-hero"><div className="section-marker">[ 04 — NOTES / NEWSLETTER ]</div><h1>Notes<br /><em>from the quiet.</em></h1><p>Quiet Studio Notes is an occasional newsletter about AI research, useful products, and building in public. Read everything freely; subscribe only if you want the next issue in your inbox.</p><Subscribe /></section><section className="notes-issue-list"><div className="section-heading compact-heading"><div><div className="section-marker">[ ISSUE ARCHIVE ]</div><h2>All the<br /><em>notes.</em></h2></div><span className="notes-count">{String(filtered.length).padStart(2, "0")} found / page {page} of {pageCount}</span></div><div className="notes-filters"><label className="notes-search"><Search size={15} /><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Search issues" aria-label="Search newsletter issues" />{query && <button onClick={() => updateQuery("")} aria-label="Clear search">×</button>}</label><div className="notes-filter-tabs" role="tablist" aria-label="Filter newsletter issues">{issueTypes.map((item) => <button key={item} className={type === item ? "active" : ""} onClick={() => updateType(item)}>{item}</button>)}</div></div><div className="issue-list">{visible.length ? visible.map((issue) => <Link href={`/notes/${issue.slug}`} className="issue-row" key={issue.slug}><span className="issue-number">{issue.number}</span><div><span className="note-type">{issue.type} — {issue.date}</span><h3>{issue.title}</h3><p>{issue.excerpt}</p></div><span className="issue-meta"><Clock3 size={14} /> {issue.time}</span><ArrowRight className="issue-arrow" size={18} /></Link>) : <div className="archive-empty">No Notes match this search.</div>}</div>{pageCount > 1 && <div className="notes-pagination"><button disabled={page === 1} onClick={() => setPage((value) => value - 1)}>← Previous</button><span>{String(page).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span><button disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>Next →</button></div>}</section><div className="notes-back"><Link href="/"><ArrowLeft size={14} /> back to studio</Link></div></div>; }

export function NotesIssue() { const [, params] = useRoute("/notes/:slug"); const issue = issues.find((item) => item.slug === params?.slug); if (!issue) return <div className="not-found-page"><p className="eyebrow">404 — NOT FOUND</p><h1>That note<br /><em>is quiet.</em></h1><Link href="/notes" className="primary-button">Back to Notes <ArrowRight size={15} /></Link></div>; return <article className="note-article"><Link href="/notes" className="article-back"><ArrowLeft size={14} /> Notes / Newsletter</Link><header><span className="note-type">{issue.type} — {issue.date}</span><h1>{issue.title}</h1><p className="article-deck">{issue.excerpt}</p><div className="article-meta"><span><Clock3 size={14} /> {issue.time}</span><span>Quiet Studio Notes</span></div></header><div className="article-body">{issue.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="article-callout">“The best systems do not ask to be noticed. They make the next useful thing easier to do.”</div><p>Thanks for reading Notes. The next issue will arrive when there is something useful to say.</p></div></article>; }
