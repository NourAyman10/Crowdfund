import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
  standalone: true,
})
export class ImageFallbackDirective implements OnInit {
  elementRef = inject(ElementRef);
  imageFallback = input<string>('/assets/images/image-placeholder.png');
  imageSrc = input<string>('');

  ngOnInit() {
    const src = this.imageSrc()?.trim() || '';
    const imageElement: HTMLImageElement = this.elementRef.nativeElement;

    if (!this.isValidUrl(src)) {
      imageElement.src = this.imageFallback();
    } else {
      imageElement.src = src;
    }
  }

  private isValidUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  @HostListener('error')
  onError() {
    const imageElement: HTMLImageElement = this.elementRef.nativeElement;
    const fallbackSrc = this.imageFallback();

    // Only set fallback if we haven't already tried it
    if (
      imageElement.src !== fallbackSrc &&
      !imageElement.src.includes('image-placeholder.png')
    ) {
      imageElement.src = fallbackSrc;
    }
  }
}
