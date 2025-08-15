import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-newsletter-cta-section',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './newsletter-cta-section.component.html',
  styleUrl: './newsletter-cta-section.component.scss'
})
export class NewsletterCTASectionComponent {

}
