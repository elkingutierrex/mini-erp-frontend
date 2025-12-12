import { SaleItem } from "./sale-item.model";

export interface Sale {
  id: string;
  sellerId: string;
  createdAt: string; // ISO
  items: SaleItem[];
  total: number;
}
