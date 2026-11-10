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
      container.addEventListener('click', handleContactClicks);
      return () => {
        container.removeEventListener('click', handleContactClicks);
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

      return () => {
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
      `}</style>

      {/* Bitwip Agency Original Content */}
      <div
        className="bitwip-native-content"
        dangerouslySetInnerHTML={{ __html: BITWIP_BODY_HTML }}
      />
    </div>
  );
}
