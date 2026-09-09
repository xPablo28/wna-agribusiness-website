import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WnaLogo } from "./Logo";
import { EASE } from "./ui";

const WORDS = ["GRADE", "MATCH", "UTILIZE"];

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 2100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setGone(true), 250);
        setTimeout(onDone, 1050);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const active = Math.min(2, Math.floor(progress / 34));

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col items-center px-6"
          >
            <WnaLogo
              eager
              glow
              imgClassName="h-32 w-auto sm:h-40"
              frameClassName="rounded-3xl px-8 py-5"
              className="animate-logo-float"
            />
          </motion.div>

          <div className="mt-10 flex items-center gap-4 px-6 sm:gap-6">
            {WORDS.map((w, i) => (
              <div key={w} className="flex items-center gap-4 sm:gap-6">
                <span
                  className={`display text-[clamp(1.4rem,5vw,2.6rem)] transition-colors duration-500 ${
                    i === active ? "text-mango" : i < active ? "text-cream" : "text-cream/20"
                  }`}
                >
                  {w}
                </span>
                {i < 2 && <span className="text-cream/25">→</span>}
              </div>
            ))}
          </div>

          <div className="mt-12 w-56 sm:w-72">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-cream/40">
              <span>LOADING</span>
              <span className="text-mango">{String(progress).padStart(3, "0")}%</span>
            </div>
            <div className="mt-3 h-px w-full bg-cream/10">
              <div
                className="h-full bg-mango transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
