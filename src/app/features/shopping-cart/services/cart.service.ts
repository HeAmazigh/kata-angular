import { effect, Injectable, signal } from '@angular/core';
import { calculateTax } from '../../../shared/utils/taxe.service';
import { CartItem, CartItems } from '../models/cartItem.model';
import { Product } from '../../Products/models/product.model';

const CART_STORAGE_KEY = 'cartItems';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItems>(this.loadCartFromLocalStorage());

  constructor() {
    effect(() => {
      this.saveCartToLocalStorage(this.cartItems());
    });
  }

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

  private saveCartToLocalStorage(cart: CartItems): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }

  private loadCartFromLocalStorage(): CartItems {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  }
}
