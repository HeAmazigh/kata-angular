import { Injectable, signal } from '@angular/core';
import { calculateTax } from '../../../shared/utils/taxe.service';
import { Product } from '../../Products/models';
import { CartItem, CartItems } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItems>([]);

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems().find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.qty = quantity;
    } else {
      const newCartItem = this.createCartItem(product, quantity);
      this.cartItems.update((oldCartItem) => [...oldCartItem, newCartItem]);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems.update((products) =>
      products.filter((item) => item.product.id !== productId)
    );
  }

  getTotalItems(): number {
    return this.cartItems().reduce((total, item) => total + item.qty, 0);
  }

  cleanCart() {
    this.cartItems.set([]);
  }

  private createCartItem(product: Product, quantity: number): CartItem {
    const tax = calculateTax(product);
    return {
      product: product,
      qty: quantity,
      tax: tax,
      priceHT: product.price,
      priceTTC: product.price + tax,
    };
  }
}
