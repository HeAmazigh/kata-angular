import { Pipe, PipeTransform } from '@angular/core';
import { calculateTax } from '../utils/taxe.service';
import { Product } from '../../features/Products/models/product.model';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(product: Product): number {
    return product.price + calculateTax(product);
  }
}
