import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { COMPANY, IMG } from "../data";
import { EASE, GhostCta, PrimaryCta, Reveal, Tag, Words } from "../components/ui";

/* ============================== 01 · HERO ==============================
   First screen: the problem, stated simply. Visual language:
   FARM / HARVEST → SURPLUS → PROCESSING → NEW VALUE.                      */

const FLOW_RAIL = [
  { k: "FARM / HARVEST", d: "Seasons bring abundance." },
  { k: "SURPLUS", d: "More than the market absorbs." },
  { k: "PROCESSING", d: "Surplus enters a new pathway." },
  { k: "NEW VALUE", d: "Products, ingredients, inputs." },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const railProgress = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setPhase((p) => (p + 1) % FLOW_RAIL.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} id="top" aria-label="Introduction" className="grain vignette relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Backdrop */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0" aria-hidden>
        <motion.img
          src={IMG.ghanaHarvest}
          alt=""
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-32 pb-16 sm:px-8 sm:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
          className="eyebrow text-mango"
        >
          {COMPANY.fullName} — {COMPANY.origin}
        </motion.p>

        <h1 className="display mt-6 max-w-5xl text-[clamp(2.1rem,5.6vw,5rem)] text-cream">
          <Words text="A harvest can be a success story." delay={0.35} />
          <br />
          <span className="text-cream/45">
            <Words text="Until the market says" delay={0.9} />
          </span>{" "}
          <Words text="otherwise." delay={1.2} accentWords={["otherwise."]} />
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
        >
          <p className="display-tight mt-5 text-[clamp(1.05rem,2.4vw,1.5rem)] text-cream/85">
            Agricultural surplus still has value.{" "}
            <span className="text-mango">We find its next best use.</span>
          </p>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-cream/60 sm:text-[15.5px]">
            WNA is a Ghanaian agricultural-surplus company: grade what remains,
            match it to a productive pathway, utilize what the market left behind.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PrimaryCta href="#/partners">Partner With WNA</PrimaryCta>
            <GhostCta href="#/approach">Explore Our Approach</GhostCta>
          </div>
        </motion.div>

        {/* Farm → Surplus → Processing → New value rail */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1, ease: EASE }}
          className="mt-14 border-t border-cream/15 pt-6"
        >
          <div className="relative mb-5 h-px w-full bg-cream/12">
            <motion.div className="absolute inset-y-0 left-0 bg-mango" style={{ width: railProgress }} />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FLOW_RAIL.map((p, i) => (
              <div
                key={p.k}
                className={`flex items-center gap-3 transition-opacity duration-700 ${phase === i ? "opacity-100" : "opacity-40"}`}
              >
                <span className="hidden font-mono text-[10px] text-mango/70 md:inline">
                  {i < FLOW_RAIL.length - 1 ? "↓" : "·"}
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.24em] text-mango sm:text-[11px]">
                    0{i + 1} — {p.k}
                  </p>
                  <p className="mt-1.5 hidden text-[13px] text-cream/60 sm:block">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#problem"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/50 transition-colors hover:text-mango md:flex"
        aria-label="Scroll to the problem"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ============================== 02 · THE PROBLEM ==============================
   "When abundance becomes loss." — the failure happens AFTER the harvest.  */

const STAGES = [
  {
    k: "PRODUCE",
    img: IMG.harvestWoman,
    alt: "Representative image — harvest season on a farm",
    d: "Full harvest. Full potential. Every basket picked with a destination in mind.",
  },
  {
    k: "SURPLUS",
    img: IMG.tomatoes,
    alt: "Representative image — produce piled high at a market as demand lags",
    d: "Wrong time. Wrong condition. Wrong market. From farm gate to market stall, timing decides everything.",
  },
  {
    k: "VALUE AT RISK",
    img: IMG.peppers,
    alt: "Representative image — produce sorted at a market while value ticks away",
    d: "Each day unmanaged, recoverable value quietly disappears.",
    risk: true,
  },
];

const CAUSES = [
  { k: "WEAK MARKET DEMAND", d: "Buyers aren't there when the crop arrives." },
  { k: "SEASONAL OVERSUPPLY", d: "The same harvest lands everywhere at once." },
  { k: "QUALITY VARIATIONS", d: "Not every piece fits the fresh export grade." },
  { k: "LIMITED PROCESSING CAPACITY", d: "Not enough places to convert volume quickly." },
  { k: "LOGISTICS CHALLENGES", d: "Distance, cold chain and handling eat the margin." },
  { k: "LACK OF SUITABLE BUYERS", d: "No organized path to the next right destination." },
];

export function Problem({ variant = "full" }: { variant?: "full" | "teaser" }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const lineW = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section ref={ref} id="problem" aria-labelledby="problem-title" className="relative overflow-hidden bg-cream py-28 text-ink sm:py-40">
      <div className="grid-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        {variant === "full" && <Tag index="01" label="The problem" dark />}

        <h2 id="problem-title" className="display mt-8 max-w-5xl text-[clamp(2.3rem,6.4vw,5.4rem)] text-ink">
          <Words text="When abundance" />
          <br />
          <Words text="becomes" delay={0.25} />{" "}
          <Words text="loss." delay={0.45} accentWords={["loss."]} />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-ink/65 sm:text-lg">
            Farmers can grow valuable crops — and still lose on the harvest.
            When supply arrives faster than the market can absorb it, good
            produce loses its commercial value. <span className="font-semibold text-ink">The problem
            is not always production. Often it is what happens after harvest.</span>
          </p>
        </Reveal>

        {/* Transformation */}
        <div className="relative mt-16 sm:mt-24">
          <div className="absolute top-1/2 right-0 left-0 hidden h-px bg-ink/15 lg:block" aria-hidden>
            <motion.div className="h-full origin-left bg-gradient-to-r from-leaf via-mango to-ember" style={{ scaleX: lineW, width: "100%" }} />
          </div>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    className={`aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105 ${s.risk ? "saturate-[.55]" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" aria-hidden />
                  <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.25em] text-cream/80">
                    0{i + 1}
                  </span>
                  {s.risk && (
                    <span className="absolute top-4 right-4 rounded-full border border-ember/70 bg-ink/60 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-ember backdrop-blur-sm">
                      AT RISK
                    </span>
                  )}
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <p className="display-tight text-2xl text-cream sm:text-[1.7rem]">{s.k}</p>
                  </div>
                </div>
                <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-ink/60">{s.d}</p>
                {i < 2 && (
                  <span className="absolute top-[38%] -right-5 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-ink text-mango lg:flex" aria-hidden>
                    ↓
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why surplus happens */}
        {variant === "full" && (
        <div className="mt-20 sm:mt-28">
          <Reveal>
            <p className="eyebrow text-ink/50">Why surplus happens — even after a great harvest</p>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {CAUSES.map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="bg-cream p-6 transition-colors duration-300 hover:bg-paper sm:p-7"
              >
                <p className="font-mono text-[10px] tracking-[0.22em] text-ember">0{i + 1}</p>
                <p className="display-tight mt-3 text-lg text-ink">{c.k}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
        )}

        {/* Surplus ≠ Waste */}
        <div className="relative mt-24 overflow-hidden rounded-sm bg-pine px-6 py-16 text-center shadow-[0_48px_90px_-48px_rgba(6,10,7,0.6)] sm:mt-32 sm:px-16 sm:py-20">
          <div className="grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
          <div className="relative">
          <Reveal>
            <p className="eyebrow text-cream/45">The central idea</p>
          </Reveal>
          <h3 className="display mt-6 text-[clamp(2.6rem,9vw,7.5rem)] text-cream">
            <Words text="SURPLUS" />
            <span className="text-mango"> <Words text="≠" delay={0.2} /> </span>
            <Words text="WASTE" delay={0.3} />
          </h3>
          <Reveal delay={0.25}>
            <p className="mx-auto mt-8 max-w-2xl text-[15.5px] leading-relaxed text-cream/65 sm:text-lg">
              Waste is often what happens when surplus has{" "}
              <span className="text-cream">no organized path</span> to its next use.
              WNA builds that path.
            </p>
          </Reveal>
          {variant === "teaser" && (
            <Reveal delay={0.35}>
              <a
                href="#/approach"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-mango uppercase transition-colors hover:text-leaf"
              >
                Explore the full story — why abundance becomes loss
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
