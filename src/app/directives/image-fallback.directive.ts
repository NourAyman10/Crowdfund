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
    // If no image source is provided, use fallback immediately
    if (!this.imageSrc() || this.imageSrc().trim() === '') {
      const imageElement: HTMLImageElement = this.elementRef.nativeElement;
      imageElement.src = this.imageFallback();
    }
  }

  @HostListener('error')
  onError() {
    const imageElement: HTMLImageElement = this.elementRef.nativeElement;
    const fallbackSrc = this.imageFallback();

    // Only set fallback if we haven't already tried it
    if (imageElement.src !== fallbackSrc && !imageElement.src.includes('image-placeholder.png')) {
      console.log('Image failed to load, using fallback:', fallbackSrc);
      imageElement.src = fallbackSrc;
    }
  }
}
