import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Products } from '../models';

describe('ProductService', () => {
  let service: ProductService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
    productServiceMock = {
      productsResource: {
        value: jest.fn(() => products),
        hasValue: jest.fn(() => true),
        error: jest.fn(() => null),
      },
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products from API', async () => {
    const result = await productServiceMock.productsResource.value();
    expect(result).toEqual(products);
  });
});
