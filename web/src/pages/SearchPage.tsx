import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { categories, numerologyTotals } from "@/data/categories";
import { numbers } from "@/data/numbers";
import { filterNumbers, type MatchMode } from "@/lib/search";
import { NumberGrid } from "@/components/NumberGrid";
import { SectionHeading } from "@/components/SectionHeading";

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const mode = (params.get("mode") as MatchMode) || "anywhere";
  const category = params.get("category") ?? "";
  const total = params.get("total");
  const min = params.get("min");
  const max = params.get("max");
  const sort =
    (params.get("sort") as "price-asc" | "price-desc" | "default") || "default";

  const items = useMemo(
    () =>
      filterNumbers(numbers, {
        query: params.get("q") ?? "",
        mode,
        category: category || undefined,
        total: total ? Number(total) : undefined,
        minPrice: min ? Number(min) : undefined,
        maxPrice: max ? Number(max) : undefined,
        sort: sort === "default" ? undefined : sort,
      }),
    [params, mode, category, total, min, max, sort]
  );

  function apply(e?: FormEvent) {
    e?.preventDefault();
    const next = new URLSearchParams(params);
    const digits = query.replace(/\D/g, "");
    if (digits) next.set("q", digits);
    else next.delete("q");
    setParams(next);
  }

  function patch(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key);
    else next.set(key, value);
    setParams(next);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="Search"
        title="Find your VIP number"
        description="Search and filters run against the verified public inventory snapshot on this site (digit match, category, budget, numerology total)."
      />

      <form
        onSubmit={apply}
        className="mb-8 rounded-2xl border border-gold/25 bg-bg-card p-5 sm:p-6"
      >
        <label htmlFor="main-search" className="mb-2 block text-sm text-muted">
          Enter digits
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="main-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            inputMode="numeric"
            placeholder="e.g. 9990 or 786"
            className="h-12 flex-1 rounded-full border border-white/15 bg-bg px-4 text-white placeholder:text-muted"
          />
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 font-semibold text-black"
          >
            <Search className="h-4 w-4" />
            Search number
          </button>
        </div>

        <fieldset className="mt-5">
          <legend className="mb-2 text-sm text-muted">Match position</legend>
          <div className="flex flex-wrap gap-4 text-sm">
            {(
              [
                ["anywhere", "Anywhere"],
                ["start", "Start with"],
                ["end", "End with"],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === value}
                  onChange={() => patch("mode", value)}
                  className="accent-gold"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm text-muted">
            Category
            <select
              value={category}
              onChange={(e) => patch("category", e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-bg px-3 text-white"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-muted">
            Numerology total
            <select
              value={total ?? ""}
              onChange={(e) => patch("total", e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-bg px-3 text-white"
            >
              <option value="">Any</option>
              {numerologyTotals.map((t) => (
                <option key={t} value={t}>
                  Total {t}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-muted">
            Min price (₹)
            <input
              type="number"
              min={0}
              value={min ?? ""}
              onChange={(e) => patch("min", e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-bg px-3 text-white"
            />
          </label>

          <label className="text-sm text-muted">
            Max price (₹)
            <input
              type="number"
              min={0}
              value={max ?? ""}
              onChange={(e) => patch("max", e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-white/15 bg-bg px-3 text-white"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="text-sm text-muted">
            Sort{" "}
            <select
              value={sort}
              onChange={(e) => patch("sort", e.target.value)}
              className="ml-2 h-10 rounded-full border border-white/15 bg-bg px-3 text-white"
            >
              <option value="default">Relevance</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setParams({});
            }}
            className="h-10 rounded-full border border-white/15 px-4 text-sm text-muted hover:text-white"
          >
            Clear filters
          </button>
        </div>
      </form>

      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {items.length} matching number{items.length === 1 ? "" : "s"}
      </p>
      <NumberGrid items={items} />
    </div>
  );
}
