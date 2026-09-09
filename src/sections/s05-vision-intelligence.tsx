import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { IMG } from "../data";
import { EASE, Marquee, StatusBadge, Tag, Words } from "../components/ui";
import { cn } from "../utils/cn";

/* ============================== 09 · VISION ============================== */

const PHASES = [
  { k: "MANGO", d: "Today's operation. One commodity, proven physically.", img: IMG.heroMango },
  { k: "MORE COMMODITIES", d: "Pineapple. Cassava. Plantain. Maize. Vegetables.", img: IMG.plantainPile },
  { k: "MORE SUPPLIERS", d: "Ghanaian farms, aggregators and processors join the network.", img: IMG.harvestWomen },
  { k: "MORE BUYERS", d: "Feed mills, processors and recovery pathways plug in.", img: IMG.sacks },
  { k: "MORE DATA", d: "Every transaction sharpens the picture of surplus.", img: IMG.aerial },
  { k: "WNA INTELLIGENCE", d: "Over time — a system that understands where value should move.", img: null },
];

export function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(PHASES.length - 1, Math.floor(v * PHASES.length)));
  });

  const ringScale = useTransform(scrollYProgress, [0, 1], [0.7, 2.4]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [0.5, 0.9, 0.25]);
  const glow = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const imgDim = useTransform(scrollYProgress, [0, 0.9], [0.55, 0.12]);

  return (
    <section id="vision" className="relative bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 sm:pt-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Tag index="12" label="The long-term vision" />
          <StatusBadge status="LONG-TERM VISION" />
        </div>
        <h2 className="display mt-8 max-w-6xl text-[clamp(2.2rem,6.4vw,5.6rem)] text-cream">
          <Words text="From recovering surplus" />
          <br />
          <Words text="to predicting it." delay={0.3} accentWords={["predicting", "it."]} />
        </h2>
      </div>

      <div ref={ref} className="relative mt-8 h-[560vh]">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          {/* Backdrop crossfade */}
          <div className="absolute inset-0">
            <AnimatePresence mode="sync">
              {PHASES[active].img && (
                <motion.img
                  key={active}
                  src={PHASES[active].img!}
                  alt=""
                  aria-hidden
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </AnimatePresence>
            <motion.div style={{ opacity: imgDim }} className="absolute inset-0 bg-ink" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />
          </div>

          {/* Expanding rings */}
          <div className="absolute inset-0 grid place-items-center">
            <motion.div style={{ scale: ringScale, opacity: ringOpacity }} className="relative h-[70vmin] w-[70vmin]">
              {[100, 78, 56, 34].map((s, i) => (
                <div
                  key={s}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border",
                    i === 0 ? "border-mango/50" : "border-cream/15",
                  )}
                  style={{ width: `${s}%`, height: `${s}%` }}
                />
              ))}
              <motion.div style={{ opacity: glow }} className="absolute top-1/2 left-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mango/25 blur-[80px]" />
              {/* orbiters */}
              <div className="absolute inset-0 animate-spin-slow">
                {[0, 120, 240].map((deg) => (
                  <span
                    key={deg}
                    className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-mango shadow-[0_0_16px_4px_rgba(242,164,28,0.7)]"
                    style={{ transform: `rotate(${deg}deg) translateX(35vmin)` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center phase content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -26 }}
                transition={{ duration: 0.55, ease: EASE }}
                className="max-w-4xl"
              >
                <p className="font-mono text-[11px] tracking-[0.3em] text-mango">
                  {String(active + 1).padStart(2, "0")} / 06 — {active === 0 ? "TODAY" : active === PHASES.length - 1 ? "LONG TERM" : "EXPANSION"}
                </p>
                <p className="display mt-5 text-[clamp(2.4rem,8.5vw,6.5rem)] text-cream drop-shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
                  {PHASES[active].k}
                </p>
                <p className="mx-auto mt-5 max-w-xl text-[15px] text-cream/75 sm:text-base">
                  {PHASES[active].d}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Phase rail */}
          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-10 sm:px-8">
            <div className="grid grid-cols-6 gap-2">
              {PHASES.map((p, i) => (
                <div key={p.k} className="flex flex-col gap-2">
                  <div className="h-[3px] w-full overflow-hidden rounded-full bg-cream/15">
                    <motion.div
                      className="h-full bg-mango"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                  <span className={cn("hidden font-mono text-[9px] tracking-[0.16em] sm:block", i === active ? "text-mango" : "text-cream/40")}>
                    {p.k}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vision statement */}
      <div className="relative mx-auto max-w-[1440px] px-5 pb-28 sm:px-8 sm:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="eyebrow text-cream/45">Our vision</p>
          <p className="display-tight mt-6 text-[clamp(1.4rem,3.4vw,2.4rem)] leading-[1.25] text-cream">
            “Over time, WNA can build a system capable of understanding{" "}
            <span className="text-mango">where agricultural surplus exists</span>, how much is
            available, what condition it is in,{" "}
            <span className="text-mango">what it is worth</span>, who can use it — and{" "}
            <span className="text-mango">how it should move.</span>”
          </p>
          <p className="mt-8 font-mono text-[10.5px] tracking-[0.22em] text-cream/40 uppercase">
            A vision — not a claim about today
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================== 10 · INTELLIGENCE ============================== */

const DATA_POINTS = ["LOCATION", "QUANTITY", "COMMODITY", "CONDITION", "TIMING", "BUYER", "PRICE", "ROUTE", "PROCESSING", "OUTCOME"];

function FlowColumn({ items, duration, reverse = false }: { items: string[]; duration: number; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="relative h-[380px] flex-1 overflow-hidden mask-fade-b sm:h-[460px]">
      <motion.div
        animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        className="flex flex-col gap-3"
      >
        {list.map((d, i) => (
          <div
            key={i}
            className="rounded-sm border border-cream/12 bg-cream/[0.04] px-4 py-3 text-center font-mono text-[10.5px] tracking-[0.18em] text-cream/70"
          >
            {d}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Intelligence() {
  return (
    <section className="relative overflow-hidden border-t border-cream/10 bg-coal py-28 sm:py-40">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Tag index="13" label="Data / Intelligence" />
          <StatusBadge status="LONG-TERM VISION" />
        </div>
        <h2 className="display mt-8 max-w-5xl text-[clamp(2rem,5.6vw,4.8rem)] text-cream">
          <Words text="Every transaction makes" />
          <br />
          <Words text="the network smarter." delay={0.3} accentWords={["smarter."]} />
        </h2>

        <div className="mt-14 grid gap-10 sm:mt-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex gap-3">
            <FlowColumn items={DATA_POINTS.slice(0, 5)} duration={16} />
            <FlowColumn items={DATA_POINTS.slice(5)} duration={20} reverse />
            <FlowColumn items={[...DATA_POINTS].reverse().slice(0, 5)} duration={18} />
          </div>

          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative overflow-hidden rounded-sm border border-mango/30 bg-pine p-8 sm:p-10"
            >
              <div className="grid-dark absolute inset-0 opacity-60" />
              <div className="relative">
                <p className="font-mono text-[10.5px] tracking-[0.26em] text-mango uppercase">The intelligence layer</p>
                <p className="display-tight mt-4 text-[clamp(1.6rem,3.4vw,2.5rem)] text-cream">
                  Physical operations in. Network understanding out.
                </p>
                <div className="mt-7 space-y-3">
                  {[
                    "Surplus mapped before it is lost",
                    "Demand matched to real material",
                    "Routes priced on evidence, not guesses",
                  ].map((t, i) => (
                    <motion.div
                      key={t}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.12 }}
                      className="flex items-center gap-3 text-[14px] text-cream/75"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mango" />
                      {t}
                    </motion.div>
                  ))}
                </div>
                <p className="mt-7 border-t border-cream/10 pt-5 text-[13px] leading-relaxed text-cream/50">
                  WNA is first building the operational data foundation — the
                  transactions, grades and movements that can one day enable
                  predictive supply-chain intelligence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-20 text-center sm:mt-28">
          <h3 className="display text-[clamp(1.9rem,5.4vw,4.4rem)] text-cream">
            <Words text="The future is not just moving produce." />
          </h3>
          <h3 className="display mt-4 text-[clamp(1.9rem,5.4vw,4.4rem)]">
            <Words text="It is knowing where value should move." delay={0.3} accentWords={["value"]} />
          </h3>
        </div>
      </div>

      <Marquee
        className="mt-16 border-y border-cream/10 sm:mt-24"
        items={["GRADE", "MATCH", "UTILIZE", "RECOVER VALUE", "GRADE", "MATCH", "UTILIZE", "RECOVER VALUE"]}
        slow
      />
    </section>
  );
}
