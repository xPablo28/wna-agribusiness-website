import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { IMG } from "../data";
import { EASE, Reveal, StatusBadge, Tag, Words } from "../components/ui";
import { cn } from "../utils/cn";

/* ============================== 03 · WHAT WNA DOES ============================== */

const GMU = [
  {
    word: "GRADE",
    n: "01",
    body: "Understand the quantity, condition and potential use of surplus produce.",
    detail: "Every batch — mango, pineapple, cassava or vegetables — is assessed before it moves, so nothing valuable is treated as waste by default.",
    img: IMG.peppers,
  },
  {
    word: "MATCH",
    n: "02",
    body: "Identify the buyer, processor or recovery pathway that can use it.",
    detail: "Demand is mapped to material — not the other way around. The right destination, at the right time, anywhere in Ghana.",
    img: IMG.umbrellaMarket,
  },
  {
    word: "UTILIZE",
    n: "03",
    body: "Move, process or transform it into its highest viable application.",
    detail: "Through WNA processing or coordinated partners, surplus becomes product, ingredient or input.",
    img: IMG.dried,
  },
];

export function WhatWeDo() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "320%"]);

  return (
    <section ref={ref} id="what" className="relative overflow-hidden bg-paper py-28 text-ink sm:py-40">
      <div className="grid-light pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="03" label="What WNA does" dark />

        <h2 className="display mt-8 max-w-6xl text-[clamp(2.2rem,6.4vw,5.4rem)]">
          <span className="text-ink/35">
            <Words text="We don't start with waste." />
          </span>
          <br />
          <Words text="We start with value." delay={0.3} accentWords={["value."]} accentClass="text-wna" />
        </h2>

        <div className="mt-16 grid gap-12 sm:mt-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Interactive words */}
          <div>
            {GMU.map((g, i) => {
              const isActive = active === i;
              return (
                <div key={g.word} className="border-t border-ink/15 last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left sm:py-8"
                  >
                    <span className="flex items-baseline gap-4 sm:gap-6">
                      <span className={cn("font-mono text-[11px] tracking-[0.25em] transition-colors", isActive ? "text-ember" : "text-ink/35")}>
                        {g.n}
                      </span>
                      <span
                        className={cn(
                          "display text-[clamp(2.4rem,7vw,5rem)] transition-all duration-500",
                          isActive ? "translate-x-2 text-ink sm:translate-x-4" : "text-ink/25 group-hover:text-ink/50",
                        )}
                      >
                        {g.word}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        isActive ? "rotate-0 border-ink bg-ink text-mango" : "-rotate-45 border-ink/20 text-ink/30",
                      )}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-8 pl-8 sm:grid-cols-[1fr_180px] sm:pl-12">
                          <div>
                            <p className="max-w-md text-[16px] leading-relaxed font-medium text-ink sm:text-[17px]">
                              {g.body}
                            </p>
                            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-smoke">{g.detail}</p>
                          </div>
                          <div className="hidden overflow-hidden rounded-sm sm:block">
                            <img src={g.img} alt={`${g.word} — surplus assessment`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Travelling mango through the system */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-sm">
              <div className="relative">
                <img
                  src={IMG.smilingHarvester}
                  alt="A Ghanaian harvest moving through the WNA grading system"
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
                {/* vertical track */}
                <div className="absolute top-8 bottom-8 left-8 w-px bg-cream/25">
                  <motion.span
                    style={{ top: orbY }}
                    className="absolute -left-[7px] h-[15px] w-[15px] rounded-full bg-mango shadow-[0_0_28px_6px_rgba(242,164,28,0.6)]"
                  />
                </div>
                <div className="absolute top-8 bottom-8 left-16 flex flex-col justify-between py-1 font-mono text-[10px] tracking-[0.24em] text-cream/85">
                  <span>GRADE — ASSESSED</span>
                  <span>MATCH — ROUTED</span>
                  <span>UTILIZE — RECOVERED</span>
                </div>
                <div className="absolute right-0 bottom-0 left-0 p-7">
                  <p className="display-tight text-xl text-cream">One harvest. One system. Zero guessing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== 04 · CURRENT OPERATION ============================== */

const JOURNEY = [
  { k: "SURPLUS MANGO", d: "Cleared for feed / compost applications.", img: IMG.heroMango, tag: "SOURCE" },
  { k: "MILL", d: "Size reduction into a workable stream.", img: IMG.factory, tag: "PROCESS" },
  { k: "WET PULP", d: "Mango pulp / paste, ready for drying.", img: IMG.pulp, tag: "STREAM" },
  { k: "DRY", d: "Moisture removed for stability.", img: IMG.dried, tag: "PROCESS" },
  { k: "PACKAGE", d: "Weighed and sealed in 50kg sacks.", img: IMG.sack, tag: "OUTPUT", contain: true },
  { k: "BUYER", d: "Delivered to feed / ingredient buyers.", img: IMG.truckOrange, tag: "DESTINATION" },
];

function JourneyCard({ j, i }: { j: (typeof JOURNEY)[number]; i: number }) {
  return (
    <div className="group relative w-[78vw] shrink-0 sm:w-[380px]">
      <div className="relative overflow-hidden rounded-sm">
        <img
          src={j.img}
          alt={j.k}
          loading="lazy"
          className={cn("aspect-[4/5] w-full transition-transform duration-[1.3s] ease-out group-hover:scale-105", j.contain ? "bg-coal object-contain p-6" : "object-cover")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full border border-cream/25 bg-ink/55 px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-cream backdrop-blur-sm">
          {j.tag}
        </span>
        <span className="display absolute top-3 right-4 text-5xl text-cream/25">0{i + 1}</span>
        <div className="absolute right-0 bottom-0 left-0 p-6">
          <p className="display-tight text-[1.65rem] text-cream">{j.k}</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-cream/60">{j.d}</p>
        </div>
      </div>
      {i < JOURNEY.length - 1 && (
        <span className="absolute top-1/2 -right-7 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-mango text-ink md:flex">
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </div>
  );
}

export function Operation() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section id="how" className="relative bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 sm:pt-40">
        <Tag index="04" label="The current operation" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-4xl text-[clamp(2.2rem,6.4vw,5.4rem)] text-cream">
            <Words text="We start" /> <Words text="with mango." delay={0.2} accentWords={["mango."]} />
          </h2>
          <StatusBadge status="CURRENT" />
        </div>
        <Reveal delay={0.15}>
          <p className="display-tight mt-5 text-[clamp(1rem,2.4vw,1.5rem)] text-cream/70">
            Proving the physical operation before scaling the system.
          </p>
        </Reveal>
        <div className="mt-8 grid max-w-4xl gap-5 text-[15px] leading-relaxed text-cream/60 sm:text-base">
          <Reveal>
            <p>
              WNA is beginning with surplus mango that is no longer suitable for
              its original food-production destination — but is cleared for feed
              or compost applications.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Rather than allowing that remaining value to disappear, WNA is
              developing a process to <span className="text-cream">recover and standardize its feed value.</span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-3 border-t border-cream/10 pt-6">
              <span className="font-mono text-[10.5px] tracking-[0.22em] text-cream/45 uppercase">
                Next in pipeline
              </span>
              {["PINEAPPLE", "CASSAVA", "PLANTAIN"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-cream/20 px-4 py-2 font-mono text-[10.5px] tracking-[0.18em] text-cream/75"
                >
                  {c}
                </span>
              ))}
              <StatusBadge status="IN DEVELOPMENT" />
            </div>
            <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-cream/45">
              The same GRADE → MATCH → UTILIZE system proven on mango is designed
              to extend across Ghana's surplus crops.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Desktop: sticky horizontal journey */}
      <div ref={targetRef} className="relative mt-14 hidden h-[320vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div style={{ x }} className="flex items-stretch gap-14 px-[8vw]">
            {JOURNEY.map((j, i) => (
              <JourneyCard key={j.k} j={j} i={i} />
            ))}
            <div className="flex w-[30vw] shrink-0 flex-col justify-center">
              <p className="display-tight text-3xl text-cream/90">From surplus<br />to standard.</p>
              <a href="#product" className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold tracking-[0.14em] text-mango uppercase">
                See the product <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
          <div className="mx-[8vw] mt-10 h-px bg-cream/12">
            <motion.div className="h-full origin-left bg-mango" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: vertical journey */}
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:hidden">
        <div className="relative space-y-8 border-l border-cream/15 pl-6">
          {JOURNEY.map((j, i) => (
            <Reveal key={j.k} delay={0.05}>
              <div className="relative">
                <span className="absolute top-6 -left-[33px] h-3 w-3 rounded-full bg-mango" />
                <div className="overflow-hidden rounded-sm">
                  <img src={j.img} alt={j.k} loading="lazy" className={cn("aspect-[16/10] w-full", j.contain ? "bg-coal object-contain p-8" : "object-cover")} />
                </div>
                <div className="flex items-baseline justify-between pt-4">
                  <p className="display-tight text-xl text-cream">{j.k}</p>
                  <span className="font-mono text-[11px] text-mango">0{i + 1}</span>
                </div>
                <p className="mt-1 text-[14px] text-cream/55">{j.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
