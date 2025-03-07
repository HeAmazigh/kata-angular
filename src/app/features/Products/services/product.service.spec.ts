import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Products } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from API', async () => {
    const mockProducts: Products = [
      {
        id: 1,
        productName: 'Laptop',
        price: 1200,
        quantity: 1,
        stock: 10,
        isImported: true,
        category: 'Electronics',
      },
    ];
    const promise = firstValueFrom(
      service.http.get<Products>(environment.apiUrl)
    );

    const req = httpTestingController.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    const products = await promise;
    expect(products).toEqual(mockProducts);
  });
});
