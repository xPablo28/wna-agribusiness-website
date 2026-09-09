import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG } from "../data";
import { EASE, Reveal, StatusBadge, Tag, Words } from "../components/ui";

/* ============================== 05 · PRODUCT ============================== */

const STAGES = [
  { k: "Source", d: "Recover cleared surplus mango." },
  { k: "Sort / assess", d: "Grade condition and suitability." },
  { k: "Mill", d: "Reduce to wet pulp / paste." },
  { k: "Dry", d: "Stabilize into dry material." },
  { k: "Weigh", d: "Verify every batch." },
  { k: "Package", d: "Seal into 50kg sacks." },
  { k: "Deliver", d: "Move to feed / ingredient buyers." },
];

const SPECS = [
  { k: "FORMAT", v: "50 KG SACK" },
  { k: "SOURCE", v: "RECOVERED MANGO SURPLUS" },
  { k: "USE", v: "FEED / INGREDIENT APPLICATIONS" },
  { k: "STATUS", v: "IN DEVELOPMENT" },
];

export function Product() {
  const tlRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tlRef, offset: ["start 75%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="product" className="relative overflow-hidden bg-cream py-28 text-ink sm:py-40">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-mango/15 blur-[140px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="05" label="The product" dark />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-4xl text-[clamp(2.2rem,6.4vw,5.4rem)]">
            <Words text="From surplus" /> <Words text="to ingredient." delay={0.2} accentWords={["ingredient."]} accentClass="text-ember" />
          </h2>
          <StatusBadge status="IN DEVELOPMENT" dark />
        </div>

        <div className="mt-14 grid items-start gap-12 sm:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* Sack visualization */}
          <div className="relative lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: EASE }}
              className="relative overflow-hidden rounded-sm bg-ink"
            >
              <div className="grid-dark absolute inset-0 opacity-70" />
              <div className="absolute top-1/2 left-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-mango/30 animate-spin-slow" />
              <div className="absolute top-1/2 left-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/10" />
              <motion.img
                src={IMG.sack}
                alt="WNA dried mango feed ingredient in a branded 50kg sack"
                loading="lazy"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 mx-auto aspect-[4/4.4] w-full max-w-[420px] object-contain p-8"
              />
              <div className="absolute right-0 bottom-0 left-0 z-20 bg-gradient-to-t from-ink via-ink/70 to-transparent p-6 pt-16 sm:p-8">
                <p className="display-tight text-xl text-cream sm:text-2xl">WNA Dried Mango Feed Ingredient</p>
                <p className="mt-2 text-[13.5px] text-cream/60">
                  Processed from recovered mango surplus for feed and ingredient applications.
                </p>
              </div>
            </motion.div>

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ink/12 bg-ink/12">
              {SPECS.map((s) => (
                <div key={s.k} className="bg-cream p-5">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-smoke">{s.k}</p>
                  <p className="mt-2 font-display text-[13px] font-bold tracking-wide text-ink" style={{ fontStretch: "110%" }}>
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10.5px] leading-relaxed tracking-[0.08em] text-smoke">
              * Commercial specifications to be confirmed. No nutritional claims made at this stage.
            </p>

            <div className="mt-8">
              <p className="font-mono text-[10.5px] tracking-[0.24em] text-smoke uppercase">
                Recovery pipeline — beyond mango
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { k: "PINEAPPLE", img: IMG.pineappleBasket },
                  { k: "CASSAVA", img: IMG.cassavaStall },
                  { k: "PLANTAIN", img: IMG.plantainPile },
                ].map((c) => (
                  <div key={c.k} className="overflow-hidden rounded-sm border border-ink/12 bg-cream">
                    <img
                      src={c.img}
                      alt={`${c.k} surplus in Ghana — recovery process in development`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="p-3">
                      <p className="font-mono text-[10px] tracking-[0.16em]">{c.k}</p>
                      <p className="mt-1 text-[11px] text-smoke">In development</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7-stage scroll timeline */}
          <div ref={tlRef} className="relative">
            <div className="absolute top-2 bottom-2 left-[7px] w-px bg-ink/12">
              <motion.div className="w-full origin-top bg-gradient-to-b from-wna via-mango to-ember" style={{ height: fill }} />
            </div>
            <div className="space-y-2">
              {STAGES.map((s, i) => (
                <StageRow key={s.k} index={i} title={s.k} desc={s.d} progress={scrollYProgress} total={STAGES.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageRow({
  index, title, desc, progress, total,
}: {
  index: number; title: string; desc: string; progress: ReturnType<typeof useScroll>["scrollYProgress"]; total: number;
}) {
  const start = index / total;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const opacity = useTransform(progress, [Math.max(0, start - 0.08), start + 0.04], [0.3, 1]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dotScale = useTransform(progress, [Math.max(0, start - 0.05), start + 0.06], [0.7, 1.35]);

  return (
    <motion.div style={{ opacity }} className="relative flex gap-6 py-5 pl-10">
      <motion.span
        style={{ scale: dotScale }}
        className="absolute top-7 left-0 h-[15px] w-[15px] rounded-full border-[3px] border-cream bg-ink shadow-[0_0_0_1px_rgba(6,10,7,0.25)]"
      />
      <div className="flex flex-1 items-baseline justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.24em] text-ember">STAGE 0{index + 1}</p>
          <p className="display-tight mt-2 text-[clamp(1.5rem,3.4vw,2.4rem)]">{title}</p>
          <p className="mt-1.5 text-[14px] text-smoke">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================== 06 · WHY IT MATTERS ============================== */

const COMMODITIES = ["MANGO", "PINEAPPLE", "CASSAVA", "PLANTAIN", "MAIZE", "VEGETABLES"];

export function WhyMatters() {
  return (
    <section className="relative overflow-hidden bg-pine py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0">
        <img src={IMG.aerialDusk} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover opacity-[0.16]" />
        <div className="absolute inset-0 bg-gradient-to-b from-pine via-pine/70 to-pine" />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="06" label="Why it matters" />
        <h2 className="display mt-8 max-w-5xl text-[clamp(2.2rem,6.4vw,5.4rem)] text-cream">
          <Words text="The problem is" />
          <br />
          <Words text="bigger than mango." delay={0.25} accentWords={["mango."]} />
        </h2>

        {/* Commodity chain */}
        <div className="mt-16 sm:mt-24">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {COMMODITIES.map((c, i) => (
              <div key={c} className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                  whileHover={{ scale: 1.05 }}
                  className={
                    i === 0
                      ? "rounded-full bg-mango px-6 py-3.5 font-display text-[13px] font-extrabold tracking-[0.1em] text-ink sm:px-8 sm:py-4 sm:text-sm"
                      : "rounded-full border border-cream/20 bg-cream/5 px-6 py-3.5 font-display text-[13px] font-bold tracking-[0.1em] text-cream/85 backdrop-blur-sm transition-colors hover:border-mango/60 hover:text-mango sm:px-8 sm:py-4 sm:text-sm"
                  }
                  style={{ fontStretch: "110%" }}
                >
                  {c}
                </motion.div>
                {i < COMMODITIES.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                    className="text-lg text-mango sm:text-xl"
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 font-mono text-[10.5px] tracking-[0.22em] text-cream/45 uppercase">
              Mango today — the system is designed for every Ghanaian surplus after it
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 border-t border-cream/12 pt-12 sm:mt-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[15.5px] leading-relaxed text-cream/65 sm:text-lg">
              Agricultural surplus becomes a value-loss problem when supply and
              demand fail to meet at the{" "}
              <span className="text-cream">right time, place, quality and price.</span>
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="eyebrow text-mango">WNA's opportunity</p>
            <p className="display-tight mt-4 text-[clamp(1.6rem,3.6vw,2.6rem)] text-cream">
              Build the system that connects surplus to its next viable use.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
