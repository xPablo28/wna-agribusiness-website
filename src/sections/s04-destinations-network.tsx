import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Check, RotateCcw, X } from "lucide-react";
import { useState } from "react";
import { EASE, Reveal, StatusBadge, Tag, Words } from "../components/ui";
import { cn } from "../utils/cn";

/* ============================== 07 · VALUE DESTINATIONS ============================== */

const GRADES = [
  { k: "CONSUMABLE", d: "Food market", c: "bg-wna", t: "text-cream", active: true },
  { k: "PRODUCTION", d: "Processor", c: "bg-mango", t: "text-ink", active: true },
  { k: "FEED", d: "Feed market", c: "bg-ember", t: "text-cream", active: true },
  { k: "BIOGAS", d: "Recovery", c: "border border-earth/40 bg-earth/10", t: "text-earth", active: false },
  { k: "COMPOST", d: "Recovery", c: "border border-earth/40 bg-earth/10", t: "text-earth", active: false },
  { k: "OTHER", d: "Valid use", c: "border border-earth/40 bg-earth/10", t: "text-earth", active: false },
];

type Step = { q: string; yes: string; no: string | null; result?: string; resultSub?: string };

const TREE: Step[] = [
  { q: "CONSUMABLE?", yes: "FOOD MARKET", no: null, result: "FOOD MARKET", resultSub: "Highest viable use: direct consumption." },
  { q: "PRODUCTION?", yes: "PROCESSOR", no: null, result: "PROCESSOR", resultSub: "Highest viable use: processing into food products." },
  { q: "FEED?", yes: "FEED MARKET", no: null, result: "FEED MARKET", resultSub: "Highest viable use: feed & ingredient applications." },
];

const RECOVERY = { result: "RECOVERY", resultSub: "Biogas / compost / other valid use — value still recovered." };

function DecisionTree() {
  const [level, setLevel] = useState(0);
  const [done, setDone] = useState<string | null>(null);
  const [doneSub, setDoneSub] = useState("");
  const [path, setPath] = useState<string[]>(["SURPLUS", "ASSESS"]);

  const answer = (yes: boolean) => {
    if (done) return;
    if (yes) {
      setDone(TREE[level].result!);
      setDoneSub(TREE[level].resultSub!);
      setPath((p) => [...p, TREE[level].q, "YES"]);
    } else if (level < 2) {
      setPath((p) => [...p, TREE[level].q, "NO"]);
      setLevel(level + 1);
    } else {
      setPath((p) => [...p, TREE[level].q, "NO"]);
      setDone(RECOVERY.result);
      setDoneSub(RECOVERY.resultSub);
    }
  };

  const reset = () => {
    setLevel(0);
    setDone(null);
    setDoneSub("");
    setPath(["SURPLUS", "ASSESS"]);
  };

  return (
    <div className="overflow-hidden rounded-sm border border-ink/15 bg-cream">
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-7">
        <p className="font-mono text-[10.5px] tracking-[0.24em] text-smoke uppercase">
          Interactive grader — try a batch
        </p>
        <button
          type="button"
          onClick={reset}
          className="flex min-h-10 cursor-pointer items-center gap-2 rounded-full px-3 font-mono text-[10.5px] tracking-[0.2em] text-ink/50 uppercase transition-colors hover:text-ember"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr]">
        {/* Path visual */}
        <div className="border-b border-ink/10 p-5 sm:p-7 lg:border-r lg:border-b-0">
          <div className="flex flex-wrap items-center gap-2">
            {path.map((p, i) => (
              <motion.span
                key={`${p}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.14em]",
                  p === "YES" ? "bg-wna text-cream" : p === "NO" ? "bg-ink/10 text-ink/60" : "bg-ink text-cream",
                )}
              >
                {p}
              </motion.span>
            ))}
            {!done && (
              <motion.span
                key={`q-${level}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full border-2 border-dashed border-ember/60 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.14em] text-ember"
              >
                {TREE[level].q}
              </motion.span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-8"
              >
                <p className="display-tight text-[clamp(1.8rem,4vw,2.8rem)]">
                  Is this batch <span className="text-ember">{TREE[level].q.replace("?", "")}</span> grade?
                </p>
                <p className="mt-3 text-[14px] text-smoke">
                  WNA assesses condition, safety and suitability before routing anything.
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => answer(true)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink py-4 text-[13px] font-semibold tracking-[0.14em] text-cream uppercase transition-all duration-300 hover:bg-wna"
                  >
                    <Check className="h-4 w-4" /> Yes — route it
                  </button>
                  <button
                    type="button"
                    onClick={() => answer(false)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-ink/25 py-4 text-[13px] font-semibold tracking-[0.14em] text-ink uppercase transition-all duration-300 hover:border-ember hover:text-ember"
                  >
                    <X className="h-4 w-4" /> No — assess next
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-8 rounded-sm bg-ink p-6 text-cream sm:p-8"
              >
                <p className="font-mono text-[10.5px] tracking-[0.24em] text-mango uppercase">Highest viable use</p>
                <p className="display-tight mt-3 text-[clamp(2rem,4.6vw,3.2rem)] text-mango">{done}</p>
                <p className="mt-3 text-[14px] text-cream/65">{doneSub}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-cream/60 uppercase transition-colors hover:text-cream"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Grade another batch
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Static architecture map */}
        <div className="bg-paper p-5 sm:p-7">
          <p className="font-mono text-[10.5px] tracking-[0.24em] text-smoke uppercase">Grade architecture</p>
          <div className="mt-5 space-y-3">
            {[
              { a: "SURPLUS → ASSESS", b: "Every batch enters here" },
              { a: "CONSUMABLE → FOOD MARKET", b: "Yes → route · No → continue" },
              { a: "PRODUCTION → PROCESSOR", b: "Yes → route · No → continue" },
              { a: "FEED → FEED MARKET", b: "Yes → route · No → continue" },
              { a: "RECOVERY → BIOGAS / COMPOST / OTHER", b: "Remaining value captured" },
            ].map((r, i) => (
              <motion.div
                key={r.a}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-sm border px-4 py-3.5",
                  i === 0 ? "border-ink bg-ink text-cream" : "border-ink/12 bg-cream",
                )}
              >
                <span className="font-mono text-[11px] tracking-[0.1em]">{r.a}</span>
                <span className={cn("hidden text-[11.5px] sm:block", i === 0 ? "text-cream/55" : "text-smoke")}>{r.b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Destinations() {
  return (
    <section id="destinations" aria-labelledby="destinations-title" className="relative overflow-hidden bg-sand py-28 text-ink sm:py-40">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Tag index="04" label="Value destinations" dark />
          <StatusBadge status="IN DEVELOPMENT" dark />
        </div>

        <h2 id="destinations-title" className="display mt-8 max-w-5xl text-[clamp(2rem,5.4vw,4.6rem)]">
          <Words text="Not every batch" />
          <br />
          <Words text="belongs in the same market." delay={0.25} accentWords={["market."]} accentClass="text-ember" />
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-ink/65 sm:text-lg">
            The objective is not to force every surplus product into food. The
            objective is to determine:{" "}
            <span className="font-semibold text-ink">“What is the highest viable use for this material?”</span>
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 lg:grid-cols-6">
          {GRADES.map((g, i) => (
            <motion.div
              key={g.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className={cn("rounded-sm p-5", g.c)}
            >
              <p className={cn("font-display text-[15px] font-extrabold tracking-wide", g.t)} style={{ fontStretch: "108%" }}>
                {g.k}
              </p>
              <p className={cn("mt-1.5 font-mono text-[10px] tracking-[0.16em] uppercase", g.active ? (g.t === "text-ink" ? "text-ink/60" : "text-cream/70") : "text-ink/45")}>
                {g.d}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 sm:mt-14">
          <DecisionTree />
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 09 · NETWORK / VALUE CHAIN ========================= */

const FLOW = ["PRODUCERS", "WNA", "PROCESSING", "PRODUCT / INGREDIENT", "BUYERS / END USE"];
const DATA_LAYERS = ["SUPPLY DATA", "QUALITY DATA", "DEMAND DATA", "PRICE DATA", "LOGISTICS DATA", "TRANSACTION DATA"];

export function Network() {
  return (
    <section id="network" aria-labelledby="network-title" className="relative overflow-hidden bg-wna-deep py-28 sm:py-40">
      <div className="grid-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="02" label="The WNA network" />
        <h2 id="network-title" className="display mt-8 max-w-5xl text-[clamp(2.2rem,6vw,5rem)] text-cream">
          <Words text="Between supply" />
          <br />
          <Words text="and productive demand." delay={0.25} accentWords={["demand."]} />
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-cream/60 sm:text-lg">
            WNA sits in the middle of this chain: agricultural supply enters
            from one side, productive demand from the other. <span className="text-cream">Everyone
            in the line has a defined role — including you.</span>
          </p>
        </Reveal>

        {/* Flow */}
        <div className="mt-14 sm:mt-20">
          <div className="flex flex-col gap-0 lg:flex-row lg:items-stretch">
            {FLOW.map((f, i) => (
              <div key={f} className="flex flex-col lg:flex-1 lg:flex-row lg:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
                  className={cn(
                    "relative flex-1 rounded-sm border p-6 text-center sm:p-8",
                    f === "WNA" ? "border-mango/70 bg-mango/10" : "border-cream/15 bg-cream/[0.03]",
                  )}
                >
                  {f === "WNA" && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mango px-3 py-0.5 font-mono text-[9.5px] tracking-[0.2em] text-ink">
                      COORDINATOR
                    </span>
                  )}
                  <p className={cn("display-tight text-lg sm:text-xl", f === "WNA" ? "text-mango" : "text-cream")}>{f}</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-cream/50">
                    {{
                      PRODUCERS: "Farms, aggregators and processors with surplus",
                      WNA: "Grade → Match → Utilize",
                      PROCESSING: "Milling, drying, standardizing — by WNA or partners",
                      "PRODUCT / INGREDIENT": "Verified material, ready for its next use",
                      "BUYERS / END USE": "Feed, ingredients and recovery applications",
                    }[f]}
                  </p>
                </motion.div>
                {i < FLOW.length - 1 && (
                  <div className="flex items-center justify-center py-3 lg:px-2 lg:py-0">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12 }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-mango/15 text-mango"
                    >
                      <ArrowDown className="h-4 w-4 lg:-rotate-90" />
                    </motion.span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Animated connection line */}
          <svg className="mt-8 hidden h-6 w-full lg:block" preserveAspectRatio="none" viewBox="0 0 1000 24" aria-hidden>
            <line x1="0" y1="12" x2="1000" y2="12" stroke="rgba(242,164,28,0.5)" strokeWidth="2" strokeDasharray="14 14" className="animate-flow" />
          </svg>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-mango/30 bg-mango/[0.06] p-5 sm:px-7">
              <p className="display-tight text-lg text-cream sm:text-xl">Where do you fit in this line?</p>
              <a href="#/partners" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-mango uppercase transition-colors hover:text-cream">
                Producer, buyer or partner — start here →
              </a>
            </div>
          </Reveal>
        </div>

        {/* Data layers */}
        <div className="mt-14 border-t border-cream/10 pt-12 sm:mt-20">
          <Reveal>
            <p className="eyebrow text-cream/45">Additional layers — every movement creates information</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {DATA_LAYERS.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                whileHover={{ borderColor: "rgba(242,164,28,0.6)" }}
                className="group rounded-sm border border-cream/12 bg-pine/60 p-5 transition-colors"
              >
                <span className="block h-1.5 w-1.5 rounded-full bg-leaf transition-colors group-hover:bg-mango" />
                <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-cream/80">{d}</p>
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="display-tight mt-12 max-w-4xl text-[clamp(1.5rem,3.6vw,2.6rem)] text-cream/90">
              “Every movement through the network creates information.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
