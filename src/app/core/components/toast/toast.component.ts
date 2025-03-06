import { Component, inject } from '@angular/core';
import { ToastService } from '../../toast/toast.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  toastService = inject(ToastService);
}
