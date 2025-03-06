import { Component, computed, inject, signal } from '@angular/core';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CartService } from '../shopping-cart/services/cart.service';

@Component({
  selector: 'app-products',
  imports: [ProductsListComponent, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
  selectedCategory = signal('all');

  totalCartItem = computed(() => this.cartService.getTotalItems());

  categories = computed(() => [
    ...new Set(this.products().map((product) => product.category)),
  ]);

  products = computed(() => this.productService.productsResource.value() || []);
}
