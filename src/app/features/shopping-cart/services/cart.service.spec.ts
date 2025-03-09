import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Category } from '../../Products/enums/category.enum';
import { Product } from '../../Products/models/product.model';
import { ProductService } from '../../Products/services/product.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CartService', () => {
  let service: CartService;
  let productService: ProductService;
  const mockProduct: Product = {
    id: 1,
    productName: 'Test Product',
    price: 100,
    quantity: 5,
    stock: 4,
    isImported: false,
    category: Category.Electric,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService,
      ],
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    service.addToCart(mockProduct, 2);
    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].qty).toBe(2);
  });

  it('should update quantity if product is already in cart', () => {
    service.addToCart(mockProduct, 2);
    service.addToCart(mockProduct, 5);
    expect(service.cartItems().length).toBe(1);
    expect(service.cartItems()[0].qty).toBe(7);
  });

  it('should remove a product from the cart', () => {
    service.addToCart(mockProduct, 2);
    service.removeFromCart(mockProduct.id);
    expect(service.cartItems().length).toBe(0);
  });

  it('should return the total number of items in the cart', () => {
    service.addToCart(mockProduct, 2);
    expect(service.getTotalItems()).toBe(2);
    service.addToCart(mockProduct, 5);
    expect(service.getTotalItems()).toBe(7);
  });

  it('should clean the cart', () => {
    service.addToCart(mockProduct, 2);
    service.cleanCart();
    expect(service.cartItems().length).toBe(0);
  });
});
