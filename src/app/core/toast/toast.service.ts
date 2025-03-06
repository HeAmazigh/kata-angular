import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { AlertType, ToastInfo, ToastInfos } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastInfos = [];

  show(body: string, type: AlertType, timeout = 5000) {
    const toastInfo: ToastInfo = { body, type };
    this.toasts.push(toastInfo);

    of(toastInfo)
      .pipe(delay(timeout))
      .subscribe(() => this.remove(toastInfo));
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(
      (toastToCompare) => toastToCompare != toast
    );
  }
}
