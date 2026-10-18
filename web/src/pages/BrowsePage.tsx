import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "@/data/categories";
import { numbers } from "@/data/numbers";
import { filterNumbers } from "@/lib/search";
import { NumberGrid } from "@/components/NumberGrid";
import { SectionHeading } from "@/components/SectionHeading";

export function BrowsePage() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? "";
  const sort =
    (params.get("sort") as "price-asc" | "price-desc" | "default" | null) ??
    "default";

  const items = useMemo(
    () =>
      filterNumbers(numbers, {
        category: category || undefined,
        sort: sort === "default" ? undefined : sort,
      }),
    [category, sort]
  );

  const active = categories.find((c) => c.slug === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="Inventory"
        title={active ? active.name : "Browse VIP numbers"}
        description={
          active?.description ??
          `Showing ${items.length} numbers from the verified public catalogue snapshot.`
        }
      />

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const next = new URLSearchParams(params);
              next.delete("category");
              setParams(next);
            }}
            className={`h-10 rounded-full px-4 text-sm ${
              !category
                ? "bg-gold text-black"
                : "border border-white/15 text-muted hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => {
                const next = new URLSearchParams(params);
                next.set("category", c.slug);
                setParams(next);
              }}
              className={`h-10 rounded-full px-4 text-sm ${
                category === c.slug
                  ? "bg-gold text-black"
                  : "border border-white/15 text-muted hover:text-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => {
              const next = new URLSearchParams(params);
              next.set("sort", e.target.value);
              setParams(next);
            }}
            className="h-10 rounded-full border border-white/15 bg-bg-elevated px-3 text-white"
          >
            <option value="default">Featured order</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>

      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {items.length} result{items.length === 1 ? "" : "s"}
        {" · "}
        <Link to="/search" className="text-gold hover:underline">
          Open search & filters
        </Link>
      </p>

      <NumberGrid items={items} />
    </div>
  );
}
