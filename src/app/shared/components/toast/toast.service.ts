// app/shared/services/toast.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  messages = signal<{ text: string, type: 'success' | 'error' | 'info' }[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.messages.update(msgs => [...msgs, { text: message, type }]);
    setTimeout(() => this.dismiss(message), 3000); // auto-dismiss in 3s
  }

  dismiss(message: string) {
    this.messages.update(msgs => msgs.filter(m => m.text !== message));
  }
}
