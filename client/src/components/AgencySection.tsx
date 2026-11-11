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
          if (
            href === '#contact' ||
            href === '/en/contact' ||
            target.getAttribute('data-cta') === 'contactez-nous' ||
            href?.startsWith('mailto:')
          ) {
            if (onOpenContact) {
              e.preventDefault();
              playClick();
              onOpenContact();
            }
          }
        }
      };

      container.addEventListener('click', handleContactClicks);
      return () => {
        container.removeEventListener('click', handleContactClicks);
      };
    }
  }, [onOpenContact]);

  useEffect(() => {
    // 1. Initialize global helper functions required by Bitwip before scripts run
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];

      // epureHasard (Bitwip pseudo-randomizer)
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

      // 5. Live Studio Clocks ticker
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

        /* Quiet Studio Token Calibration */
        :root {
          --papaye: #ff5a1f !important;
          --papaye-titre: #ff5a1f !important;
          --noir: #141413 !important;
          --ink: #141413 !important;
          --ink-2: #1c1c1a !important;
          --papier: #faf9f5 !important;
          --papier-2: #f4efe7 !important;
          --encre: #141413 !important;
        }

        .bitwip-unified-container {
          background: #141413;
          color: #ffffff;
        }

        /* Warm Paper Sections: Charcoal text on #faf9f5 background */
        .bitwip-unified-container .sec.papier,
        .bitwip-unified-container .papier {
          background-color: #faf9f5 !important;
          color: #141413 !important;
        }

        .bitwip-unified-container .sec.papier h2,
        .bitwip-unified-container .sec.papier h3,
        .bitwip-unified-container .sec.papier h4,
        .bitwip-unified-container .sec.papier .head__t {
          color: #141413 !important;
        }

        .bitwip-unified-container .sec.papier p,
        .bitwip-unified-container .sec.papier .sensee__lead,
        .bitwip-unified-container .sec.papier .sensee__p,
        .bitwip-unified-container .sec.papier .qa__a p {
          color: #71717a !important;
        }

        .bitwip-unified-container .sec.papier .sensee__lead {
          color: #141413 !important;
          font-weight: 600;
        }

        .bitwip-unified-container .sec.papier .label,
        .bitwip-unified-container .sec.papier .head__n,
        .bitwip-unified-container .sec.papier .sc__plus,
        .bitwip-unified-container .sec.papier .sc__n {
          color: #ff5a1f !important;
        }

        /* Dark Sections: Crisp white text on #141413 background */
        .bitwip-unified-container .sec:not(.papier),
        .bitwip-unified-container .hh,
        .bitwip-unified-container .cta,
        .bitwip-unified-container .pied {
          background-color: #141413 !important;
          color: #ffffff !important;
        }

        .bitwip-unified-container .sec:not(.papier) h2,
        .bitwip-unified-container .sec:not(.papier) h3,
        .bitwip-unified-container .sec:not(.papier) h4,
        .bitwip-unified-container .sec:not(.papier) .head__t,
        .bitwip-unified-container .hh h1 {
          color: #ffffff !important;
        }

        /* Clocks in Hero */
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

        /* Services Accordion (#expertises) */
        .qs-service-row summary::-webkit-details-marker {
          display: none !important;
        }
        .qs-service-row summary {
          transition: color 0.2s ease;
        }
        .qs-service-row summary:hover h3 {
          color: #ff5a1f !important;
        }
        .qs-service-row[open] .icon-open {
          display: block !important;
        }
        .qs-service-row[open] .icon-closed {
          display: none !important;
        }
        .qs-service-row:not([open]) .icon-open {
          display: none !important;
        }
        .qs-service-row:not([open]) .icon-closed {
          display: block !important;
        }

        /* Workspace Mockup Interactive Stickers */
        .qs-mockup-container [style*="position:absolute"] {
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease;
          cursor: pointer;
        }
        .qs-mockup-container [style*="position:absolute"]:hover {
          transform: scale(1.08) rotate(0deg) !important;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.45) !important;
        }

        /* Closing CTA Section */
        .qs-closing-cta-sec {
          background-color: #141413 !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }
        .qs-primary-cta-pill:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 16px 44px rgba(255, 90, 31, 0.45) !important;
        }
        .bitwip-unified-container footer.pied a:hover {
          color: #ff5a1f !important;
        }
      `}</style>

      {/* Bitwip Agency Stitched Content */}
      <div
        className="bitwip-native-content"
        dangerouslySetInnerHTML={{ __html: BITWIP_BODY_HTML }}
      />
    </div>
  );
}
