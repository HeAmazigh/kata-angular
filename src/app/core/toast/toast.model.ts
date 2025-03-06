export type AlertType = 'SUCCESS' | 'ERROR';

export interface ToastInfo {
  type: AlertType;
  body: string;
}

export type ToastInfos = ToastInfo[];
