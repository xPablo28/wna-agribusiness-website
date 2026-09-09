import { useState } from "react";
import { Reveal } from "./Reveal";
import { cn } from "../utils/cn";

const PLANS = [
  {
    name: "Solo",
    price: { m: 0, y: 0 },
    tagline: "For your own week.",
    features: ["Unlimited personal lists", "Weekly outcome", "Local-first sync"],
    cta: "Start free",
    dark: false,
  },
  {
    name: "Team",
    price: { m: 9, y: 7 },
    tagline: "For teams up to fifty.",
    features: [
      "Everything in Solo",
      "Shared weekly outcome",
      "One-owner enforcement",
      "Slack & calendar pull",
    ],
    cta: "Start 14-day trial",
    dark: true,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="sec border-t border-line/70">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="display mt-6 text-[clamp(2.25rem,5vw,3.5rem)]">
            Two plans. That is all.
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-line p-1">
            {[
              { id: false, label: "Monthly" },
              { id: true, label: "Yearly · save 22%" },
            ].map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setYearly(o.id)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300",
                  yearly === o.id ? "bg-ink text-paper" : "text-muted hover:text-ink",
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="gap-flow mx-auto mt-16 grid max-w-4xl md:grid-cols-2">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-[22px] border p-9 transition-transform duration-500 hover:-translate-y-1",
                  p.dark
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-white/60",
                )}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[15px] font-medium tracking-tight">{p.name}</h3>
                  {p.dark && (
                    <span className="rounded-full bg-paper/12 px-2.5 py-1 text-[11px] tracking-[0.16em] uppercase">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-8 flex items-end gap-2">
                  <span className="display text-5xl">
                    {p.price.m === 0 ? "Free" : `$${yearly ? p.price.y : p.price.m}`}
                  </span>
                  {p.price.m !== 0 && (
                    <span
                      className={cn(
                        "pb-1.5 text-[13px]",
                        p.dark ? "text-paper/55" : "text-muted",
                      )}
                    >
                      / person / month
                    </span>
                  )}
                </div>

                <p
                  className={cn(
                    "mt-3 text-[14px]",
                    p.dark ? "text-paper/60" : "text-muted",
                  )}
                >
                  {p.tagline}
                </p>

                <ul className="mt-9 space-y-3.5 text-[14.5px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                          p.dark ? "bg-accent-soft" : "bg-accent",
                        )}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#top"
                  className={cn(
                    "mt-10 rounded-full py-3.5 text-center text-[14px] font-medium transition-colors duration-300",
                    p.dark
                      ? "bg-paper text-ink hover:bg-accent-soft"
                      : "border border-ink/15 hover:border-ink hover:bg-ink hover:text-paper",
                  )}
                >
                  {p.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-[13px] text-muted">
            Non-profits and students use Halden free. Just ask.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
