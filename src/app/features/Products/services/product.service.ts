import { inject, Injectable, resource } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Products } from '../models';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  productsResource = resource({
    loader: async (): Promise<Products> => {
      return firstValueFrom(this.http.get<Products>(this.apiUrl));
    },
  });
}
