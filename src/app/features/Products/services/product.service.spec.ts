import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { environment } from '../../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            products: [
              {
                id: 1,
                productName: 'Apple - Fuji',
                price: 4.37,
                quantity: 1,
                stock: 4,
                isImported: true,
                category: 'Food',
              },
            ],
          }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
