import { CurrencyPipe } from '@angular/common';
import { CartService } from './services/cart.service';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShoppingItemComponent } from './components/shopping-item/shopping-item.component';

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterLink, CurrencyPipe, ShoppingItemComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  cartService = inject(CartService);

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
