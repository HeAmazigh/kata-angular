import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../models';
import { CartService } from '../../../shopping-cart/services/cart.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [FormsModule, NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product = input.required<Product>();
  cartService = inject(CartService);
  qte = signal(1);

  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.qte());
  }

  get isOutOfStock(): boolean {
    return this.product().stock <= 0;
  }
}
