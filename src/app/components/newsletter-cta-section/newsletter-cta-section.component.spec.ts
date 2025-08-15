import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterCTASectionComponent } from './newsletter-cta-section.component';

describe('NewsletterCTASectionComponent', () => {
  let component: NewsletterCTASectionComponent;
  let fixture: ComponentFixture<NewsletterCTASectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsletterCTASectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterCTASectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
