import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsPage } from './campaigns.page';

describe('CampaignsPage', () => {
  let component: CampaignsPage;
  let fixture: ComponentFixture<CampaignsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
