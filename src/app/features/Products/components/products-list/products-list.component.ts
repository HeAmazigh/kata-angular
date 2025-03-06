import { Component, computed, input } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Products } from '../../models';

@Component({
  selector: 'app-products-list',
  imports: [ProductDetailsComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  products = input<Products>();
  selectedCategory = input<string>();

  filteredProduct = computed(() => {
    const products = this.products();
    const category = this.selectedCategory();

    if (!products) return []; // Ensure it returns an empty array if products is undefined

    return category === 'all'
      ? products
      : products.filter((product) => product.category === category);
  });
}
