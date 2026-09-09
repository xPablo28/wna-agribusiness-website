import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data";
import { cn } from "../utils/cn";
import { WnaLogo } from "./Logo";
import { EASE } from "./ui";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-mango"
        style={{ scaleX: progress }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass-dark border-b border-cream/10" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            aria-label="WNA home"
            className="transition-transform duration-300 hover:scale-[1.04]"
          >
            <WnaLogo
              eager
              variant="mark"
              imgClassName={cn(scrolled ? "h-10" : "h-12", "w-auto")}
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[13px] font-medium tracking-[0.08em] text-cream/70 uppercase transition-colors duration-300 hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-mango transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#partners"
              className="group hidden items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-[12px] font-semibold tracking-[0.12em] text-ink uppercase transition-colors duration-300 hover:bg-mango sm:inline-flex"
            >
              Work with WNA
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/97 backdrop-blur-xl"
          >
            <div className="flex h-[72px] items-center justify-between px-5 sm:px-8">
              <WnaLogo variant="mark" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-mango hover:text-mango"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.6, ease: EASE }}
                  className="group flex items-baseline gap-4 border-b border-cream/10 py-4"
                >
                  <span className="font-mono text-[11px] text-mango">0{i + 1}</span>
                  <span className="display text-[clamp(2rem,9vw,3.4rem)] text-cream transition-colors group-hover:text-mango">
                    {l.label}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="#partners"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-mango px-7 py-4 text-[13px] font-semibold tracking-[0.14em] text-ink uppercase"
              >
                Work with WNA <ArrowUpRight className="h-4 w-4" />
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
