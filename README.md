# WNA — Waste Not Agro Solutions · Website

Production-ready marketing site for **WNA — Waste Not Agro Solutions**, a Ghanaian
agricultural-surplus business: *finding productive pathways for agricultural surplus*.

Built with **Vite 7 + React 19 + TypeScript + Tailwind CSS v4** — a six-page,
hash-routed story (no server routing needed).

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

## Pages & routing

Routes are hash-based (`#/approach`), which works on every static host with zero
configuration and survives the single-file build. `src/router.tsx` holds the route
table, per-page `<title>`s and the `useRoute()` hook; unknown routes fall back to home.

| Page | Route | Contains |
| --- | --- | --- |
| Home | `#/` | Hero → problem teaser → what WNA does → operations preview → impact → closing CTA |
| Our Approach | `#/approach` | Full problem + six causes → the big question → GRADE→MATCH→UTILIZE → value destinations |
| Operations | `#/operations` | The mango line journey (sticky on desktop) → network → business model → why it matters |
| Products | `#/products` | Current focus vs future opportunities → product development |
| Our Story | `#/story` | Brand statement → the people behind WNA (three founders) → vision phases → intelligence |
| Partners | `#/partners` | Three doors in + enquiry form → why partner → scale → closing line |

Homepage blocks link deeper ("Explore Our Approach", "View Operations", "Meet the
Founders", "Work With WNA"), so the story reads continuously across pages.

## Content & brand

- **All company copy knobs live in [`src/data.ts`](src/data.ts):** company name, tagline,
  description, contact (email/phone/location), social links, navigation (page routes),
  CTA label + CTA route, crop scope (`CURRENT_FOCUS` vs `BROADER_OPPORTUNITY`) and
  `FOUNDERS` (**exactly three entries**, indexed placeholders `[FOUNDER 1 …]`–`[FOUNDER 3 …]`).
- Placeholders are written in `[SQUARE BRACKETS]`. Anything still bracketed is an
  **unconfirmed placeholder** — components detect it (`isPlaceholder`) and render honest
  fallbacks instead of fake data. `grep -R "\[CONTACT\|\[FOUNDER\|\[PHONE\|\[LOCATION" src public index.html`
  shows what's left to fill.
- Brand palette (`ink · pine · wna green · leaf · mango · ember · earth · sand · paper · cream`)
  is defined as Tailwind theme tokens in `src/index.css`. Roughly 70 % dark green-black,
  20 % cream, 10 % mango accents; the LOSS-highlight language is deliberate.
- **Truthfulness rules baked into the copy:** no invented statistics, no claimed
  partnerships/facility, product specs marked as development-stage, stock/concept imagery
  labelled representative — do not replace these with unverifiable claims.

## Assets to drop in

| Asset | Location | Notes |
| --- | --- | --- |
| Official logo | `public/logo/wna-logo.jpg` ✅ installed | Used *as supplied* (byte-identical copy) — never redrawn. Presented on a plate matched to the logo's own white field (`#f7f7f7`), minimal padding, no shadow — reads as part of the nav. Appears in nav, mobile menu, About, footer, favicon and og:image (see `public/logo/README.txt`). |
| Mill / equipment photo | `public/images/mill.jpg`, then set it in `src/data.ts → IMG.mill` | Currently a clearly-labelled **concept render** stands in. Never replace with generic stock presented as a WNA facility. |
| Founder photos | `public/images/founders/*.jpg` + path in `src/data.ts → FOUNDERS[].photo` | Empty/broken paths keep the designed `[FOUNDER N PHOTO]` slot visible — never a broken image. |

All other imagery is stored locally under `public/images/` (no CDN dependency).

## Structure

```
src/
  App.tsx                 # route switch + per-page title + nav/footer shell
  router.tsx              # tiny hash router (no new dependencies)
  data.ts                 # ALL editable company content + image map
  index.css               # Tailwind v4 theme, brand tokens, motion, a11y
  components/
    Logo.tsx              # official logo on a seam-matched plate + pending fallback
    Nav.tsx               # sticky nav: page routes, active state, mobile menu (Esc, focus, aria)
    ui.tsx                # Tag / Words / Reveal / StatusBadge / CTAs / Marquee
  pages/                  # one file per route; page-hero.tsx opens interior pages
    home.tsx · approach.tsx · operations.tsx · products.tsx · story.tsx · partners.tsx
  sections/               # storytelling blocks, reused across pages
    s01-hero-problem.tsx         # hero + problem (teaser on home, full on approach)
    s02-system-operation.tsx     # big question + GRADE→MATCH→UTILIZE + mango journey (full/preview)
    s03-product-scope.tsx        # mango-vs-surplus frame + product development
    s04-destinations-network.tsx # destinations, interactive grader, value chain
    s05-vision-intelligence.tsx  # vision phase grid (static) + data layer
    s06-model-pillars-scale.tsx  # business model, pillars, scale ambition
    s07-impact-story.tsx         # human impact (full/home variants) + three-founder story
    s08-partners-about-final.tsx # partner doors (real mailto), about, closing CTA band, footer
```

## Pre-launch checklist

1. ~~Official logo~~ ✅ installed at `public/logo/wna-logo.jpg` (exactly as supplied).
2. Fill `COMPANY.contact` + social URLs in `src/data.ts` (the partner form activates itself once an email is set).
3. Replace the three `FOUNDERS` placeholder sets with confirmed names/roles/bios/photos — keep exactly three entries.
4. Swap `IMG.mill` when a real facility photo exists.
5. `npm run build` and deploy `dist/`.

© WNA — Waste Not Agro Solutions.
