import { cn } from "../utils/cn";

export type Density = "airy" | "balanced" | "compact";

const OPTIONS: { id: Density; label: string; note: string }[] = [
  { id: "airy", label: "Airy", note: "Most breathing room" },
  { id: "balanced", label: "Balanced", note: "Default rhythm" },
  { id: "compact", label: "Compact", note: "Everything above the fold" },
];

export function DensityControl({
  value,
  onChange,
  floating = true,
}: {
  value: Density;
  onChange: (d: Density) => void;
  floating?: boolean;
}) {
  const active = OPTIONS.find((o) => o.id === value)!;

  return (
    <div
      className={cn(
        "z-50 rounded-full border border-line/90 bg-paper/85 p-1 shadow-[0_18px_40px_-28px_rgba(26,23,20,0.5)] backdrop-blur-md",
        floating && "fixed bottom-5 left-1/2 -translate-x-1/2",
      )}
    >
      <div className="flex items-center gap-1">
        {!floating && (
          <span className="hidden pl-3 pr-1 text-[11px] tracking-[0.18em] text-muted uppercase sm:block">
            Spacing
          </span>
        )}
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            title={o.note}
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
              value === o.id
                ? "bg-ink text-paper"
                : "text-muted hover:bg-paper-2 hover:text-ink",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      {floating && (
        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-[11px] whitespace-nowrap text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {active.note}
        </span>
      )}
    </div>
  );
}
