import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingItemComponent } from './shopping-item.component';

describe('ShoppingItemComponent', () => {
  let component: ShoppingItemComponent;
  let fixture: ComponentFixture<ShoppingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('shoppingItem', {
      product: {
        id: 1,
        productName: 'string',
        price: 3,
        quantity: 4,
        stock: 34,
        isImported: true,
        category: 'Book',
      },
      qty: 2,
      tax: 5,
      priceHT: 10,
      priceTTC: 12,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
