import { useState } from "react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------
   OFFICIAL WNA LOGO — NEVER REDRAWN, RECOLORED OR STRETCHED.

     public/logo/wna-logo.jpg   the official artwork exactly as supplied
     public/logo/wna-logo.png   the SAME pixels; only the flat surrounding
                                field is keyed to transparency (programmatic
                                background removal, no artwork alteration)

   Presentation: no plate, no white card, no shadow — the mark sits
   directly in the navigation so it reads as part of the header. On dark
   surfaces its bright greens and amber carry the contrast; on cream the
   former field tone disappears into the background seamlessly.
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
}: {
  className?: string;
  imgClassName?: string;
  variant?: "full" | "mark";
  eager?: boolean;
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
    <span className={cn("inline-flex items-center", className)}>
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
          variant === "mark" ? "h-8 sm:h-9" : "h-16",
          imgClassName,
        )}
      />
    </span>
  );
}
