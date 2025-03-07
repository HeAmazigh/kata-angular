import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { Category } from '../../enums/category.enum';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Product } from '../../models/product.model';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct: Product = {
    id: 1,
    productName: 'Test Product',
    price: 100,
    quantity: 5,
    stock: 4,
    isImported: false,
    category: Category.Electric,
  };

  beforeEach(async () => {
    registerLocaleData(localeFr, 'fr');
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    const productName = fixture.nativeElement.querySelector('h4');
    expect(productName.textContent).toContain('Test Product');
  });

  it('should return true if the product is out of stock', () => {
    fixture.componentRef.setInput('product', { ...mockProduct, stock: 0 });
    fixture.detectChanges();
    expect(component.isOutOfStock).toBeTruthy();
  });

  it('should return false if the product is in stock', () => {
    fixture.componentRef.setInput('product', { ...mockProduct, stock: 5 });
    fixture.detectChanges();
    expect(component.isOutOfStock).toBeFalsy();
  });
});
