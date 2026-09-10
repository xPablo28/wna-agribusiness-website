import { motion, useScroll, useTransform } from "framer-motion";
import { Boxes, ClipboardCheck, Factory, Network } from "lucide-react";
import { useRef, useState } from "react";
import { EASE, Reveal, StatusBadge, Tag, Words } from "../components/ui";
import { cn } from "../utils/cn";

/* ============================== 11 · BUSINESS MODEL ============================== */

const CHAIN = [
  "LOW-VALUE SURPLUS",
  "AGGREGATION",
  "GRADING",
  "PROCESSING",
  "STANDARDIZATION",
  "MATCHING",
  "DELIVERY",
  "HIGHER-VALUE USE",
];

const REVENUE = [
  { t: "Today", d: "Product margins.", s: "CURRENT" as const },
  { t: "Next", d: "Processing margins and coordination.", s: "IN DEVELOPMENT" as const },
  { t: "Long term", d: "Logistics coordination and network intelligence services.", s: "LONG-TERM VISION" as const },
];

export function BusinessModel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const meter = useTransform(scrollYProgress, [0, 1], ["4%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-paper py-28 text-ink sm:py-40">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="03" label="Business model" dark />
        <h2 className="display mt-8 max-w-4xl text-[clamp(2.2rem,6vw,5rem)]">
          <Words text="How WNA" /> <Words text="creates value" delay={0.2} accentWords={["value"]} accentClass="text-wna" />
        </h2>

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Value chain */}
          <div ref={ref} className="relative">
            <div className="absolute top-1 bottom-1 left-[5px] w-[2px] bg-ink/10">
              <motion.div className="w-full origin-top bg-gradient-to-b from-smoke via-mango to-wna" style={{ height: meter }} />
            </div>
            <div>
              {CHAIN.map((c, i) => (
                <ChainRow key={c} label={c} index={i} total={CHAIN.length} progress={scrollYProgress} />
              ))}
            </div>
            <div className="mt-6 ml-10 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.22em] text-smoke uppercase">Value captured</span>
              <div className="h-2 w-40 overflow-hidden rounded-full bg-ink/10 sm:w-56">
                <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-smoke via-mango to-wna" style={{ scaleX: scrollYProgress }} />
              </div>
            </div>
          </div>

          {/* Revenue model */}
          <div>
            <Reveal>
              <p className="eyebrow text-ink/50">Revenue model — stated carefully</p>
            </Reveal>
            <div className="mt-6 space-y-4">
              {REVENUE.map((r, i) => (
                <motion.div
                  key={r.t}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
                  className="rounded-sm border border-ink/12 bg-cream p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="display-tight text-xl">{r.t}</p>
                    <StatusBadge status={r.s} dark />
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{r.d}</p>
                </motion.div>
              ))}
            </div>
            <Reveal delay={0.15}>
              <p className="mt-5 font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-smoke">
                * WNA does not claim revenue from services it does not currently offer.
                Future revenue streams describe direction, not current operations.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChainRow({
  label, index, total, progress,
}: {
  label: string; index: number; total: number; progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const opacity = useTransform(progress, [Math.max(0, start - 0.1), start + 0.05], [0.35, 1]);
  const last = index === total - 1;
  return (
    <motion.div style={{ opacity }} className="relative flex items-center gap-5 py-3 pl-10">
      <span className={cn("absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full", last ? "bg-wna shadow-[0_0_14px_3px_rgba(31,92,52,0.5)]" : "bg-ink/70")} />
      <span className="font-mono text-[10px] text-smoke">0{index + 1}</span>
      <p className={cn("display-tight text-[clamp(1.15rem,2.8vw,1.8rem)]", last ? "text-wna" : "")}>{label}</p>
    </motion.div>
  );
}

/* ============================== 12 · WHY WNA ============================== */

const PILLARS = [
  { k: "SUPPLY", d: "Access to surplus at the source — farms, markets and processors.", icon: Boxes },
  { k: "QUALITY", d: "Grading discipline that buyers can trust, batch after batch.", icon: ClipboardCheck },
  { k: "PROCESSING", d: "Physical capability that turns variable surplus into standard product.", icon: Factory },
  { k: "COORDINATION", d: "The logistics knowledge and relationships that move material to demand.", icon: Network },
];

export function WhyWna() {
  return (
    <section className="relative overflow-hidden bg-wna-deep py-28 text-cream sm:py-40">
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-[560px] w-[560px] rounded-full bg-ink/25 blur-[140px]" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="02" label="Why partner with WNA" />
        <h2 className="display mt-8 max-w-6xl text-[clamp(2rem,5.6vw,4.8rem)]">
          <Words text="We are building the infrastructure" />
          <br />
          <Words text="between surplus and demand." delay={0.3} accentWords={["demand."]} accentClass="text-mango" />
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-cream/15 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.k}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(6,10,7,0.35)" }}
              className="group bg-wna p-7 transition-colors duration-500 sm:p-8"
            >
              <p.icon className="h-7 w-7 text-mango transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.5} />
              <p className="display-tight mt-8 text-2xl">{p.k}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-cream/70">{p.d}</p>
              <p className="mt-6 font-mono text-[10px] tracking-[0.24em] text-cream/35">0{i + 1}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-3xl text-center text-[15.5px] leading-relaxed text-cream/85 sm:mt-20 sm:text-lg">
            “WNA combines physical recovery with the relationships, standards,
            logistics knowledge and transaction data needed to move surplus into
            its next best use.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 13 · SCALE ============================== */

type ScalePhase = "ghana" | "west" | "africa";

const SCALE_COPY: Record<ScalePhase, { title: string; line: string; note: string }> = {
  ghana: {
    title: "GHANA",
    line: "Starting in Ghana.",
    note: "Mango surplus recovery and feed-ingredient development begin here.",
  },
  west: {
    title: "WEST AFRICA",
    line: "Designed to expand across West Africa.",
    note: "Shared crops, shared seasons, shared surplus patterns.",
  },
  africa: {
    title: "AFRICA",
    line: "Long-term: Africa.",
    note: "A continental network for agricultural value recovery.",
  },
};

export function Scale() {
  const [phase, setPhase] = useState<ScalePhase>("ghana");

  return (
    <section className="relative overflow-hidden bg-ink py-28 sm:py-40">
      <div className="grid-dark pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="03" label="Scale" />
        <h2 className="display mt-8 max-w-4xl text-[clamp(2.2rem,6vw,5rem)] text-cream">
          <Words text="Rooted here." /> <Words text="Built to spread." delay={0.25} accentWords={["spread."]} />
        </h2>

        <div className="mt-14 grid items-center gap-12 sm:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* Cinematic map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative overflow-hidden rounded-sm border border-cream/12 bg-coal p-6 sm:p-10"
          >
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-cream/40">
              <span>WNA NETWORK MAP</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf" /> LIVE SCHEMATIC
              </span>
            </div>

            <div className="relative mx-auto mt-4 max-w-[380px]">
              <svg viewBox="0 0 300 340" className="w-full">
                {/* graticule */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`v${i}`} x1={20 + i * 32} y1="10" x2={20 + i * 32} y2="330" stroke="rgba(251,248,240,0.05)" strokeWidth="1" />
                ))}
                {Array.from({ length: 10 }).map((_, i) => (
                  <line key={`h${i}`} x1="10" y1={20 + i * 32} x2="290" y2={20 + i * 32} stroke="rgba(251,248,240,0.05)" strokeWidth="1" />
                ))}
                {/* Africa silhouette (stylized) */}
                <motion.path
                  d="M84 58 L128 44 L158 40 L182 56 L212 62 L226 78 L232 108 L224 138 L240 152 L258 168 L242 188 L228 214 L220 248 L208 282 L190 308 L170 320 L152 312 L140 282 L132 250 L142 218 L150 190 L138 168 L116 158 L96 146 L72 128 L64 100 L70 76 Z"
                  fill="rgba(31,92,52,0.28)"
                  stroke={phase === "africa" ? "#F2A41C" : "rgba(109,190,109,0.6)"}
                  strokeWidth="1.6"
                  animate={{ opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* West Africa region */}
                <motion.ellipse
                  cx="104"
                  cy="132"
                  rx="46"
                  ry="40"
                  fill="none"
                  stroke="#F2A41C"
                  strokeWidth="1.4"
                  strokeDasharray="6 6"
                  initial={false}
                  animate={{ opacity: phase === "ghana" ? 0.25 : 1, scale: phase === "ghana" ? 0.9 : 1 }}
                  style={{ transformOrigin: "104px 132px" }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
                {/* Ghana pin */}
                <g>
                  <circle cx="108" cy="150" r="14" fill="none" stroke="#F2A41C" strokeWidth="1" className="origin-center animate-pulse-ring" style={{ transformOrigin: "108px 150px" }} />
                  <circle cx="108" cy="150" r="5" fill="#F2A41C" />
                  <circle cx="108" cy="150" r="9" fill="none" stroke="#F2A41C" strokeWidth="1" opacity="0.5" />
                  <text x="122" y="154" fill="#FBF8F0" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">GHANA</text>
                </g>
                {/* spread nodes */}
                {phase !== "ghana" && (
                  <>
                    {[[76, 104], [140, 150], [96, 176], [170, 120], [150, 220], [200, 260]].slice(0, phase === "west" ? 3 : 6).map(([x, y], i) => (
                      <motion.g key={`${x}-${y}`} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: EASE }}>
                        <circle cx={x} cy={y} r="3.5" fill="#6DBE6D" />
                        <line x1="108" y1="150" x2={x} y2={y} stroke="rgba(242,164,28,0.4)" strokeWidth="1" strokeDasharray="4 5" className="animate-flow" />
                      </motion.g>
                    ))}
                  </>
                )}
              </svg>
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-cream/35">
              <span>5.60° N — ACCRA</span>
              <span>AGRICULTURAL BELT</span>
            </div>
          </motion.div>

          {/* Phase selector */}
          <div>
            <div className="flex gap-2 rounded-full border border-cream/15 p-1.5">
              {(Object.keys(SCALE_COPY) as ScalePhase[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPhase(p)}
                  className={cn(
                    "flex-1 cursor-pointer rounded-full py-3 font-mono text-[10.5px] tracking-[0.18em] uppercase transition-all duration-300",
                    phase === p ? "bg-mango text-ink" : "text-cream/55 hover:text-cream",
                  )}
                >
                  {SCALE_COPY[p].title}
                </button>
              ))}
            </div>

            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="mt-10"
            >
              <p className="display text-[clamp(2.6rem,6vw,4.6rem)] text-mango">{SCALE_COPY[phase].title}</p>
              <p className="display-tight mt-4 text-[clamp(1.3rem,3vw,2rem)] text-cream">{SCALE_COPY[phase].line}</p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-cream/60">{SCALE_COPY[phase].note}</p>
            </motion.div>

            <div className="mt-10 border-t border-cream/10 pt-6">
              <p className="font-mono text-[10.5px] leading-relaxed tracking-[0.08em] text-cream/40">
                WNA does not imply current operations beyond Ghana. Expansion describes
                system design and long-term direction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
