import { NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'div[skeleton]',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  width = input<string>('100%');
  height = input<string>('10px');
  borderRadius = input<string>('8px');
}
