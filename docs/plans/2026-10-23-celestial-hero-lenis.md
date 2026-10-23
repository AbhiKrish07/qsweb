# Celestial Twilight Hero, Lenis Smooth Scroll & 3D Constellation Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Transform the Quiet Studio landing page into the celestial twilight aesthetic featuring a floating frosted pill nav, high-performance Three.js/Vanta-inspired constellation starfield, editorial serif headline, Lenis smooth scrolling, and a tactile paper manifesto card rising on scroll.

**Architecture:** A Three.js WebGL canvas renders a responsive starry sky and rotating constellation net with pointer parallax. Lenis smooth-scroll hooks into GSAP's ticker to drive scrubbed ScrollTrigger animations that elevate and flatten the tactile cream card over the celestial hero as the user scrolls into the studio products.

**Tech Stack:** React 19, TypeScript, Three.js, GSAP 3.15 + ScrollTrigger, Lenis smooth scrolling, Tailwind CSS / Vanilla CSS tokens.

---

### Task 1: Install & Configure Lenis Smooth Scroll

**Files:**
- Modify: `package.json`
- Create: `client/src/lib/lenis.ts`
- Modify: `client/src/App.tsx:280-315`

**Step 1: Install `lenis` package**
Run: `pnpm add lenis`
Expected: Successfully added `lenis` to `package.json` and `pnpm-lock.yaml`.

**Step 2: Create Lenis lifecycle controller with GSAP ticker binding**
Create `client/src/lib/lenis.ts`:
Initialize Lenis instance, bind `lenis.on('scroll', ScrollTrigger.update)`, bind `gsap.ticker.add((time) => lenis.raf(time * 1000))` with `lagSmoothing(0)`.

**Step 3: Mount Lenis in `App.tsx`**
Initialize Lenis inside `AppShell` in an effect so smooth scrolling activates across the entire app.

**Step 4: Verify TypeScript compilation**
Run: `pnpm check`
Expected: 0 errors.

**Step 5: Commit**
```bash
git add package.json pnpm-lock.yaml client/src/lib/lenis.ts client/src/App.tsx
git commit -m "feat(scroll): integrate Lenis smooth scrolling with GSAP ticker"
```

---

### Task 2: Build `CelestialSkyCanvas.tsx` (3D Starfield & Constellation Network)

**Files:**
- Create: `client/src/components/CelestialSkyCanvas.tsx`

**Step 1: Create Three.js Starfield and Constellation Geometry**
Build component with:
- 400+ twinkling star particles with depth variance.
- Connected geometric nodal constellation ring cluster centered behind the hero badge, slowly rotating.
- Dynamic pointer tilt (lerping `camera.position.x` and `camera.position.y` on mouse movement).
- Responsive resize handler and IntersectionObserver pause mechanism when scrolled out of view.

**Step 2: Verify component TypeScript check**
Run: `pnpm check`
Expected: 0 errors.

**Step 3: Commit**
```bash
git add client/src/components/CelestialSkyCanvas.tsx
git commit -m "feat(3d): add CelestialSkyCanvas with constellation network and starfield"
```

---

### Task 3: Build `CelestialPillNav.tsx` (Floating Frosted Header Pill)

**Files:**
- Create: `client/src/components/CelestialPillNav.tsx`
- Modify: `client/src/index.css`

**Step 1: Create floating pill nav component**
Render centered frosted pill containing:
- Studio droplet mark
- Navigation links (`Peaks`, `Whistle`, `Updates`, `Help Center` / studio apps)
- Mobile drawer trigger and action buttons

**Step 2: Add styles in `client/src/index.css`**
Add glassmorphism tokens, hairline borders, responsive media queries for mobile viewports.

**Step 3: Verify TypeScript & styles**
Run: `pnpm check`
Expected: 0 errors.

**Step 4: Commit**
```bash
git add client/src/components/CelestialPillNav.tsx client/src/index.css
git commit -m "feat(nav): add CelestialPillNav floating frosted navbar"
```

---

### Task 4: Build `TactileManifestoCard.tsx` (Rising Paper Card)

**Files:**
- Create: `client/src/components/TactileManifestoCard.tsx`
- Modify: `client/src/index.css`

**Step 1: Create tactile paper card component**
Render warm ivory textured card with:
- Physical paper background (`#faf8f5`) and subtle edge grain.
- Letterpress serif title: `"We are nerds."`
- Body copy: `"We build for awe, not engagement. For more hours of deep work, not more minutes of screen time. Quiet Studio is an independent studio crafting calm, opinionated tools."`
- Seamless connection into the products grid.

**Step 2: Add card elevation and perspective styles**
Add CSS for 3D perspective tilt (`rotateX`), shadow diffusion, and paper texture.

**Step 3: Commit**
```bash
git add client/src/components/TactileManifestoCard.tsx client/src/index.css
git commit -m "feat(ui): add TactileManifestoCard with paper texture and letterpress typography"
```

---

### Task 5: Integrate into `client/src/pages/Home.tsx` with GSAP Scrubbing

**Files:**
- Modify: `client/src/pages/Home.tsx`
- Modify: `client/src/index.css`

**Step 1: Assemble Celestial Hero in `Home.tsx`**
Mount:
- `CelestialSkyCanvas`
- `CelestialPillNav`
- Announcement pill badge: `Meet Guided Sleep Plans >`
- Large serif headline: `"We make software we're proud of"`
- Subtitle: `"A tiny studio with unreasonable standards. We make our own apps, design brands, and build software for people who notice the difference."`
- Oscillating scroll chevron `∨`
- `TactileManifestoCard` peaking into the bottom of the viewport

**Step 2: Wire GSAP ScrollTrigger scrub timeline**
On scroll:
- Celestial sky softly fades and pushes back.
- Tactile paper card smoothly un-tilts (`rotateX(10deg)` -> `0deg`), elevates, and scales into center stage.

**Step 3: Run TypeScript and build check**
Run: `pnpm check && pnpm run build`
Expected: Both pass with 0 errors.

**Step 4: Commit**
```bash
git add client/src/pages/Home.tsx client/src/index.css
git commit -m "feat(home): assemble celestial hero and GSAP scrubbed card elevation"
```

---

### Task 6: Visual & Responsive Verification

**Files:**
- Review: `client/src/pages/Home.tsx`, `client/src/index.css`

**Step 1: Launch dev server and inspect visually**
Run `pnpm run dev` and test with browser subagent or curl to verify rendering, responsiveness across desktop & mobile (390px to 4K), 60fps canvas animation, and Lenis scroll feel.

**Step 2: Final build check**
Run `pnpm check && pnpm run build`
Expected: Clean build.

**Step 3: Final Commit**
```bash
git add -A
git commit -m "feat: complete celestial twilight hero with Lenis scroll and 3D constellation"
```
