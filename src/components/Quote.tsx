import { Reveal } from "./Reveal";

export function Quote() {
  return (
    <section className="sec bg-ink text-paper">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="display text-[clamp(1.9rem,4.6vw,3.25rem)] leading-[1.15]">
            “We cut our planning meeting from an hour to ten minutes. The board
            count went from nine to one, and somehow we ship faster.”
          </p>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-12 flex flex-col items-center gap-1.5">
            <span className="text-[14.5px] font-medium">Mara Lindqvist</span>
            <span className="text-[13px] text-paper/55">
              Head of Product, Fernway — 34 people
            </span>
          </div>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-[13px] text-paper/45">
            <span>2,400 teams</span>
            <span className="hidden h-3 w-px bg-paper/20 sm:block" />
            <span>18 min median planning</span>
            <span className="hidden h-3 w-px bg-paper/20 sm:block" />
            <span>SOC 2 Type II</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
