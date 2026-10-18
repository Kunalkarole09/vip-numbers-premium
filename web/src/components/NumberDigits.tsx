import type { VipNumber } from "@/data/types";

type Props = {
  item: VipNumber;
  className?: string;
};

/** Highlight pattern digits (usually the trailing signature) in brand gold. */
export function NumberDigits({ item, className = "" }: Props) {
  const digits = item.number;
  const pattern = (item.pattern ?? "").replace(/\D/g, "");

  let highlightStart = -1;
  if (pattern && digits.endsWith(pattern)) {
    highlightStart = digits.length - pattern.length;
  } else {
    // Fallback: highlight longest trailing run of a repeated digit
    const last = digits[digits.length - 1];
    let i = digits.length - 1;
    while (i >= 0 && digits[i] === last) i--;
    if (digits.length - 1 - i >= 3) highlightStart = i + 1;
  }

  return (
    <span
      className={`font-semibold tracking-[0.08em] tabular-nums ${className}`}
      aria-label={`Mobile number ${digits}`}
    >
      {digits.split("").map((d, i) => (
        <span
          key={`${digits}-${i}`}
          className={
            highlightStart >= 0 && i >= highlightStart
              ? "text-gold"
              : "text-white"
          }
        >
          {d}
        </span>
      ))}
    </span>
  );
}
