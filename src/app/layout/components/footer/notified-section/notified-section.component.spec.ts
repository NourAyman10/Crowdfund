import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifiedSectionComponent } from './notified-section.component';

describe('NotifiedSectionComponent', () => {
  let component: NotifiedSectionComponent;
  let fixture: ComponentFixture<NotifiedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifiedSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifiedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
