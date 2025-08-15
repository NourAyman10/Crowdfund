import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-details',
  standalone: true,
  imports: [],
  templateUrl: './campaign-details.page.html',
  styleUrl: './campaign-details.page.scss'
})
export class CampaignDetailsPage {
  id = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
