import { motion } from "framer-motion";
import { ArrowRight, Quote, User } from "lucide-react";
import { useState } from "react";
import { COMPANY, FOUNDERS, IMG, isPlaceholder } from "../data";
import { EASE, Reveal, Tag, Words } from "../components/ui";

/* ============================== 10 · HUMAN IMPACT ==============================
   Why the work matters — stated without invented statistics.                */

const IMPACT = [
  {
    who: "FARMERS",
    d: "A better pathway for surplus: produce that would stall in the market has somewhere organized to go.",
    icon: "↗",
  },
  {
    who: "PROCESSORS",
    d: "A usable feedstock stream: recovered material, graded and standardized, entering productive processing.",
    icon: "⚙",
  },
  {
    who: "BUYERS",
    d: "Alternative ingredient and feed inputs, supplied with defined condition and consistency.",
    icon: "◈",
  },
  {
    who: "COMMUNITIES",
    d: "More of what the land produces becomes productive use — value stays closer to home.",
    icon: "✳",
  },
  {
    who: "ENVIRONMENT",
    d: "Less unnecessary loss: food-system output is used further along before it is discarded.",
    icon: "❦",
  },
];

export function Impact({ variant = "full" }: { variant?: "full" | "home" } = {}) {
  const home = variant === "home";
  return (
    <section id="impact" aria-labelledby="impact-title" className={home ? "relative overflow-hidden bg-sand py-24 text-ink sm:py-28" : "relative overflow-hidden bg-sand py-28 text-ink sm:py-40"}>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        {!home && <Tag index="04" label="Why it matters" dark />}
        <h2 id="impact-title" className={home ? "display mt-2 max-w-5xl text-[clamp(1.8rem,4.6vw,3.4rem)]" : "display mt-8 max-w-5xl text-[clamp(2.1rem,5.6vw,4.6rem)]"}>
          <Words text="Surplus systems" />
          <br />
          <Words text="serve real people." delay={0.25} accentWords={["people."]} accentClass="text-wna" />
        </h2>
        <Reveal delay={0.15}>
          <p className={home ? "sr-only" : "mt-6 max-w-2xl text-[15.5px] leading-relaxed text-ink/65 sm:text-lg"}>
            Recovery work rarely shows up in numbers on a homepage — and we
            won't invent them. Here is who the system is built for, and what
            changes for them when surplus finally has a next step.
          </p>
        </Reveal>

        <ul className="mt-14 sm:mt-20">
          {IMPACT.map((p, i) => (
            <motion.li
              key={p.who}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
              className="group grid items-baseline gap-2 border-t border-ink/15 py-7 last:border-b sm:grid-cols-[70px_230px_1fr_auto] sm:gap-6"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-ember" aria-hidden>
                0{i + 1}
              </span>
              <p className="display-tight text-[clamp(1.3rem,3vw,1.9rem)]">{p.who}</p>
              <p className="max-w-2xl text-[14.5px] leading-relaxed text-ink/65 sm:text-[15px]">{p.d}</p>
              <span className="hidden text-2xl text-wna transition-transform duration-300 group-hover:translate-x-1 sm:block" aria-hidden>
                {p.icon}
              </span>
            </motion.li>
          ))}
        </ul>

        <Reveal delay={0.1}>
          {!home && (
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-sm">
              <img
                src={IMG.harvestWomen}
                alt="Representative image — farmers at harvest; every pathway WNA builds is meant to reach people like them"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <p className="eyebrow text-ink/45">The measure that matters today</p>
              <p className="display-tight mt-4 text-[clamp(1.5rem,3.6vw,2.4rem)] leading-tight">
                Not tonnes claimed. <span className="text-wna">Pathways that actually work.</span>
              </p>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-ink/60">
                WNA reports what it can verify as the operation matures. The
                story above is the direction; the evidence will follow the work.
              </p>
            </div>
          </div>
        )}
        </Reveal>
        {home && (
          <Reveal delay={0.12}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#/story" className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[13px] font-semibold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-wna">
                Meet the Founders
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a href="#/products" className="font-mono text-[11px] tracking-[0.2em] text-ink/60 uppercase transition-colors hover:text-ember">
                See what the system produces →
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ============================== OUR STORY / FOUNDERS ==========================
   The most human section on the site. Founder details are PLACEHOLDERS until
   real information is supplied in src/data.ts → FOUNDERS.                    */

const NARRATIVE = [
  { k: "THE PROBLEM", d: "Good harvests still lose value when the market cannot absorb them." },
  { k: "THE QUESTION", d: "What happens to value when the market says “not today”?" },
  { k: "THE IDEA", d: "Treat surplus as a resource with a next best use — grade it, match it, utilize it." },
  { k: "WNA", d: `${COMPANY.shortName} — ${COMPANY.tagline.toLowerCase()}` },
  { k: "THE VISION", d: "A system that keeps agricultural value moving for Ghana — one pathway at a time." },
];

function FounderCard({ f, i }: { f: (typeof FOUNDERS)[number]; i: number }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const hasPhoto = !isPlaceholder(f.photo) && !photoFailed;
  const hasQuote = !isPlaceholder(f.quote);
  const hasBio = !isPlaceholder(f.bio);

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-sm border border-ink/12 bg-cream transition-shadow duration-500 hover:shadow-[0_24px_60px_-32px_rgba(6,10,7,0.45)]"
    >
      {/* Photo slot — drop a file at public/images/founders/founder-1.jpg (see src/data.ts) */}
      <div className="relative">
        {hasPhoto ? (
          <img
            src={f.photo}
            alt={`${f.name} — ${f.role} at ${COMPANY.shortName}`}
            loading="lazy"
            onError={() => setPhotoFailed(true)}
            className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="grid aspect-[4/5] w-full place-items-center border-b border-dashed border-ember/40 bg-ink/[0.04]"
            role="img"
            aria-label={`Photo placeholder for ${f.name} — add a real photograph to replace this slot`}
          >
            <span className="flex flex-col items-center gap-3 text-center">
              <User className="h-10 w-10 text-ink/30" strokeWidth={1.25} />
              <span className="font-mono text-[10px] tracking-[0.22em] text-ink/50 uppercase">
                [FOUNDER {i + 1} PHOTO]
              </span>
              <span className="font-mono text-[9px] tracking-[0.14em] text-ink/40 uppercase">
                public/images/founders/founder-{i + 1}.jpg
              </span>
            </span>
          </div>
        )}
        <span className={`display absolute top-4 right-4 text-4xl ${hasPhoto ? "text-cream/70" : "text-ink/25"}`} aria-hidden>
          0{i + 1}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <p className="display-tight text-[clamp(1.4rem,3vw,1.8rem)] text-ink">{f.name}</p>
        <p className="mt-1.5 font-mono text-[10.5px] tracking-[0.22em] text-ember uppercase">{f.role}</p>
        <p className="mt-5 text-[14px] leading-relaxed text-ink/65">
          {hasBio ? f.bio : "[FOUNDER BIO — a short, human paragraph will live here.]"}
        </p>
        {hasQuote && (
          <blockquote className="mt-6 border-l-2 border-wna/60 pl-5">
            <Quote className="h-4 w-4 text-wna" aria-hidden />
            <p className="display-tight mt-2 text-[clamp(1.05rem,2.2vw,1.3rem)] leading-snug text-ink/85">
              “{f.quote}”
            </p>
          </blockquote>
        )}
      </div>
    </motion.article>
  );
}

export function Story() {
  const anyPlaceholder = FOUNDERS.some(
    (f) => isPlaceholder(f.name) || isPlaceholder(f.role) || isPlaceholder(f.bio),
  );

  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-paper py-28 text-ink sm:py-40">
      <div className="grid-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="01" label="The people behind WNA" dark />
        <h2 id="story-title" className="display mt-8 max-w-5xl text-[clamp(2.2rem,6vw,4.8rem)] text-ink">
          <Words text="The people" />
          <br />
          <Words text="behind WNA." delay={0.25} accentWords={["WNA."]} />
        </h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Narrative spine */}
          <div>
            <Reveal>
              <p className="display-tight text-[clamp(1.5rem,3.6vw,2.3rem)] leading-tight text-ink">
                Every company starts with a problem someone refuses to ignore.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/65">
                {COMPANY.fullName} began with a simple question:{" "}
                <span className="font-semibold text-ember">what happens to value when the market says
                “not today”?</span>
              </p>
            </Reveal>

            <ol className="relative mt-12 space-y-0 border-l border-ink/15 pl-8" aria-label="How WNA came together">
              {NARRATIVE.map((n, i) => (
                <motion.li
                  key={n.k}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, ease: EASE, delay: i * 0.08 }}
                  className="relative py-4 last:pb-0"
                >
                  <span
                    className={`absolute top-1/2 -left-[38px] grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full border ${n.k === "WNA" ? "border-ember bg-ember" : "border-ink/25 bg-paper"}`}
                    aria-hidden
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${n.k === "WNA" ? "bg-cream" : "bg-wna"}`} />
                  </span>
                  <p className={`font-mono text-[10.5px] tracking-[0.24em] uppercase ${n.k === "WNA" ? "text-ember" : "text-ink/45"}`}>
                    {n.k}
                  </p>
                  <p className={`mt-1.5 text-[15px] leading-relaxed ${n.k === "WNA" ? "display-tight text-xl text-ink" : "text-ink/70"}`}>
                    {n.d}
                  </p>
                  {i < NARRATIVE.length - 1 && (
                    <ArrowRight className="absolute top-1/2 -right-2 hidden h-4 w-4 rotate-90 text-ink/20 lg:block" aria-hidden />
                  )}
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Founder cards */}
          <div>
            {anyPlaceholder && (
              <div className="mb-6 rounded-sm border border-dashed border-ember/50 bg-ember/[0.06] p-4">
                <p className="font-mono text-[10px] leading-relaxed tracking-[0.14em] text-ember/90 uppercase">
                  Editorial note — WNA has three founders; details are pending confirmation.
                  Replace the placeholders in <span className="font-semibold text-ink">src/data.ts → FOUNDERS</span>{" "}
                  and the photos in <span className="font-semibold text-ink">public/images/founders/</span> before launch.
                  Nothing on this page is invented.
                </p>
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
              {FOUNDERS.map((f, i) => (
                <FounderCard key={i} f={f} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
