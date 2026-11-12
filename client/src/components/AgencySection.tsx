'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { BITWIP_BODY_HTML } from './bitwip-html';
import { playClick } from '@/lib/sound';

interface AgencySectionProps {
  onSwitchToProducts?: () => void;
  onOpenContact?: () => void;
}

export default function AgencySection({ onSwitchToProducts, onOpenContact }: AgencySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleUniversalLinkClicks = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest('a');
        if (!target) return;

        const href = target.getAttribute('href');
        if (!href) return;

        playClick();

        // 1. Contact modal triggers
        if (
          href === '#contact' ||
          href === '/en/contact' ||
          target.getAttribute('data-cta') === 'contactez-nous' ||
          href.startsWith('mailto:')
        ) {
          if (onOpenContact) {
            e.preventDefault();
            onOpenContact();
            return;
          }
        }

        // 2. Direct page routes & clean navigation (no scrolling down to footer)
        if (href === '/#foundations') {
          e.preventDefault();
          setLocation('/research');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        if (href === '/#squad') {
          e.preventDefault();
          setLocation('/about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        if (href === '/#method') {
          e.preventDefault();
          setLocation('/thesis');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        if (href === '/#apps' || href === '/#products') {
          e.preventDefault();
          if (onSwitchToProducts) {
            onSwitchToProducts();
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // 3. Anchor hash links on the current page
        if (href.startsWith('#')) {
          e.preventDefault();
          const elem = document.querySelector(href);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        // 4. Internal application routes
        if (href.startsWith('/') && !href.startsWith('/assets/')) {
          e.preventDefault();
          setLocation(href);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      };

      container.addEventListener('click', handleUniversalLinkClicks);
      return () => {
        container.removeEventListener('click', handleUniversalLinkClicks);
      };
    }
  }, [onOpenContact, onSwitchToProducts, setLocation]);

  // Interactive Workspace Screen Controller (Tabs, Token Copy, Telemetry Diagnostics)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWorkspaceInteractions = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 1. Tab switches
      const tabBtn = target.closest<HTMLButtonElement>('.qs-ws-tab');
      if (tabBtn) {
        e.preventDefault();
        playClick();
        const tabId = tabBtn.getAttribute('data-tab');
        if (!tabId) return;

        // Toggle active tab button
        container.querySelectorAll('.qs-ws-tab').forEach((b) => {
          b.classList.remove('is-active');
        });
        tabBtn.classList.add('is-active');

        // Toggle pane visibility
        container.querySelectorAll('.qs-tab-content').forEach((p) => {
          (p as HTMLElement).style.display = 'none';
        });
        const activePane = container.querySelector<HTMLElement>(`#pane-${tabId}`);
        if (activePane) {
          activePane.style.display = 'block';
        }
      }

      // 2. Token Swatch click to copy
      const swatch = target.closest<HTMLElement>('.qs-token-swatch');
      if (swatch) {
        e.preventDefault();
        playClick();
        const hex = swatch.getAttribute('data-hex');
        if (hex && navigator.clipboard) {
          navigator.clipboard.writeText(hex);
          const firstSpan = swatch.querySelector('span');
          if (firstSpan) {
            firstSpan.textContent = 'COPIED!';
            setTimeout(() => {
              firstSpan.textContent = hex;
            }, 1200);
          }
        }
      }

      // 3. Telemetry scan button
      const scanBtn = target.closest<HTMLButtonElement>('.qs-refresh-telemetry-btn');
      if (scanBtn) {
        e.preventDefault();
        playClick();
        scanBtn.textContent = 'SCANNING...';
        setTimeout(() => {
          scanBtn.textContent = '✓ LIVE (0.2ms)';
          setTimeout(() => {
            scanBtn.textContent = '↻ RUN SCAN';
          }, 2000);
        }, 600);
      }

      // 4. Floating sticker bouncy click
      const sticker = target.closest<HTMLButtonElement>('.qs-sticker');
      if (sticker) {
        playClick();
      }
    };

    container.addEventListener('click', handleWorkspaceInteractions);
    return () => {
      container.removeEventListener('click', handleWorkspaceInteractions);
    };
  }, []);

  // Exclusive Accordion Controller (Only one row open at a time)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleAccordionClick = (e: MouseEvent) => {
      const summary = (e.target as HTMLElement).closest('summary');
      if (!summary) return;

      const details = summary.parentElement as HTMLDetailsElement | null;
      if (!details || details.tagName !== 'DETAILS') return;

      playClick();

      const isServiceRow = details.classList.contains('qs-service-row');
      const groupName = details.getAttribute('name');

      const selector = isServiceRow
        ? 'details.qs-service-row'
        : groupName
        ? `details[name="${groupName}"]`
        : null;

      if (!selector) return;

      // If this details is currently closed, opening it should close all other items in the group
      if (!details.open) {
        const siblings = container.querySelectorAll<HTMLDetailsElement>(selector);
        siblings.forEach((sibling) => {
          if (sibling !== details && sibling.open) {
            sibling.removeAttribute('open');
            sibling.open = false;
          }
        });
      }
    };

    const handleAccordionToggle = (e: Event) => {
      const details = e.target as HTMLDetailsElement;
      if (!details || details.tagName !== 'DETAILS' || !details.open) return;

      const isServiceRow = details.classList.contains('qs-service-row');
      const groupName = details.getAttribute('name');

      const selector = isServiceRow
        ? 'details.qs-service-row'
        : groupName
        ? `details[name="${groupName}"]`
        : null;

      if (!selector) return;

      const siblings = container.querySelectorAll<HTMLDetailsElement>(selector);
      siblings.forEach((sibling) => {
        if (sibling !== details && sibling.open) {
          sibling.removeAttribute('open');
          sibling.open = false;
        }
      });
    };

    container.addEventListener('click', handleAccordionClick, true);
    container.addEventListener('toggle', handleAccordionToggle, true);
    return () => {
      container.removeEventListener('click', handleAccordionClick, true);
      container.removeEventListener('toggle', handleAccordionToggle, true);
    };
  }, []);

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
      document.documentElement.classList.add('js', 'is-ready');
      document.documentElement.setAttribute('data-gdifilm', 'direct');

      document.body.setAttribute('data-page', 'accueil');
      document.body.setAttribute('data-variante', 'allegee');
      document.body.setAttribute('data-entree', '');
      document.body.setAttribute('data-type-page', 'accueil');
      document.body.setAttribute('data-landing', '');
      document.body.setAttribute('data-outil', '');

      // 2. Enable / Link Bitwip stylesheets
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
        }
        el.disabled = false;
        linkTags.push(el);
      });

      setIsMounted(true);

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

      // 4. Sequentially load Bitwip client runtime scripts without duplication
      const scripts = [
        '/assets/js/bitwip.js',
        '/assets/js/p-variantes.js',
        '/assets/js/p-hero-accueil.js',
      ];

      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve) => {
          const existing = document.querySelector(`script[data-bitwip-script="${src}"]`);
          if (existing) {
            resolve();
            return;
          }
          const s = document.createElement('script');
          s.src = src;
          s.defer = true;
          s.setAttribute('data-bitwip-script', src);
          s.onload = () => resolve();
          s.onerror = () => resolve();
          document.body.appendChild(s);
        });
      };

      (async () => {
        for (const src of scripts) {
          await loadScript(src);
        }
        hydrateImages();
        window.dispatchEvent(new Event('DOMContentLoaded'));
        window.dispatchEvent(new Event('load'));
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
        document.documentElement.removeAttribute('data-gdifilm');

        document.body.removeAttribute('data-page');
        document.body.removeAttribute('data-variante');
        document.body.removeAttribute('data-entree');
        document.body.removeAttribute('data-type-page');
        document.body.removeAttribute('data-landing');
        document.body.removeAttribute('data-outil');

        // Only disable stylesheets if switching to human mode, avoiding full DOM recreation
        const currentMode = document.documentElement.getAttribute('data-studio-mode');
        if (currentMode === 'human') {
          linkTags.forEach((link) => {
            link.disabled = true;
          });
        }

        // Remove any global elements appended to document.body by bitwip.js
        const bitwipGlobals = document.querySelectorAll(
          '.curseur, .jonctions, .portail, .sillage, .eclat, .visionneuse'
        );
        bitwipGlobals.forEach((el) => el.remove());

        document.documentElement.classList.remove('has-curseur', 'curseur-tenu');
      };
    }
  }, []);

  return (
    <div
      className="bitwip-unified-container"
      ref={containerRef}
      style={{
        opacity: isMounted ? 1 : 0.98,
        transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
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

        /* Services Section Title Baila Styling */
        .bitwip-unified-container #expertises .head__t .baila,
        .bitwip-unified-container #t-services .baila {
          font-family: 'Baila', Georgia, serif !important;
          font-style: italic !important;
          color: #ff5a1f !important;
          display: inline-block !important;
          margin-left: 0.22em !important;
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

        /* 1. High contrast on Before & After dark card and bottom pill */
        .bitwip-unified-container .qs-before-after-sec .qs-dark-card,
        .bitwip-unified-container .qs-before-after-sec .qs-dark-card * {
          color: #ffffff !important;
        }
        .bitwip-unified-container .qs-before-after-sec .qs-dark-card h3,
        .bitwip-unified-container .qs-before-after-sec .qs-dark-card h4 {
          color: #ffffff !important;
        }
        .bitwip-unified-container .qs-before-after-sec .qs-dark-card .qs-card-sub {
          color: #ff5a1f !important;
        }
        .bitwip-unified-container .qs-before-after-sec .qs-dark-card p,
        .bitwip-unified-container .qs-before-after-sec .qs-dark-card .qs-card-desc {
          color: rgba(255, 255, 255, 0.95) !important;
        }
        .bitwip-unified-container .qs-before-after-sec .qs-dark-pill,
        .bitwip-unified-container .qs-before-after-sec .qs-dark-pill * {
          color: #ffffff !important;
        }

        /* 2. Pricing Centered Header: Title UP, Subtitle BELOW */
        .qs-pricing-centered-header {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          margin: 0 auto 56px !important;
          max-width: 960px !important;
          width: 100% !important;
        }
        .qs-pricing-centered-header h2 {
          color: #141413 !important;
        }
        .qs-pricing-centered-header p {
          color: #71717a !important;
        }

        /* 3. Workspace Interactive Tabs & Swatches */
        .qs-workspace-tabs {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .qs-ws-tab {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          padding: 11px 16px !important;
          border-radius: 10px !important;
          width: 100% !important;
          border: 1px solid transparent !important;
          background: transparent !important;
          color: rgba(255, 255, 255, 0.65) !important;
          font: 600 13.5px/1 'Cabinet Grotesk', sans-serif !important;
          letter-spacing: -0.01em !important;
          text-align: left !important;
          cursor: pointer !important;
          outline: none !important;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .qs-ws-tab svg {
          color: rgba(255, 255, 255, 0.45) !important;
          transition: color 0.18s ease, transform 0.18s ease !important;
          flex-shrink: 0 !important;
        }
        .qs-ws-tab:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          color: #ffffff !important;
        }
        .qs-ws-tab:hover svg {
          color: #ffffff !important;
          transform: scale(1.05);
        }
        .qs-ws-tab.is-active {
          background: rgba(255, 90, 31, 0.12) !important;
          border-color: rgba(255, 90, 31, 0.35) !important;
          color: #ffffff !important;
        }
        .qs-ws-tab.is-active svg {
          color: #ff5a1f !important;
        }
        .qs-token-swatch {
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .qs-token-swatch:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        /* 4. Tighten Footer & Closing Section Spacing - Eliminate Big Gap */
        .bitwip-unified-container .sec.qs-closing-cta-sec,
        .qs-closing-cta-sec {
          padding-top: 50px !important;
          padding-bottom: 24px !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
        }
        .bitwip-unified-container .qs-closing-cta-sec .wrap {
          padding-top: 24px !important;
          padding-bottom: 24px !important;
        }
        .bitwip-unified-container footer.pied,
        .bitwip-unified-container .pied {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }
        .bitwip-unified-container footer.pied .wrap {
          padding-top: 32px !important;
          padding-bottom: 40px !important;
        }

        /* 5. Eliminate Blank Space & Guarantee Section Reveal Visibility */
        .bitwip-unified-container [data-reveal] {
          opacity: 1 !important;
          transform: none !important;
        }
        .bitwip-unified-container #agence {
          padding-bottom: 0 !important;
          margin-bottom: 0 !important;
        }
        .bitwip-unified-container .ag-vie {
          padding-bottom: 24px !important;
        }
        .bitwip-unified-container #expertises {
          padding-top: 24px !important;
          padding-bottom: 20px !important;
          scroll-margin-top: 80px !important;
        }
        .bitwip-unified-container #expertises .wrap {
          padding-top: 0 !important;
          padding-bottom: 20px !important;
        }
        .bitwip-unified-container #expertises .head {
          margin-bottom: 36px !important;
        }
        .bitwip-unified-container #realisations {
          padding-top: 32px !important;
        }
        .bitwip-unified-container .piste__intro {
          margin-bottom: 28px !important;
        }

        /* 6. Service Dropdown Balanced Two-Column Grid & Prominent Showcase Cards */
        .bitwip-unified-container .qs-service-body {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.22fr) !important;
          align-items: center !important;
          gap: clamp(32px, 5vw, 60px) !important;
          padding: 36px 0 24px 0 !important;
          width: 100% !important;
        }
        .bitwip-unified-container .qs-service-info {
          display: flex !important;
          flex-direction: column !important;
          gap: 24px !important;
          padding-left: 40px !important;
        }
        .bitwip-unified-container .qs-service-info p {
          color: rgba(255, 255, 255, 0.88) !important;
          font-size: clamp(1.1rem, 1.8vw, 1.35rem) !important;
          line-height: 1.8 !important;
          margin: 0 !important;
        }
        .bitwip-unified-container .qs-service-media-card {
          width: 100% !important;
          border-radius: 18px !important;
          overflow: hidden !important;
          border: 1px solid rgba(255, 255, 255, 0.16) !important;
          background: #0c0c0e !important;
          box-shadow: 0 24px 56px rgba(0, 0, 0, 0.65), 0 4px 16px rgba(0, 0, 0, 0.4) !important;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.28s ease, box-shadow 0.28s ease !important;
        }
        .bitwip-unified-container .qs-service-media-card:hover {
          transform: translateY(-4px) scale(1.015) !important;
          border-color: rgba(255, 90, 31, 0.5) !important;
          box-shadow: 0 28px 64px rgba(255, 90, 31, 0.2), 0 8px 24px rgba(0, 0, 0, 0.6) !important;
        }
        .bitwip-unified-container .qs-service-media-card img {
          width: 100% !important;
          height: auto !important;
          aspect-ratio: 16 / 10 !important;
          object-fit: cover !important;
          display: block !important;
        }
        @media (max-width: 960px) {
          .bitwip-unified-container .qs-service-body {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding-left: 0 !important;
          }
          .bitwip-unified-container .qs-service-info {
            padding-left: 0 !important;
          }
        }

        /* Hero Video Square Optical Centering */
        .bitwip-unified-container .mj__pile {
          left: calc((100% - var(--c)) / 2 - var(--c) * .28) !important;
        }
        @media (max-width: 900px) {
          .bitwip-unified-container .mj__pile {
            left: calc(50% - var(--c) * .551) !important;
          }
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
