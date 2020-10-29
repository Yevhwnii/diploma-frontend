import React from 'react';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ProfileIcon from '@material-ui/icons/PersonOutlineOutlined';
import MapIcon from '@material-ui/icons/Map';
import RestaurantIcon from '@material-ui/icons/Restaurant';

import SideDrawer from '../../../../components/Drawer';
import CustomizedListItem from '../../../../components/ListItem';
import SearchBar from '../../../../components/SearchBar';

const useSideMenuStyles = makeStyles(() => ({
  header: {
    padding: 20,
    textAlign: 'center',
    fontWeight: 700,
  },
}));

interface SideMenuProps {
  show: boolean;
  onClose: () => void;
  drawerVariant: 'permanent' | 'persistent' | 'temporary' | undefined;
  smSmallScreen: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({
  show,
  onClose,
  drawerVariant,
  smSmallScreen,
}) => {
  const classes = useSideMenuStyles();

  return (
    <SideDrawer drawerVariant={drawerVariant} show={show} onClose={onClose}>
      <List component='nav' aria-labelledby='side menu items'>
        {smSmallScreen && (
          <>
            <Typography className={classes.header} variant='h6' noWrap>
              Recommendation system
            </Typography>
            <Divider />
          </>
        )}

        <SearchBar componentVariant='li' />

        <CustomizedListItem
          icon={<MapIcon />}
          text='Map'
          onClick={() => alert('Map')}
        />

        <CustomizedListItem
          icon={<ProfileIcon />}
          text='Profile'
          onClick={() => alert('Profile')}
        />

        <CustomizedListItem
          icon={<RestaurantIcon />}
          text='Restaurants'
          onClick={() => alert('Restaurants')}
        />
      </List>
    </SideDrawer>
  );
};

export default SideMenu;
