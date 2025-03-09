import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from './services/product.service';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Products } from './models/product.model';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceMock: any;

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
        value: jest.fn(() => products),
        hasValue: jest.fn(() => true),
        error: jest.fn(() => null),
        isLoading: jest.fn(() => false),
      },
    };

    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideRouter([]),
        { provide: ProductService, useValue: productServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct products', () => {
    expect(component.products()).toEqual(products);
  });

  it('should update selectedCategory when a new category is selected', () => {
    component.selectedCategory.set('Electronics');
    expect(component.selectedCategory()).toBe('Electronics');
  });
});
