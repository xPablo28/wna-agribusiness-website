/* ------------------------------------------------------------------
   Minimal hash router — zero dependencies, chosen deliberately so the
   single-file build (vite-plugin-singlefile) works on any static host
   with no server rewrite rules.

     #/            → Home            #/products  → Products
     #/approach    → Our Approach    #/story     → Our Story
     #/operations  → Operations      #/partners  → Partners

   In-page anchors (href="#form", "#top") are untouched: anything not
   starting with "#/" is handled natively by the browser.
------------------------------------------------------------------- */

import { useSyncExternalStore, type AnchorHTMLAttributes } from "react";

export const PAGES = ["/", "/approach", "/operations", "/products", "/story", "/partners"] as const;
export type PagePath = (typeof PAGES)[number];

export const PAGE_TITLES: Record<PagePath, string> = {
  "/": "WNA — Waste Not Agro Solutions | Giving Agricultural Surplus Its Next Best Use",
  "/approach": "Our Approach — WNA | Grade → Match → Utilize",
  "/operations": "Operations — WNA | The Mango Line, Run End to End",
  "/products": "Products — WNA | From Surplus to Ingredient",
  "/story": "Our Story — WNA | The People Behind WNA",
  "/partners": "Partners — WNA | Three Ways In",
};

function normalize(hash: string): PagePath {
  if (!hash.startsWith("#/")) return "/";
  const p = hash.slice(1).split(/[?#]/)[0] || "/";
  return (PAGES as readonly string[]).includes(p) ? (p as PagePath) : "/";
}

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function useRoute(): PagePath {
  return useSyncExternalStore(subscribe, () => normalize(window.location.hash), () => "/");
}

/** An <a> that navigates by hash route. Keyboard-, middle-click- and
 *  link-preview-friendly because it is a real anchor. */
export function PageLink({
  to,
  children,
  ...rest
}: { to: PagePath } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  );
}

/** Plain href string for a route (for non-anchor CTAs like the ui buttons). */
export const routeHref = (to: PagePath) => `#${to}`;
