import React, { useEffect, useState } from 'react';

import RestaurantList from './containers/RestaurantList';
import { IRestaurant, RestrauntsApi } from '../../common/api/restraurantsApi';
import Layout from '../../components/Layout';

interface RestaurantsProps {}

const Restaurants: React.FC<RestaurantsProps> = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getResponse = async () => {
      const response = await RestrauntsApi.getAllDb();
      setRestaurants(response);
      setLoading(false);
    };

    getResponse();
  }, []);

  return (
    <Layout>
      <RestaurantList loading={loading} restaurants={restaurants} />
    </Layout>
  );
};

export default Restaurants;
