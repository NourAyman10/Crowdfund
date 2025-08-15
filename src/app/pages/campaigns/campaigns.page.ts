import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CampaignsService } from '../../services/campaigns/campaigns.service';
import { Campaign } from '../../models/campaigns.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './campaigns.page.html',
  styleUrl: './campaigns.page.scss',
})
export class CampaignsPage implements OnInit {
  private campaignsService = inject(CampaignsService);
  private destroyRef = inject(DestroyRef);
  private campaignsSubscription?: Subscription;

  campaigns = signal<Campaign[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.campaignsSubscription = this.campaignsService
      .getCampaigns()
      .subscribe({
        next: (data) => {
          this.campaigns.set(data);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });

    // Cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.campaignsSubscription?.unsubscribe();
    });
  }
}
