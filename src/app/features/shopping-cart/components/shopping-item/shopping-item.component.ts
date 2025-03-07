import { Component, input, output } from '@angular/core';
import { CartItem } from '../../models/cartItem.model';

@Component({
  selector: 'app-shopping-item',
  imports: [],
  templateUrl: './shopping-item.component.html',
  styleUrl: './shopping-item.component.scss',
})
export class ShoppingItemComponent {
  shoppingItem = input.required<CartItem>();
  removeItem = output<number>();
}
