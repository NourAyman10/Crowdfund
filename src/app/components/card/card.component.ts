import { Component, computed, input, signal } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    DecimalPipe,
    SkeletonComponent,
    ProgressBarComponent,
    ImageFallbackDirective,
    MatProgressSpinnerModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  skeleton = input<boolean>(false);
  image = input<string>('');
  name = input<string>('No Name');
  goal = input<number>(0);
  currentAmount = input<number>(0);
  percentage = computed(() => {
    if (!this.goal() || this.goal() <= 0) return 0;
    return Math.min(
      Math.round((this.currentAmount() / this.goal()) * 100),
      100
    );
  });

  isLoading = signal(true);
  removeLoader = signal(false);

  hideSpinner() {
    this.isLoading.set(false);
    setTimeout(() => this.removeLoader.set(true), 1000);
  }
}
