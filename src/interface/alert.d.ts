export interface Alert {
  id?: string;
  category: string;
  description: string;
  lat: number;
  long: number;
  status?: boolean;
  createdAt?: Date;
}
