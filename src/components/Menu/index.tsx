import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Category } from './MenuItem';
import { IRestaurant } from '../../common/api/restraurantsApi';
import { IMedia, MediaContext } from '../../common/context/mediaContext';
import ModalPopUp from '../ModalPopUp';

const useMenuStyles = makeStyles((theme) => ({
  paper: (props: IMedia) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: props.xsSmallScreen ? 350 : 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid ' + theme.palette.primary.main,
    '&:focus': {
      outline: 'none',
    },
  }),
  container: {
    overflowY: 'scroll',
    height: '500px',
    padding: 10,
  },
  header: {
    width: '100%',
    height: '20%',
    display: 'flex',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    '& p': {
      fontSize: 22,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
}));

interface MenuProps {
  show: boolean;
  onClose: () => void;
  restaurant: IRestaurant | null | undefined;
}

const Menu: React.FC<MenuProps> = ({ show, onClose, restaurant }) => {
  const media = useContext(MediaContext);
  const classes = useMenuStyles(media);

  return (
    <ModalPopUp open={show} onClose={onClose}>
      <div className={classes.paper}>
        <div className={classes.header}>
          <Typography>Menu List</Typography>
        </div>
        <div className={classes.container}>
          {restaurant?.menu?.items.map((category) => {
            return (
              <Category name={category.category} items={category.menuItems} />
            );
          })}
        </div>
        <div className={classes.actions}>
          <Button onClick={onClose} color='primary' variant='contained'>
            Close Menu
          </Button>
        </div>
      </div>
    </ModalPopUp>
  );
};

export default Menu;
