import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { bulletSymbol } from '../../common/symbols';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import { IRestaurant, RestrauntsApi } from '../../common/api/restraurantsApi';
import Layout from '../../components/Layout';
import Spinner from '../../components/Spinner';
import { IMedia, MediaContext } from '../../common/context/mediaContext';
import Menu from '../../components/Menu';

const useSingRestaurantStyles = makeStyles((theme) => ({
  paper: (media: IMedia) => ({
    padding: 10,
    marginTop: media.xsSmallScreen ? 0 : 25,
    height: media.xsSmallScreen ? '100%' : '70%',
    borderRadius: 15,
    boxShadow: ' 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    display: 'flex',
    flexDirection: 'column',
  }),
  avatar: {
    padding: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '33%',
    '& div': {
      width: '100%',
      maxWidth: 350,
      maxHeight: 150,
      height: '100%',
      borderRadius: 0,
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '20%',
    textAlign: 'center',
  },
  body_name: {
    margin: '7px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      fontSize: '1.6rem',
      fontWeight: 600,
    },
  },
  body_desc: {
    marginBottom: '2rem',
    '& p': {
      fontSize: '0.9rem',
      fontWeight: 400,
      color: grey[600],
    },
  },
  footer: (media: IMedia) => ({
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'center',
    '& b': {
      marginLeft: 5,
      marginRight: 5,
    },
    '& p': {
      fontSize: media.xsSmallScreen ? '0.8rem' : '1.2rem',
    },
    '& a': {
      fontSize: '1rem',
      textDecoration: 'underline',
    },
  }),
  tags: {
    marginTop: 15,
    color: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: (media: IMedia) => ({
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    '& button': {
      margin: 10,
      width: 200,
      '& > span': {
        fontSize: media.xsSmallScreen ? 13 : 16,
      },
    },
  }),
}));

const SingleRestaurant = () => {
  const media = useContext(MediaContext);
  const classes = useSingRestaurantStyles(media);
  const [restaurant, setRestaurant] = useState<IRestaurant | null>();
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const params: { id: string } = useParams();

  useEffect(() => {
    setLoading(true);
    const getRestaurant = async (id: string) => {
      const restaurant = await RestrauntsApi.getSingle(id);
      setRestaurant(restaurant);
      setLoading(false);
    };
    getRestaurant(params.id);
  }, [params.id]);

  const handleOpenMenu = () => {
    setShowMenu(true);
  };
  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <Layout>
      {!loading ? (
        <Paper className={classes.paper} elevation={2}>
          <div className={classes.avatar}>
            <Avatar
              alt={`${restaurant?.name} restaurant`}
              src={restaurant?.imageUrl}
            />
          </div>
          <div className={classes.body}>
            <div className={classes.body_name}>
              <Typography>{restaurant?.name}</Typography>
            </div>
            <div className={classes.body_desc}>
              <Typography>{restaurant?.description}</Typography>
            </div>
          </div>
          <div className={classes.footer}>
            <Typography>ul.{restaurant?.address}</Typography>
            <b>{bulletSymbol}</b>
            <Link target='_blank' href={`http://${restaurant?.webSite}`}>
              {restaurant?.webSite}
            </Link>
          </div>
          <div className={classes.tags}>
            <Typography>{restaurant?.tags}</Typography>
          </div>
          <div className={classes.actions}>
            <Link
              target='_blank'
              href={`https://www.google.com/maps/place/${restaurant?.address!}/@${
                restaurant?.location?.lat
              },${restaurant?.location?.lng},17z`}>
              <Button color='primary' variant='contained'>
                <Typography
                  style={{ fontSize: 16, lineHeight: 1, fontWeight: 600 }}>
                  Show on google maps
                </Typography>
              </Button>
            </Link>
            <Button
              onClick={handleOpenMenu}
              color='primary'
              variant='contained'>
              Show menu
            </Button>
          </div>
          {showMenu ? (
            <Menu
              restaurant={restaurant}
              show={showMenu}
              onClose={handleCloseMenu}
            />
          ) : null}
        </Paper>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default SingleRestaurant;
