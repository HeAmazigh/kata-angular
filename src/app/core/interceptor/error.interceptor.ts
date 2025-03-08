import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../toast/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((error) => {
      console.error(error);
      toastService.show('Erreur réseau, veuillez réessayer plus tard', 'ERROR');
      return throwError(() => new Error(error.message));
    })
  );
};
