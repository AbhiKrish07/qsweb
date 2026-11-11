'use client';

import React, { useEffect, useRef } from 'react';
import { BITWIP_BODY_HTML } from './bitwip-html';
import { playClick } from '@/lib/sound';

interface AgencySectionProps {
  onSwitchToProducts?: () => void;
  onOpenContact?: () => void;
}

export default function AgencySection({ onSwitchToProducts, onOpenContact }: AgencySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleContactClicks = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest('a');
        if (target) {
          const href = target.getAttribute('href');
          if (href === '#contact' || href === '/en/contact' || target.getAttribute('data-cta') === 'contactez-nous' || href?.startsWith('mailto:')) {
            if (onOpenContact) {
              e.preventDefault();
              playClick();
              onOpenContact();
            }
          }
        }
      };

      const handleInteractiveChipClicks = (e: MouseEvent) => {
        const chip = (e.target as HTMLElement)?.closest('.qs-interactive-chip') as HTMLElement | null;
        if (chip) {
          e.preventDefault();
          playClick();
          const parent = chip.closest('.qs-interactive-console');
          if (parent) {
            parent.querySelectorAll('.qs-interactive-chip').forEach((c) => c.classList.remove('is-active'));
            chip.classList.add('is-active');

            const titleEl = parent.querySelector('.qs-telemetry-title');
            const descEl = parent.querySelector('.qs-telemetry-desc');
            const chipType = chip.getAttribute('data-chip');

            const contentMap: Record<string, { title: string; desc: string }> = {
              branding: {
                title: 'Autonomous Brand Engine',
                desc: 'High-fidelity design tokens, font metrics, and interaction physics synchronizing across Figma and production codebases in real time.',
              },
              typography: {
                title: 'Kinetic Grotesque Type System',
                desc: 'Variable font axes, dynamic micro-letter spacing, and responsive tabular coordinates built for high-craft digital identities.',
              },
              agents: {
                title: 'Multi-Agent Production Swarms',
                desc: 'Context-engineered agent networks generating production-ready creative variations and ad assets with strict brand guardrails.',
              },
              tokens: {
                title: 'Living Token Architecture',
                desc: 'Centralized JSON token contracts powering styles, dark/light modes, spacing units, and physical audio triggers across all platforms.',
              },
              latency: {
                title: 'Zero-Latency Edge Reaction',
                desc: 'Hardware-accelerated CSS animations and local-first physics running smoothly at 60 FPS with zero cloud dependency.',
              },
            };

            const data = contentMap[chipType || 'branding'] || contentMap.branding;
            if (titleEl) titleEl.textContent = data.title;
            if (descEl) descEl.textContent = data.desc;
          }
        }
      };

      container.addEventListener('click', handleContactClicks);
      container.addEventListener('click', handleInteractiveChipClicks);
      return () => {
        container.removeEventListener('click', handleContactClicks);
        container.removeEventListener('click', handleInteractiveChipClicks);
      };
    }
  }, [onOpenContact]);

  useEffect(() => {
    // 1. Initialize global helper functions required by Bitwip before scripts run
    if (typeof window !== 'undefined') {
      // dataLayer
      (window as any).dataLayer = (window as any).dataLayer || [];

      // epureHasard (Bitwip pseudo-randomizer & logo shuffling)
      if (!(window as any).epureHasard) {
        (window as any).epureHasard = (function () {
          let g: any,
            k = 'epure-graine',
            n = function () {
              return String(Math.floor(Math.random() * 4294967296));
            };
          try {
            g = sessionStorage.getItem(k);
            if (!g) {
              g = n();
              sessionStorage.setItem(k, g);
            }
          } catch {
            g = g || n();
          }
          function h(s: string) {
            let x = 2166136261;
            for (let i = 0; i < s.length; i++) {
              x ^= s.charCodeAt(i);
              x = Math.imul(x, 16777619);
            }
            return x >>> 0;
          }
          function melanger(l: any[], nom: string) {
            const a = Array.prototype.slice.call(l);
            let t = h(g + ':' + (nom || ''));
            function r() {
              t = (t + 1831565813) | 0;
              let z = Math.imul(t ^ (t >>> 15), 1 | t);
              z = z + Math.imul(z ^ (z >>> 7), 61 | z) ^ z;
              return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
            }
            for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(r() * (i + 1));
              const v = a[i];
              a[i] = a[j];
              a[j] = v;
            }
            return a;
          }
          return { graine: g, melanger: melanger };
        })();
      }

      // Attributes on document & body
      document.documentElement.classList.add('js');
      document.documentElement.setAttribute('data-gdifilm', 'direct');

      document.body.setAttribute('data-page', 'accueil');
      document.body.setAttribute('data-variante', 'allegee');
      document.body.setAttribute('data-entree', '');
      document.body.setAttribute('data-type-page', 'accueil');
      document.body.setAttribute('data-landing', '');
      document.body.setAttribute('data-outil', '');

      // 2. Load Bitwip stylesheets
      const stylesheets = [
        '/assets/css/bitwip.css',
        '/assets/css/p-hero-accueil.css',
        '/assets/css/p-variantes.css',
        '/assets/css/p-variantes-lot4.css',
      ];

      const linkTags: HTMLLinkElement[] = [];
      stylesheets.forEach((href) => {
        let el = document.querySelector(`link[data-bitwip-href="${href}"]`) as HTMLLinkElement;
        if (!el) {
          el = document.createElement('link');
          el.rel = 'stylesheet';
          el.href = href;
          el.setAttribute('data-bitwip-href', href);
          document.head.appendChild(el);
          linkTags.push(el);
        }
      });

      // 3. Lazy image hydrating
      const hydrateImages = () => {
        document.querySelectorAll('img[data-src]').forEach((imgNode: any) => {
          if (imgNode.dataset.srcset) imgNode.srcset = imgNode.dataset.srcset;
          if (imgNode.dataset.src) imgNode.src = imgNode.dataset.src;
          imgNode.removeAttribute('data-srcset');
          imgNode.removeAttribute('data-src');
        });
      };
      hydrateImages();

      // 4. Sequentially load Bitwip client runtime scripts
      const scripts = [
        '/assets/js/bitwip.js',
        '/assets/js/p-variantes.js',
        '/assets/js/p-hero-accueil.js',
      ];

      const scriptTags: HTMLScriptElement[] = [];

      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve) => {
          const s = document.createElement('script');
          s.src = src;
          s.defer = true;
          s.onload = () => resolve();
          s.onerror = () => resolve();
          document.body.appendChild(s);
          scriptTags.push(s);
        });
      };

      (async () => {
        for (const src of scripts) {
          await loadScript(src);
        }
        hydrateImages();
        window.dispatchEvent(new Event('scroll'));
        window.dispatchEvent(new Event('resize'));
      })();

      // 5. Live Studio Clocks ticker for San Francisco, New York, London, Tokyo, Bengaluru
      const updateClocks = () => {
        const clockNodes = document.querySelectorAll('.clock__time[data-tz]');
        const now = new Date();
        clockNodes.forEach((node: any) => {
          const tz = node.getAttribute('data-tz');
          if (!tz) return;
          try {
            const formatter = new Intl.DateTimeFormat('en-GB', {
              timeZone: tz,
              hour: '2-digit',
              minute: '2-digit',
              hourCycle: 'h23',
            });
            const parts = formatter.formatToParts(now);
            const h = parts.find((p) => p.type === 'hour')?.value || '12';
            const m = parts.find((p) => p.type === 'minute')?.value || '00';
            node.innerHTML = `<span aria-hidden="true">${h}<span class="c">:</span>${m}</span><span class="sr-only"> ${h}:${m}</span>`;
          } catch {}
        });
      };
      updateClocks();
      const clockInterval = setInterval(updateClocks, 1000);

      return () => {
        clearInterval(clockInterval);
        // Clean up body attributes and injected assets on unmount
        document.documentElement.classList.remove('js');
        document.documentElement.removeAttribute('data-gdifilm');

        document.body.removeAttribute('data-page');
        document.body.removeAttribute('data-variante');
        document.body.removeAttribute('data-entree');
        document.body.removeAttribute('data-type-page');
        document.body.removeAttribute('data-landing');
        document.body.removeAttribute('data-outil');

        linkTags.forEach((link) => link.remove());
        scriptTags.forEach((script) => script.remove());
      };
    }
  }, []);

  const handleModeSwitch = (mode: 'human' | 'agent') => {
    playClick();
    if (mode === 'human') {
      if (onSwitchToProducts) {
        onSwitchToProducts();
      } else if (typeof window !== 'undefined') {
        localStorage.setItem('quiet-studio-mode', 'human');
        window.location.reload();
      }
    }
  };

  return (
    <div className="bitwip-unified-container" ref={containerRef}>
      {/* Hide Bitwip's default header so Quiet Studio's uniform signature header is shown */}
      <style>{`
        header.nav,
        .nav--allegee,
        .nav__bar,
        .menu#menu,
        .quiet-bitwip-bridge {
          display: none !important;
        }

        /* Pure Black & Signal Orange Studio Colorway */
        .bitwip-unified-container {
          --txt: #ffffff !important;
          --txt-2: rgba(255, 255, 255, 0.94) !important;
          --txt-3: rgba(255, 255, 255, 0.85) !important;
          --encre: #0e0e0d !important;
          background: #0e0e0d !important;
          color: #ffffff !important;
        }

        /* All Sections Unified to Deep Black */
        .bitwip-unified-container .sec,
        .bitwip-unified-container .sec.papier,
        .bitwip-unified-container .papier,
        .bitwip-unified-container .qs-dark-section,
        .bitwip-unified-container .qs-before-after-sec,
        .bitwip-unified-container .qs-workspace-sec,
        .bitwip-unified-container .qs-pricing-sec,
        .bitwip-unified-container .qs-kinetic-lab-sec,
        .bitwip-unified-container .cta,
        .bitwip-unified-container .pied {
          background: #0e0e0d !important;
          color: #ffffff !important;
        }

        .bitwip-unified-container h1,
        .bitwip-unified-container h2,
        .bitwip-unified-container h3,
        .bitwip-unified-container h4,
        .bitwip-unified-container .head__t {
          color: #ffffff !important;
          font-weight: 700 !important;
          letter-spacing: -0.02em !important;
        }

        .bitwip-unified-container p,
        .bitwip-unified-container .head__i,
        .bitwip-unified-container .sensee__lead,
        .bitwip-unified-container .sensee__p,
        .bitwip-unified-container .qa__a p {
          color: rgba(255, 255, 255, 0.85) !important;
          line-height: 1.65 !important;
        }

        .bitwip-unified-container .label,
        .bitwip-unified-container .head__n,
        .bitwip-unified-container .sc__plus {
          color: #ff5a1f !important;
          font-weight: 700 !important;
          letter-spacing: 0.08em !important;
        }

        .bitwip-unified-container summary {
          color: #ffffff !important;
          font-weight: 700 !important;
          cursor: pointer;
        }

        .bitwip-unified-container summary:hover {
          color: #ff5a1f !important;
        }

        .bitwip-unified-container .qa__ico {
          color: #ff5a1f !important;
        }

        .bitwip-unified-container .clocks .clock {
          color: rgba(255, 255, 255, 0.9) !important;
        }

        .bitwip-unified-container .clocks .clock:hover {
          color: #ff5a1f !important;
        }

        .bitwip-unified-container .clocks .c-time {
          color: #ff5a1f !important;
          font-weight: 700 !important;
        }

        /* Quiet Studio Services Accordion */
        .qs-service-row summary::-webkit-details-marker {
          display: none !important;
        }
        .qs-service-row {
          list-style: none !important;
        }
        .qs-service-row[open] .qs-acc-toggle {
          background: #ff5a1f !important;
          border-color: #ff5a1f !important;
        }
        .qs-service-row[open] .qs-acc-toggle .qs-icon-plus {
          display: none !important;
        }
        .qs-service-row[open] .qs-acc-toggle .qs-icon-minus {
          display: block !important;
        }
        .qs-service-row:not([open]) .qs-acc-toggle {
          background: rgba(255, 255, 255, 0.08) !important;
          border: 1px solid rgba(255, 255, 255, 0.16) !important;
        }
        .qs-service-row:not([open]) .qs-acc-toggle .qs-icon-plus {
          display: block !important;
        }
        .qs-service-row:not([open]) .qs-acc-toggle .qs-icon-minus {
          display: none !important;
        }
        .qs-service-cta:hover {
          color: #ff5a1f !important;
        }

        /* Workspace sticker interaction */
        .qs-mockup-container [style*="position:absolute"] {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease;
          cursor: pointer;
        }
        .qs-mockup-container [style*="position:absolute"]:hover {
          transform: scale(1.08) rotate(0deg) !important;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.45) !important;
        }

        /* Dual Infinite Kinetic Tickers */
        @keyframes tickerLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes tickerRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .qs-ticker-left {
          display: flex;
          width: max-content;
          animation: tickerLeft 35s linear infinite;
        }
        .qs-ticker-right {
          display: flex;
          width: max-content;
          animation: tickerRight 35s linear infinite;
        }
        .qs-ticker-container:hover .qs-ticker-row {
          animation-play-state: paused;
        }
        .qs-ticker-item {
          font: 800 13px/1 'Cabinet Grotesk', -apple-system, sans-serif;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          flex-shrink: 0;
        }

        /* 3D Kinetic Wireframe Cube */
        .qs-kinetic-cube-wrap {
          width: 130px;
          height: 130px;
          perspective: 800px;
        }
        .qs-kinetic-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 14s linear infinite;
        }
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          50% { transform: rotateX(180deg) rotateY(180deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .qs-cube-face {
          position: absolute;
          width: 130px;
          height: 130px;
          border: 1.5px solid #ff5a1f;
          background: rgba(255, 90, 31, 0.08);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font: 800 15px/130px 'Cabinet Grotesk', sans-serif;
          text-align: center;
          letter-spacing: 0.06em;
          box-shadow: inset 0 0 20px rgba(255, 90, 31, 0.18);
        }
        .qs-face-front  { transform: translateZ(65px); }
        .qs-face-back   { transform: rotateY(180deg) translateZ(65px); }
        .qs-face-right  { transform: rotateY(90deg) translateZ(65px); }
        .qs-face-left   { transform: rotateY(-90deg) translateZ(65px); }
        .qs-face-top    { transform: rotateX(90deg) translateZ(65px); }
        .qs-face-bottom { transform: rotateX(-90deg) translateZ(65px); }

        /* Interactive Chips */
        .qs-interactive-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.8);
          font: 700 11.5px/1 'DM Mono', monospace;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .qs-interactive-chip:hover {
          background: rgba(255, 90, 31, 0.15);
          border-color: #ff5a1f;
          color: #ffffff;
          transform: translateY(-2px);
        }
        .qs-interactive-chip.is-active {
          background: #ff5a1f !important;
          border-color: #ff5a1f !important;
          color: #ffffff !important;
          box-shadow: 0 4px 16px rgba(255, 90, 31, 0.45);
        }
        .qs-chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        /* Pulsing Waveform Bars */
        .qs-wave-bar {
          flex: 1;
          background: #ff5a1f;
          border-radius: 4px;
          height: var(--h, 60%);
          animation: wavePulse 1.2s ease-in-out infinite alternate;
          animation-delay: var(--d, 0s);
          transform-origin: bottom;
        }
        @keyframes wavePulse {
          0% { transform: scaleY(0.4); opacity: 0.6; }
          100% { transform: scaleY(1.1); opacity: 1; }
        }
      `}</style>

      {/* Bitwip Agency Original Content */}
      <div
        className="bitwip-native-content"
        dangerouslySetInnerHTML={{ __html: BITWIP_BODY_HTML }}
      />
    </div>
  );
}
