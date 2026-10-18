import type { VipNumber } from "@/data/types";

export type MatchMode = "anywhere" | "start" | "end";

export type SearchFilters = {
  query?: string;
  mode?: MatchMode;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  total?: number;
  sort?: "price-asc" | "price-desc" | "default";
};

export function filterNumbers(
  items: VipNumber[],
  filters: SearchFilters
): VipNumber[] {
  const q = (filters.query ?? "").replace(/\D/g, "");
  const mode = filters.mode ?? "anywhere";

  let result = items.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.minPrice != null && item.price < filters.minPrice) return false;
    if (filters.maxPrice != null && item.price > filters.maxPrice) return false;
    if (filters.total != null && item.total !== filters.total) return false;

    if (q) {
      const n = item.number;
      if (mode === "start" && !n.startsWith(q)) return false;
      if (mode === "end" && !n.endsWith(q)) return false;
      if (mode === "anywhere" && !n.includes(q)) return false;
    }

    return true;
  });

  if (filters.sort === "price-asc") {
    result = [...result].sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price-desc") {
    result = [...result].sort((a, b) => b.price - a.price);
  }

  return result;
}
