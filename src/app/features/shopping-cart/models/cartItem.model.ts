import { Product } from '../../Products/models';

export interface CartItem {
  product: Product;
  qty: number;
  tax: number;
  priceHT: number;
  priceTTC: number;
}

export type CartItems = CartItem[];
