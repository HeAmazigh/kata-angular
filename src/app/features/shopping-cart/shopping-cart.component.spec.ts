import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Category } from '../Products/enums/category.enum';
import { CartService } from './services/cart.service';
import { Product } from '../Products/models/product.model';
import { ProductService } from '../Products/services/product.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let cartService: CartService;

  const mockProduct: Product = {
    id: 1,
    productName: 'Test Product',
    price: 100,
    quantity: 5,
    stock: 10,
    isImported: false,
    category: Category.Electric,
  };

  beforeEach(async () => {
    registerLocaleData(localeFr, 'fr');
    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        CartService,
        ProductService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty cart', () => {
    expect(component.cartItems().length).toBe(0);
  });

  it('should calculate totals correctly when adding an item', () => {
    cartService.addToCart(mockProduct, 2);
    fixture.detectChanges();

    expect(component.totalPriceHT()).toBe(200);
    expect(component.totalTaxes()).toBeGreaterThan(0);
    expect(component.totalPriceTTC()).toBe(
      component.totalPriceHT() + component.totalTaxes()
    );
  });

  it('should remove an item from the cart', () => {
    cartService.addToCart(mockProduct, 2);
    fixture.detectChanges();

    component.removeItem(mockProduct.id);
    fixture.detectChanges();

    expect(component.cartItems().length).toBe(0);
  });

  it('should clear the cart', () => {
    cartService.addToCart(mockProduct, 2);
    fixture.detectChanges();

    component.cleanCart();
    fixture.detectChanges();

    expect(component.cartItems().length).toBe(0);
  });
});
