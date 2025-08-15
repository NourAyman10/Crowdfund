import { Component } from '@angular/core';
import { NotifiedSectionComponent } from './notified-section/notified-section.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NotifiedSectionComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
