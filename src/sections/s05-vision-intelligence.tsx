import { motion } from "framer-motion";
import { IMG } from "../data";
import { EASE, Marquee, Reveal, StatusBadge, Tag, Words } from "../components/ui";
import { cn } from "../utils/cn";

/* ============================== 02 · VISION (Our Story page) ======================
   Static phase grid — the same arc as before, without the long scroll film.      */

const PHASES = [
  { k: "MANGO", tag: "TODAY", d: "Today's operation. One commodity, proven physically.", img: IMG.heroMango },
  { k: "MORE COMMODITIES", tag: "EXPANSION", d: "Pineapple. Cassava. Plantain. Maize. Vegetables.", img: IMG.plantainPile },
  { k: "MORE SUPPLIERS", tag: "EXPANSION", d: "Ghanaian farms, aggregators and processors join the network.", img: IMG.harvestWomen },
  { k: "MORE BUYERS", tag: "EXPANSION", d: "Feed mills, processors and recovery pathways plug in.", img: IMG.sacks },
  { k: "MORE DATA", tag: "EXPANSION", d: "Every transaction sharpens the picture of surplus.", img: IMG.aerial },
  { k: "WNA INTELLIGENCE", tag: "LONG TERM", d: "Over time — a system that understands where value should move.", img: null },
];

export function Vision() {
  return (
    <section id="vision" aria-labelledby="vision-title" className="relative overflow-hidden bg-coal py-28 sm:py-36">
      <div className="grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Tag index="02" label="The long-term vision" />
          <StatusBadge status="LONG-TERM VISION" />
        </div>
        <h2 id="vision-title" className="display mt-8 max-w-6xl text-[clamp(2.2rem,6.4vw,5.2rem)] text-cream">
          <Words text="From recovering surplus" />
          <br />
          <Words text="to predicting it." delay={0.3} accentWords={["it."]} />
        </h2>

        {/* Phase grid */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-cream/12 bg-cream/12 sm:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className="group relative flex min-h-[210px] flex-col justify-end overflow-hidden bg-coal p-6 sm:p-7"
            >
              {p.img && (
                <>
                  <img
                    src={p.img}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover opacity-[0.18] transition-all duration-700 group-hover:scale-105 group-hover:opacity-[0.28]",
                      p.tag === "TODAY" && "opacity-30",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/70 to-transparent" aria-hidden />
                </>
              )}
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={cn(
                      "font-mono text-[9.5px] tracking-[0.22em]",
                      p.tag === "TODAY" ? "text-leaf" : p.tag === "LONG TERM" ? "text-cream/40" : "text-mango/80",
                    )}
                  >
                    0{i + 1} — {p.tag}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-mango/70" aria-hidden />
                </div>
                <p className="display mt-3 text-[clamp(1.3rem,3vw,1.9rem)] text-cream">{p.k}</p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-cream/60">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto mt-16 max-w-4xl text-center sm:mt-24"
        >
          <p className="eyebrow text-cream/45">Our vision</p>
          <p className="display-tight mt-6 text-[clamp(1.3rem,3.2vw,2.2rem)] leading-[1.3] text-cream">
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

/* ============================== 03 · INTELLIGENCE ============================== */

const DATA_POINTS = ["LOCATION", "QUANTITY", "COMMODITY", "CONDITION", "TIMING", "BUYER", "PRICE", "ROUTE", "PROCESSING", "OUTCOME"];

function FlowColumn({ items, duration, reverse = false }: { items: string[]; duration: number; reverse?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className="relative h-[300px] flex-1 overflow-hidden mask-fade-b sm:h-[380px]">
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
    <section aria-labelledby="intelligence-title" className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-32">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Tag index="03" label="Data / Intelligence" />
          <StatusBadge status="LONG-TERM VISION" />
        </div>
        <h2 id="intelligence-title" className="display mt-8 max-w-5xl text-[clamp(2rem,5.6vw,4.4rem)] text-cream">
          <Words text="Every transaction makes" />
          <br />
          <Words text="the network smarter." delay={0.3} accentWords={["smarter."]} />
        </h2>

        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex gap-3" aria-hidden>
            <FlowColumn items={DATA_POINTS.slice(0, 5)} duration={16} />
            <FlowColumn items={DATA_POINTS.slice(5)} duration={20} reverse />
            <FlowColumn items={[...DATA_POINTS].reverse().slice(0, 5)} duration={18} />
          </div>

          <div className="flex flex-col justify-center">
            <Reveal>
              <div className="relative overflow-hidden rounded-sm border border-mango/30 bg-pine p-8 sm:p-10">
                <div className="grid-dark absolute inset-0 opacity-60" aria-hidden />
                <div className="relative">
                  <p className="font-mono text-[10.5px] tracking-[0.26em] text-mango uppercase">The intelligence layer</p>
                  <p className="display-tight mt-4 text-[clamp(1.5rem,3.2vw,2.3rem)] text-cream">
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
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="display mt-16 text-center text-[clamp(1.6rem,4.6vw,3.4rem)] text-cream sm:mt-24">
            <Words text="The future is not just moving produce." />
            <br />
            <span className="text-cream/70">
              <Words text="It is knowing where" delay={0.25} />
            </span>{" "}
            <Words text="value should move." delay={0.45} accentWords={["value"]} />
          </p>
        </Reveal>
      </div>

      <Marquee
        className="mt-16 border-y border-cream/10 sm:mt-20"
        items={["GRADE", "MATCH", "UTILIZE", "RECOVER VALUE", "GRADE", "MATCH", "UTILIZE", "RECOVER VALUE"]}
        slow
      />
    </section>
  );
}
