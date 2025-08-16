import { Component, inject, signal, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CampainDetailsService } from '../../services/campain-details/campain-details.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RealtimeService } from '../../services/realtime/realtime.service';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink,
    ImageFallbackDirective,
    MatProgressSpinnerModule,
    ProgressBarComponent,
    InputComponent,
    ButtonComponent,
    SkeletonComponent,
  ],
  templateUrl: './campaign-details.page.html',
  styleUrl: './campaign-details.page.scss',
})
export class CampaignDetailsPage {
  id = input.required<string>();

  private campainDetailsService = inject(CampainDetailsService);
  private realtimeService = inject(RealtimeService);

  campaign = this.campainDetailsService.campaign;
  errors = this.campainDetailsService.gqlErrors;
  percentage = computed(() => {
    const goal = this.campaign()?.goal;
    const currentAmount = this.campaign()?.currentAmount;
    if (!goal || goal <= 0 || currentAmount == undefined) return 0;
    return Math.min(Math.round((currentAmount / goal) * 100), 100);
  });

  isLoading = signal(true);
  removeLoader = signal(false);

  isContentLoading = signal(true);

  ngOnInit() {
    this.campainDetailsService.load(this.id()).subscribe({
      next: () => {
        this.isContentLoading.set(false);
      },
      error: () => {
        this.isContentLoading.set(false);
      },
    });

    this.realtimeService.messages$().subscribe((message) => {
      if (
        message.type === 'donation' &&
        this.campaign()?.id == message.campaignId
      ) {
        const c = this.campaign()!;
        this.campaign.set({
          ...c,
          currentAmount: c.currentAmount + message.amount,
          donors: [
            { name: message.donor, amount: message.amount },
            ...(c.donors ?? []),
          ],
        });
      }
    });
  }

  hideSpinner() {
    this.isLoading.set(false);
    setTimeout(() => this.removeLoader.set(true), 1000);
  }
}
