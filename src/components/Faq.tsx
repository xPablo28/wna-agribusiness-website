import { useState } from "react";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

const ITEMS = [
  {
    q: "How is this different from a to-do app?",
    a: "A to-do app holds tasks. Halden holds decisions: one weekly outcome, one owner per task, and a list that only shows your next three items.",
  },
  {
    q: "Can we keep our existing board?",
    a: "Yes. Import from Asana, Linear, Trello or a CSV in about a minute, then archive the old board. Nothing is deleted on our side.",
  },
  {
    q: "What happens to unfinished work?",
    a: "On Friday it rolls into next week with a short reason attached, so backlogs stop growing silently.",
  },
  {
    q: "Do you train a model on our data?",
    a: "No. Your workspace is encrypted at rest, never used for training, and exportable at any time.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="sec border-t border-line/70">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="display mt-6 text-[clamp(2rem,4.2vw,3rem)]">
            Still deciding?
          </h2>
          <a
            href="#top"
            className="mt-6 inline-block text-[14px] text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Talk to a founder →
          </a>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-line border-t border-line">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left"
                  >
                    <span
                      className={cn(
                        "text-[17px] tracking-tight transition-colors duration-300",
                        isOpen ? "text-ink" : "text-muted",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300",
                        isOpen && "rotate-45 border-ink text-ink",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="measure min-h-0 pr-10 pb-8 text-[15.5px] leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
