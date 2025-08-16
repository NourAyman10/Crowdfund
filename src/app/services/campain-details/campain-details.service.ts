import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Campaign } from '../../models/campaigns.model';
import { GET_CAMPAIGN_DETAILS } from '../../graphql/campaign-details.query';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampainDetailsService {
  private apollo = inject(Apollo);

  campaign = signal<Campaign | null>(null);

  gqlErrors = signal<string[]>([]);

  load(id: string) {
    return this.apollo
      .watchQuery<{ campaign: Campaign }>({
        query: GET_CAMPAIGN_DETAILS,
        variables: { id },
        errorPolicy: 'all',
      })
      .valueChanges.pipe(
        map(({ data, errors }) => {
          this.campaign.set(data?.campaign ?? null);
          this.gqlErrors.set((errors ?? []).map((e) => e.message));
          return { data: data?.campaign ?? null, errors: errors ?? [] };
        })
      );
  }
}
