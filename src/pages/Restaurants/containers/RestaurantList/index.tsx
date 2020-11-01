import React from 'react';

import List from '@material-ui/core/List';

import { IRestaurant } from '../../../../common/api/restraurantsApi';
import Restaurant from '../../../../components/Restaurant';
import Spinner from '../../../../components/Spinner';

interface RestaurantListProps {
  loading: boolean;
  restaurants: IRestaurant[] | undefined;
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  loading,
  restaurants,
}) => {
  return (
    <>
      {!loading ? (
        <List style={{ height: '100%' }}>
          {restaurants?.map((restaurant) => {
            return <Restaurant restaurant={restaurant} />;
          })}
        </List>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default RestaurantList;
