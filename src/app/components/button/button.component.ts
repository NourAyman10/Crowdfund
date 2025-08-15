import { Component, HostBinding, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'button[customButton]',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  primary = input<boolean>(true);
  loading = input<boolean>(false);

  @HostBinding('attr.data-variant')
  get variant() {
    return this.primary() ? 'primary' : 'secondary';
  }

  @HostBinding('attr.data-loading')
  get isLoading() {
    return this.loading() ? 'true' : null;
  }

  @HostBinding('attr.disabled')
  get isDisabled() {
    return this.loading() ? '' : null;
  }
}