import axios from 'axios';
import { trimAddress } from '../utils/addressTrim';

export interface IRestaurant {
  id: number;
  _id: string;
  name: string;
  address: string;
  description: string;
  tags: string;
  webSite: string;
  imageUrl: string;
  menu?: {
    _id: string;
    items: MenuItem[];
  };
}

export interface MenuItem {
  category: string;
  menuItems: [
    {
      id: string;
      name: string;
      price: string;
    }
  ];
}

export interface ILocation {
  lat: number;
  lng: number;
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
  getRestaurantLocation: async (
    restaurant: IRestaurant
  ): Promise<ILocation> => {
    const address = trimAddress(restaurant.address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    return response.data.results[0].geometry.location;
  },
};
