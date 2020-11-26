import axios from 'axios';
import { trimAddress } from '../utils/addressTrim';

export interface IRestaurant {
  _id: string;
  name: string;
  address: string;
  location?: ILocation;
  description: string;
  tags: string;
  website: string;
  imageUrl: string;
  menu: {
    _id: string;
    items: MenuItem[];
  };
}

export interface MenuItem {
  category: string;
  meals: Meal[];
}

export interface Meal {
  name: string;
  price: number;
}

export interface ILocation {
  lat: number;
  lng: number;
}

const getRestaurantLocation = async (
  addressInput: string
): Promise<ILocation> => {
  const address = trimAddress(addressInput);
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  );
  return response.data.results[0].geometry.location;
};

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
  getAllDb: async (): Promise<IRestaurant[]> => {
    const response = await axios.get('http://localhost:4000/restaurants');
    const restaurants: IRestaurant[] = response.data;
    return restaurants;
  },
  getSingleDb: async (id: string): Promise<IRestaurant> => {
    const response = await axios.get(`http://localhost:4000/restaurants/${id}`);
    return response.data;
  },
  create: async (restaurant: any): Promise<void> => {
    const location = await getRestaurantLocation(restaurant.address);
    console.log(location);

    try {
      const response = await axios.post(
        'http://localhost:4000/restaurants',
        {
          name: restaurant.name,
          description: restaurant.description,
          imageUrl: restaurant.imageUrl,
          address: restaurant.address,
          location: location,
          tags: restaurant.tags,
          website: restaurant.website,
          menu: {
            items: [...restaurant.menu.items],
          },
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('tid'),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  },
  delete: async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:4000/restaurants/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tid'),
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  search: async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/restaurants/search?q=${query}`
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};
