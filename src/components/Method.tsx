import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "Mon",
    title: "Choose the outcome",
    body: "One sentence. If it takes two, it is two weeks.",
  },
  {
    n: "Daily",
    title: "Clear the top three",
    body: "The list hides everything below your first three items.",
  },
  {
    n: "Fri",
    title: "Close the week",
    body: "Unfinished work rolls forward with a reason attached.",
  },
];

export function Method() {
  return (
    <section id="method" className="sec grain relative overflow-hidden bg-paper-2">
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The method</p>
          <h2 className="display mt-6 text-[clamp(2.25rem,5vw,3.5rem)]">
            A week that ends
          </h2>
          <p className="measure mx-auto mt-6 text-[16.5px] leading-relaxed text-muted">
            Three checkpoints. Roughly ninety minutes of planning across five
            days, and the rest of your time goes to the work itself.
          </p>
        </Reveal>

        <div className="gap-flow mx-auto mt-20 grid max-w-4xl md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="text-center md:text-left">
                <p className="text-[12px] tracking-[0.22em] text-accent uppercase">{s.n}</p>
                <h3 className="display mt-5 text-2xl">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
