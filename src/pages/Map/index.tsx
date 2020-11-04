import React, { useEffect, useState } from 'react';

import { usePosition } from 'use-position';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import { mapOptions } from './mapOptions';
import Spinner from '../../components/Spinner';
import { RestrauntsApi } from '../../common/api/restraurantsApi';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 64px)',
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });
  const { latitude, longitude } = usePosition(false, {
    enableHighAccuracy: true,
    maximumAge: Infinity,
    timeout: 0,
  });
  const [restaurants, setRestaurants] = useState<any>([]);

  useEffect(() => {
    const getResponse = async () => {
      let restaurantsTemp: any[] = [];
      const response = await RestrauntsApi.getAll();
      response.forEach(async (restaurant) => {
        const response = await RestrauntsApi.getRestaurantLocation(restaurant);
        restaurantsTemp = [
          ...restaurantsTemp,
          {
            ...restaurant,
            location: response,
          },
        ];
        setRestaurants(restaurantsTemp);
      });
    };

    getResponse();
  }, []);

  if (loadError) return <h1>Error</h1>;
  if (!isLoaded) return <Spinner />;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        options={mapOptions}
        center={{
          lat: 51.24691,
          lng: 22.57362,
        }}>
        <Marker position={{ lat: latitude, lng: longitude }} />
        {restaurants.map((restaurant: any) => {
          return (
            <Marker
              position={{
                lat: parseFloat(restaurant.location.lat),
                lng: parseFloat(restaurant.location.lng),
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default Map;
