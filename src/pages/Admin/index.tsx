import React, { useContext, useEffect, useState } from 'react';

import { IRestaurant, RestrauntsApi } from '../../common/api/restraurantsApi';
import Layout from '../../components/Layout';
import PaperLayout from '../../components/PaperLayout';
import AdminRestaurant from '../../components/Restaurant/AdminPanelRestaurant';
import Spinner from '../../components/Spinner';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router-dom';
import { MediaContext } from '../../common/context/mediaContext';
import IconButton from '@material-ui/core/IconButton';

const useAdminStyles = makeStyles(() => ({
  header: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& p': {
      fontSize: '1.3rem',
      fontWeight: 600,
    },
    '& button': {
      color: 'rgb(195, 82, 44)',
    },
  },
}));

const Admin = () => {
  const classes = useAdminStyles();
  const history = useHistory();
  const media = useContext(MediaContext);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onDeleteHandler = async (id: string, index: number) => {
    const allRestaurants = [...restaurants];
    allRestaurants.splice(index, 1);
    setRestaurants(allRestaurants);
    await RestrauntsApi.delete(id);
  };

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
      <PaperLayout styles={{ height: '87%' }}>
        <div className={classes.header}>
          <Typography>Manage restaurants</Typography>
          {media.xsSmallScreen ? (
            <IconButton>
              <AddIcon />
            </IconButton>
          ) : (
            <Button
              onClick={() => history.push(`/admin/new`)}
              startIcon={<AddIcon />}
              variant='text'>
              Add new restaurant
            </Button>
          )}
        </div>
        <Divider />
        {!loading ? (
          restaurants?.map((restaurant, index) => {
            return (
              <List>
                <AdminRestaurant
                  key={index}
                  restaurant={restaurant}
                  restaurantIndex={index}
                  onDelete={onDeleteHandler}
                />
              </List>
            );
          })
        ) : (
          <Spinner />
        )}
      </PaperLayout>
    </Layout>
  );
};

export default Admin;
