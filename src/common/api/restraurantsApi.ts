import axios from 'axios';

export interface IRestaurant {
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
  getAll: async (): Promise<IRestaurant[]> => {
    const response = await axios.get('/restaurants');
    const restaurants: IRestaurant[] = response.data;
    return restaurants;
  },
  getSingle: async (id: string): Promise<IRestaurant> => {
    const response = await axios.get(`/restaurants/${id}`);
    return response.data;
  },
};
