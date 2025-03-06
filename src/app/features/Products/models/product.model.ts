export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  stock: number;
  isImported: boolean;
  category: string;
}

export type Products = Product[];
