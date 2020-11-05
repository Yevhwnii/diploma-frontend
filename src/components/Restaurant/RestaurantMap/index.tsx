import React from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { RestaurantProps } from '..';
import { grey } from '@material-ui/core/colors';

const useRestaurantMapStyles = makeStyles(() => ({
  listItem: {
    width: '100%',
    height: '100%',
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
  header: {
    display: 'flex',
    width: ' 100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    marginBottom: 7,
    '& p': {
      fontSize: '1rem',

      fontWeight: 600,
    },
    '& a': {
      fontSize: '0.8rem',
      textDecoration: 'underline',
    },
  },
  body: {
    marginBottom: 10,
    textAlign: 'center',
    '& p': {
      color: grey[600],
      fontSize: '0.8rem',
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'end',
    width: '100%',
    justifyContent: 'center',
    '& p': {
      fontSize: '0.8rem',
    },
  },
}));

const RestaurantMapMobile: React.FC<RestaurantProps> = ({ restaurant }) => {
  const history = useHistory();
  const classes = useRestaurantMapStyles();
  return (
    <ButtonBase
      onClick={() => history.push(`/restaurants/${restaurant.id}`)}
      style={{ height: '16.6666%' }}
      centerRipple>
      <ListItem className={classes.listItem}>
        <Grid container spacing={3}>
          <div className={classes.avatar}>
            <Avatar alt={restaurant.name} src={restaurant.imageUrl} />
          </div>
          <div className={classes.header}>
            <Typography>{restaurant.name}</Typography>
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
      </ListItem>
    </ButtonBase>
  );
};

export default RestaurantMapMobile;
