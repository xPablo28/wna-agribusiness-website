import { useState } from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   OFFICIAL WNA LOGO — NEVER REDRAWN, RECOLORED OR STRETCHED.

     public/logo/wna-logo.jpg   the official artwork exactly as supplied
     public/logo/wna-logo.png   the SAME pixels; only the flat surrounding
                                field is keyed to transparency (programmatic
                                background removal, no artwork alteration)

   Presentation: on light surfaces the mark sits bare (its dark greens read
   perfectly on cream). On dark chrome (nav, menu, footer) it gets one
   minimal concession — a tight, flat cream badge with ~6px of padding
   and no shadow — so the wordmark stays legible. There is no larger
   white plate, card or frame anywhere.
------------------------------------------------------------------- */
export const WNA_LOGO_LOCAL = "/logo/wna-logo.png";
/** Optional: paste a public URL to the official logo image here. */
export const WNA_LOGO_REMOTE_URL = "";

const SOURCES = [WNA_LOGO_LOCAL, "/logo/wna-logo.jpg", WNA_LOGO_REMOTE_URL].filter(Boolean);

function PendingLogo() {
  return (
    <span
      className="inline-flex flex-col items-center justify-center rounded-md border border-dashed border-mango/60 bg-[#f7f7f7] px-4 py-3 text-center leading-none"
      title="Official WNA logo pending — save it as public/logo/wna-logo.jpg"
    >
      <span className="font-display text-[24px] font-black tracking-[0.06em] text-wna-deep" style={{ fontStretch: "112%" }}>
        WNA
      </span>
      {import.meta.env.DEV && (
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
  tile = false,
}: {
  className?: string;
  imgClassName?: string;
  variant?: "full" | "mark";
  eager?: boolean;
  /** Cream badge for dark surfaces (nav, menu, footer) — tight and flat,
   *  no shadow: keeps the wordmark legible without a white card. */
  tile?: boolean;
}) {
  const [srcIndex, setSrcIndex] = useState(0);
  const src = SOURCES[srcIndex];

  if (!src) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <PendingLogo />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center",
        tile && "rounded-md bg-cream px-1.5 py-1",
        className,
      )}
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
          "w-auto select-none object-contain",
          variant === "mark" ? "h-9 sm:h-10" : "h-16",
          imgClassName,
        )}
      />
    </span>
  );
}
