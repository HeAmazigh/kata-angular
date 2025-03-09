import { computed, effect, Injectable, signal } from '@angular/core';
import { calculateTax } from '../../../shared/utils/taxe.service';
import { CartItem, CartItems } from '../models/cartItem.model';
import { Product } from '../../Products/models/product.model';
import { ProductService } from '../../Products/services/product.service';

const CART_STORAGE_KEY = 'cartItems';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItems>(this.loadCartFromLocalStorage());

  constructor(private productService: ProductService) {
    effect(() => {
      this.saveCartToLocalStorage(this.cartItems());
    });
  }

  addToCart(product: Product, quantity: number): void {
    const existingItem = this.cartItems().find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      this.cartItems.update((cartItems) =>
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        )
      );
      // existingItem.qty += quantity;
    } else {
      const newCartItem = this.createCartItem(product, quantity);
      this.cartItems.update((oldCartItem) => [...oldCartItem, newCartItem]);
    }
  }

  removeFromCart(productId: number): void {
    let removedQuantity = 0;

    // Trouver la quantité du produit supprimé du panier
    this.cartItems.update((products) => {
      const item = products.find((item) => item.product.id === productId);
      if (item) {
        removedQuantity = item.qty;
      }
      return products.filter((item) => item.product.id !== productId);
    });

    if (removedQuantity > 0) {
      this.productService.productsResource.update((products) =>
        products?.map((p) => {
          if (p.id === productId) {
            p.stock += removedQuantity;
          }
          return p;
        })
      );
    }
  }

  getTotalItems() {
    return this.cartItems().reduce((total, item) => total + item.qty, 0);
  }

  cleanCart(): void {
    // Récupérer tous les produits du panier avant de le vider
    const removedProducts: { productId: number; qty: number }[] = [];

    this.cartItems.update((products) => {
      removedProducts.push(
        ...products.map((item) => ({
          productId: item.product.id,
          qty: item.qty,
        }))
      );
      return []; // On vide le panier
    });

    // Réajouter les quantités aux produits
    this.productService.productsResource.update((products) =>
      products?.map((p) => {
        const removedProduct = removedProducts.find(
          (item) => item.productId === p.id
        );
        if (removedProduct) {
          p.stock += removedProduct.qty;
        }
        return p;
      })
    );
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
