import React, { useEffect, useState } from 'react';

import { Restaurant, RestrauntsApi } from '../../common/api/restraurantsApi';
import { bulletSymbol } from '../../common/symbols';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { grey } from '@material-ui/core/colors';

const useRestaurantsStyles = makeStyles((theme) => ({
  listItem: {
    width: '100%',
    height: '100%',
    '&:hover': {
      backgroundColor: grey[200],
    },
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& div': {
      borderRadius: 0,
      width: '100%',
      maxHeight: 130,
      height: 'auto',
    },
  },
  header: (props: RestaurantsProps) => ({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 6,
    marginBottom: 7,
    '& p': {
      fontSize: props.smallScreen ? '0.8rem' : '1.3rem',

      fontWeight: 600,
    },
    '& b': {
      fontSize: props.smallScreen ? '0.5rem' : '1.3rem',
      marginLeft: 8,
      marginRight: 8,
    },
    '& a': {
      fontSize: props.smallScreen ? '0.7rem' : '1rem',
      textDecoration: 'underline',
    },
  }),
  body: (props: RestaurantsProps) => ({
    marginBottom: 10,
    '& p': {
      color: grey[600],
      fontSize: props.smallScreen ? '0.7rem' : '0.9rem',
    },
  }),
  footer: (props: RestaurantsProps) => ({
    display: props.smallScreen ? 'none' : 'flex',
    alignItems: 'end',
    '& p': {
      fontSize: props.smallScreen ? '0.5rem' : '0.8rem',
    },
  }),
}));

interface RestaurantsProps {
  mdScreen: boolean;
  smallScreen: boolean;
}

interface IDisplayConfig {
  side: boolean | 1 | 2;
  main: 8 | 10 | 12;
}

const Restaurants: React.FC<RestaurantsProps> = ({ mdScreen, smallScreen }) => {
  const classes = useRestaurantsStyles({
    mdScreen: mdScreen,
    smallScreen: smallScreen,
  });
  const [restaurants, setRestaurants] = useState<Restaurant[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [displayConfig, setDisplayConfig] = useState<IDisplayConfig>({
    side: 2,
    main: 8,
  });

  useEffect(() => {
    setLoading(true);
    const getResponse = async () => {
      const response = await RestrauntsApi.getAll();
      setRestaurants(response);
      setLoading(false);
    };

    getResponse();
  }, []);

  useEffect(() => {
    if (smallScreen) {
      setDisplayConfig({
        side: false,
        main: 12,
      });
    } else if (mdScreen) {
      setDisplayConfig({
        side: 1,
        main: 10,
      });
    } else {
      setDisplayConfig({
        side: 2,
        main: 8,
      });
    }
  }, [smallScreen, mdScreen]);

  return (
    <Grid container style={{ height: '100%' }}>
      <Grid item xs={displayConfig.side} />
      <Grid item xs={displayConfig.main}>
        {!loading ? (
          <List style={{ height: '100%' }}>
            {restaurants?.map((restaurant) => {
              return (
                <>
                  <ButtonBase style={{ height: '16.6666%' }} centerRipple>
                    <ListItem className={classes.listItem}>
                      <Grid container spacing={3}>
                        <Grid className={classes.avatar} item xs={3}>
                          <Avatar
                            alt={restaurant.name}
                            src={restaurant.imageUrl}
                          />
                        </Grid>
                        <Grid item xs={9} container direction='column'>
                          <div className={classes.header}>
                            <Typography>{restaurant.name}</Typography>
                            <b>{bulletSymbol}</b>
                            <Link
                              target='_blank'
                              href={`http://${restaurant.webSite}`}>
                              {restaurant.webSite}
                            </Link>
                          </div>
                          <div className={classes.body}>
                            <Typography>{restaurant.description}</Typography>
                          </div>
                          <div className={classes.footer}>
                            <Typography color='primary'>
                              {restaurant.tags}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </ButtonBase>
                  <Divider />
                </>
              );
            })}
          </List>
        ) : (
          <h1>Loading</h1>
        )}
      </Grid>
      <Grid item xs={displayConfig.side} />
    </Grid>
  );
};

export default Restaurants;
