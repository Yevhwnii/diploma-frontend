import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { IRestaurant, RestrauntsApi } from '../../common/api/restraurantsApi';
import Layout from '../../components/Layout';
import PaperLayout from '../../components/PaperLayout';
import AdminRestaurant from '../../components/Restaurant/AdminPanelRestaurant';
import Spinner from '../../components/Spinner';

const useSearchStyles = makeStyles(() => ({
  header: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    '& p': {
      fontSize: '1.3rem',
      fontWeight: 600,
    },
  },
}));

const Search = () => {
  const classes = useSearchStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [restaurantNameAlike, setRestaurantNameAlike] = useState<any>([]);
  const [restaurantMenuAlike, setRestaurantMenuAlike] = useState<any>([]);

  useEffect(() => {
    const querySplitted = history.location.search.split('q=')[1];

    setLoading(true);
    const getSearchResults = async () => {
      const result = await RestrauntsApi.search(querySplitted);
      setRestaurantNameAlike([...result.restaurants]);
      setRestaurantMenuAlike([...result.restaurantWithMenuLike]);
      setQuery(querySplitted);
      setLoading(false);
    };

    getSearchResults();
  }, [history.location.search]);

  return (
    <Layout>
      <PaperLayout>
        <div className={classes.header}>
          <Typography>Search results</Typography>
        </div>
        <Divider />
        {!loading ? (
          <>
            <Typography
              style={{ textAlign: 'center', marginTop: 15 }}
              variant='body1'>
              Restaurants which have "{query}" in their names:
            </Typography>
            {restaurantNameAlike.length > 0 ? (
              restaurantNameAlike?.map((restaurant: IRestaurant) => {
                return (
                  <List>
                    <AdminRestaurant
                      withDelete={false}
                      key={restaurant._id}
                      restaurant={restaurant}
                    />
                  </List>
                );
              })
            ) : (
              <Typography
                variant='h6'
                style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                No results were found...
              </Typography>
            )}
            <Divider />
            <Typography
              style={{ textAlign: 'center', marginTop: 15 }}
              variant='body1'>
              Restaurants which have menu category called "{query}":
            </Typography>
            {restaurantMenuAlike.length > 0 ? (
              restaurantMenuAlike?.map((restaurant: IRestaurant) => {
                return (
                  <List>
                    <AdminRestaurant
                      withDelete={false}
                      key={restaurant._id}
                      restaurant={restaurant}
                    />
                  </List>
                );
              })
            ) : (
              <Typography
                variant='h6'
                style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                No results were found...
              </Typography>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </PaperLayout>
    </Layout>
  );
};

export default Search;
