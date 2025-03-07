import { Product } from '../../Products/models/product.model';

export interface CartItem {
  product: Product;
  qty: number;
  tax: number;
  priceHT: number;
  priceTTC: number;
}

export type CartItems = CartItem[];
