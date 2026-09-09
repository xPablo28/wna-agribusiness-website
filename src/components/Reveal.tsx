import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as never}
      className={cn("will-change-transform", className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(18px)",
        transition: `opacity 800ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 800ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
