# WNA — Waste Not Agro Solutions · Website

Production-ready marketing site for **WNA — Waste Not Agro Solutions**, a Ghanaian
agricultural-surplus business: *finding productive pathways for agricultural surplus*.

Built with **Vite 7 + React 19 + TypeScript + Tailwind CSS v4** (single-page, scroll-story format).

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/index.html (self-contained)
npm run typecheck  # strict TS check
```

The build inlines JS/CSS into one HTML file (`vite-plugin-singlefile`); all images and
the logo are copied from `public/` and served as plain files. Host `dist/` on any static
host (Netlify, Vercel, S3+CloudFront, nginx…).

## Content & brand

- **All company copy knobs live in [`src/data.ts`](src/data.ts):** company name, tagline,
  description, contact (email/phone/location), social links, navigation, CTA label, crop
  scope (`CURRENT_FOCUS` vs `BROADER_OPPORTUNITY`) and `FOUNDERS`.
- Placeholders are written in `[SQUARE BRACKETS]`. Anything still bracketed is an
  **unconfirmed placeholder** — components detect it (`isPlaceholder`) and render honest
  fallbacks instead of fake data. `grep -R "\[CONTACT\|\[FOUNDER\|\[PHONE\|\[LOCATION" src public index.html`
  shows what's left to fill.
- Brand palette (`ink · pine · wna green · leaf · mango · ember · earth · sand · paper · cream`)
  is defined as Tailwind theme tokens in `src/index.css`.
- **Truthfulness rules baked into the copy:** no invented statistics, no claimed
  partnerships/facility, product specs marked as development-stage, stock/concept imagery
  labelled representative — do not replace these with unverifiable claims.

## Assets to drop in

| Asset | Location | Notes |
| --- | --- | --- |
| Official logo | `public/logo/wna-logo.jpg` ✅ installed | Used *as supplied* (byte-identical copy) — never redrawn. Appears in nav, About, footer, favicon and og:image (see `public/logo/README.txt`). |
| Mill / equipment photo | `public/images/mill.jpg`, then set it in `src/data.ts → IMG.mill` | Currently a clearly-labelled **concept render** stands in. Replace with a real photo when available. |
| Founder photos | `public/images/founders/*.jpg` + path in `src/data.ts → FOUNDERS[].photo` | Empty/broken paths keep the designed `[FOUNDER PHOTO]` slot visible — never a broken image. |

All other imagery is stored locally under `public/images/` (no CDN dependency).

## Structure

```
src/
  App.tsx                 # page composition (section order = the story)
  data.ts                 # ALL editable company content + image map
  index.css               # Tailwind v4 theme, brand tokens, motion, a11y
  components/
    Logo.tsx              # official-logo loader with pending fallback
    Nav.tsx               # sticky nav + accessible mobile menu (Esc, focus, aria)
    ui.tsx                # Tag / Words / Reveal / StatusBadge / CTAs / Marquee
  sections/               # 01 hero → 19 final CTA, numbered as tagged
    s01-hero-problem.tsx        # hero + "when abundance becomes loss"
    s02-system-operation.tsx    # big question + GRADE→MATCH→UTILIZE + mango journey
    s03-product-scope.tsx       # mango-vs-surplus frame + product development
    s04-destinations-network.tsx# destinations, interactive grader, value chain
    s05-vision-intelligence.tsx # long-term vision (scroll film) + data layer
    s06-model-pillars-scale.tsx # business model, pillars, scale ambition
    s07-impact-story.tsx        # human impact + founders ("The People Behind WNA")
    s08-partners-about-final.tsx# partner doors (real mailto), about, final CTA, footer
```

## Pre-launch checklist

1. ~~Official logo~~ ✅ installed at `public/logo/wna-logo.jpg` (exactly as supplied).
2. Fill `COMPANY.contact` + social URLs in `src/data.ts` (the partner form activates itself once an email is set).
3. Replace `FOUNDERS` placeholders with confirmed names/roles/bios/photos — or publish with the section hidden by removing the array entries.
4. Swap `IMG.mill` when a real facility photo exists.
5. `npm run build` and deploy `dist/`.

© WNA — Waste Not Agro Solutions.
