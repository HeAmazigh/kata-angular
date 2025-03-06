import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from './services/product.service';
import { CartService } from '../shopping-cart/services/cart.service';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Products } from './models';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceMock: any;
  let cartServiceMock: any;

  const products: Products = [
    {
      id: 1,
      productName: 'Laptop',
      price: 1200,
      quantity: 1,
      stock: 10,
      isImported: true,
      category: 'Electronics',
    },
    {
      id: 2,
      productName: 'Coffee Mug',
      price: 15,
      quantity: 2,
      stock: 50,
      isImported: false,
      category: 'Kitchenware',
    },
    {
      id: 3,
      productName: 'Wireless Headphones',
      price: 200,
      quantity: 1,
      stock: 25,
      isImported: true,
      category: 'Electronics',
    },
  ];

  beforeEach(async () => {
    registerLocaleData(localeFr, 'fr');
    productServiceMock = {
      productsResource: {
        value: signal(products),
      },
    };

    cartServiceMock = {
      getTotalItems: jest.fn().mockReturnValue(5),
    };

    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: productServiceMock },
        { provide: CartService, useValue: cartServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct total cart items', () => {
    expect(component.totalCartItem()).toBe(5);
  });

  it('should initialize with the correct products', () => {
    expect(component.products()).toEqual(products);
  });

  it('should update selectedCategory when a new category is selected', () => {
    component.selectedCategory.set('Electronics');
    expect(component.selectedCategory()).toBe('Electronics');
  });
});
