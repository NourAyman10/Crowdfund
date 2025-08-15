import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../components/shared/button/button.component';
import { InputComponent } from '../../../../components/shared/input/input.component';

@Component({
  selector: 'app-notified-section',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './notified-section.component.html',
  styleUrl: './notified-section.component.scss'
})
export class NotifiedSectionComponent {

}
