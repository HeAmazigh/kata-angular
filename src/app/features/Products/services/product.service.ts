import { Injectable, resource } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Products } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly apiUrl = environment.apiUrl;

  constructor(readonly http: HttpClient) {}

  productsResource = resource({
    loader: async (): Promise<Products> => {
      return firstValueFrom(this.http.get<Products>(this.apiUrl));
    },
  });
}
