# Scroll-Driven StackedCardCarousel

Date: 2026-06-28

## Goal

Page scroll advances the cards in `StackedCardCarousel`. The About section pins while the user scrolls through the deck, then releases once the last card is reached. Each scroll tick maps to one card (snap feel), matching the existing per-card spring transition.

## Why

Today the only ways to advance the carousel are click-and-drag, dot clicks, or wheel-while-hovering. Drag and dot clicks remain useful, but most users won't discover them, so the carousel reads as static. Pinning the section and using scroll as the primary navigation makes the deck behave the way modern scroll-driven storytelling sections do (consistent with the existing `scrollsmoother` / parallax work elsewhere in the site).

## Behavior

- When the About section reaches `center center`, ScrollTrigger pins it.
- The page now consumes a synthetic scroll distance of `(cards.length - 1) * SCROLL_PX_PER_CARD` (default `400`).
- As scroll progresses, the active card index is computed as `Math.round(progress * (cards.length - 1))`.
- Snap config makes each tick of the scroll wheel land on the next/previous card.
- Scrolling up reverses through cards.
- After progress reaches `1`, ScrollTrigger releases the pin and normal page scroll resumes.
- The pill carousel on the right keeps auto-playing throughout, unchanged.
- Drag-to-swipe and dot-click still work. When the user advances via drag or dots, the page scroll position is synced to the matching ScrollTrigger progress via `ScrollTrigger.scroll()` so the next wheel tick doesn't snap back.

## Component changes

### `StackedCardCarousel`

Add two optional props:

- `activeIndex?: number` — when provided, the component runs in controlled mode.
- `onActiveIndexChange?: (index: number) => void` — fired on drag, dot click, or any internal index change.

Controlled mode rules:
- Internal `activeIndex` state syncs to the prop via `useEffect`.
- Wheel-to-navigate handler is disabled in controlled mode (ScrollTrigger owns scroll).
- Drag and dot-click set the internal state AND call `onActiveIndexChange` so the parent can sync.

Uncontrolled mode (no `activeIndex` prop) preserves today's behavior exactly.

### `About.tsx`

- Becomes a client component (`"use client"`).
- Holds `const [activeIndex, setActiveIndex] = useState(0)`.
- Holds a `useRef` on the `<section>`.
- One `useGSAP` (or `useLayoutEffect`) block creates a `ScrollTrigger` with:
  - `trigger: sectionRef.current`
  - `pin: true`
  - `start: "center center"`
  - `end: () => "+=" + ((CARD_COUNT - 1) * SCROLL_PX_PER_CARD)`
  - `scrub: 0.5`
  - `snap: { snapTo: 1 / (CARD_COUNT - 1), duration: 0.25, delay: 0.05 }`
  - `onUpdate(self)` → `setActiveIndex(Math.round(self.progress * (CARD_COUNT - 1)))`
- Cleans up the ScrollTrigger on unmount.
- Passes `activeIndex` + `onActiveIndexChange` into `<StackedCardCarousel>`.
- `onActiveIndexChange` sets local state AND syncs page scroll via `ScrollTrigger.scroll(start + (i / (CARD_COUNT - 1)) * length)` so non-scroll inputs stay consistent with pin progress.

### Tunable constants (top of `About.tsx`)

```ts
const SCROLL_PX_PER_CARD = 400;
const SNAP_DURATION = 0.25;
```

## Out of scope

- No change to `ThreeDPillCarousel`.
- No change to ScrollSmoother config or other sections.
- No change to the existing drag / dot-click visual behavior.

## Risks / open questions

- **CARD_COUNT source**: The default cards live inside `StackedCardCarousel`. About.tsx doesn't know the count today. Simplest fix: hoist the cards array (or its length) to About.tsx and pass `cards` as a prop. Acceptable; matches the controlled-mode direction.
- **ScrollSmoother interaction**: ScrollSmoother and ScrollTrigger play together but the pin must use the smoother's scroll proxy. Verify by reading the relevant guide in `node_modules/next/dist/docs/` and the GSAP ScrollSmoother docs before wiring up.
- **Drag-sync edge case**: If drag triggers `ScrollTrigger.scroll(...)` during an active scrub, expect a small visual hiccup. Acceptable for v1; revisit if it looks bad.
