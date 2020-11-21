import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import { mapOptions } from './mapOptions';
import Spinner from '../../components/Spinner';
import { IRestaurant, RestrauntsApi } from '../../common/api/restraurantsApi';
import RestaurantMapMobile from '../../components/Restaurant/RestaurantMap';
import { MediaContext } from '../../common/context/mediaContext';
import Restaurant from '../../components/Restaurant';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(100vh - 64px)',
};

const center = {
  lat: 51.24691,
  lng: 22.57362,
};

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });
  const media = useContext(MediaContext);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [showInfoWindowId, setShowInfoWindowId] = useState<string>('');
  const [userPosition, setUserPosiition] = useState({
    lat: 0,
    lng: 0,
  });

  const handleMarkerClick = useCallback((_: any, restaurant: IRestaurant) => {
    setShowInfoWindowId(restaurant._id);
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setShowInfoWindowId('');
  }, []);

  useEffect(() => {
    const getResponse = async () => {
      const response = await RestrauntsApi.getAllDb();
      setRestaurants(response);
    };

    getResponse();

    navigator.geolocation.getCurrentPosition((position) => {
      setUserPosiition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  if (loadError) return <h1>Error</h1>;
  if (!isLoaded) return <Spinner />;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        options={mapOptions}
        onClick={handleInfoWindowClose}
        center={center}>
        <Marker title='User location' position={userPosition} />
        {restaurants.map((restaurant: IRestaurant) => {
          return (
            <>
              <Marker
                key={restaurant._id}
                title={restaurant.name}
                onClick={(e) => handleMarkerClick(e, restaurant)}
                position={{
                  lat: restaurant.location!.lat,
                  lng: restaurant.location!.lng,
                }}>
                {showInfoWindowId === restaurant._id ? (
                  <InfoWindow
                    key={restaurant._id}
                    onCloseClick={handleInfoWindowClose}>
                    {media.xsSmallScreen ? (
                      <RestaurantMapMobile
                        key={restaurant.website}
                        restaurant={restaurant}
                      />
                    ) : (
                      <Restaurant
                        key={restaurant.website}
                        disableBottomBorder
                        restaurant={restaurant}
                      />
                    )}
                  </InfoWindow>
                ) : null}
              </Marker>
            </>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default React.memo(Map);
