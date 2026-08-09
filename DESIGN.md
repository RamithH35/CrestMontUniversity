# Design System — College Events Site

Synthesized from: Villa Kujoyama (primary), Vellura (secondary), RIPE (accent elements), Paxton University (page flow)

---

## 1. Color

| Token | Value | Source |
|---|---|---|
| `bg-base` | warm off-white / cream, e.g. `#FAF7F2` | Vellura (softens Villa Kujoyama's stark white) |
| `text-primary` | near-black, e.g. `#1A1A1A` | Villa Kujoyama |
| `accent-primary` | royal/cornflower blue, `#3558A2` | Villa Kujoyama |
| `accent-secondary` | warm terracotta/clay, `#C8785A` — pairs against cornflower blue without competing | RIPE |
| `duotone-tint` | `accent-primary` applied as a photo filter | Villa Kujoyama |

Rule: one dominant accent (blue), one supporting accent used only on tags/cards, never both at full saturation in the same section.

## 2. Typography — final

- **Display / headlines:** **Space Grotesk**, weight 700. Bold geometric sans, free on Google Fonts.
- **Labels / dates / tags / eyebrow text:** **Space Mono**, weight 400/700. Designed as a companion family to Space Grotesk by the same foundry (Florian Karsten) — guarantees the pairing actually looks intentional rather than randomly matched.
- **Body copy:** **Inter**, weight 400/500. Kept plain on purpose so the display+mono pairing carries the personality — this is the one place a "default" font is correct.

This pairing (bold display sans + mono for meta text) is the single most distinctive, easy-to-execute signature from Villa Kujoyama — carry it everywhere.

## 3. Signature visual device: full-color photography + glassmorphism

**Revised from the original duotone-everywhere approach** — after seeing the hero in full color with a gradient overlay and a glass card, that reads as more premium and less monotone than uniform duotone across the whole site. This is now the site-wide standard, not just the hero.

- **All photography** (hero, department/club/event cards) renders in **full color** — no duotone filter.
- Photos get a **soft gradient overlay** where they meet text/content — e.g. `linear-gradient(180deg, transparent, var(--bg))` at the bottom edge, or a subtle scrim behind any overlaid text — so images blend into the page rather than sitting as a hard-edged block.
- **Content cards use glassmorphism**: semi-transparent background (~65% opacity), `backdrop-filter: blur(16px)`, thin light border (~40% opacity white/border color). This applies to the hero headline card AND to poster cards (department/club/event cards) where they overlay a photo.
- Always verify text contrast against the photo behind any glass card — add a subtle dark scrim behind just the text area if needed, without losing the glass effect.

Duotone is retired as the default. If a specific section wants a duotone accent later, treat it as a deliberate one-off choice, not the baseline.

## 4. Components

- **Buttons:** pill-shaped. Primary = solid fill, Secondary = outline. *(Vellura)*
- **Eyebrow badge:** small pill, icon + tracked-caps label in mono font, sits above section headlines. *(Vellura shape + Villa Kujoyama type)*
- **Poster card:** duotone photo, bold name/title, pill category tag, colored status dot (e.g. green = upcoming, gray = past), date range in mono. This is your core reusable card — use it for **both** the events grid and a clubs/organizers directory. *(Villa Kujoyama)*
- **Filter bar:** dropdown chips (`Category ▾` `Date ▾`) + a dot-legend explaining status colors. *(Villa Kujoyama)*
- **Stat row:** big number + small caption, 3 across. *(Vellura)*
- **Avatar stack:** small overlapping circular photos for "X people going" social proof. *(Vellura)*
- **Numbered list section:** 01 / 02 / 03 rows, each with a title, short description, tag chips, and a thumbnail — perfect for event *categories* or *departments*. *(Paxton)*
- **Marquee ticker:** full-bleed horizontally scrolling bold statement band used as a section divider (e.g. "STUDENTS OVER SPECTATORS • CAMPUS OVER CLASSROOM •"). *(RIPE — borrowed device only, not their typeface)*
- **Testimonial/highlight cards:** colored-block cards in a horizontal scroll row — restyle with duotone photos instead of RIPE's pastel photography. *(RIPE layout, your color/photo treatment)*
- **Nav:** conventional top nav bar (logo left, links center/right). Search and language switcher live as small icon buttons at the far right of the top nav, not a separate fixed side element. (Earlier drafts specified a fixed vertical side nav tab — retired: it read as a heavy solid block against the glassmorphism/full-color-photography direction and duplicated the top nav's job.)

## 5. Page flow (Paxton-inspired rhythm)

1. **Hero** — split layout: headline card over a full-bleed photo, tagline, primary CTA, side nav tab
2. **Trust/intro strip** — quick logo row (clubs/departments) or one-line mission statement
3. **About section** — headline + short copy + one poster-style photo card
4. **Numbered categories list** — 01/02/03 event categories or departments, tag chips + thumbnails
5. **Marquee statement band** — bold divider, breaks up the page rhythm
6. **Events grid** — filterable, built from the poster card component
7. **Highlights/testimonials** — horizontal scroll of colored cards
8. **Stats row** — attendance/engagement numbers
9. **CTA + footer**

---

## 6. Motion language — final

One easing curve, two durations, used everywhere. Put this in `lib/motion.ts` and import it into every component — never redefine a transition inline.

```ts
// lib/motion.ts
export const EASE = [0.22, 1, 0.36, 1] as const; // ease-out-expo feel, matches Villa Kujoyama's restraint

export const DURATION = {
  fast: 0.2,   // hover/tap feedback
  base: 0.6,   // scroll reveals, section entrances
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const hoverLift = {
  rest: { scale: 1, filter: "grayscale(0.3) sepia(0.2)" }, // duotone-ish rest state
  hover: {
    scale: 1.02,
    filter: "grayscale(0) sepia(0)", // reveals full color on hover
    transition: { duration: DURATION.fast, ease: EASE },
  },
};

export const marqueeScroll = {
  animate: {
    x: ["0%", "-50%"],
    transition: { duration: 20, ease: "linear", repeat: Infinity },
  },
};
```

Usage pattern: wrap scroll-triggered sections in `motion.div` with `variants={fadeUp}` and `whileInView="visible"` `initial="hidden"` `viewport={{ once: true }}`. Card grids use `staggerContainer` on the parent, `staggerItem` on each card. Poster cards use `hoverLift` with `whileHover="hover"`.

---

## 7. Phase 3 — Build order

1. **Set up tokens first:** `tailwind.config` (colors, fonts, radius, spacing from sections 1-2) + `lib/motion.ts` (section 6). Nothing else until these exist.
2. **Build the poster card component** — it's reused the most (events grid + directory), so getting it right early saves rework.
3. **Build primitives:** button, eyebrow badge, filter chip, stat block, avatar stack.
4. **Assemble sections top to bottom** following the page flow in section 5: hero → intro strip → about → numbered categories → marquee → events grid → highlights → stats → footer.
5. **Wire up filtering** on the events grid last, once static layout is confirmed.
6. **Responsive + accessibility pass:** check contrast on the duotone/blue combos, keyboard nav on filter dropdowns, mobile stacking of the numbered-list and card-grid sections.