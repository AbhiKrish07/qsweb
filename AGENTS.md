# AGENTS.md — Quiet Studio Agent Directives

> This file configures AI coding agents working on Quiet Studio. It binds the 7 intelligence toolkits located in `Skills AI/` to our daily development and design workflows.

---

## 1. Skill Catalog & Intent Routing

When working on Quiet Studio, follow these skill mappings:

| Task Type | Applied Skills | Reference Path |
|---|---|---|
| **UI Design, Styling & Polish** | `anti-slop-ui`, `taste-skill`, `ui-ux-pro-max` | `Skills AI/anti-slop-main/skills/antislop-ui/`<br/>`Skills AI/taste-skill-main/skills/taste-skill/` |
| **Copywriting & Manifesto** | `antislop-copywriting` | `Skills AI/anti-slop-main/skills/antislop-copywriting/` |
| **Mobile & Responsive Layouts** | `antislop-layoutmobile`, `ui-ux-pro-max` | `Skills AI/anti-slop-main/skills/antislop-layoutmobile/` |
| **Planning & Task Breakdown** | `writing-plans`, `brainstorming` | `Skills AI/antigravity-superpowers-main/src/skills/` |
| **Verification & Quality Gate** | `verification-before-completion`, `anti-slop` | `Skills AI/antigravity-superpowers-main/src/skills/verification-before-completion/` |
| **Architecture & Token Hygiene** | `context-engineering-kit`, `agent-skills` | `Skills AI/context-engineering-kit-master/`<br/>`Skills AI/agent-skills-main/` |
| **AI Lab & Agent Models** | `antigravity-sdk-python` | `Skills AI/antigravity-sdk-python-main/` |

---

## 2. Anti-Slop & Craftsmanship Standard

Always enforce **Anti-Slop Mode 1 (During)**:
1. **No Unmotivated Aesthetics**: Reject generic AI blue-to-purple gradients, ubiquitous pill shapes, excessive glassmorphism, floating shadows with no light source, and fake terminal windows.
2. **Quiet Studio Design Language**:
   - Palette: Charcoal (`#141413`), warm paper background (`#faf9f5`), muted ink (`#71717a`), and signal orange (`#ff5a1f`).
   - Typography: High-craft grotesque headings (`DM Sans` / `Cabinet Grotesk`) with tabular mono coordinates (`JetBrains Mono`).
   - Physicality: Subtle physical paper grain, clean hairline dividers, tactile button click sounds (`playClick()`), and smooth GSAP easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
3. **The Craftsmanship Standard (C-1 to C-5)**:
   - **Intentionality (C-1)**: Every component exists for an explicit, stated reason.
   - **Functional Completeness (C-2)**: Interactive controls must be wired and fully functional.
   - **Content-Driven Composition (C-3)**: Layouts are derived from Quiet Studio's actual products and essays, not generic templates.
   - **Resilience (C-4)**: Test all viewports (mobile 390px to desktop 4K), themes (light/dark), and error states.
   - **Evidence Over Claims (C-5)**: Real performance numbers and honest capabilities only.

---

## 3. Engineering & Delivery Lifecycle

Before claiming any task is complete:
1. Run `pnpm check` (zero TypeScript errors).
2. Run `pnpm run build` (successful production bundle).
3. Verify live endpoints (e.g. `/api/waitlist`) and UI responsiveness.
4. Stage, commit with clear semantic messages, and push to `origin main`.
