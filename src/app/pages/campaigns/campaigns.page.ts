import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { CampaignsService } from '../../services/campaigns/campaigns.service';
import { Campaign } from '../../models/campaigns.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [CardComponent, RouterLink],
  templateUrl: './campaigns.page.html',
  styleUrl: './campaigns.page.scss',
})
export class CampaignsPage implements OnInit {
  private campaignsService = inject(CampaignsService);
  private destroyRef = inject(DestroyRef);
  private toastr = inject(ToastrService);
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
          this.toastr.error("Can't get campaigns, Try again", 'Error');
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
