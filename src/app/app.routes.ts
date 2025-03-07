import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'shopping-cart',
    loadChildren: async () =>
      (await import('./features/shopping-cart/shopping-cart.routes')).routes,
  },
  {
    path: '',
    loadChildren: async () =>
      (await import('./features/Products/product.routes')).routes,
  },
  { path: '**', redirectTo: '' },
];
