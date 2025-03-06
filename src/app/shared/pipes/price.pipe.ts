import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../features/Products/models';
import { calculateTax } from '../utils/taxe.service';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(product: Product): number {
    return product.price + calculateTax(product);
  }
}
