import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IMG } from "../data";
import { EASE, GhostCta, PrimaryCta, Reveal, Tag, Words } from "../components/ui";

/* ============================== HERO ============================== */

const HERO_PHASES = [
  { k: "ABUNDANCE", d: "Harvest arrives all at once." },
  { k: "SURPLUS", d: "More than the market absorbs." },
  { k: "VALUE RECOVERY", d: "WNA redirects what remains." },
];

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const railProgress = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => setPhase((p) => (p + 1) % 3), 2600);
    return () => clearInterval(t);
  }, [ready]);

  return (
    <section ref={ref} id="top" className="grain vignette relative flex min-h-[108svh] flex-col overflow-hidden">
      {/* Backdrop */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
        <motion.img
          src={IMG.ghanaHarvest}
          alt="Abundant Ghanaian harvest of mango, pineapple, plantain, yam, cassava and tomatoes representing surplus with recoverable value"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={ready ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2.2, ease: EASE }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/45 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />
      </motion.div>

      {/* Analysis overlay frame */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="pointer-events-none absolute inset-0 z-[6] hidden lg:block"
      >
        <div className="scan-frame absolute top-[16%] right-[7%] h-[46%] w-[26%] rounded-sm border border-mango/25">
          <div className="absolute -top-7 left-0 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-mango">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mango" />
            ANALYZING BATCH GH-042
          </div>
          <div className="absolute -bottom-7 left-0 font-mono text-[10px] tracking-[0.2em] text-cream/60">
            MANGO · PLANTAIN · CASSAVA — ORIGIN: GHANA
          </div>
          {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={`absolute h-6 w-6 border-mango ${c}`} />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-32 pb-16 sm:px-8 sm:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
          className="eyebrow text-mango"
        >
          Waste Not Agro Solutions — Ghana
        </motion.p>

        <h1 className="display mt-6 max-w-6xl text-[clamp(2.7rem,8.6vw,7.6rem)] text-cream">
          {ready && (
            <>
              <Words text="Agricultural surplus" delay={0.45} />
              <br />
              <Words text="still has value." delay={0.9} accentWords={["value."]} />
            </>
          )}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p className="display-tight mt-6 text-[clamp(1rem,2.6vw,1.7rem)] text-cream/85">
            We find its <span className="text-mango">next best use.</span>
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/65 sm:text-base">
            WNA identifies, grades, processes and redirects agricultural surplus
            to its highest viable use.
          </p>
          <p className="mt-5 font-mono text-[10.5px] tracking-[0.22em] text-cream/50 uppercase">
            Mango today <span className="text-mango">·</span> Pineapple · Cassava · Plantain · Maize · Vegetables in pipeline
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PrimaryCta href="#how">See how it works</PrimaryCta>
            <GhostCta href="#partners">Work with WNA</GhostCta>
          </div>
        </motion.div>

        {/* Abundance → Surplus → Value rail */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.9, duration: 1, ease: EASE }}
          className="mt-14 border-t border-cream/15 pt-6"
        >
          <div className="relative mb-5 h-px w-full bg-cream/12">
            <motion.div className="absolute inset-y-0 left-0 bg-mango" style={{ width: railProgress }} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {HERO_PHASES.map((p, i) => (
              <div key={p.k} className={`transition-opacity duration-700 ${phase === i ? "opacity-100" : "opacity-40"}`}>
                <p className="font-mono text-[10px] tracking-[0.24em] text-mango sm:text-[11px]">
                  0{i + 1} — {p.k}
                </p>
                <p className="mt-1.5 hidden text-[13px] text-cream/60 sm:block">{p.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#problem"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
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

/* ============================== 02 · PROBLEM ============================== */

const STAGES = [
  {
    k: "PRODUCE",
    img: IMG.harvestWoman,
    alt: "Harvest season on a Ghanaian farm",
    d: "Full harvest. Full potential. Every basket picked with a destination in mind.",
  },
  {
    k: "SURPLUS",
    img: IMG.tomatoes,
    alt: "Fresh tomatoes piled high at a West African market",
    d: "Wrong time. Wrong condition. Wrong market. From farm gate to market stall, timing decides everything.",
  },
  {
    k: "VALUE AT RISK",
    img: IMG.peppers,
    alt: "Peppers sorted at a West African market as value ticks away",
    d: "Each day unmanaged, recoverable value quietly disappears.",
    risk: true,
  },
];

export function Problem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const lineW = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section ref={ref} id="problem" className="relative overflow-hidden bg-ink py-28 sm:py-40">
      <div className="grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="02" label="The problem" />

        <h2 className="display mt-8 max-w-5xl text-[clamp(2rem,5.6vw,4.6rem)] text-cream">
          <Words text="Not everything that leaves the food chain" />
          <br />
          <Words text="has lost its value." delay={0.35} accentWords={["value."]} />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-cream/60 sm:text-lg">
            Agricultural produce can become surplus when it arrives at the wrong
            time, in the wrong condition, in the wrong market — or without the
            right destination.
          </p>
        </Reveal>

        {/* Transformation */}
        <div className="relative mt-16 sm:mt-24">
          <div className="absolute top-1/2 right-0 left-0 hidden h-px bg-cream/10 lg:block">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
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
                <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-cream/55">{s.d}</p>
                {i < 2 && (
                  <span className="absolute top-[38%] -right-5 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-ink text-mango lg:flex">
                    ↓
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Surplus ≠ Waste */}
        <div className="mt-24 border-t border-cream/10 pt-16 text-center sm:mt-32 sm:pt-24">
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
        </div>
      </div>
    </section>
  );
}
