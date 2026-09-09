import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { BROADER_OPPORTUNITY, IMG } from "../data";
import { EASE, Reveal, StatusBadge, Tag, Words } from "../components/ui";
import { cn } from "../utils/cn";

/* ============================== 03 · THE BIG QUESTION ==============================
   A single line, held long enough to change the conversation.               */

export function BigQuestion() {
  return (
    <section aria-labelledby="question-title" className="grain relative overflow-hidden bg-[#040604] py-28 sm:py-40">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[46vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mango/[0.08] blur-[110px]" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 text-center sm:px-8">
        <Tag index="03" label="The big question" className="justify-center" />
        <h2 id="question-title" className="display mt-8 text-[clamp(2.4rem,7vw,6rem)] text-cream">
          <Words text="What if surplus" />
          <br />
          <span className="outline-text">
            <Words text="had a" delay={0.25} />{" "}
          </span>
          <Words text="next best use?" delay={0.45} accentWords={["use?"]} />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-2xl text-[15.5px] leading-relaxed text-cream/60 sm:text-lg">
            Not disposal. Not charity. A system that looks at what the market
            left behind and asks a different question:{" "}
            <span className="text-mango">what is this still good for?</span>
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {["GRADE", "MATCH", "UTILIZE"].map((w, i) => (
              <span key={w} className="flex items-center gap-3 sm:gap-5">
                <span className="display text-[clamp(1.3rem,4.4vw,2.8rem)] text-mango">{w}</span>
                {i < 2 && <span className="text-cream/25" aria-hidden>→</span>}
              </span>
            ))}
          </div>
          <p className="mt-5 font-mono text-[10.5px] tracking-[0.24em] text-cream/40 uppercase">
            The operating philosophy behind everything WNA does
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 04 · WHAT WNA DOES (GRADE → MATCH → UTILIZE) ========= */

const GMU = [
  {
    word: "GRADE",
    n: "01",
    body: "Understand what is available and what condition it is in.",
    detail: "Quantity, quality and suitability are assessed batch by batch — so nothing valuable is treated as waste by default.",
    img: IMG.peppers,
    alt: "Representative image — produce assessed by condition and grade",
  },
  {
    word: "MATCH",
    n: "02",
    body: "Identify the most suitable productive use and buyer or end-use pathway.",
    detail: "Demand is mapped to material — not the other way around. The right destination, at the right time, in Ghana.",
    img: IMG.umbrellaMarket,
    alt: "Representative image — a Ghanaian market where supply meets demand",
  },
  {
    word: "UTILIZE",
    n: "03",
    body: "Convert surplus into useful products, ingredients or other productive applications.",
    detail: "Through WNA processing or coordinated partners, surplus becomes product, ingredient or input.",
    img: IMG.dried,
    alt: "Concept render — dried mango material ready for productive use",
  },
];

export function WhatWeDo() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "320%"]);

  return (
    <section ref={ref} id="approach" aria-labelledby="approach-title" className="relative overflow-hidden bg-paper py-28 text-ink sm:py-40">
      <div className="grid-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="04" label="The WNA approach" dark />

        <h2 id="approach-title" className="display mt-8 max-w-6xl text-[clamp(2.2rem,6.4vw,5.4rem)]">
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
                    aria-expanded={isActive}
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
                      aria-hidden
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
                            <img src={g.img} alt={g.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Travelling batch through the system */}
          <div className="relative hidden lg:block" aria-hidden>
            <div className="sticky top-28 overflow-hidden rounded-sm">
              <div className="relative">
                <img
                  src={IMG.smilingHarvester}
                  alt=""
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
                  <p className="display-tight text-xl text-cream">One pathway. Three decisions. Zero guessing.</p>
                </div>
              </div>
            </div>
            <p className="mt-3 font-mono text-[9.5px] tracking-[0.14em] text-smoke/70 uppercase">
              Representative imagery — not WNA personnel
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== 05 · CURRENT OPERATION — MANGO ===================== */

const JOURNEY = [
  { k: "SURPLUS MANGO", d: "Cleared for productive use.", img: IMG.heroMango, alt: "Concept render — surplus mangoes awaiting their next use", tag: "SOURCE" },
  { k: "MILL", d: "Size reduction into a workable stream.", img: IMG.mill, alt: "Illustrative concept — fruit milling equipment reducing mango into a pulp stream; not a WNA facility", tag: "PROCESS" },
  { k: "WET PULP", d: "Mango pulp / paste prepared for drying.", img: IMG.pulp, alt: "Concept render — milled mango pulp ready for drying", tag: "STREAM" },
  { k: "DRY", d: "Moisture removed for improved stability.", img: IMG.dried, alt: "Concept render — dried mango pieces after moisture removal", tag: "PROCESS" },
  { k: "PACKAGE", d: "Weighed and sealed for handling.", img: IMG.sack, alt: "Concept mockup — a WNA-branded sack of dried mango feed ingredient", tag: "OUTPUT", contain: true },
  { k: "BUYER", d: "Delivered to appropriate ingredient / feed buyers.", img: IMG.truck, alt: "Representative image — a truck delivering goods; not a WNA vehicle", tag: "DESTINATION" },
];

function JourneyCard({ j, i }: { j: (typeof JOURNEY)[number]; i: number }) {
  return (
    <div className="group relative w-[78vw] shrink-0 sm:w-[380px]">
      <div className="relative overflow-hidden rounded-sm">
        <img
          src={j.img}
          alt={j.alt}
          loading="lazy"
          className={cn("aspect-[4/5] w-full transition-transform duration-[1.3s] ease-out group-hover:scale-105", j.contain ? "bg-coal object-contain p-6" : "object-cover")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" aria-hidden />
        <span className="absolute top-4 left-4 rounded-full border border-cream/25 bg-ink/55 px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-cream backdrop-blur-sm">
          {j.tag}
        </span>
        <span className="display absolute top-3 right-4 text-5xl text-cream/25" aria-hidden>0{i + 1}</span>
        <div className="absolute right-0 bottom-0 left-0 p-6">
          <p className="display-tight text-[1.65rem] text-cream">{j.k}</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-cream/60">{j.d}</p>
        </div>
      </div>
      {i < JOURNEY.length - 1 && (
        <span className="absolute top-1/2 -right-7 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-mango text-ink md:flex" aria-hidden>
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
    <section id="operations" aria-labelledby="operations-title" className="relative bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 sm:pt-40">
        <Tag index="05" label="The current operation" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 id="operations-title" className="display max-w-4xl text-[clamp(2.2rem,6.4vw,5.4rem)] text-cream">
            <Words text="The mango line." />{" "}
            <Words text="Run end to end." delay={0.2} accentWords={["end."]} />
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
              WNA is beginning with surplus mango that is no longer suited to its
              original market — but can still be cleared for productive use, such
              as feed or compost applications.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Rather than letting that remaining value disappear, WNA is
              developing a process to <span className="text-cream">recover and standardize it.</span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-3 border-t border-cream/10 pt-6">
              <span className="font-mono text-[10.5px] tracking-[0.22em] text-cream/45 uppercase">
                Next in pipeline
              </span>
              {BROADER_OPPORTUNITY.slice(0, 3).map((c) => (
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
      <div ref={targetRef} className="relative mt-14 hidden md:block">
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
              <p className="mt-8 max-w-[220px] font-mono text-[9.5px] leading-relaxed tracking-[0.12em] text-cream/35 uppercase">
                Imagery shows the operating concept. Facility photography replaces these visuals as it becomes available.
              </p>
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
                <span className="absolute top-6 -left-[33px] h-3 w-3 rounded-full bg-mango" aria-hidden />
                <div className="overflow-hidden rounded-sm">
                  <img src={j.img} alt={j.alt} loading="lazy" className={cn("aspect-[16/10] w-full", j.contain ? "bg-coal object-contain p-8" : "object-cover")} />
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
        <p className="mt-8 font-mono text-[9.5px] leading-relaxed tracking-[0.12em] text-cream/35 uppercase">
          Imagery shows the operating concept — not a WNA facility.
        </p>
      </div>
    </section>
  );
}
