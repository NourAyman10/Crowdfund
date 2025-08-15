import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [RouterLink, ImageFallbackDirective, MatProgressSpinnerModule, ProgressBarComponent, InputComponent, ButtonComponent],
  templateUrl: './campaign-details.page.html',
  styleUrl: './campaign-details.page.scss',
})
export class CampaignDetailsPage {
  id = inject(ActivatedRoute).snapshot.paramMap.get('id');

  image = signal<string>('');
  name = signal<string>('No Name');

  isLoading = signal(true);
  removeLoader = signal(false);

  hideSpinner() {
    this.isLoading.set(false);
    setTimeout(() => this.removeLoader.set(true), 1000);
  }
}
