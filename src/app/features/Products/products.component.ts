import { Component, computed, signal } from '@angular/core';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  imports: [ProductsListComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  selectedCategory = signal('all');

  constructor(readonly productService: ProductService) {}

  readonly isLoading = computed(() =>
    this.productService.productsResource.isLoading()
  );
  readonly error = computed(() => this.productService.productsResource.error());

  categories = computed(() => [
    ...new Set(this.products().map((product) => product.category)),
  ]);

  products = computed(() => this.productService.productsResource.value() || []);
}
