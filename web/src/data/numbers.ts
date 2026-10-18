import raw from "./numbers.json";
import type { VipNumber } from "./types";

export const numbers = raw as VipNumber[];

export function getNumberById(id: string): VipNumber | undefined {
  return numbers.find((n) => n.id === id || n.number === id);
}

export function getNumbersByCategory(slug: string): VipNumber[] {
  return numbers.filter((n) => n.category === slug);
}
