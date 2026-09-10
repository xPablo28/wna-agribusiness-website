/* ------------------------------------------------------------------
   WNA — CENTRAL COMPANY CONTENT
   Edit this file to change company facts, contact details, social
   links, navigation and founder information across the whole site.

   PLACEHOLDER RULE:
   Any value that still contains square brackets — e.g. "[CONTACT
   EMAIL]" — is an UNCONFIRMED placeholder. Components detect these
   via `isPlaceholder()` and degrade gracefully (never render fake
   data as real). Replace them once official information exists.

   IMAGES:
   All imagery is stored locally under public/ so the site has no
   CDN dependency. Representative/stock photography is used only
   where real WNA photography is unavailable and must never be
   described as a WNA facility, employee, farmer or operation.
   The generated mill/pulp/product renders are concept visuals.
------------------------------------------------------------------- */

export const COMPANY = {
  name: "WNA — Waste Not Agro Solutions",
  shortName: "WNA",
  fullName: "Waste Not Agro Solutions",
  tagline: "Finding productive pathways for agricultural surplus.",
  description:
    "WNA is a Ghanaian agricultural-surplus business. We grade recovered surplus, match it to the most suitable productive use, and help convert it into useful products, ingredients and other applications — starting with mango.",
  origin: "Ghana",
  contact: {
    email: "[CONTACT EMAIL]",
    phone: "[PHONE NUMBER]",
    location: "[LOCATION]",
  },
  /** Leave a URL empty ("") until it actually exists — empty links are hidden. */
  social: {
    linkedin: "",
    instagram: "",
    x: "",
    facebook: "",
  },
} as const;

export const isPlaceholder = (v: string) => v.trim() === "" || /^\[.+\]$/.test(v.trim());

/* ----------------------------- Navigation -----------------------------
   Pages are hash-routed (#/approach etc.) — see src/router.tsx. */

export const NAV_LINKS = [
  { label: "Home", path: "/" as const },
  { label: "Our Approach", path: "/approach" as const },
  { label: "Operations", path: "/operations" as const },
  { label: "Products", path: "/products" as const },
  { label: "Our Story", path: "/story" as const },
  { label: "Partners", path: "/partners" as const },
] as const;

export const CTA_LABEL = "Partner With WNA";
export const CTA_PATH = "/partners" as const;

/* ------------------------------- Images ------------------------------- */

export const IMG = {
  /* Locally stored concept renders (generated for this site). */
  ghanaHarvest: "/images/ghana-harvest.jpg",
  heroMango: "/images/hero-mango.jpg",
  pulp: "/images/mango-pulp.jpg",
  mill: "/images/mill-concept.jpg",
  dried: "/images/dried-ingredient.jpg",
  sack: "/images/wna-sack.jpg",

  /* Representative stock photography (Pexels, free licence) —
     generic context imagery, NOT WNA facilities or personnel. */
  harvestWoman: "/images/stock/harvest-woman.jpg",
  smilingHarvester: "/images/stock/smiling-harvester.jpg",
  harvestWomen: "/images/stock/harvest-women.jpg",
  pineappleBasket: "/images/stock/pineapple-basket.jpg",
  umbrellaMarket: "/images/stock/umbrella-market.jpg",
  tomatoes: "/images/stock/tomatoes.jpg",
  peppers: "/images/stock/peppers.jpg",
  cassavaStall: "/images/stock/cassava-stall.jpg",
  plantainPile: "/images/stock/plantain-pile.jpg",
  aerial: "/images/stock/aerial.jpg",
  aerialDusk: "/images/stock/aerial-dusk.jpg",
  truck: "/images/stock/truck.jpg",
  sacks: "/images/stock/sacks.jpg",
} as const;

/* ---------------------------- Crop positioning ----------------------------
   Ghana's surplus landscape — mango today, the rest as opportunity space.
   IMPORTANT: only MANGO is listed as WNA's current operational focus; the
   others are future/broader opportunity and must not be described as
   current WNA activity. */

export const CURRENT_FOCUS = ["MANGO"];
export const BROADER_OPPORTUNITY = [
  "PINEAPPLE",
  "CASSAVA",
  "PLANTAIN",
  "MAIZE",
  "VEGETABLES",
];

/* --------------------------------- Founders --------------------------------
   WNA has THREE founders. PLACEHOLDERS ONLY — do not publish until real
   information is supplied. Keep exactly three entries.

     photo: set ONLY after the real file exists, e.g.
            save the photograph at public/images/founders/ada.jpg
            and write photo: "/images/founders/ada.jpg"
            An empty photo (or a broken path) keeps the designed
            "[FOUNDER N PHOTO]" slot visible — never a broken image.
     quote: optional — leave the bracket placeholder to hide. */

export interface Founder {
  photo: string;
  name: string;
  role: string;
  bio: string;
  quote: string;
}

export const FOUNDERS: Founder[] = [
  {
    photo: "",
    name: "[FOUNDER 1 NAME]",
    role: "[FOUNDER 1 ROLE]",
    bio: "[FOUNDER 1 BIO — one short paragraph: what they do, and what they care about at WNA.]",
    quote: "[FOUNDER 1 QUOTE — optional]",
  },
  {
    photo: "",
    name: "[FOUNDER 2 NAME]",
    role: "[FOUNDER 2 ROLE]",
    bio: "[FOUNDER 2 BIO — one short paragraph: what they do, and what they care about at WNA.]",
    quote: "[FOUNDER 2 QUOTE — optional]",
  },
  {
    photo: "",
    name: "[FOUNDER 3 NAME]",
    role: "[FOUNDER 3 ROLE]",
    bio: "[FOUNDER 3 BIO — one short paragraph: what they do, and what they care about at WNA.]",
    quote: "[FOUNDER 3 QUOTE — optional]",
  },
];
