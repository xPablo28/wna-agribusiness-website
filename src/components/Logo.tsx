import { useState } from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   OFFICIAL WNA LOGO — USED EXACTLY AS SUPPLIED, NEVER MODIFIED.

   Sources, tried in order:
     1. LOCAL  → public/logo/wna-logo.jpg  (byte-identical copy of the
                  official artwork, original JPEG — no redraw, recolor,
                  crop or stretch anywhere in the pipeline)
     2. REMOTE → WNA_LOGO_REMOTE_URL        (public image URL if ever needed)

   PRESENTATION: the supplied logo sits on its own white field (#f7f7f7).
   The plate color matches that field exactly and padding is minimal, so
   no "floating white card" edge is visible against dark sections — the
   artwork simply reads as the logo itself.
------------------------------------------------------------------- */
export const WNA_LOGO_LOCAL = "/logo/wna-logo.jpg";
/** Optional: paste a public URL to the official logo image here. */
export const WNA_LOGO_REMOTE_URL = "";

/** Exact corner colour of the supplied artwork — seam-free backdrop. */
const LOGO_FIELD = "#f7f7f7";

const SOURCES = [WNA_LOGO_LOCAL, WNA_LOGO_REMOTE_URL].filter(Boolean);

function PendingLogo({ compact }: { compact?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center justify-center rounded-md border border-dashed border-mango/60 bg-[#f7f7f7] text-center leading-none",
        compact ? "px-2.5 py-1.5" : "px-4 py-3",
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
        <span className="mt-1 font-mono text-[8px] tracking-[0.2em] text-ink/50 uppercase">
          Official logo pending
        </span>
      )}
    </span>
  );
}

export function WnaLogo({
  className,
  imgClassName,
  variant = "full",
  eager = false,
  glow = false,
  ring = false,
}: {
  className?: string;
  imgClassName?: string;
  variant?: "full" | "mark";
  eager?: boolean;
  /** Warm mango glow behind the artwork for feature placements. */
  glow?: boolean;
  /** Hairline separation for placements on light/cream surfaces. */
  ring?: boolean;
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
        "inline-flex items-center overflow-hidden rounded-md",
        compact ? "px-1.5 py-1" : "px-2.5 py-1.5",
        ring && "ring-1 ring-ink/10",
        glow && "shadow-[0_0_64px_-16px_rgba(242,164,28,0.45)]",
        className,
      )}
      style={{ background: LOGO_FIELD }}
    >
      <img
        key={src}
        src={src}
        alt="Waste Not Agro Solutions — official WNA logo"
        loading={eager ? "eager" : "lazy"}
        decoding={eager ? "sync" : "async"}
        onError={() => setSrcIndex((i) => i + 1)}
        draggable={false}
        className={cn(
          "w-auto object-contain",
          compact ? "h-9" : "h-16",
          imgClassName,
        )}
      />
    </span>
  );
}
