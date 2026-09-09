import { useState } from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   OFFICIAL WNA LOGO — USED EXACTLY AS SUPPLIED, NEVER MODIFIED.

   The component tries these sources in order:
     1. LOCAL  → public/logo/wna-logo.jpg  (the official artwork,
                  byte-identical to the file as supplied)
     2. REMOTE → WNA_LOGO_REMOTE_URL        (or paste a public image URL)
   Whichever loads first is shown as-is: no redraw, recolor, crop or
   stretch. The light plate + sheen/float/glow are presentation only.
------------------------------------------------------------------- */
export const WNA_LOGO_LOCAL = "/logo/wna-logo.jpg";
/** Optional: paste a public URL to the official logo image here. */
export const WNA_LOGO_REMOTE_URL = "";

const SOURCES = [WNA_LOGO_LOCAL, WNA_LOGO_REMOTE_URL].filter(Boolean);

function PendingLogo({ compact }: { compact?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center justify-center rounded-xl border border-dashed border-mango/60 bg-[#f7f7f5] text-center leading-none",
        compact ? "px-3 py-2" : "px-6 py-4",
      )}
      title="Official WNA logo pending — save it as public/logo/wna-logo.jpg"
    >
      <span
        className={cn("font-display font-black tracking-[0.06em] text-wna-deep", compact ? "text-[15px]" : "text-[24px]")}
        style={{ fontStretch: "112%" }}
      >
        WNA
      </span>
      {import.meta.env.DEV && !compact && (
        <span className="mt-1.5 font-mono text-[8px] tracking-[0.2em] text-ink/50 uppercase">
          Official logo pending
        </span>
      )}
    </span>
  );
}

export function WnaLogo({
  className,
  imgClassName,
  frameClassName,
  framed = true,
  variant = "full",
  eager = false,
  sheen = true,
  glow = false,
}: {
  className?: string;
  imgClassName?: string;
  frameClassName?: string;
  framed?: boolean;
  variant?: "full" | "mark";
  eager?: boolean;
  /** Animated light sweep across the presentation plate. */
  sheen?: boolean;
  /** Warm mango glow behind the plate for feature placements. */
  glow?: boolean;
}) {
  const [srcIndex, setSrcIndex] = useState(0);
  const compact = variant === "mark";
  const src = SOURCES[srcIndex];

  if (!src) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <PendingLogo compact={compact} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "logo-plate inline-flex items-center overflow-hidden bg-[#f7f7f5]",
        compact ? "rounded-xl px-2.5 py-1.5" : "rounded-2xl px-5 py-3",
        "shadow-[0_10px_32px_-14px_rgba(0,0,0,0.65)]",
        sheen && "logo-sheen",
        glow && "shadow-[0_0_80px_-10px_rgba(242,164,28,0.55)]",
        !framed && "bg-transparent p-0 shadow-none",
        framed && frameClassName,
        className,
      )}
    >
      <img
        key={src}
        src={src}
        alt="Waste Not Agro Solutions — official WNA logo"
        loading={eager ? "eager" : "lazy"}
        onError={() => setSrcIndex((i) => i + 1)}
        draggable={false}
        className={cn(
          "relative z-[2] w-auto object-contain transition-all duration-500",
          compact ? "h-12" : "h-20",
          imgClassName,
        )}
      />
    </span>
  );
}
