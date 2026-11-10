'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Layers,
  Sparkles,
  BarChart3,
  Sliders,
  Users,
  Compass,
  Zap,
} from 'lucide-react';
import AdsideCarousel from './AdsideCarousel';
import './AdsideSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Platform SVGs for Meta, Google, LinkedIn, Reddit, X (Twitter), TikTok
function MetaIcon() {
  return (
    <svg className="adside-plat-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15.36c-1.53 0-2.88-.93-3.72-2.34-1.1-1.85-2.61-3.02-4.28-3.02C2.01 10 1 11.23 1 12.86c0 2.11 1.7 3.84 3.82 3.84 1.76 0 3.32-.88 4.34-2.26.43-.58.82-.9 1.14-.9.32 0 .71.32 1.14.9 1.02 1.38 2.58 2.26 4.34 2.26 2.12 0 3.82-1.73 3.82-3.84 0-1.63-1.01-2.86-3-2.86-1.67 0-3.18 1.17-4.28 3.02-.84 1.41-2.19 2.34-3.72 2.34zm0-2.52c.98 0 1.95-.7 2.76-2.07 1.08-1.82 2.62-2.77 4.24-2.77 2.95 0 4.9 1.9 4.9 4.86 0 3.2-2.65 5.84-5.9 5.84-2.16 0-4.08-1.08-5.26-2.78-.32-.46-.53-.66-.74-.66-.21 0-.42.2-.74.66-1.18 1.7-3.1 2.78-5.26 2.78-3.25 0-5.9-2.64-5.9-5.84 0-2.96 1.95-4.86 4.9-4.86 1.62 0 3.16.95 4.24 2.77.81 1.37 1.78 2.07 2.76 2.07z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="adside-plat-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.24 10.285V13.4h6.887C18.2 16.14 15.645 18 12.24 18c-3.315 0-6-2.685-6-6s2.685-6 6-6c1.64 0 3.125.66 4.22 1.735l2.4-2.4C17.185 3.65 14.87 2.7 12.24 2.7 7.14 2.7 3 6.84 3 11.94s4.14 9.24 9.24 9.24c5.335 0 8.875-3.75 8.875-9.035 0-.61-.06-1.21-.17-1.78H12.24z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="adside-plat-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg className="adside-plat-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.8.48 3.49 1.32 4.96l-.88 3.24 3.32-.87C7.2 20.18 9.5 21 12 21c5.52 0 10-4.48 10-10S17.52 2 12 2zm6.2 11.5c-.3 0-.58-.1-.81-.28-.86.6-1.99.98-3.24 1.02l.66-3.1 2.16.46a1.27 1.27 0 1 0 .23-.6l-2.48-.52a.29.29 0 0 0-.34.22l-.78 3.66c-1.28-.04-2.45-.43-3.33-1.04a1.29 1.29 0 1 0-1.44 1.76c.01.24.06.47.16.69 0 1.69 2.1 3.06 4.7 3.06s4.7-1.37 4.7-3.06c.1-.22.15-.45.16-.69.45-.25.74-.72.74-1.26a1.3 1.3 0 0 0-1.14-1.32z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="adside-plat-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="adside-plat-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5 2.592 2.592 0 0 1-2.59-2.5 2.592 2.592 0 0 1 2.59-2.5c.34 0 .67.06.97.18v-3.2a5.79 5.79 0 0 0-.97-.08 5.79 5.79 0 0 0-5.79 5.6 5.79 5.79 0 0 0 5.79 5.6 5.79 5.79 0 0 0 5.79-5.6V9.45a7.35 7.35 0 0 0 4.45 1.5V7.8a4.27 4.27 0 0 1-3.5-1.98z" />
    </svg>
  );
}

function AdsideLogoMark() {
  return (
    <svg className="adside-logo-icon" viewBox="0 0 28 28" fill="none">
      <path d="M6 4h8a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10H6V4z" fill="#000000" />
      <path d="M10 9h4a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-4V9z" fill="#ffffff" />
    </svg>
  );
}

export default function AgencySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'research' | 'brief' | 'analytics' | 'operations' | 'teams'>('research');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleOpenContact = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
    }
  };

  // GSAP Scroll Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero text fade-in
      gsap.fromTo(
        '.adside-hero-title',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.adside-platforms-row',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: 'back.out(1.5)' }
      );

      gsap.fromTo(
        '.adside-hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power2.out' }
      );

      // 2. Parallax floating cards in Section 1 (Impact)
      gsap.fromTo(
        '.flank-tl-wrap',
        { y: 60, rotate: -15, opacity: 0 },
        {
          y: -10,
          rotate: -10,
          opacity: 1,
          scrollTrigger: {
            trigger: '.adside-impact-section',
            start: 'top 80%',
            end: 'center 45%',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        '.flank-tr-wrap',
        { y: 70, rotate: 16, opacity: 0 },
        {
          y: 0,
          rotate: 10,
          opacity: 1,
          scrollTrigger: {
            trigger: '.adside-impact-section',
            start: 'top 80%',
            end: 'center 45%',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        '.flank-bl-wrap',
        { y: 40, rotate: -10, opacity: 0 },
        {
          y: 0,
          rotate: -6,
          opacity: 1,
          scrollTrigger: {
            trigger: '.adside-impact-section',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        '.flank-br-wrap',
        { y: 50, rotate: 12, opacity: 0 },
        {
          y: 0,
          rotate: 7,
          opacity: 1,
          scrollTrigger: {
            trigger: '.adside-impact-section',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1.2,
          },
        }
      );

      // 3. Stickers entrance in Unified Hub Section
      gsap.fromTo(
        '.adside-sticker',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: {
            each: 0.04,
            from: 'random',
          },
          duration: 0.55,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.adside-hub-section',
            start: 'top 75%',
          },
        }
      );

      // Idle floating animation on stickers
      gsap.to('.adside-sticker', {
        y: '+=7',
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.15,
          from: 'random',
        },
      });

      // 4. Feature Cards Scroll Reveal
      gsap.fromTo(
        '.adside-feature-card',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.adside-cards-grid',
            start: 'top 85%',
          },
        }
      );

      // 5. Pricing Cards Lift
      gsap.fromTo(
        '.adside-price-card-maroon, .adside-price-card-white',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.adside-pricing-grid',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Features content based on active tab
  const featureContent = {
    research: {
      headline: 'Research your market in minutes',
      cards: [
        {
          icon: '/assets/icons/feat-strategy.svg',
          title: 'Competitor Ad Boards',
          desc: 'Track any competitor and pull their live ads into one board. We tell you when they launch something new.',
        },
        {
          icon: '/assets/icons/feat-globe.svg',
          title: 'Social Media Monitoring',
          desc: 'We watch X, Reddit and G2 so you know what the market is saying, and which angles your competitors are testing.',
        },
        {
          icon: '/assets/icons/feat-orbit.svg',
          title: 'Competitor Discovery',
          desc: 'Not sure who to watch? Adside finds the competitors that matter in your niche and tracks them for you.',
        },
      ],
    },
    brief: {
      headline: 'Generate high-impact ad briefs in seconds',
      cards: [
        {
          icon: '/assets/icons/feat-strategy.svg',
          title: 'AI Brand Kit Sync',
          desc: 'Automatically ingest your fonts, color hexes, typography rules, and logos into persistent agent context.',
        },
        {
          icon: '/assets/icons/feat-globe.svg',
          title: 'Hook & Script Generation',
          desc: 'Generate 10+ validated script hooks per minute tuned for short-form TikTok and Instagram Reels.',
        },
        {
          icon: '/assets/icons/feat-orbit.svg',
          title: 'Visual Angle Diversity',
          desc: 'Avoid creative fatigue by generating 3D renders, founder UGC, user tweets, and editorial layouts.',
        },
      ],
    },
    analytics: {
      headline: 'Deep creative telemetry without spreadsheets',
      cards: [
        {
          icon: '/assets/icons/feat-strategy.svg',
          title: 'Fatigue Alerts & Detection',
          desc: 'Real-time notifications when a winning creative begins to decay so you rotate replacements before CPA spikes.',
        },
        {
          icon: '/assets/icons/feat-globe.svg',
          title: 'Blended MER & ROAS Modeling',
          desc: 'Holistic cross-platform attribution combining Meta, Google, and LinkedIn without platform bias.',
        },
        {
          icon: '/assets/icons/feat-orbit.svg',
          title: 'Winning Element Breakdown',
          desc: 'Discover whether your headline, intro clip, or color scheme drove the highest conversion lift.',
        },
      ],
    },
    operations: {
      headline: 'Autonomous campaign management & rotation',
      cards: [
        {
          icon: '/assets/icons/feat-strategy.svg',
          title: 'Automated Creative Swaps',
          desc: 'Allow Adside agents to automatically rotate new ad creatives into active ad sets while preserving learning phase.',
        },
        {
          icon: '/assets/icons/feat-globe.svg',
          title: 'Multi-Channel Resizing',
          desc: 'Convert any static or video asset across 9:16, 1:1, 4:5, and 16:9 aspect ratios with smart safe zones.',
        },
        {
          icon: '/assets/icons/feat-orbit.svg',
          title: 'Budget Reallocation Rules',
          desc: 'Shift spend toward top-performing ad angles automatically within your target cost-per-acquisition caps.',
        },
      ],
    },
    teams: {
      headline: 'Built for agencies and high-velocity marketing squads',
      cards: [
        {
          icon: '/assets/icons/feat-strategy.svg',
          title: 'Multi-Brand Workspaces',
          desc: 'Switch between client accounts with discrete permissions, isolated brand kits, and shared creative brains.',
        },
        {
          icon: '/assets/icons/feat-globe.svg',
          title: 'Slack Agent Bot & MCP',
          desc: 'Draft campaigns, check CAC, and generate ad variations straight inside your team Slack channels.',
        },
        {
          icon: '/assets/icons/feat-orbit.svg',
          title: 'Client Share Links',
          desc: 'Send interactive preview links where clients can review and approve new ad drops in one click.',
        },
      ],
    },
  };

  const currentTab = featureContent[activeTab];

  const faqs = [
    {
      q: 'Which ad platforms does Adside support?',
      a: 'Adside natively connects with Meta (Facebook & Instagram), Google Ads (Search, YouTube & Performance Max), LinkedIn Ads, Reddit Ads, X (Twitter), and TikTok Ads.',
    },
    {
      q: 'How does the AI create ad creatives?',
      a: 'Adside analyzes your brand guidelines, past ad performance, and live competitor boards. It then generates high-converting static creatives, motion banners, and video hooks complete with copy and visual layers.',
    },
    {
      q: 'What is the difference between AI Agency and Managed Service?',
      a: 'The AI Agency plan ($290/month) gives your team complete access to the autonomous agent platform and creative tools. The Managed Service ($3,500/month) includes the software plus a vetted human growth expert who runs the campaigns for you.',
    },
    {
      q: 'How do you handle attribution and tracking?',
      a: 'We use server-side tracking, clean UTM hygiene, and blended MER/ROAS telemetry to eliminate cross-platform attribution bias and report truthful conversion figures.',
    },
    {
      q: 'Can I integrate Adside with Slack or Claude Code?',
      a: 'Yes. Adside includes a dedicated Slack Agent bot for conversational campaign commands, plus full Model Context Protocol (MCP) support for Claude Code and Cursor.',
    },
  ];

  return (
    <div className="adside-page" ref={containerRef}>
      {/* =========================================================================
          FLOATING NAVBAR PILL (Screenshot 1)
          ========================================================================= */}
      <div className="adside-nav-wrapper">
        <header className="adside-nav-pill">
          <a href="#" className="adside-logo-group">
            <AdsideLogoMark />
            <span className="adside-logo-text">Adside</span>
          </a>

          <nav className="adside-nav-links">
            <a href="#features" className="adside-nav-link">Features</a>
            <a href="#managed" className="adside-nav-link">Managed service</a>
            <a href="#pricing" className="adside-nav-link">Pricing</a>
            <a href="#founders" className="adside-nav-link">Blog</a>
            <a href="#faq" className="adside-nav-link">Free tools</a>
          </nav>

          <div className="adside-nav-actions">
            <a href="#pricing" className="adside-nav-login">Log in</a>
            <button type="button" className="adside-nav-btn" onClick={handleOpenContact}>
              Get Started
            </button>
          </div>
        </header>
      </div>

      {/* =========================================================================
          SECTION 0: HERO (Screenshot 1)
          ========================================================================= */}
      <section className="adside-hero-section">
        <div className="adside-hero-content">
          <h1 className="adside-hero-title">
            A team of specialized AI agents that manage{' '}
            <span className="adside-hero-sel">
              <span className="adside-sel-corner tl" />
              <span className="adside-sel-corner tr" />
              <span className="adside-sel-corner bl" />
              <span className="adside-sel-corner br" />
              paid ads
              <span className="adside-hero-caret" />
            </span>{' '}
            for you
          </h1>

          {/* Platform icons row: Meta, Google, LinkedIn, Reddit, X, TikTok */}
          <div className="adside-platforms-row" aria-label="Supported Platforms">
            <MetaIcon />
            <GoogleIcon />
            <LinkedInIcon />
            <RedditIcon />
            <XIcon />
            <TikTokIcon />
          </div>

          <p className="adside-hero-subtitle">
            An AI team that researches your market, drafts a strategy, creates static and video ads, monitors your accounts,
            rotates creatives, and much more. Managed by you, or by one of our human experts.
          </p>

          <button type="button" className="adside-hero-btn" onClick={handleOpenContact}>
            Get Started
          </button>
        </div>

        {/* 1:1 Fisheye WebGL Canvas Carousel with 12 Ad Creatives */}
        <div className="adside-hero-carousel-wrap">
          <AdsideCarousel />
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: IMPACT STATEMENT (Screenshot 2)
          ========================================================================= */}
      <section className="adside-impact-section">
        {/* Floating Card Top-Left: Chat Preview */}
        <div className="adside-flank-card flank-tl-wrap">
          <img src="/assets/carousel/2.jpg" alt="Fatiguing Ad Refreshed" className="flank-tl-thumb" />
          <div className="flank-tl-pill">
            <span>Refreshed a Fatiguing Ad</span>
            <span className="flank-metric-green">+$1,234</span>
          </div>
        </div>

        {/* Floating Card Top-Right: Drink Can */}
        <div className="adside-flank-card flank-tr-wrap">
          <img src="/assets/carousel/4.jpg" alt="Bulk Imported Creatives" className="flank-tr-thumb" />
          <div className="flank-tl-pill">
            <span>Bulk Imported 50 Creatives</span>
            <span className="flank-metric-green">+$4,120</span>
          </div>
        </div>

        {/* Floating Card Bottom-Left: Badge Lanyard */}
        <div className="adside-flank-card flank-bl-wrap">
          <img src="/assets/carousel/6.jpg" alt="Meet your new paid ads manager" className="flank-bl-thumb" />
          <div style={{ textAlign: 'left', marginBottom: '8px' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#60a5fa', fontWeight: 700 }}>Adside</span>
            <p style={{ margin: '2px 0 8px', fontSize: '12px', fontWeight: 600 }}>Meet your new paid ads manager.</p>
          </div>
          <button type="button" className="flank-bl-btn" onClick={handleOpenContact}>
            Book a demo →
          </button>
        </div>

        {/* Floating Card Bottom-Right: Founders */}
        <div className="adside-flank-card flank-br-wrap">
          <img
            src="/assets/adside-founders-robin-guillaume.webp"
            alt="Adside Founders Robin & Guillaume"
            className="flank-br-thumb"
          />
          <p className="flank-br-caption">We like meeting people who run ads.</p>
          <a href="#founders" className="flank-br-link">
            Learn more →
          </a>
        </div>

        <div className="adside-impact-container">
          <h2 className="adside-impact-text">
            Startups and brands use Adside to turn paid ads into a profitable, scalable, predictable channel. AI agency, or
            done-for-you.
          </h2>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FEATURES SUITE (Screenshot 3)
          ========================================================================= */}
      <section className="adside-features-section" id="features">
        <div className="adside-features-container">
          <h2 className="adside-features-title">Everything you need to make great ads, faster</h2>

          <div className="adside-tabs-bar">
            <button
              type="button"
              className={`adside-tab-btn ${activeTab === 'research' ? 'active' : ''}`}
              onClick={() => setActiveTab('research')}
            >
              Research
            </button>
            <button
              type="button"
              className={`adside-tab-btn ${activeTab === 'brief' ? 'active' : ''}`}
              onClick={() => setActiveTab('brief')}
            >
              Brief &amp; Brand
            </button>
            <button
              type="button"
              className={`adside-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Creative Analytics
            </button>
            <button
              type="button"
              className={`adside-tab-btn ${activeTab === 'operations' ? 'active' : ''}`}
              onClick={() => setActiveTab('operations')}
            >
              Ad Operations
            </button>
            <button
              type="button"
              className={`adside-tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
              onClick={() => setActiveTab('teams')}
            >
              Built for Teams
            </button>
          </div>

          <h3 className="adside-tab-subhead">{currentTab.headline}</h3>

          <div className="adside-cards-grid">
            {currentTab.cards.map((card, i) => (
              <div key={i} className="adside-feature-card">
                <div className="adside-card-icon-squircle">
                  <img src={card.icon} alt="" />
                </div>
                <h4 className="adside-card-title">{card.title}</h4>
                <p className="adside-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: UNIFIED HUB (Screenshot 4)
          ========================================================================= */}
      <section className="adside-hub-section" id="hub">
        <div className="adside-hub-container">
          <h2 className="adside-hub-title">Every brand's ads, in one place</h2>
          <p className="adside-hub-subtitle">
            Paid ads used to be complex and scattered. Use Adside to manage all your different platforms in one place, and
            replace all your other tools.
          </p>

          <div className="adside-hub-canvas-wrap">
            {/* Scattered Physics Stickers matching Screenshot 4 */}
            <span className="adside-sticker stk-client-updates">CLIENT UPDATES</span>
            <span className="adside-sticker stk-top-creatives">TOP CREATIVES</span>
            <span className="adside-sticker stk-spy-competitors">SPY COMPETITORS</span>
            <span className="adside-sticker stk-shared-brain">SHARED BRAIN</span>
            <span className="adside-sticker stk-share-links">SHARE LINKS</span>
            <span className="adside-sticker stk-ad-rotation">AD ROTATION</span>
            <span className="adside-sticker stk-dashboards">DASHBOARDS</span>
            <span className="adside-sticker stk-social-listening">SOCIAL LISTENING</span>
            <span className="adside-sticker stk-ad-creative">AD CREATIVE</span>
            <span className="adside-sticker stk-brand-kits">BRAND KITS</span>
            <span className="adside-sticker stk-unlimited-briefs">UNLIMITED BRIEFS</span>
            <span className="adside-sticker stk-bulk-uploads">BULK UPLOADS</span>
            <span className="adside-sticker stk-routines">ROUTINES</span>

            {/* Dashboard Mockup */}
            <div className="adside-dashboard-window">
              <aside className="adside-dash-sidebar">
                <div className="adside-dash-brand">
                  <AdsideLogoMark />
                  <span>Adside</span>
                </div>
                <div className="adside-brand-selector">
                  <span style={{ background: '#0144f5', color: '#fff', borderRadius: '4px', padding: '2px 6px', fontWeight: 700 }}>A</span>
                  <span>Adside · 1 brand kit</span>
                </div>
                <div className="adside-dash-nav">
                  <div className="adside-dash-nav-item active">Chats</div>
                  <div className="adside-dash-nav-item">Products ▸</div>
                  <div className="adside-dash-nav-item">Dashboards ▸</div>
                  <div className="adside-dash-nav-item">Library ▸</div>
                  <div className="adside-dash-nav-item">Settings ▸</div>
                </div>
              </aside>

              <main className="adside-dash-main">
                <div className="adside-chat-user">
                  Please create a new retargeting campaign for me on Meta, Google and LinkedIn
                </div>

                <div className="adside-chat-agent-block">
                  <div className="adside-agent-status">
                    <Check size={14} /> Checked my context ×3
                  </div>

                  <div className="adside-agent-calls">
                    <div className="adside-agent-call-row">
                      <span style={{ color: '#0144F5', fontWeight: 700 }}>∞</span> Called the Meta Agent
                    </div>
                    <div className="adside-agent-call-row">
                      <span style={{ color: '#EA4335', fontWeight: 700 }}>G</span> Called the Google Ads Agent
                    </div>
                    <div className="adside-agent-call-row">
                      <span style={{ color: '#0A66C2', fontWeight: 700 }}>in</span> Called the LinkedIn Agent
                    </div>
                  </div>

                  <p className="adside-agent-text">
                    Done, one retargeting campaign per platform, drafted from your <strong>pixel and customer lists</strong>:
                    warm audiences on Meta, search remarketing on Google, matched audiences on LinkedIn.
                  </p>

                  <div className="adside-agent-plan-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>📄</span>
                      <div>
                        <strong style={{ fontSize: '14px', display: 'block' }}>Retargeting launch plan · Meta, Google, LinkedIn</strong>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>Open in the right-side editor →</span>
                      </div>
                    </div>
                    <span style={{ background: '#f3f4f6', color: '#374151', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px' }}>
                      Draft ↗
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
                    SUGGESTED · 3 &nbsp; <strong>01 Review the audiences for each platform →</strong>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: COMPARISON ("Before & after Adside")
          ========================================================================= */}
      <section className="adside-comparison-section">
        <div className="adside-comp-container">
          <h2 className="adside-comp-title">Before &amp; after Adside</h2>

          <div className="adside-comp-grid">
            <div className="adside-comp-card before">
              <span className="adside-comp-tag">Before Adside</span>
              <h3 className="adside-comp-heading">Fragmented, slow, and expensive</h3>
              <ul className="adside-comp-list">
                <li className="adside-comp-item">
                  <span style={{ color: '#ef4444' }}>✕</span>
                  <span>Logging into 5 separate ad dashboards daily with disparate reporting</span>
                </li>
                <li className="adside-comp-item">
                  <span style={{ color: '#ef4444' }}>✕</span>
                  <span>Creative fatigue hits while designers take days to turn around new variations</span>
                </li>
                <li className="adside-comp-item">
                  <span style={{ color: '#ef4444' }}>✕</span>
                  <span>Hours spent manually resizing creatives across 9:16, 1:1, and 4:5 ratios</span>
                </li>
                <li className="adside-comp-item">
                  <span style={{ color: '#ef4444' }}>✕</span>
                  <span>Blind competitor guesswork without real-time ad tracking</span>
                </li>
                <li className="adside-comp-item">
                  <span style={{ color: '#ef4444' }}>✕</span>
                  <span>Paying $8,000+/month for traditional agency retainer fees</span>
                </li>
              </ul>
            </div>

            <div className="adside-comp-card after">
              <span className="adside-comp-tag">With Adside</span>
              <h3 className="adside-comp-heading">Autonomous, unified, and high ROI</h3>
              <ul className="adside-comp-list">
                <li className="adside-comp-item">
                  <span style={{ color: '#0144F5' }}>✓</span>
                  <span>Single unified control hub managing Meta, Google, LinkedIn, X and TikTok</span>
                </li>
                <li className="adside-comp-item">
                  <span style={{ color: '#0144F5' }}>✓</span>
                  <span>AI agents generate static &amp; video ad variations in seconds matching your brand kit</span>
                </li>
                <li className="adside-comp-item">
                  <span style={{ color: '#0144F5' }}>✓</span>
                  <span>Automated multi-format resizing with smart focal-point preservation</span>
                </li>
                <li className="adside-comp-item">
                  <span style={{ color: '#0144F5' }}>✓</span>
                  <span>Live spy boards tracking all competitor launches, hooks, and landing pages</span>
                </li>
                <li className="adside-comp-item">
                  <span style={{ color: '#0144F5' }}>✓</span>
                  <span>Predictable monthly plans starting at $290/mo or fully managed service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TOOL REPLACEMENT ("One tool instead of five")
          ========================================================================= */}
      <section className="adside-replace-section">
        <div className="adside-replace-container">
          <h2 className="adside-replace-title">One tool instead of five</h2>
          <p className="adside-replace-subtitle">Adside replaces your entire stack of expensive single-purpose point solutions.</p>

          <div className="adside-replace-rows">
            <div className="adside-replace-row">
              <span className="replace-tool-old">Motion (Creative Analytics)</span>
              <span className="replace-arrow">→</span>
              <span className="replace-tool-adside">
                <Check size={16} color="#0144F5" /> Adside Creative Telemetry
              </span>
            </div>

            <div className="adside-replace-row">
              <span className="replace-tool-old">Foreplay (Ad Swipe Files &amp; Spy)</span>
              <span className="replace-arrow">→</span>
              <span className="replace-tool-adside">
                <Check size={16} color="#0144F5" /> Adside Competitor Ad Boards
              </span>
            </div>

            <div className="adside-replace-row">
              <span className="replace-tool-old">Jasper / Copy.ai (Ad Copywriting)</span>
              <span className="replace-arrow">→</span>
              <span className="replace-tool-adside">
                <Check size={16} color="#0144F5" /> Adside Autonomous Copy Agents
              </span>
            </div>

            <div className="adside-replace-row">
              <span className="replace-tool-old">Smartly.io (Automated Workflows)</span>
              <span className="replace-arrow">→</span>
              <span className="replace-tool-adside">
                <Check size={16} color="#0144F5" /> Adside Cross-Channel Engine
              </span>
            </div>

            <div className="adside-replace-row">
              <span className="replace-tool-old">AdEspresso (Multi-Channel Ops)</span>
              <span className="replace-arrow">→</span>
              <span className="replace-tool-adside">
                <Check size={16} color="#0144F5" /> Adside Unified Command Hub
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: PRICING (Screenshot 5)
          ========================================================================= */}
      <section className="adside-pricing-section" id="pricing">
        <div className="adside-pricing-container">
          <h2 className="adside-pricing-title">Simple, transparent pricing</h2>
          <p className="adside-pricing-subtitle">Run it yourself, or have us run it for you.</p>

          <div className="adside-pricing-grid">
            {/* Left Card: AI Agency (Deep Maroon #390507, Pale Pink #FFD5F3) */}
            <div className="adside-price-card-maroon">
              <div>
                <h3 className="price-tier-name">AI Agency</h3>
                <p className="price-tier-desc">
                  A team of agents that run your ads on Google, Meta, LinkedIn, Reddit and Twitter.
                </p>

                <div className="price-billing-label">Per brand, per month</div>
                <div className="price-amount">$290</div>
                <div className="price-subtext">billed monthly, or $190/mo with annual prepay</div>

                <ul className="price-features-list">
                  <li>
                    <Check size={16} color="#FFD5F3" />
                    <span>AI static and video ads, with $100 of creative credits included monthly</span>
                  </li>
                  <li>
                    <Check size={16} color="#FFD5F3" />
                    <span>Claude Code and ChatGPT integration and MCP</span>
                  </li>
                  <li>
                    <Check size={16} color="#FFD5F3" />
                    <span>Competitor research and ad library</span>
                  </li>
                  <li>
                    <Check size={16} color="#FFD5F3" />
                    <span>Top creative reports</span>
                  </li>
                  <li>
                    <Check size={16} color="#FFD5F3" />
                    <span>Slack Agent</span>
                  </li>
                  <li>
                    <Check size={16} color="#FFD5F3" />
                    <span>Unlimited users</span>
                  </li>
                </ul>
              </div>

              <button type="button" className="adside-price-btn-white" onClick={handleOpenContact}>
                <span>Get Started</span>
                <span className="adside-btn-arrow-icon">→</span>
              </button>
            </div>

            {/* Right Card: Managed Service (Crisp White Card) */}
            <div className="adside-price-card-white">
              <div>
                <h3 className="price-tier-name">Managed service</h3>
                <p className="price-tier-desc">
                  Your AI agency, plus an expert human from our network to manage it. The best of both worlds!
                </p>

                <div className="price-billing-label">Starting at</div>
                <div className="price-amount">
                  $3,500<span>/month</span>
                </div>
                <div className="price-subtext">10% of your ad spend, with a $3,500 monthly minimum</div>

                <ul className="price-features-list">
                  <li>
                    <Check size={16} className="price-check-blue" />
                    <span>Everything from the AI Agency</span>
                  </li>
                  <li>
                    <Check size={16} className="price-check-blue" />
                    <span>A dedicated expert from our network manages your accounts and agents for you</span>
                  </li>
                  <li>
                    <Check size={16} className="price-check-blue" />
                    <span>Direct Slack, email and phone access</span>
                  </li>
                  <li>
                    <Check size={16} className="price-check-blue" />
                    <span>Weekly reports from your expert</span>
                  </li>
                </ul>
              </div>

              <button type="button" className="adside-price-btn-black" onClick={handleOpenContact}>
                <span>Discover the managed service</span>
                <span className="adside-btn-arrow-icon blue">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FOUNDERS ("A word from the founders")
          ========================================================================= */}
      <section className="adside-founders-section" id="founders">
        <div className="adside-founders-container">
          <div className="adside-founders-img-wrap">
            <img
              src="/assets/adside-founders-robin-guillaume.webp"
              alt="Robin & Guillaume, Co-founders of Adside"
              className="adside-founders-img"
            />
          </div>

          <div className="adside-founders-content">
            <span className="adside-founders-label">A word from the founders</span>
            <h3 className="adside-founders-quote">
              "We spent years managing millions in ad spend at scale. We built Adside because we were tired of doing the
              same tedious tasks across five different dashboards."
            </h3>
            <p className="adside-founders-body">
              Paid acquisition shouldn't require an army of junior media buyers to adjust budgets, crop images, and check
              comment sections. Adside gives you the speed and 24/7 focus of AI agents backed by the seasoned judgment of top
              operators.
            </p>
            <div className="adside-founders-sig">
              <strong>Robin &amp; Guillaume</strong> — Co-founders of Adside
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FAQ ACCORDION ("Questions, answered")
          ========================================================================= */}
      <section className="adside-faq-section" id="faq">
        <div className="adside-faq-container">
          <h2 className="adside-faq-title">Questions, answered</h2>

          <div className="adside-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="adside-faq-item">
                  <button type="button" className="adside-faq-question" onClick={() => toggleFaq(index)}>
                    <span>{faq.q}</span>
                    <ChevronDown size={20} className={`adside-faq-chevron ${isOpen ? 'open' : ''}`} />
                  </button>
                  {isOpen && <div className="adside-faq-answer">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: CLOSING CTA ("Wanna try Adside today?") & FOOTER
          ========================================================================= */}
      <section className="adside-cta-section">
        <div className="adside-cta-container">
          <h2 className="adside-cta-title">Wanna try Adside today?</h2>
          <p className="adside-cta-subtitle">
            Join hundreds of forward-thinking brands turning paid ads into a profitable, scalable growth engine.
          </p>

          <div className="adside-cta-btns">
            <button type="button" className="adside-cta-btn-primary" onClick={handleOpenContact}>
              Get Started
            </button>
            <button type="button" className="adside-cta-btn-secondary" onClick={handleOpenContact}>
              Book a demo
            </button>
          </div>
        </div>
      </section>

      {/* Adside Footer */}
      <footer className="adside-footer">
        <div className="adside-footer-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AdsideLogoMark />
            <span style={{ fontWeight: 700, color: '#ffffff' }}>Adside</span>
            <span style={{ color: '#6b7280', marginLeft: '12px' }}>© 2026 Adside Inc. All rights reserved.</span>
          </div>

          <div className="adside-footer-links">
            <a href="#features">Features</a>
            <a href="#managed">Managed service</a>
            <a href="#pricing">Pricing</a>
            <a href="#founders">About</a>
            <a href="#faq">FAQ</a>
            <a href="mailto:contact@adside.ai">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
