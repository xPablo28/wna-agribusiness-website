import { ArrowLeft } from "lucide-react";
import { Reveal, Words } from "../components/ui";
import { NAV_LINKS } from "../data";
import { routeHref, useRoute, type PagePath } from "../router";

/* ------------------------------------------------------------------
   PageHero — the opening band of every interior page. Dark, typographic,
   consistent with the homepage's register; links to the sibling pages at
   the bottom so deeper pages never feel like dead ends.
------------------------------------------------------------------- */

export function PageHero({
  label,
  title,
  accentWords = [],
  lead,
  status = "WASTE NOT AGRO SOLUTIONS",
}: {
  label: string;
  title: string;
  accentWords?: string[];
  lead: string;
  status?: string;
}) {
  const route = useRoute();
  return (
    <section aria-labelledby="page-hero-title" className="relative overflow-hidden bg-ink pt-[128px] pb-16 sm:pt-[152px] sm:pb-20">
      <div className="grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="pointer-events-none absolute top-1/4 right-[-10%] h-[42vmin] w-[42vmin] rounded-full bg-wna/[0.09] blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex items-center justify-between gap-6">
          <a
            href={routeHref("/")}
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-cream/45 uppercase transition-colors hover:text-mango"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Home
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.04] px-3 py-1.5 font-mono text-[9.5px] tracking-[0.2em] text-cream/60 uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mango opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mango" />
            </span>
            {status}
          </span>
        </div>

        <p className="eyebrow mt-10 text-mango">{label}</p>
        <h1 id="page-hero-title" className="display mt-5 max-w-5xl text-[clamp(2.5rem,7.5vw,5.8rem)] text-cream">
          <Words text={title} accentWords={accentWords} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-cream/60 sm:text-[16.5px]">{lead}</p>
        </Reveal>

        {/* sibling pages */}
        <Reveal delay={0.3}>
          <nav aria-label="Other pages" className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-cream/10 pt-6">
            {NAV_LINKS.filter((l) => l.path !== "/" && l.path !== route).map((l) => (
              <a
                key={l.path}
                href={routeHref(l.path as PagePath)}
                className="font-mono text-[10.5px] tracking-[0.18em] text-cream/40 uppercase transition-colors hover:text-mango"
              >
                {l.label} →
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
