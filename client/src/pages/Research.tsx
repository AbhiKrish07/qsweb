import { ArrowLeft, ArrowRight, Clock3, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";

const essays = [
  { slug: "interface-as-reflex", number: "01", type: "ESSAY", date: "06.09.26", title: "When AI stops feeling like AI.", deck: "The next interface is not a chat window. It is the moment the system understands what you meant before you explain it.", read: "7 min read", body: ["The most powerful tools still make people learn their language before they can get anything done. That is the wrong direction. Capability should move closer to instinct, not demand a new ceremony.", "At Quiet Studio, we are researching interfaces that know when to act, when to ask, and when to leave you alone. The goal is not invisible software for its own sake. It is software with enough judgment to make its own presence feel proportional.", "A good system should reduce the number of things you have to hold in your head. It should make a decision feel lighter, not add another dashboard to monitor."] },
  { slug: "less-software", number: "02", type: "FIELD NOTE", date: "28.08.26", title: "The case for building less software.", deck: "Why the best product might be the layer you stop noticing first.", read: "5 min read", body: ["The instinct to add features is understandable: a roadmap is easier to explain when it keeps getting longer. But usefulness rarely comes from volume. It comes from reducing the distance between intention and outcome.", "A smaller product can have a stronger point of view. It can say no with confidence. It can make the important path feel inevitable.", "This is our shipping rule for a studio of one: build one useful thing, make it feel obvious, then let the signal decide what comes next."] },
  { slug: "one-useful-thing", number: "03", type: "LOG", date: "14.08.26", title: "What one useful thing looks like.", deck: "A working definition of quiet progress.", read: "4 min read", body: ["One useful thing is specific enough to use today and opinionated enough to remember tomorrow. It solves a real problem and leaves the rest of the roadmap alone until the signal is clear.", "Research is not a performance of certainty. It is a way to make better questions visible. Every concept in the archive is an invitation to test a premise in public."] },
];

function ResearchIndex() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => essays.filter((essay) => `${essay.title} ${essay.type} ${essay.deck}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="research-page"><section className="research-hero"><div className="section-marker">[ 04 — THE RESEARCH JOURNAL ]</div><h1>Questions<br /><em>in public.</em></h1><p>Research notes, field logs, and working essays from the edge of effortless technology.</p><div className="research-rule" /></section><section className="research-index"><div className="research-index-head"><div><span className="section-marker">[ INDEX — 2026 ]</span><h2>Read the<br /><em>thinking.</em></h2></div><label className="archive-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search journal" aria-label="Search research journal" /></label></div><div className="research-list">{results.map((essay) => <Link href={`/research/${essay.slug}`} className="research-row" key={essay.slug}><span className="research-number">{essay.number}</span><div><span className="note-type">{essay.type} — {essay.date}</span><h3>{essay.title}</h3><p>{essay.deck}</p></div><span className="research-read">{essay.read} <ArrowRight size={15} /></span></Link>)}</div></section></div>;
}

function ResearchArticle() {
  const [, params] = useRoute("/research/:slug");
  const essay = essays.find((item) => item.slug === params?.slug);
  if (!essay) return <div className="not-found-page"><p className="eyebrow">404 — NOT FOUND</p><h1>That note<br /><em>is quiet.</em></h1><Link href="/research" className="primary-button">Back to journal <ArrowRight size={15} /></Link></div>;
  return <article className="research-article"><Link href="/research" className="article-back"><ArrowLeft size={14} /> research journal</Link><header><span className="note-type">{essay.type} — {essay.date}</span><h1>{essay.title}</h1><p className="article-deck">{essay.deck}</p><div className="article-meta"><span><Clock3 size={14} /> {essay.read}</span><span>Quiet Studio / Research</span></div></header><div className="article-body">{essay.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="article-callout">“The best systems do not ask to be noticed. They make the next useful thing easier to do.”</div><p>We are still learning what that looks like in practice. The archive stays open because the questions are part of the work.</p></div></article>;
}

export default function Research() { return <ResearchIndex />; }
export { ResearchArticle };
