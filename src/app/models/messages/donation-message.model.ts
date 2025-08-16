export interface DonationMessage {
  type: 'donation';
  campaignId: string;
  amount: number;
};