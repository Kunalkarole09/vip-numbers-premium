import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getNumberById } from "@/data/numbers";
import type { VipNumber } from "@/data/types";

type ShopContextValue = {
  cart: VipNumber[];
  favorites: VipNumber[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isInCart: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "vnc-cart";
const FAV_KEY = "vnc-favorites";

function loadIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function resolve(ids: string[]): VipNumber[] {
  return ids
    .map((id) => getNumberById(id))
    .filter((n): n is VipNumber => Boolean(n));
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cartIds, setCartIds] = useState<string[]>(() => loadIds(CART_KEY));
  const [favIds, setFavIds] = useState<string[]>(() => loadIds(FAV_KEY));

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartIds));
  }, [cartIds]);

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favIds));
  }, [favIds]);

  const addToCart = useCallback((id: string) => {
    setCartIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const value = useMemo<ShopContextValue>(
    () => ({
      cart: resolve(cartIds),
      favorites: resolve(favIds),
      addToCart,
      removeFromCart,
      toggleFavorite,
      isInCart: (id) => cartIds.includes(id),
      isFavorite: (id) => favIds.includes(id),
      clearCart: () => setCartIds([]),
    }),
    [cartIds, favIds, addToCart, removeFromCart, toggleFavorite]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
