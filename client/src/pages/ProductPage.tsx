import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Github, MoveUpRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { getCategoryLabel, getProduct, products } from "@/lib/products";
import { ProductVisual } from "./Home";
import { toast } from "sonner";

function BetaForm({ productName }: { productName: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Enter a valid email address.");
      return;
    }
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, page: `Product - ${productName}`, target: "glexionstriker@gmail.com" }),
      });
    } catch {
      /* fallback */
    }
    setSubmitted(true);
    toast(`Request sent to glexionstriker@gmail.com! You’re on the ${productName} list.`);
  };
  if (submitted) return <div className="beta-success"><Check size={15} /> You’re on the signal.</div>;
  return <form className="beta-form" onSubmit={submit}><input aria-label={`${productName} beta email`} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" type="email" /><button type="submit">Request access <MoveUpRight size={14} /></button></form>;
}

export default function ProductPage() {
  const [, params] = useRoute("/products/:slug");
  const product = getProduct(params?.slug ?? "");
  if (!product) return <div className="not-found-page"><p className="eyebrow">404 — NOT FOUND</p><h1>That idea<br /><em>moved on.</em></h1><Link href="/" className="primary-button">Back to studio <ArrowRight size={15} /></Link></div>;
  const currentIndex = products.findIndex((item) => item.slug === product.slug);
  const nextProduct = products[(currentIndex + 1) % products.length];
  const isOSS = product.category === "open-source";
  const repoUrl = "https://github.com/AbhiKrish07";

  return <div className="product-page">
    <div className="product-breadcrumb"><Link href="/"><ArrowLeft size={14} /> all projects</Link><span>—</span><span>{getCategoryLabel(product.category)}</span></div>
    <section className={`product-hero product-hero-${product.color}`}><div className="product-hero-copy"><p className="eyebrow"><span className="pulse-dot" /> {product.index} — {product.status}</p><h1>{product.name}<span className="orange-period">.</span></h1><p className="product-kicker">{product.kicker}</p><p className="product-description">{product.description}</p><div className="product-hero-actions">{isOSS ? <a className="primary-button" href={repoUrl} target="_blank" rel="noreferrer">View repository <Github size={15} /></a> : <BetaForm productName={product.name} />}<span className="product-hero-note">{isOSS ? "Public source / MIT license" : "A quiet note when it’s ready."}</span></div></div><div className="product-hero-visual"><ProductVisual product={product} /></div><div className="hero-scroll-label">PRODUCT — {product.index}</div></section>

    <section className="product-details"><div className="detail-stat"><span className="meta-label">Signal</span><strong>{product.metric}</strong><span>{product.metricLabel}</span></div><div className="detail-intro"><span className="section-marker">[ THE WHY ]</span><h2>{product.oneLiner}</h2></div><div className="detail-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
    <section className="problem-section"><div className="section-marker">[ THE PROBLEM ]</div><div className="problem-layout"><p className="problem-quote">“{product.problem}”</p><div className="approach-copy"><span className="meta-label">Our approach</span><p>{product.approach}</p></div></div></section>
    <section className="principles-section"><div className="section-heading compact-heading"><div><div className="section-marker">[ THE DETAILS ]</div><h2>Designed to<br /><em>disappear.</em></h2></div><span className="principles-index">{product.index} — 03</span></div><div className="principles-list">{product.bullets.map((bullet, index) => <div className="principle-row" key={bullet}><span>0{index + 1}</span><p>{bullet}</p><Check size={16} /></div>)}</div></section>
    <section className="product-cta"><div><span className="section-marker">[ KEEP IN THE LOOP ]</span><h2>Make room<br /><em>for the useful.</em></h2></div>{isOSS ? <a className="outline-button" href={repoUrl} target="_blank" rel="noreferrer">Open {product.name} on GitHub <Github size={14} /></a> : <BetaForm productName={product.name} />}</section>
    <section className="next-product"><div><span className="section-marker">[ KEEP EXPLORING ]</span><p>Next up</p><Link href={`/products/${nextProduct.slug}`}><h2>{nextProduct.name}<span className="orange-period">.</span></h2><ArrowRight size={25} /></Link></div><div className="next-mini-visual"><ProductVisual product={nextProduct} compact /></div></section>
  </div>;
}
