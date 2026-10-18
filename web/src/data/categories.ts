import type { Category } from "./types";

/** Categories present in the publicly scraped homepage inventory. */
export const categories: Category[] = [
  {
    slug: "vvip",
    name: "VVIP High End",
    description: "Exclusive high-end VIP numbers from the VVIP collection.",
  },
  {
    slug: "zeros",
    name: "0 Lovers",
    description: "Numbers with maximum zeros for memorable patterns.",
  },
  {
    slug: "ababab",
    name: "AB-AB-AB Ending",
    description: "Special repeating ending patterns.",
  },
  {
    slug: "helpline",
    name: "Super Helpline",
    description: "Helpline-style sequences suited for business recall.",
  },
  {
    slug: "786",
    name: "786 Numbers",
    description: "Numbers featuring the 786 pattern.",
  },
  {
    slug: "tetra",
    name: "Tetra Numbers",
    description: "Four-digit repeating tetra series patterns.",
  },
  {
    slug: "mirror",
    name: "Mirror Numbers",
    description: "Mirror and near-mirror digit patterns.",
  },
  {
    slug: "penta",
    name: "Penta Numbers",
    description: "Five-digit prestige penta series.",
  },
  {
    slug: "budget",
    name: "Budget Friendly",
    description: "Accessible VIP patterns at lower price bands.",
  },
  {
    slug: "lucky-1",
    name: "Lucky Root Sum 1",
    description: "Numerology-friendly numbers with root total 1.",
  },
];

export const budgetBands = [
  { label: "₹1,500 – ₹3,000", min: 1500, max: 3000 },
  { label: "₹3,000 – ₹6,000", min: 3000, max: 6000 },
  { label: "₹6,000 – ₹10,000", min: 6000, max: 10000 },
  { label: "₹10,000 – ₹15,000", min: 10000, max: 15000 },
  { label: "₹15,000 – ₹25,000", min: 15000, max: 25000 },
  { label: "₹25,000 – ₹50,000", min: 25000, max: 50000 },
  { label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { label: "₹1,00,000 – ₹2,50,000", min: 100000, max: 250000 },
  { label: "₹2,50,000 – ₹5,00,000", min: 250000, max: 500000 },
] as const;

export const numerologyTotals = [1, 3, 5, 6, 9] as const;
