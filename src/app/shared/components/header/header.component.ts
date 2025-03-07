import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../features/shopping-cart/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(readonly router: Router, readonly cartService: CartService) {}

  totalCartItem = computed(() => this.cartService.getTotalItems());

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToCard() {
    this.router.navigate(['/shopping-cart']);
  }
}
