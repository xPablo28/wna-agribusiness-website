import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* Section eyebrow tag: 02 — THE PROBLEM */
export function Tag({
  index,
  label,
  dark = false,
  className,
}: {
  index: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn("flex items-center gap-4", className)}
    >
      <span className="font-mono text-[11px] tracking-[0.3em] text-mango">{index}</span>
      <span className={cn("h-px w-12", dark ? "bg-ink/25" : "bg-cream/25")} />
      <span
        className={cn(
          "eyebrow",
          dark ? "text-ink/60" : "text-cream/60",
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* Word-by-word cinematic headline reveal */
export function Words({
  text,
  className,
  delay = 0,
  accentWords = [] as string[],
  accentClass = "text-mango",
}: {
  text: string;
  className?: string;
  delay?: number;
  accentWords?: string[];
  accentClass?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((w, i) => {
        const clean = w.replace(/[^A-Z≠→]/gi, "");
        const accent = accentWords.includes(clean) || accentWords.includes(w);
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className={cn("inline-block will-change-transform", accent && accentClass)}
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.85, ease: EASE, delay: delay + i * 0.055 }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export type Status = "CURRENT" | "IN DEVELOPMENT" | "LONG-TERM VISION";

export function StatusBadge({ status, dark = false }: { status: Status; dark?: boolean }) {
  const styles: Record<Status, string> = {
    CURRENT: "border-leaf/50 text-leaf",
    "IN DEVELOPMENT": "border-mango/60 text-mango",
    "LONG-TERM VISION": dark ? "border-ink/30 text-ink/70" : "border-cream/30 text-cream/70",
  };
  const dot: Record<Status, string> = {
    CURRENT: "bg-leaf",
    "IN DEVELOPMENT": "bg-mango",
    "LONG-TERM VISION": dark ? "bg-ink/50" : "bg-cream/50",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase",
        styles[status],
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", dot[status])} />
      {status}
    </span>
  );
}

export function PrimaryCta({
  children,
  href = "#how",
  className,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full bg-mango px-7 py-4 text-[13px] font-semibold tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:bg-cream",
        className,
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </motion.a>
  );
}

export function GhostCta({
  children,
  href = "#partners",
  className,
  dark = false,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-7 py-4 text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300",
        dark
          ? "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream"
          : "border-cream/25 text-cream hover:border-mango hover:text-mango",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

/* Infinite marquee band */
export function Marquee({
  items,
  className,
  dark = false,
  slow = false,
}: {
  items: string[];
  className?: string;
  dark?: boolean;
  slow?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden py-5", className)}>
      <div className={cn("flex w-max gap-0 whitespace-nowrap", slow ? "animate-marquee-slow" : "animate-marquee")}>
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {row.map((it, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span
                  className={cn(
                    "display-tight px-6 text-[clamp(1.1rem,2.6vw,1.9rem)]",
                    dark ? "text-ink/80" : "text-cream/80",
                  )}
                >
                  {it}
                </span>
                <span className="text-[1rem] text-mango">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
