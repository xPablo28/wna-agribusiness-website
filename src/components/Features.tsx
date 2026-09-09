import { Reveal } from "./Reveal";

const FEATURES = [
  {
    k: "01",
    title: "One list, not twelve boards",
    body: "Everything assigned to you lives in a single ordered list. No tabs to babysit, no column to drag.",
    icon: (
      <>
        <path d="M4 7h16M4 12h10M4 17h6" />
      </>
    ),
  },
  {
    k: "02",
    title: "One owner per task",
    body: "Tasks with two owners get finished by nobody. Halden makes shared work explicit or blocks it.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4" />
      </>
    ),
  },
  {
    k: "03",
    title: "One priority per week",
    body: "Pick a single weekly outcome. Everything else is visibly secondary until Monday.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4.5l3 2" />
      </>
    ),
  },
];

export function Features() {
  return (
    <section id="product" className="sec border-t border-line/70">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end">
          <Reveal>
            <p className="eyebrow">Why it feels calm</p>
            <h2 className="display mt-6 text-[clamp(2.25rem,5vw,3.5rem)]">
              Three rules.
              <br />
              Nothing else.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[16.5px] leading-relaxed text-muted">
              Most tools add a surface for every new idea. We removed almost
              everything and kept only the decisions that change what ships this
              week.
            </p>
          </Reveal>
        </div>

        <div className="gap-flow mt-20 grid md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.k} delay={i * 110}>
              <div className="flex h-full flex-col border-t border-ink/15 pt-8">
                <div className="flex items-center justify-between">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {f.icon}
                  </svg>
                  <span className="text-[12px] tracking-[0.18em] text-muted">{f.k}</span>
                </div>
                <h3 className="mt-7 text-[19px] leading-snug font-medium tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3.5 text-[15px] leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
