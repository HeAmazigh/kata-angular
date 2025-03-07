import { CurrencyPipe } from '@angular/common';
import { CartService } from './services/cart.service';
import { Component, computed } from '@angular/core';
import { ShoppingItemComponent } from './components/shopping-item/shopping-item.component';

@Component({
  selector: 'app-shopping-cart',
  imports: [CurrencyPipe, ShoppingItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  constructor(readonly cartService: CartService) {}

  cartItems = computed(() => this.cartService.cartItems());

  totalPriceHT = computed(() => {
    let totalPriceHT = 0;
    this.cartItems().forEach(
      (item) => (totalPriceHT += item.priceHT * item.qty)
    );
    return totalPriceHT;
  });

  totalTaxes = computed(() => {
    let totalTaxes = 0;
    this.cartItems().forEach((item) => (totalTaxes += item.tax * item.qty));
    return totalTaxes;
  });

  totalPriceTTC = computed(() => {
    let totalPriceTTC = 0;
    this.cartItems().forEach(
      (item) => (totalPriceTTC += item.priceTTC * item.qty)
    );
    return totalPriceTTC;
  });

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }
  cleanCart() {
    this.cartService.cleanCart();
  }
}
