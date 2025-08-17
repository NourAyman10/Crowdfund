import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isOnline = signal(navigator.onLine);
  private onlineStatus$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    this.initializeNetworkListeners();
    this.startPeriodicNetworkCheck();
  }

  private initializeNetworkListeners(): void {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      console.log('Network: Connection restored');
      this.isOnline.set(true);
      this.onlineStatus$.next(true);
    });

    window.addEventListener('offline', () => {
      console.log('Network: Connection lost');
      this.isOnline.set(false);
      this.onlineStatus$.next(false);
    });

    // Additional network change detection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        connection.addEventListener('change', () => {
          const online = navigator.onLine;
          console.log('Network: Connection type changed, online:', online);
          this.isOnline.set(online);
          this.onlineStatus$.next(online);
        });
      }
    }
  }

  private startPeriodicNetworkCheck(): void {
    // Check network status every 5 seconds as a fallback
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.checkNetworkStatus())
      )
      .subscribe();
  }

  private async checkNetworkStatus(): Promise<void> {
    try {
      // Try to fetch a small resource to verify connectivity
      const response = await fetch('/favicon.ico', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      const currentStatus = response.ok;
      if (currentStatus !== this.isOnline()) {
        console.log('Network: Status changed to:', currentStatus);
        this.isOnline.set(currentStatus);
        this.onlineStatus$.next(currentStatus);
      }
    } catch (error) {
      // If fetch fails, we're likely offline
      if (this.isOnline()) {
        console.log('Network: Fetch failed, setting offline');
        this.isOnline.set(false);
        this.onlineStatus$.next(false);
      }
    }
  }

  /**
   * Get current online status as a signal
   */
  getOnlineStatus() {
    return this.isOnline;
  }

  /**
   * Get current online status as an observable
   */
  getOnlineStatus$(): Observable<boolean> {
    return this.onlineStatus$.asObservable();
  }

  /**
   * Check if currently online
   */
  isCurrentlyOnline(): boolean {
    return this.isOnline();
  }

  /**
   * Check if currently offline
   */
  isCurrentlyOffline(): boolean {
    return !this.isOnline();
  }

  /**
   * Get connection information if available
   */
  getConnectionInfo(): any {
    if ('connection' in navigator) {
      return (navigator as any).connection;
    }
    return null;
  }

  /**
   * Force a network status check
   */
  async forceNetworkCheck(): Promise<boolean> {
    await this.checkNetworkStatus();
    return this.isOnline();
  }
}
