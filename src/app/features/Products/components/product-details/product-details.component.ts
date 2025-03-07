import { Component, input, signal } from '@angular/core';
import { CartService } from '../../../shopping-cart/services/cart.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgClass } from '@angular/common';
import { PricePipe } from '../../../../shared/pipes/price.pipe';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  imports: [FormsModule, NgClass, PricePipe, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product = input.required<Product>();
  qte = signal(1);

  constructor(readonly cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product, this.qte());
  }

  get isOutOfStock(): boolean {
    return this.product().stock <= 0;
  }
}
