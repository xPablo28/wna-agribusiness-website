import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sprout, PackageSearch, Handshake } from "lucide-react";
import { useState, type FormEvent } from "react";
import { WnaLogo } from "../components/Logo";
import { EASE, GhostCta, PrimaryCta, Reveal, Tag, Words } from "../components/ui";
import { cn } from "../utils/cn";

/* ============================== 14 · PARTNERS ============================== */

type Path = "producers" | "buyers" | "strategic";

const PATHS: Record<Path, {
  icon: typeof Sprout; title: string; q: string; cta: string;
  fields: string[]; placeholder: string;
}> = {
  producers: {
    icon: Sprout,
    title: "For producers",
    q: "Have surplus produce?",
    cta: "Submit surplus",
    fields: ["Name", "Farm / organization", "Phone or email"],
    placeholder: "e.g. Mango, pineapple, cassava — quantity, region, timing…",
  },
  buyers: {
    icon: PackageSearch,
    title: "For buyers",
    q: "Need agricultural ingredients?",
    cta: "Find supply",
    fields: ["Name", "Company", "Phone or email"],
    placeholder: "Ingredient, volume per month, delivery region…",
  },
  strategic: {
    icon: Handshake,
    title: "For strategic partners",
    q: "Want to build the agricultural value chain with us?",
    cta: "Partner with WNA",
    fields: ["Name", "Organization", "Phone or email"],
    placeholder: "Processing, logistics, investment, research — tell us more…",
  },
};

function PartnerForm({ path }: { path: Path }) {
  const [sent, setSent] = useState(false);
  const cfg = PATHS[path];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="flex min-h-[320px] flex-col items-center justify-center rounded-sm bg-ink p-10 text-center text-cream"
      >
        <CheckCircle2 className="h-10 w-10 text-leaf" strokeWidth={1.5} />
        <p className="display-tight mt-5 text-2xl">Received.</p>
        <p className="mt-3 max-w-xs text-[14px] text-cream/60">
          Thank you — the WNA team will review your message and get back to you.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 cursor-pointer font-mono text-[11px] tracking-[0.2em] text-mango uppercase hover:text-cream"
        >
          Send another →
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-sm bg-ink p-6 text-cream sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {cfg.fields.map((f) => (
          <label key={f} className="block">
            <span className="font-mono text-[10px] tracking-[0.2em] text-cream/45 uppercase">{f}</span>
            <input
              required
              type={f.includes("email") ? "email" : "text"}
              placeholder={f}
              className="mt-2 w-full rounded-sm border border-cream/15 bg-cream/[0.05] px-4 py-3.5 text-[14px] text-cream placeholder:text-cream/25 focus:border-mango focus:outline-none"
            />
          </label>
        ))}
      </div>
      <label className="mt-4 block">
        <span className="font-mono text-[10px] tracking-[0.2em] text-cream/45 uppercase">Details</span>
        <textarea
          required
          rows={4}
          placeholder={cfg.placeholder}
          className="mt-2 w-full resize-none rounded-sm border border-cream/15 bg-cream/[0.05] px-4 py-3.5 text-[14px] text-cream placeholder:text-cream/25 focus:border-mango focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="group mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-mango py-4 text-[13px] font-semibold tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:bg-cream sm:w-auto sm:px-10"
      >
        {cfg.cta}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </form>
  );
}

export function Partners() {
  const [path, setPath] = useState<Path>("producers");

  return (
    <section id="partners" className="relative overflow-hidden bg-cream py-28 text-ink sm:py-40">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="14" label="Partners" dark />
        <h2 className="display mt-8 max-w-4xl text-[clamp(2.2rem,6vw,5rem)]">
          <Words text="Build the network" /> <Words text="with us." delay={0.25} accentWords={["us."]} accentClass="text-ember" />
        </h2>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {(Object.keys(PATHS) as Path[]).map((p, i) => {
            const cfg = PATHS[p];
            const isActive = path === p;
            return (
              <motion.button
                key={p}
                type="button"
                onClick={() => setPath(p)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className={cn(
                  "cursor-pointer rounded-sm border p-7 text-left transition-all duration-300",
                  isActive ? "border-ink bg-ink text-cream" : "border-ink/15 bg-cream hover:border-ink/40",
                )}
              >
                <cfg.icon className={cn("h-7 w-7", isActive ? "text-mango" : "text-wna")} strokeWidth={1.5} />
                <p className={cn("mt-6 font-mono text-[10.5px] tracking-[0.22em] uppercase", isActive ? "text-mango" : "text-ember")}>
                  {cfg.title}
                </p>
                <p className="display-tight mt-3 text-[1.55rem] leading-tight">{cfg.q}</p>
                <p className={cn("mt-5 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase", isActive ? "text-cream" : "text-ink/60")}>
                  {cfg.cta} <ArrowUpRight className="h-4 w-4" />
                </p>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-6"
          >
            <PartnerForm path={path} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ============================== 15 · ABOUT ============================== */

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-cream/10 bg-ink py-24 sm:py-36">
      <div className="relative mx-auto max-w-[1440px] px-5 text-center sm:px-8">
        <Reveal>
          <Tag index="15" label="About" className="justify-center" />
        </Reveal>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-10 flex justify-center"
        >
          <WnaLogo
            glow
            imgClassName="h-36 w-auto sm:h-48"
            frameClassName="rounded-[1.75rem] px-8 py-5"
          />
        </motion.div>
        <h2 className="display mx-auto mt-10 max-w-5xl text-[clamp(2rem,6vw,4.8rem)] text-cream">
          <Words text="Waste Not Agro Solutions" />
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-[15.5px] leading-relaxed text-cream/65 sm:text-lg">
            WNA is a proudly Ghanaian company building a new approach to
            agricultural surplus: identify it, understand it, grade it, process
            it where necessary, and connect it to the highest viable use.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="display-tight mx-auto mt-10 max-w-2xl text-[clamp(1.4rem,3.4vw,2.2rem)] text-cream">
            Our starting point is <span className="text-mango">mango.</span>
            <br />
            Our ambition is <span className="text-mango">much bigger.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 16 · FINAL ============================== */

export function Final() {
  return (
    <section className="grain vignette relative flex min-h-[110svh] flex-col items-center justify-center overflow-hidden bg-[#040604] px-5 py-32 text-center sm:px-8">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/[0.07] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className="relative"
      >
        <p className="display text-[clamp(1.7rem,5vw,3.8rem)] text-cream/90">
          <Words text="Agricultural surplus will always exist." />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-140px" }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className="relative mt-10"
      >
        <p className="display text-[clamp(1.7rem,5vw,3.8rem)] text-cream">
          <Words text="The question is what" delay={0.4} />{" "}
          <Words text="we do with it." delay={0.7} accentWords={["it."]} />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-140px" }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="relative mt-16 sm:mt-24"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {["GRADE", "MATCH", "UTILIZE"].map((w, i) => (
            <div key={w} className="flex items-center gap-3 sm:gap-6">
              <span className="display text-[clamp(1.6rem,6vw,4.2rem)] text-mango">{w}</span>
              {i < 2 && <span className="text-cream/25">→</span>}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
        className="relative mt-14 flex flex-col items-center sm:mt-20"
      >
        <WnaLogo
          glow
          imgClassName="h-44 w-auto sm:h-56"
          frameClassName="rounded-[2rem] px-10 py-6"
          className="animate-logo-float"
        />
        <p className="eyebrow mt-6 text-cream/60">Turning agricultural surplus into its next best use.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PrimaryCta href="#partners">Work with WNA</PrimaryCta>
          <GhostCta href="#vision">Explore our vision</GhostCta>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================== FOOTER ============================== */

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <WnaLogo />
            <p className="mt-5 text-[13px] leading-relaxed text-cream/50">
              An agricultural-surplus recovery, processing and coordination
              company — reducing the loss of value from agricultural surplus,
              starting with mango in Ghana. Proudly Ghanaian — turning waste
              into opportunity.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">Explore</p>
              <ul className="mt-4 space-y-2.5 text-[13.5px]">
                {[["What We Do", "#what"], ["How It Works", "#how"], ["Products", "#product"], ["Vision", "#vision"]].map(([l, h]) => (
                  <li key={h}><a href={h} className="text-cream/65 transition-colors hover:text-mango">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">Work with us</p>
              <ul className="mt-4 space-y-2.5 text-[13.5px]">
                {[["Submit surplus", "#partners"], ["Find supply", "#partners"], ["Partner with WNA", "#partners"], ["About", "#about"]].map(([l, h]) => (
                  <li key={l}><a href={h} className="text-cream/65 transition-colors hover:text-mango">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">Status legend</p>
              <ul className="mt-4 space-y-2.5 font-mono text-[10.5px] tracking-[0.14em]">
                <li className="flex items-center gap-2 text-cream/65"><span className="h-1.5 w-1.5 rounded-full bg-leaf" /> CURRENT</li>
                <li className="flex items-center gap-2 text-cream/65"><span className="h-1.5 w-1.5 rounded-full bg-mango" /> IN DEVELOPMENT</li>
                <li className="flex items-center gap-2 text-cream/65"><span className="h-1.5 w-1.5 rounded-full bg-cream/40" /> LONG-TERM VISION</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-7 text-[12px] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Waste Not Agro Solutions. All rights reserved.</span>
          <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase">Grade → Match → Utilize</span>
        </div>
      </div>
    </footer>
  );
}
