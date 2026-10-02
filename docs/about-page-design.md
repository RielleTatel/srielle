# About page design

The `/about` page uses a light monochrome palette, a portrait-led introduction, fine dividers, and generous whitespace. It retains the homepage navigation, grid, ambient background, and paper texture, with a white base and neutral grid lines. It has no theme controls. Its palette and layout styles are scoped to the about page; the homepage keeps its existing appearance.

Design configuration: `DESIGN_VARIANCE: 5`, `MOTION_INTENSITY: 3`, `VISUAL_DENSITY: 3`. The foundation is the existing Tailwind v4, Geist, Geist Mono, and Lucide stack, with native CSS for the portfolio layout. Photos and recognition panels use a 12px radius. Motion is limited to link feedback and disclosure indicators, with reduced-motion support.

The profile name uses the homepage headline's bold Geist Sans, tight tracking, and compact line height. The intro follows the homepage subtitle's font size, muted color, and line height. Both render immediately, without blur, entry, typing, shaking, or scroll animations.

## Existing-page audit

The prior about page inherited the homepage's green palette and textured grid. It used a very large heading, a framed portrait, and four alternating image-and-text stories. The redesign keeps the four subject areas, real event photography, `/about`, `#about-stories`, the primary navigation labels, and the page's metadata. It replaces the repeated split sections with photo stories, compact experience disclosures, a wide speaking image, recognition panels, and an affiliation list.

## Content source

The original about page supplies the personal narrative and photographs. The user-provided `GAB TATEL DATABASE.pdf` supplies the additional roles, affiliations, BuildLabs dates, participant counts, and competition results. Anyam's tenure now starts in May 2026. The debate result is the 36th breaking team at the 24th National Debate Championship.

## Portrait asset

- Source: `public/contact/portrait.png`.
- Output: `public/aboutSection/portrait-monochrome.webp`.
- Created with the built-in ImageGen tool, then resized and encoded as WebP with its alpha channel preserved.
- The original portrait remains unchanged.

Exact generation prompt:

> Edit the provided existing portrait photograph for a minimalist personal portfolio website. Use-case: background-removal. Preserve the EXACT identity, facial features, proportions, expression, hairstyle, pose, black turtleneck, and realistic photographic detail of the man in the source. Do not redraw or beautify the face. Remove only the dark studio background, output a clean genuinely transparent alpha background with precise natural hair edges. Convert the subject to neutral black-and-white grayscale with soft balanced contrast. Frame a bust portrait from the top of the hair to the upper waist, with shoulders visible, subject centered, tighter than the original with only a small transparent margin above the hair. The visual should resemble a refined monochrome editorial photo cutout that sits directly on an off-white webpage. No text, no graphics, no new clothing, no border, no frame, no drop shadow, no colored tint.

## Verification

- Production build and TypeScript checks pass.
- ESLint passes for the changed components.
- Text contrast: primary 15.98:1, muted 5.62:1, accent 7.32:1 against the page background.
- Production Lighthouse desktop: performance 99, accessibility 100, best practices 100, SEO 100; LCP 1.0s, CLS 0.
- Mobile Lighthouse with DevTools network and CPU throttling: performance 95, accessibility 100, best practices 100, SEO 100; LCP 2.3s, CLS 0.001. The default simulated mobile run measured 82 performance and 5.0s LCP, while the directly throttled audit measured 95 and 2.3s.
- Desktop and mobile screenshots reviewed for heading fit, visible calls to action, image crops, and responsive section layouts.
- Images reserve their dimensions, the portrait loads eagerly with high fetch priority, and event images are lazy loaded.
- Multi-column sections explicitly become single-column below 768px.
- The about page uses native scrolling; the homepage retains its existing scroll behavior.
