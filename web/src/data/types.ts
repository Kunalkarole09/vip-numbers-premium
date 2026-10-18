export type VipNumber = {
  id: string;
  number: string;
  display: string;
  mrp: number | null;
  price: number;
  sum: number;
  total: number;
  section: string;
  pattern: string | null;
  category: string;
  tags: string[];
  source?: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};
