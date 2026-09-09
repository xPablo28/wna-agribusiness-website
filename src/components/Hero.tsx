import { Reveal } from "./Reveal";

const TASKS = [
  { title: "Rewrite onboarding copy", who: "Mara", tone: "bg-accent" },
  { title: "Ship billing edge cases", who: "Ilya", tone: "bg-sage" },
  { title: "Review Q3 hiring plan", who: "You", tone: "bg-ink/40" },
];

function Preview() {
  return (
    <div className="relative rounded-[26px] border border-line bg-white/70 p-3 shadow-[0_50px_90px_-60px_rgba(26,23,20,0.55)]">
      <div className="rounded-[18px] border border-line/80 bg-paper p-7 sm:p-9">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="eyebrow">Tuesday</p>
            <p className="display mt-2 text-3xl">Today</p>
          </div>
          <div className="flex -space-x-2">
            {["bg-accent", "bg-sage", "bg-ink/30"].map((c, i) => (
              <span
                key={i}
                className={`h-7 w-7 rounded-full border-2 border-paper ${c}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 divide-y divide-line/80">
          {TASKS.map((t) => (
            <div key={t.title} className="flex items-center gap-4 py-4">
              <span className="h-4 w-4 shrink-0 rounded-full border border-ink/25" />
              <span className="flex-1 truncate text-[15px]">{t.title}</span>
              <span className="hidden text-[12px] text-muted sm:block">{t.who}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${t.tone}`} />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-[12px] text-muted">
            <span>3 of 5 finished</span>
            <span>Week 32</span>
          </div>
          <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-line">
            <div className="h-full w-[60%] rounded-full bg-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="sec pt-40 sm:pt-44">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Public beta
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-8 text-[clamp(3rem,9vw,6rem)]">
              Plan less.
              <br />
              <span className="italic text-accent">Finish</span> more.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="measure mt-8 text-[17px] leading-relaxed text-muted">
              Halden replaces the wall of boards and badges with a single daily
              list. One owner per task, one priority per week — so the work
              actually moves.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pricing"
                className="rounded-full bg-ink px-6 py-3.5 text-[14px] font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start your first week
              </a>
              <a
                href="#product"
                className="group inline-flex items-center gap-2 px-2 py-3.5 text-[14px] font-medium text-muted transition-colors duration-300 hover:text-ink"
              >
                See how it works
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-7 text-[12.5px] text-muted">
              Free for 14 days · No credit card · Cancel in one click
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mx-auto mt-20 max-w-3xl sm:mt-24">
          <Preview />
        </Reveal>
      </div>
    </section>
  );
}
