export interface Donors {
  amount: number;
  name: string;
}
export interface Campaign {
  currentAmount: number;
  description: string;
  donors: Donors[];
  goal: number;
  id: string;
  imageUrl: string;
  name: string;
}
