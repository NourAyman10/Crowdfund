import { Injectable } from '@angular/core';
import { DonationMessage } from '../../models/messages/donation-message.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environment/environment';
import { Observable, retry, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  private socket$: WebSocketSubject<DonationMessage> | null = null;

  private connect(): WebSocketSubject<DonationMessage> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket<DonationMessage>(environment.webSocketBaseURL);
    }
    return this.socket$;
  }
  messages$(): Observable<DonationMessage> {
    return this.connect().pipe(
      retry({
        delay: (retryCount) => {
          return timer(Math.min(1000 * retryCount, 5000));
        },
      })
    );
  }
}
