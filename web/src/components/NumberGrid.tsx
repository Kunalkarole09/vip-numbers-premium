import type { VipNumber } from "@/data/types";
import { NumberCard } from "./NumberCard";

type Props = {
  items: VipNumber[];
  emptyTitle?: string;
  emptyBody?: string;
};

export function NumberGrid({
  items,
  emptyTitle = "No numbers match",
  emptyBody = "Try clearing filters or searching a different digit pattern.",
}: Props) {
  if (items.length === 0) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-dashed border-white/15 bg-bg-card px-6 py-16 text-center"
      >
        <p className="text-lg font-medium text-white">{emptyTitle}</p>
        <p className="mt-2 text-sm text-muted">{emptyBody}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <NumberCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
