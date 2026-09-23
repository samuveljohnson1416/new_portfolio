# Portfolio Motion Upgrade — Claude Code Sprint Brief

## Mission

Upgrade the portfolio at `samuveljohnson.me` with expressive, modern motion that strengthens its existing terminal/cyber aesthetic while keeping the site fast, readable, keyboard-friendly, and comfortable on mobile.

This is a refinement sprint, not a redesign. Preserve the current dark palette, neon green/cyan/pink accents, JetBrains Mono/Space Grotesk typography, page routing, GitHub project fetching, and EmailJS contact flow.

## Repository context

- Stack: Next.js 14 (App Router, static export), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide.
- Existing motion system: Framer Motion is already installed and used throughout. Do **not** add a new animation library.
- Pages: `src/views/Home.tsx`, `Projects.tsx`, `About.tsx`, `Resume.tsx`, `Contact.tsx`.
- Shared components: `src/components/layouts/Navigation.tsx` and `src/components/shared/AnimatedBackground.tsx`.
- Global styles and existing accessibility baseline: `src/index.css`.
- Routes are wrapped in `AnimatePresence` in `src/App.tsx`.

## Product guardrails

1. Motion must clarify hierarchy, feedback, or navigation. Do not add decorative motion everywhere.
2. No autoplay video, audio, canvas/WebGL, scroll hijacking, cursor replacement, or heavy 3D scenes.
3. Use transforms and opacity for animation; avoid layout-thrashing properties.
4. Respect `prefers-reduced-motion` in JavaScript as well as the existing CSS rule. Reduced-motion users should see content immediately and receive no loops, typewriter effect, count-up, or magnetic movement.
5. Do not hide actionable content behind an animation. Buttons and links must work immediately.
6. Keep touch interfaces intentional: hover-only effects must have a sensible static mobile state.
7. Do not alter external-link behavior, project-fetching logic, API keys, or `.env*` files.

## Definition of done

- `npm run lint` and `npm run build` pass.
- Desktop (1440px) and mobile (390px) have no horizontal overflow, clipped content, or inaccessible controls.
- Keyboard focus is always visible; `Tab`, `Enter`, and `Escape` work normally.
- With reduced motion enabled, page content is visible immediately and interactive motion is disabled.
- Initial page load stays visually calm: the hero finishes its essential reveal in at most 1.2 seconds.
- No new runtime dependencies are added.

## Scope and priorities

The completed items below are intentionally excluded. Implement the remaining P0 work fully. P1 is required only if P0 is clean and verified. P2 is explicitly out of scope for this sprint.

| Priority | Feature | Outcome |
| --- | --- | --- |
| P0 | Shared motion foundation | One consistent reduced-motion-aware system and reusable variants, excluding shipped stat and CTA components |
| P0 | Hero terminal sequence | A short, premium terminal boot/reveal that does not delay interaction |
| P0 | Project command reveal | Project cards enter as a staggered `ls projects/`-style result, including filtering changes |
| P1 | Navigation command treatment | Refine route changes and mobile menu to feel like command navigation |
| P1 | Background performance pass | Reduce visual noise and prevent duplicated background logic |
| P2 | Skill orbit, custom cursor, full-page transitions | Defer: these are more likely to hurt clarity/performance than help |

## Already implemented

- **One-time stat count-up:** `src/components/motion/CountUp.tsx` animates numeric homepage stats once in view and returns the final value immediately for reduced-motion visitors.
- **Magnetic CTA feedback:** `src/components/motion/MagneticButton.tsx` provides small, fine-pointer-only movement for the three homepage CTAs, resets on leave/blur, and disables movement for reduced-motion visitors and touch/coarse-pointer devices.

## Remaining implementation plan

### 1. Create the motion foundation (P0)

Add small, focused utilities under `src/components/motion/`:

- `useMotionPreference.ts`: wrap Framer Motion's `useReducedMotion`; expose a boolean that is safe during initial render.
- `motionConfig.ts`: named, typed variants and transition tokens. Suggested tokens:
  - `fast`: 0.18s
  - `base`: 0.32s
  - `enter`: 0.48s
  - easing: `[0.22, 1, 0.36, 1]`

Use `useInView(..., { once: true, amount: 0.35 })` from Framer Motion where useful. Keep all animation durations and offsets in the foundation rather than scattering magic values through pages.

### 2. Refine the Home hero (P0)

Modify `src/views/Home.tsx` without changing its information architecture.

**Terminal boot sequence**

- Keep the terminal window and its existing copy.
- Replace the long, per-character 100ms typewriter sequence with a compact staged reveal:
  1. terminal chrome fades/scales in (0–250ms);
  2. `whoami` and specialties lines reveal in two short steps;
  3. the final message types at 20–30ms per character or appears in a short fade, completing by 1.2s total.
- Do not make this a session-persisted splash screen. It should simply be the hero's normal first-render animation.
- A cursor may blink only after the copy is shown. Stop it when reduced motion is on.

**Name and supporting copy**

- Keep the current subtle entrance; compress the combined timing so the heading and CTAs are usable immediately.
- Do not use a continuous glitch effect on the name. A one-time, extremely light chromatic flicker is acceptable only if it remains readable.

### 3. Make project discovery feel terminal-native (P0)

Modify `src/views/Projects.tsx`.

- Add a visually subtle, accessible status line before project grids, for example: `$ ls projects/ --featured` or `$ find projects -category <selected>`.
- The status must be ordinary visible text, not an ARIA-only announcement. Update it when category/search/persona changes.
- When loading completes or filters change, use `AnimatePresence` with a keyed grid and staggered card entrance. Each card should translate only 12–20px and fade in; avoid large fly-ins.
- Reuse the current cards and controls. Do not turn cards into hidden details or remove GitHub/live links.
- Card hover: keep the lift, add a 150–200ms border/glow intensification, and avoid continuous icon rotation.
- Make filter updates feel responsive: no entrance animation longer than 300ms, and no card should animate more than once per filter update.

### 4. Refine navigation and shared backgrounds (P1)

**Navigation — `src/components/layouts/Navigation.tsx`**

- Preserve all routes and current menu behavior.
- On navigation, let the active indicator glide to the new item (the existing `layoutId` is a good base).
- Change the small route label below `SJ` into a short command-style label, e.g. `~/projects`, with a 150ms crossfade when location changes.
- Keep the mobile drawer behavior. Stagger its entries by no more than 40ms each and ensure the menu close button remains focusable.

**Background — `src/components/shared/AnimatedBackground.tsx` and `Home.tsx`**

- Eliminate duplicated background implementation by reusing `AnimatedBackground` from Home or extracting a single configurable version.
- Lower the noise on mobile: roughly 8–10 matrix strings and 10–12 particles max; retain current desktop density only if performance is smooth.
- Freeze or remove loops for reduced-motion users.
- Set backgrounds to `aria-hidden="true"` and non-interactive.
- Keep random values stable for the component lifetime; do not recompute them on every render.

## Suggested file plan

| File | Change |
| --- | --- |
| `src/components/motion/useMotionPreference.ts` | Add reduced-motion hook |
| `src/components/motion/motionConfig.ts` | Add shared variants/timing tokens |
| `src/components/shared/AnimatedBackground.tsx` | Make configurable, reduced-motion-aware, aria-hidden |
| `src/views/Home.tsx` | Use shared background/motion utilities; revise hero, stats, CTAs |
| `src/views/Projects.tsx` | Add command status line and restrained keyed grid/card transitions |
| `src/components/layouts/Navigation.tsx` | Add command-style route label and tighten menu motion |
| `src/index.css` | Only minimal CSS needed for the command cursor/status; preserve existing global a11y rules |

## Acceptance test checklist

### Functional

- [ ] Hero CTAs navigate to the existing routes.
- [ ] Social and project links retain their current URLs and open behavior.
- [ ] Project search, category filter, refresh, persona ordering, loading, error, and empty states still work.
- [ ] Mobile menu opens, closes, navigates, and does not leave an invisible overlay.

### Motion and accessibility

- [ ] With normal motion, the terminal reveal feels intentional but completes within 1.2s.
- [ ] Project-grid transitions are short and do not re-run endlessly.
- [ ] With DevTools “prefers reduced motion: reduce”, all final values/content render immediately; no background loops, blinking cursor, count-up, magnetic movement, or stagger delay remains.
- [ ] Focus rings are still visible and controls do not shift enough to make keyboard selection confusing.

### Verification commands

```bash
npm run lint
npm run build
npm run dev
```

Manually inspect `/`, `/projects`, `/about`, `/resume`, and `/contact` at 390px and 1440px. Use browser DevTools to emulate reduced motion and a coarse pointer.

## Delivery expectations for Claude Code

1. Inspect current code before editing and preserve unrelated user changes.
2. Implement P0 first, run the checks, then decide whether P1 fits without compromising P0 quality.
3. Do not install packages.
4. In the final response, list changed files, validation results, and any deliberately deferred item.

## Copy-paste prompt for Claude Code

```text
Implement the P0 portfolio motion upgrade described in CLAUDE_CODE_ANIMATION_SPRINT.md. This is a Next.js 14 + React 18 + TypeScript + Tailwind + Framer Motion project. Preserve the terminal/neon visual identity, existing routes, GitHub project fetching, and EmailJS flow. Do not add dependencies.

Create a reduced-motion-aware motion foundation, then update Home with a compact terminal reveal. The count-up stats and fine-pointer-only magnetic CTAs are already implemented; preserve them. Update Projects with a readable terminal-style result/status line and short staggered card transitions for initial data load and filter updates. Ensure `prefers-reduced-motion` disables all nonessential JS motion, not only CSS animation. Avoid scroll hijacking, custom cursors, canvas/WebGL, autoplay media, and long/continuous effects.

Run `npm run lint` and `npm run build`, inspect desktop and mobile behavior, and report the changed files plus results. Do not implement P1 unless P0 is complete and verified.
```
