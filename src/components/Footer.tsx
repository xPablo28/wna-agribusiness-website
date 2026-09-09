import { Reveal } from "./Reveal";

const COLS = [
  { title: "Product", links: ["Overview", "Method", "Pricing", "Changelog"] },
  { title: "Company", links: ["About", "Writing", "Careers"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
];

export function Footer() {
  return (
    <footer className="border-t border-line/70">
      <section className="sec pb-0">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="display text-[clamp(2.5rem,7vw,4.5rem)]">
            Start with one
            <br />
            quiet week.
          </h2>
          <p className="measure mx-auto mt-7 text-[16.5px] leading-relaxed text-muted">
            Make a workspace, invite two people, pick Monday's outcome. That is
            the whole setup.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#top"
              className="rounded-full bg-accent px-7 py-4 text-[14px] font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              Create your workspace
            </a>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="rule" />
        <div className="flex flex-col gap-12 py-16 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-paper" fill="none">
                  <path
                    d="M12 3v18M3 12h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-[15px] font-medium tracking-tight">Halden</span>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              A calm planning workspace for small teams. Built in Oslo and
              Lisbon.
            </p>
          </div>

          <div className="gap-flow grid grid-cols-2 gap-x-12 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-[12px] tracking-[0.18em] text-muted uppercase">
                  {c.title}
                </p>
                <ul className="mt-5 space-y-3 text-[14px]">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="text-muted transition-colors hover:text-ink">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line/70 py-8 text-[12.5px] text-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Halden Software AS</span>
          <span>Made for teams who would rather build.</span>
        </div>
      </div>
    </footer>
  );
}
