import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'input[customInput]',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  placeholder = input<string>('');
  type = input<string>('');

  valueChange = output<string>();

  private currentValue = signal<string>('') 

}
