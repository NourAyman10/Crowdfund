import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Campaign } from '../../models/campaigns.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  private httpClient = inject(HttpClient);
  private url = `${environment.RESTfulBaseURL}/campaigns`;

  public getCampaigns(): Observable<Campaign[]> {
    return this.httpClient.get<Campaign[]>(this.url);
  }
}
