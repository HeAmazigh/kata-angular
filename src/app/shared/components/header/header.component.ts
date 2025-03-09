import { Component, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../features/shopping-cart/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'Kata Panier';

  constructor(readonly router: Router, readonly cartService: CartService) {}

  totalCartItem = computed(() => this.cartService.getTotalItems());
}
