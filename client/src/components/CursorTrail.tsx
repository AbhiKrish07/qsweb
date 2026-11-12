import React, { useEffect, useRef } from 'react';

const SHAPES = [
  'etoile-huit',
  'fleur',
  'sceau',
  'trefle',
  'etoile-quatre'
] as const;

const COLORS = [
  '#FC622A', // Papaye / Studio Signal Orange
  '#FFE870', // Citron / Warm Lime
  '#D7B9FB', // Lavande / Pastel Violet
  '#5DF196', // Vert / Mint Green
  '#FF928A'  // Saumon / Soft Coral
] as const;

export const CursorTrail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on pointer:fine (mouse / trackpad) devices, never on touchscreens
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    // Set bitwip easter egg flag in localStorage so internal bitwip.js knows user wants rainbow trails
    try {
      localStorage.setItem('bitwip-arc-en-ciel', '1');
    } catch (_) {}

    const container = containerRef.current;
    if (!container) return;

    let count = 0;
    let lastX = -100;
    let lastY = -100;
    let lastTime = 0;
    const MAX_PARTICLES = 32;

    const spawnParticle = (x: number, y: number, driftX: number, driftY: number, scaleMultiplier = 1) => {
      if (container.children.length >= MAX_PARTICLES) {
        container.firstElementChild?.remove();
      }

      const idx = count++;
      const shape = SHAPES[idx % SHAPES.length];
      const color = COLORS[(idx * 2 + Math.floor(idx / 5)) % COLORS.length];

      const el = document.createElement('span');
      el.className = 'qs-cursor-particle';
      const size = Math.round(28 * scaleMultiplier);
      el.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        margin-left: -${Math.round(size / 2)}px;
        margin-top: -${Math.round(size / 2)}px;
        pointer-events: none;
        z-index: 99999;
        background-color: ${color};
        -webkit-mask: url("/assets/img/formes/${shape}.svg") center/contain no-repeat;
        mask: url("/assets/img/formes/${shape}.svg") center/contain no-repeat;
        will-change: transform, opacity;
      `;

      container.appendChild(el);

      const rot = (idx % 2 ? 1 : -1) * (60 + Math.random() * 80);
      const anim = el.animate(
        [
          { transform: `scale(0.35) rotate(0deg)`, opacity: 0.95 },
          { transform: `scale(1) translate(${driftX * 0.25}px, ${driftY * 0.25}px) rotate(${rot * 0.3}deg)`, opacity: 0.95, offset: 0.18 },
          { transform: `scale(0.8) translate(${driftX * 0.7}px, ${driftY * 0.7 + 8}px) rotate(${rot * 0.75}deg)`, opacity: 0.75, offset: 0.6 },
          { transform: `scale(0) translate(${driftX}px, ${driftY + 22}px) rotate(${rot}deg)`, opacity: 0 }
        ],
        {
          duration: 950 + Math.random() * 250,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }
      );

      anim.onfinish = () => {
        el.remove();
      };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;

      const x = e.clientX;
      const y = e.clientY;

      if (lastX === -100) {
        lastX = x;
        lastY = y;
        lastTime = e.timeStamp;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);

      // Spawn every ~36px of travel
      if (dist >= 36) {
        const angle = Math.atan2(dy, dx);
        const driftDistance = Math.min(dist * 0.35, 24);
        // Drift slightly perpendicular and opposite to travel direction for trailing ribbon feel
        const perpX = -Math.sin(angle) * (Math.random() * 12 - 6) - (dx / dist) * driftDistance;
        const perpY = Math.cos(angle) * (Math.random() * 12 - 6) - (dy / dist) * driftDistance;

        spawnParticle(x, y, perpX, perpY, 1);
        lastX = x;
        lastY = y;
        lastTime = e.timeStamp;
      }
    };

    // Burst on click
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const x = e.clientX;
      const y = e.clientY;
      const numBurst = 5;
      for (let i = 0; i < numBurst; i++) {
        const rad = (i / numBurst) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const power = 35 + Math.random() * 40;
        const bx = Math.cos(rad) * power;
        const by = Math.sin(rad) * power;
        spawnParticle(x, y, bx, by, 0.85);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="qs-cursor-trail-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden'
      }}
    />
  );
};
