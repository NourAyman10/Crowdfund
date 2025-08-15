import { Component, input } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SkeletonComponent, ProgressBarComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  skeleton = input<boolean>(false);
  image = input<string>('');
  name = input<string>('No Name');
  target = input<number>(0);
  raised = input<number>(0);
}
