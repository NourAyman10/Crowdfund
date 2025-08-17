import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NetworkMonitorService } from './services/network/network-monitor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private networkMonitor = inject(NetworkMonitorService);

  constructor() {
    // Network monitoring is automatically initialized by the service
    // with a delay to prevent false positives on page refresh
  }
}
