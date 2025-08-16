export interface DonationMessage {
  type: 'donation';
  campaignId: string;
  donor: string;
  amount: number;
};