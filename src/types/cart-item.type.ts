import type { Price } from "@/types/price.type";

export interface CartItem {
  name: string;
  _idMenuItem: string;
  price: Price;
  notes?: string;
  images: string[];
  options?: string;
  quantity: number;
  modifiers: CartItemModifier[];
  description?: string;
}

export interface CartItemModifier {
  _idModifiers: string;
  price: Price;
}
