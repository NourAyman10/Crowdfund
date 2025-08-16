import { inject, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Campaign } from '../../models/campaigns.model';

const GET_CAMPAIGN_DETAILS = gql`
  query GetCampaignDetails($id: ID!) {
    campaign(id: $id) {
      id
      name
      description
      imageUrl
      goal
      currentAmount
      donors {
        name
        amount
      }
    }
  }
`;

const DONATE_TO_CAMPAIGN = gql`
  mutation DonateToCampaign($campaignId: ID!, $amount: Float!, $donorName: String!) {
    donateToCampaign(campaignId: $campaignId, amount: $amount, donorName: $donorName) {
      success
      message
      campaign {
        id
        currentAmount
        donors {
          name
          amount
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class CampainDetailsService {
  private donationSubject = new Subject<{ campaignId: string; amount: number; donorName: string }>();
  private apollo = inject(Apollo);

  getCampaignDetails(id: string): Observable<Campaign> {
    return this.apollo.watchQuery<{ campaign: Campaign }>({
      query: GET_CAMPAIGN_DETAILS,
      variables: { id }
    }).valueChanges.pipe(
      map(result => result.data.campaign)
    );
  }

  donateToCampaign(campaignId: string, amount: number, donorName: string): Observable<any> {
    return this.apollo.mutate<{ donateToCampaign: any }>({
      mutation: DONATE_TO_CAMPAIGN,
      variables: { campaignId, amount, donorName },
      refetchQueries: [
        {
          query: GET_CAMPAIGN_DETAILS,
          variables: { id: campaignId }
        }
      ]
    }).pipe(
      map(result => result.data?.donateToCampaign)
    );
  }

  getDonationUpdates(): Observable<{ campaignId: string; amount: number; donorName: string }> {
    return this.donationSubject.asObservable();
  }

  emitDonation(donation: { campaignId: string; amount: number; donorName: string }) {
    this.donationSubject.next(donation);
  }
}
