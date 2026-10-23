# Quiet Studio: Celestial Twilight Hero & Lenis Scroll Design

**Date:** 2026-10-23  
**Status:** Approved  
**Topic:** Redesign Quiet Studio landing page with celestial twilight aesthetic, floating pill nav, 3D constellation & starfield, Lenis smooth scrolling, and tactile paper card emergence.

---

## 1. Overview & Vision

Transform Quiet Studio's primary landing experience into a high-craft celestial editorial experience matching the provided design:
- **Atmospheric Palette**: Deep twilight-to-midnight royal blue gradient with glowing constellations and twinkling stars.
- **Floating Pill Navigation**: Centered frosted-glass pill navbar with studio mark, navigation links, and subtle backdrop blur.
- **Hero Typography & Badge**:
  - Announcement badge: `Meet Guided Sleep Plans >` (pill with luminous border).
  - Editorial headline: `"We make software we're proud of"` in high-contrast editorial serif.
  - Subtitle: `"A tiny studio with unreasonable standards. We make our own apps, design brands, and build software for people who notice the difference."`
  - Subtle animated down chevron indicating scroll interaction.
- **Tactile Ivory Paper Card**:
  - Positioned emerging from the bottom: `"We are nerds."` on warm physical cream cardstock (`#faf8f5`) with tactile drop shadows and letterpress typography.
  - As the user scrolls, this card lifts up, scales into view, and transitions into the core products and manifesto.
- **Animation & 3D Engine**:
  - **Lenis Smooth Scroll**: Butter-smooth inertial scrolling across the entire page, bound to GSAP ScrollTrigger.
  - **WebGL Celestial Engine (`CelestialSkyCanvas`)**: Three.js/Vanta-inspired nodal constellation network + twinkling starfield with pointer tilt parallax.
  - **GSAP ScrollTrigger**: Scrubbed perspective card reveal and parallax depth.

---

## 2. Component Architecture

### 2.1 `client/src/components/CelestialSkyCanvas.tsx`
- Interactive WebGL canvas using Three.js.
- **Starfield**: 400+ points distributed in 3D space with subtle randomized twinkle shader/animation.
- **Constellation Wireframe**: Central nodal ring cluster behind the badge, rotating slowly (`rotation.y += 0.002`). Connecting line segments between nearby nodes.
- **Mouse Parallax**: Smooth lerping of camera angle based on cursor coordinates for realistic depth.
- **Performance**: Pauses when scrolled out of view via `IntersectionObserver`.

### 2.2 `client/src/components/CelestialPillNav.tsx`
- Centered floating header pill on top of the hero:
  - Studio mark droplet / logo.
  - Links: `Peaks`, `Whistle`, `Updates`, `Help Center` (or studio mapping: `Products`, `Manifesto`, `Research`, `Notes`).
  - Action trigger: `Start a conversation` or quick command.
  - Mobile responsive drawer toggle.

### 2.3 `client/src/components/TactileManifestoCard.tsx`
- Physical warm cream paper card (`#faf8f5`) with textured grain overlay.
- Heading: `"We are nerds."`
- Body: `"We build for awe, not engagement. For more hours of deep work, not more minutes of screen time. Quiet Studio is an independent studio crafting calm, opinionated tools."`
- Seamlessly connects into the studio products list (`LearnLoop`, `Whitespace`, `Aethel`, `Capture`).

### 2.4 Lenis Smooth Scroll Integration
- Integrate `lenis` smooth scroll in the root application layout (`AppShell` or `App.tsx`).
- Synchronize with GSAP `ScrollTrigger`:
  ```ts
  const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  ```

---

## 3. Styling & Craft Standards

- **Color Tokens**:
  - Sky Deep: `#050c26`
  - Sky Horizon: `#1b438e`
  - Sky Bright: `#275eb8`
  - Card Paper: `#faf8f5`
  - Ink Primary: `#18181b`
  - Ink Muted: `#71717a`
  - Pill Glass: `rgba(255, 255, 255, 0.12)` with `backdrop-filter: blur(16px)` and border `rgba(255, 255, 255, 0.18)`
- **Typography**:
  - Display Headline: High-contrast editorial serif (`Playfair Display` / `Instrument Serif` / `Georgia` fallback) with crisp tracking and leading.
  - Subtitle: Modern grotesque sans (`DM Sans` / `Inter`).
  - Tactile Card: Editorial serif title with tactile letterpress texture.
