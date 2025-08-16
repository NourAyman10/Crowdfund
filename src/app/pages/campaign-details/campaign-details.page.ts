import { Component, inject, signal, OnInit, OnDestroy, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CampainDetailsService } from '../../services/campain-details/campain-details.service';
import { Campaign } from '../../models/campaigns.model';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ImageFallbackDirective,
    MatProgressSpinnerModule,
    ProgressBarComponent,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './campaign-details.page.html',
  styleUrl: './campaign-details.page.scss',
})
export class CampaignDetailsPage implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private campaignService = inject(CampainDetailsService);
  private destroy$ = new Subject<void>();

  id = this.route.snapshot.paramMap.get('id') || '';

  // Campaign data signals
  campaign = signal<Campaign | null>(null);
  image = signal<string>('');
  name = signal<string>('Loading...');
  description = signal<string>('');
  goal = signal<number>(0);
  currentAmount = signal<number>(0);
  percentage = computed(() => {
    if (!this.goal() || this.goal() <= 0) return 0;
    return Math.min(
      Math.round((this.currentAmount() / this.goal()) * 100),
      100
    );
  });
  donors = signal<any[]>([]);

  // UI state signals
  isLoading = signal(true);
  removeLoader = signal(false);
  isSubmitting = signal(false);
  error = signal<string>('');

  // Form data
  donationAmount = signal<number>(10);
  donorName = signal<string>('');

  ngOnInit() {
    if (this.id) {
      this.loadCampaignDetails();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCampaignDetails() {
    this.isLoading.set(true);
    this.error.set('');

    this.campaignService
      .getCampaignDetails(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (campaign) => {
          this.campaign.set(campaign);
          this.image.set(campaign.imageUrl);
          this.name.set(campaign.name);
          this.description.set(campaign.description);
          this.goal.set(campaign.goal);
          this.currentAmount.set(campaign.currentAmount);
          this.donors.set(campaign.donors);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error loading campaign:', err);
          this.error.set('Failed to load campaign details. Please try again.');
          this.isLoading.set(false);
        },
      });
  }

  async onSubmit() {
    if (!this.donationAmount() || !this.donorName()) {
      this.error.set('Please enter both amount and name');
      return;
    }

    this.isSubmitting.set(true);
    this.error.set('');

    try {
      const result = await this.campaignService
        .donateToCampaign(this.id, this.donationAmount(), this.donorName())
        .toPromise();

      if (result?.success) {
        // Reset form
        this.donationAmount.set(10);
        this.donorName.set('');
        this.error.set('');

        // Refresh campaign data
        this.loadCampaignDetails();
      } else {
        this.error.set(result?.message || 'Donation failed. Please try again.');
      }
    } catch (err) {
      console.error('Donation error:', err);
      this.error.set('Donation failed. Please try again.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  hideSpinner() {
    this.isLoading.set(false);
    setTimeout(() => this.removeLoader.set(true), 1000);
  }
}
