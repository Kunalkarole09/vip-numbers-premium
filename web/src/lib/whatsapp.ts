import { brand } from "@/data/content";
import type { VipNumber } from "@/data/types";
import { formatINR } from "./format";

export function enquireUrl(item: VipNumber): string {
  const text = [
    `Hello VIP Numbers Club,`,
    `I am interested in this number:`,
    `${item.display} (${item.number})`,
    `Price: ${formatINR(item.price)}`,
    item.mrp ? `MRP: ${formatINR(item.mrp)}` : null,
    `Category: ${item.section}`,
    `Please share booking and activation steps.`,
  ]
    .filter(Boolean)
    .join("\n");

  return `${brand.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function enquireCartUrl(items: VipNumber[]): string {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.display} — ${formatINR(item.price)} (${item.section})`
  );
  const text = [
    `Hello VIP Numbers Club,`,
    `I would like to enquire about these numbers from my shortlist:`,
    ...lines,
    `Please advise on availability and next steps.`,
  ].join("\n");

  return `${brand.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

export function referenceSearchUrl(number: string): string {
  return `${brand.referenceSite}/search-results?q=${encodeURIComponent(number)}`;
}
