import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CTA_LABEL, NAV_LINKS } from "../data";
import { routeHref, useRoute, type PagePath } from "../router";
import { cn } from "../utils/cn";
import { WnaLogo } from "./Logo";
import { EASE } from "./ui";

export function Nav() {
  const route = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu whenever the route changes. */
  useEffect(() => setOpen(false), [route]);

  /* Lock page scroll while the mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close on Escape and move focus into the dialog-like panel. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-mango"
        style={{ scaleX: progress }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-all duration-500",
          scrolled ? "border-b border-cream/10 bg-wna-deep/95" : "bg-wna-deep/35",
        )}
      >
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-5 sm:h-[72px] sm:px-8">
          <a
            href={routeHref("/")}
            aria-label="WNA — Waste Not Agro Solutions, home"
            className="mr-2 shrink-0 rounded-md transition-opacity duration-300 hover:opacity-85"
          >
            <WnaLogo eager variant="mark" imgClassName="drop-shadow-[0_1px_10px_rgba(6,10,7,0.55)]" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => {
              const active = route === l.path;
              return (
                <a
                  key={l.path}
                  href={routeHref(l.path as PagePath)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-2 text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300",
                    active ? "text-cream" : "text-cream/65 hover:text-cream",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px transition-all duration-300",
                      active ? "w-full bg-leaf" : "w-0 bg-mango group-hover:w-full",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={routeHref("/partners")}
              className="group hidden items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-[12px] font-semibold tracking-[0.12em] text-ink uppercase transition-colors duration-300 hover:bg-mango sm:inline-flex"
            >
              {CTA_LABEL}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-mango hover:text-mango lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex flex-col bg-wna-deep/97 backdrop-blur-xl"
          >
            <div className="flex h-[64px] items-center justify-between px-5 sm:h-[72px] sm:px-8">
              <WnaLogo variant="mark" />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-mango hover:text-mango"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8 py-6">
              {NAV_LINKS.map((l, i) => {
                const active = route === l.path;
                return (
                  <motion.a
                    key={l.path}
                    href={routeHref(l.path as PagePath)}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.6, ease: EASE }}
                    className="group flex items-baseline gap-4 border-b border-cream/10 py-4"
                  >
                    <span className={cn("font-mono text-[11px]", active ? "text-mango" : "text-mango/50")}>
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "display text-[clamp(1.7rem,8vw,3rem)] transition-colors group-hover:text-mango",
                        active ? "text-mango" : "text-cream",
                      )}
                    >
                      {l.label}
                    </span>
                  </motion.a>
                );
              })}
              <motion.a
                href={routeHref("/partners")}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-mango px-7 py-4 text-[13px] font-semibold tracking-[0.14em] text-ink uppercase"
              >
                {CTA_LABEL} <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </nav>
            <p className="px-8 pb-8 font-mono text-[10px] tracking-[0.25em] text-cream/35 uppercase">
              Grade → Match → Utilize
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
