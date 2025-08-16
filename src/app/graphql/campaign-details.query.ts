import { gql } from 'apollo-angular';

export const GET_CAMPAIGN_DETAILS = gql`
  query getCampaignDetails($id: ID!) {
    campaign(id: $id) {
      id
      name
      goal
      currentAmount
      description
      imageUrl
      donors {
        name
        amount
      }
    }
  }
`;
