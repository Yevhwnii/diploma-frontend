import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import { IRestaurant } from '../../common/api/restraurantsApi';
import { bulletSymbol } from '../../common/symbols';
import { MediaContext } from '../../common/context/mediaContext';

interface RestaurantStyleProps {
  mdScreen: boolean;
  smallScreen: boolean;
}

const useRestaurantStyles = makeStyles(() => ({
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
      maxHeight: 100,
      height: 'auto',
    },
  },
  header: (props: RestaurantStyleProps) => ({
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
  body: (props: RestaurantStyleProps) => ({
    marginBottom: 10,
    '& p': {
      color: grey[600],
      fontSize: props.smallScreen ? '0.7rem' : '0.9rem',
    },
  }),
  footer: (props: RestaurantStyleProps) => ({
    display: props.smallScreen ? 'none' : 'flex',
    alignItems: 'end',
    '& p': {
      fontSize: props.smallScreen ? '0.5rem' : '0.8rem',
    },
  }),
}));

interface RestaurantProps {
  restaurant: IRestaurant;
}

const Restaurant: React.FC<RestaurantProps> = ({ restaurant }) => {
  const media = useContext(MediaContext);
  const history = useHistory();
  const classes = useRestaurantStyles({
    mdScreen: media.mdSmallScreen,
    smallScreen: media.xsSmallScreen,
  });
  return (
    <>
      <ButtonBase
        onClick={() => history.push(`/restaurants/${restaurant.id}`)}
        style={{ height: '16.6666%' }}
        centerRipple>
        <ListItem className={classes.listItem}>
          <Grid container spacing={3}>
            <Grid className={classes.avatar} item xs={3}>
              <Avatar alt={restaurant.name} src={restaurant.imageUrl} />
            </Grid>
            <Grid item xs={9} container direction='column'>
              <div className={classes.header}>
                <Typography>{restaurant.name}</Typography>
                <b>{bulletSymbol}</b>
                <Link target='_blank' href={`http://${restaurant.webSite}`}>
                  {restaurant.webSite}
                </Link>
              </div>
              <div className={classes.body}>
                <Typography>{restaurant.description}</Typography>
              </div>
              <div className={classes.footer}>
                <Typography color='primary'>{restaurant.tags}</Typography>
              </div>
            </Grid>
          </Grid>
        </ListItem>
      </ButtonBase>
      <Divider />
    </>
  );
};

export default Restaurant;
