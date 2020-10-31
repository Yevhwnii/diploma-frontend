import axios from 'axios';

export interface Restaurant {
  id: number;
  _id: string;
  name: string;
  address: string;
  description: string;
  tags: string;
  webSite: string;
  imageUrl: string;
}

export const RestrauntsApi = {
  getAll: async (): Promise<Restaurant[]> => {
    const response = await axios.get('/restaurants');
    const restaurants: Restaurant[] = response.data;
    return restaurants;
  },
};
