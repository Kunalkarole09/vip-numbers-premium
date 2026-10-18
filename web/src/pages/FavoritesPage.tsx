import { Link } from "react-router-dom";
import { useShop } from "@/context/ShopContext";
import { NumberGrid } from "@/components/NumberGrid";

export function FavoritesPage() {
  const { favorites } = useShop();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl text-white">Favorites</h1>
      <p className="mt-2 text-sm text-muted">
        Saved on this device. {favorites.length} number
        {favorites.length === 1 ? "" : "s"}.
      </p>
      <div className="mt-8">
        <NumberGrid
          items={favorites}
          emptyTitle="No favorites yet"
          emptyBody="Tap the heart on any number card to save it here."
        />
      </div>
      {favorites.length === 0 && (
        <Link
          to="/numbers"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-gold px-6 font-semibold text-black"
        >
          Browse numbers
        </Link>
      )}
    </div>
  );
}
