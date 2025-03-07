import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { Category } from '../../enums/category.enum';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Products } from '../../models/product.model';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  const mockProducts: Products = [
    {
      id: 1,
      productName: 'Test Product',
      price: 100,
      quantity: 5,
      stock: 4,
      isImported: false,
      category: Category.Electric,
    },
    {
      id: 2,
      productName: 'Test Product 2',
      price: 100,
      quantity: 5,
      stock: 4,
      isImported: false,
      category: Category.Books,
    },
  ];

  beforeEach(async () => {
    registerLocaleData(localeFr, 'fr');
    await TestBed.configureTestingModule({
      imports: [ProductsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('products', mockProducts);
    fixture.componentRef.setInput('selectedCategory', 'all');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all products when selectedCategory is "all"', () => {
    const productElements = fixture.nativeElement.querySelectorAll(
      'app-product-details'
    );
    expect(productElements.length).toBe(2);
  });

  it('should filter products by category', () => {
    fixture.componentRef.setInput('selectedCategory', Category.Electric);
    fixture.detectChanges();

    const productElements = fixture.nativeElement.querySelectorAll(
      'app-product-details'
    );
    expect(productElements.length).toBe(1);
    expect(productElements[0].textContent).toContain('Test Product');
  });

  it('should show "Product vide" when no products match the selected category', () => {
    fixture.componentRef.setInput('selectedCategory', 'Sport');
    fixture.detectChanges();
    const emptyMessage = fixture.nativeElement.querySelector('h3');
    expect(emptyMessage.textContent).toContain('Product vide');
  });
});
