import { Injectable, inject } from '@angular/core';
import { NetworkService } from './network.service';
import { ToastrService } from 'ngx-toastr';
import { filter, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkMonitorService {
  private networkService = inject(NetworkService);
  private toaster = inject(ToastrService);
  private isInitialized = false;
  private wasOffline = false; // Track if we were offline at any point

  constructor() {
    // Delay initialization to prevent false positives on page refresh
    setTimeout(() => {
      this.initializeNetworkMonitoring();
    }, 2000); // 2 second delay to ensure stable network state
  }

  private initializeNetworkMonitoring(): void {
    if (this.isInitialized) return;
    
    this.isInitialized = true;

    // Monitor network status changes
    this.networkService.getOnlineStatus$()
      .pipe(
        distinctUntilChanged(), // Only emit when status actually changes
        filter(isOnline => !isOnline) // Only when going offline
      )
      .subscribe(() => {
        this.wasOffline = true; // Mark that we were offline
        this.showOfflineToast();
      });

    // Monitor when coming back online
    this.networkService.getOnlineStatus$()
      .pipe(
        distinctUntilChanged(), // Only emit when status actually changes
        filter(isOnline => isOnline) // Only when coming back online
      )
      .subscribe(() => {
        // Only show "Network Restored" if we were previously offline
        if (this.wasOffline) {
          this.showOnlineToast();
          this.wasOffline = false; // Reset the flag
        }
      });
  }

  private showOfflineToast(): void {
    this.toaster.error("There is no internet", "Network Error", {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: true,
      progressBar: false
    });
  }

  private showOnlineToast(): void {
    this.toaster.success("Internet connection restored", "Network Restored", {
      timeOut: 4000,
      progressBar: true
    });
  }

  /**
   * Get current network status
   */
  getCurrentNetworkStatus(): boolean {
    return this.networkService.isCurrentlyOnline();
  }

  /**
   * Check if currently offline
   */
  isOffline(): boolean {
    return this.networkService.isCurrentlyOffline();
  }

  /**
   * Check if currently online
   */
  isOnline(): boolean {
    return this.networkService.isCurrentlyOnline();
  }
}
