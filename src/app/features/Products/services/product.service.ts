import { Injectable, resource } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Products } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  productsResource = resource({
    loader: async (): Promise<Products> => {
      try {
        const response = await fetch(this.apiUrl);
        return response.json();
      } catch (error) {
        console.error('Erreur de chargement des produits', error);
        return [];
      }
    },
  });
}
