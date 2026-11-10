'use client';

import React, { useEffect, useRef } from 'react';

const SIZES = {
  mobile: { height: 380, cardWidth: 170 },
  desktop: { height: 560, cardWidth: 220 }
};

const CARDS_DATA = [
  { action: 'Tested New Hook', timestamp: 'Yesterday, 3:28 AM', metric: '+$2,550' },
  { action: 'Refreshed a Fatiguing Ad', timestamp: 'Today, 11:28 AM', metric: '+$1,234' },
  { action: 'Generated 12 Creatives', timestamp: 'Today, 11:28 AM', metric: '+$3,891' },
  { action: 'Bulk Imported 50 Creatives', timestamp: 'Today, 1:37 PM', metric: '+$4,120' },
  { action: 'Resized Every Placement', timestamp: '2 days ago, 9:15 AM', metric: '+$2,780' },
  { action: 'Launched Seasonal Campaign', timestamp: '2 days ago, 2:42 PM', metric: '+$5,340' },
  { action: 'Drafted 6 Ad Variations', timestamp: '3 days ago, 4:18 PM', metric: '+$1,890' },
  { action: 'Found 7 Competitor Ads', timestamp: '3 days ago, 5:55 PM', metric: '+$6,250' },
  { action: 'A/B Tested 4 Variants', timestamp: 'Yesterday, 2:14 PM', metric: '+$2,940' },
  { action: 'Launched Search Campaign', timestamp: 'Today, 9:05 AM', metric: '+$3,210' },
  { action: 'Drafted Case Study Ad', timestamp: 'Today, 8:41 AM', metric: '+$1,760' },
  { action: 'Rotated In Fresh Creative', timestamp: '2 days ago, 10:02 AM', metric: '+$2,480' }
];

export default function AdsideCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const mediaQuery = window.matchMedia('(max-width: 760px)');
    let currentConfig = mediaQuery.matches ? SIZES.mobile : SIZES.desktop;
    const dpr = Math.min(1.3 * Math.max(window.devicePixelRatio || 1, 2), 3);

    const offscreen = document.createElement('canvas');
    let width = container.clientWidth || 1200;
    let height = currentConfig.height;

    function resize() {
      if (!container || !canvas) return;
      currentConfig = mediaQuery.matches ? SIZES.mobile : SIZES.desktop;
      width = container.clientWidth || width;
      height = currentConfig.height;

      const pw = Math.round(width * dpr);
      const ph = Math.round(height * dpr);

      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        offscreen.width = pw;
        offscreen.height = ph;
        if (ready) scheduleRender();
      }
    }

    let ready = false;
    resize();
    mediaQuery.addEventListener('change', resize);

    let progress = 0;
    let isAnimating = false;
    let animRaf = 0;
    let renderRaf = 0;
    let autoInterval: any = 0;

    const imageSources = Array.from({ length: 12 }, (_, i) => `/assets/carousel/${i + 1}.jpg`);
    let disposed = false;
    let isVisible = true;
    let isHovered = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const images: HTMLImageElement[] = [];
    const aspectRatios: number[] = [];
    let loadedCount = 0;

    const logoImg = new Image();
    let logoLoaded = false;
    logoImg.onload = () => {
      logoLoaded = true;
      scheduleRender();
    };
    logoImg.src = '/assets/carousel/logo.webp';

    imageSources.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => {
        aspectRatios[idx] = img.naturalHeight / (img.naturalWidth || 1);
        loadedCount++;
        scheduleRender();
        if (loadedCount === 12) {
          startAutoplay();
        }
      };
      img.src = src;
      images[idx] = img;
    });

    const offscreenCtx = offscreen.getContext('2d');
    const mainCtx = canvas.getContext('2d');

    function drawCard(
      ctx: CanvasRenderingContext2D,
      index: number,
      x: number,
      y: number,
      scale: number,
      opacity: number
    ) {
      if (!aspectRatios[index] || !images[index]?.complete) return;
      const cardW = currentConfig.cardWidth * scale;
      const cardH = currentConfig.cardWidth * aspectRatios[index] * scale;

      // 1. Draw rounded image
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.roundRect(x, y, cardW, cardH, 20 * scale);
      ctx.clip();
      ctx.drawImage(images[index], x, y, cardW, cardH);
      ctx.restore();

      // 2. Draw white camera corner brackets
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5 * scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const pad = 10 * scale;
      const arm = 12 * scale;
      const rad = 6 * scale;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(x + pad + arm, y + pad);
      ctx.arcTo(x + pad, y + pad, x + pad, y + pad + arm, rad);
      ctx.lineTo(x + pad, y + pad + arm);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(x + cardW - pad - arm, y + pad);
      ctx.arcTo(x + cardW - pad, y + pad, x + cardW - pad, y + pad + arm, rad);
      ctx.lineTo(x + cardW - pad, y + pad + arm);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(x + pad, y + cardH - pad - arm);
      ctx.arcTo(x + pad, y + cardH - pad, x + pad + arm, y + cardH - pad, rad);
      ctx.lineTo(x + pad + arm, y + cardH - pad);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(x + cardW - pad, y + cardH - pad - arm);
      ctx.arcTo(x + cardW - pad, y + cardH - pad, x + cardW - pad - arm, y + cardH - pad, rad);
      ctx.lineTo(x + cardW - pad - arm, y + cardH - pad);
      ctx.stroke();
      ctx.restore();

      // 3. Draw bottom floating metric pill
      if (logoLoaded) {
        ctx.save();
        ctx.globalAlpha = opacity;
        const data = CARDS_DATA[index];
        const insetX = 12 * scale;
        const pillW = cardW - 2 * insetX;

        const logoSize = 34 * scale;
        const gap = 10 * scale;

        const pillH = 58 * scale;
        const pillX = x + insetX;
        const pillY = y + cardH - pillH - insetX;

        // Shadow & background fill
        ctx.shadowColor = 'rgba(0, 0, 0, 0.16)';
        ctx.shadowBlur = 10 * scale;
        ctx.shadowOffsetY = 4 * scale;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillW, pillH, 12 * scale);
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Adside Logo Icon
        const iconY = pillY + (pillH - logoSize) / 2;
        ctx.drawImage(logoImg, pillX + 10 * scale, iconY, logoSize, logoSize);

        // Text details
        const textX = pillX + 10 * scale + logoSize + gap;
        const textY = pillY + pillH / 2;

        ctx.fillStyle = '#191c1e';
        ctx.font = `600 ${Math.max(9, 11 * scale)}px "Geist", -apple-system, sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';
        ctx.fillText(data.action, textX, textY - 1 * scale);

        ctx.fillStyle = '#73787e';
        ctx.font = `400 ${Math.max(8, 9 * scale)}px "Geist", -apple-system, sans-serif`;
        ctx.textBaseline = 'top';
        ctx.fillText(`${data.timestamp} · `, textX, textY + 2 * scale);

        const tsWidth = ctx.measureText(`${data.timestamp} · `).width;
        ctx.fillStyle = '#00875a';
        ctx.font = `600 ${Math.max(8, 9.5 * scale)}px "Geist", -apple-system, sans-serif`;
        ctx.fillText(data.metric, textX + tsWidth, textY + 2 * scale);

        ctx.restore();
      }
    }

    function renderScene() {
      if (!mainCtx || !offscreenCtx || disposed || !isVisible || document.hidden) return;

      const cw = offscreen.width / dpr;
      const ch = offscreen.height / dpr;
      const cardSpacing = currentConfig.cardWidth + 16;
      const visibleRange = Math.ceil(cw / cardSpacing) + 6;
      const baseIdx = Math.floor(progress) - Math.floor(visibleRange / 2);

      const visibleCards: {
        index: number;
        x: number;
        y: number;
        scale: number;
        opacity: number;
      }[] = [];

      for (let i = 0; i < visibleRange; i++) {
        const itemProg = baseIdx + i;
        const normalized = ((itemProg % 12) + 12) % 12;
        if (!images[normalized]?.complete || !aspectRatios[normalized]) continue;

        const posX = cw / 2 + (itemProg - progress) * cardSpacing;
        const distFromCenter = Math.abs(posX - cw / 2) / cardSpacing;
        const scale = Math.pow(0.88, distFromCenter);
        const cardW = currentConfig.cardWidth;
        const cardH = cardW * aspectRatios[normalized];
        const left = posX - (cardW * scale) / 2;
        const top = ch / 2 - (cardH * scale) / 2;

        if (left + cardW * scale < -50 || left > cw + 50) continue;

        visibleCards.push({
          index: normalized,
          x: left,
          y: top,
          scale,
          opacity: Math.max(0.65, 1 - 0.06 * distFromCenter)
        });
      }

      // Paint on offscreen canvas
      offscreenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offscreenCtx.clearRect(0, 0, cw, ch);

      for (const card of visibleCards) {
        drawCard(offscreenCtx, card.index, card.x, card.y, card.scale, card.opacity);
      }

      // Blit to screen
      if (!canvas) return;
      mainCtx.setTransform(1, 0, 0, 1, 0, 0);
      mainCtx.clearRect(0, 0, canvas.width, canvas.height);
      mainCtx.drawImage(offscreen, 0, 0);
    }

    function scheduleRender() {
      if (disposed || renderRaf || !isVisible || document.hidden) return;
      renderRaf = requestAnimationFrame(() => {
        renderRaf = 0;
        renderScene();
      });
    }

    ready = true;
    scheduleRender();

    let targetProgress = progress;

    function stopAnim() {
      cancelAnimationFrame(animRaf);
      animRaf = 0;
      if (isAnimating) {
        progress = ((targetProgress % 12) + 12) % 12;
      }
      isAnimating = false;
    }

    function stopAutoplay() {
      if (autoInterval) clearInterval(autoInterval);
      autoInterval = 0;
    }

    function startAutoplay() {
      stopAutoplay();
      if (disposed || loadedCount !== 12 || !isVisible || document.hidden || reducedMotion.matches || isHovered)
        return;
      autoInterval = setInterval(() => {
        if (!isAnimating) step(1);
      }, 3500);
    }

    function step(delta: number) {
      if (disposed || isAnimating || !isVisible || document.hidden) return;
      const startP = progress;
      targetProgress = progress + delta;

      if (reducedMotion.matches) {
        progress = ((targetProgress % 12) + 12) % 12;
        scheduleRender();
        return;
      }

      isAnimating = true;
      const startTime = performance.now();
      const duration = 1000;

      const animate = (now: number) => {
        const elapsed = Math.min(1, (now - startTime) / duration);
        // Cubic ease in/out
        const t = elapsed < 0.5 ? 4 * elapsed * elapsed * elapsed : 1 - Math.pow(-2 * elapsed + 2, 3) / 2;
        progress = startP + (targetProgress - startP) * t;
        scheduleRender();

        if (elapsed < 1) {
          animRaf = requestAnimationFrame(animate);
        } else {
          progress = ((targetProgress % 12) + 12) % 12;
          isAnimating = false;
          animRaf = 0;
        }
      };

      animRaf = requestAnimationFrame(animate);
    }

    // Pointer gesture interaction
    let startX: number | null = null;
    let startTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      startX = e.clientX;
      startTime = Date.now();
      stopAutoplay();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (startX === null) return;
      const deltaX = e.clientX - startX;
      const dt = Date.now() - startTime;

      if (Math.abs(deltaX) > 40) {
        step(deltaX > 0 ? -1 : 1);
      } else if (dt < 250) {
        const rect = canvas.getBoundingClientRect();
        step(e.clientX < rect.left + width / 2 ? -1 : 1);
      }
      startX = null;
      isHovered = false;
      startAutoplay();
    };

    const onPointerCancel = () => {
      startX = null;
      isHovered = false;
      startAutoplay();
    };

    const onMouseEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && loadedCount === 12) {
        isHovered = true;
        stopAutoplay();
      }
    };

    const onMouseLeave = () => {
      isHovered = false;
      startAutoplay();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
    canvas.addEventListener('pointerenter', onMouseEnter);
    canvas.addEventListener('pointerleave', onMouseLeave);
    window.addEventListener('resize', resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(renderRaf);
      stopAnim();
      stopAutoplay();
      logoImg.onload = null;
      images.forEach((img) => {
        img.onload = null;
      });
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      canvas.removeEventListener('pointerenter', onMouseEnter);
      canvas.removeEventListener('pointerleave', onMouseLeave);
      window.removeEventListener('resize', resize);
      mediaQuery.removeEventListener('change', resize);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '120%', marginLeft: '-10%' }}>
      <div className="hero-carousel" style={{ position: 'relative', width: '100%', marginTop: 16 }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Carousel of Adside ad creatives with performance results"
          style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab' }}
        />
      </div>
    </div>
  );
}
