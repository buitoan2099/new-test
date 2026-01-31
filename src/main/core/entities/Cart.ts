import { Product } from "./Product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Cart = CartItem[];
