import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ProfileIcon from '@material-ui/icons/PersonOutlineOutlined';
import MapIcon from '@material-ui/icons/Map';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import CloseIcon from '@material-ui/icons/Close';

import SideDrawer from '../../../../components/Drawer';
import CustomizedListItem from '../../../../components/ListItem';
import SearchBar from '../../../../components/SearchBar';
import { MediaContext } from '../../../../common/context/mediaContext';
import { AuthContext } from '../../../../common/context/authContext';

const useSideMenuStyles = makeStyles(() => ({
  header: {
    padding: 20,
    textAlign: 'center',
    fontWeight: 700,
  },
  closeButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

interface SideMenuProps {
  show: boolean;
  onClose: () => void;
  drawerVariant: 'permanent' | 'persistent' | 'temporary' | undefined;
}

const SideMenu: React.FC<SideMenuProps> = ({
  show,
  onClose,
  drawerVariant,
}) => {
  const classes = useSideMenuStyles();
  const history = useHistory();
  const media = useContext(MediaContext);
  const auth = useContext(AuthContext);

  return (
    <SideDrawer drawerVariant={drawerVariant} show={show} onClose={onClose}>
      {drawerVariant === 'temporary' && (
        <div className={classes.closeButton}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      )}

      <List component='nav' aria-labelledby='side menu items'>
        {media.smSmallScreen && (
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
          onClick={() => {
            if (drawerVariant === 'temporary') {
              onClose();
            }
            history.push('/map');
          }}
        />

        {auth.isAuth && (
          <CustomizedListItem
            icon={<ProfileIcon />}
            text='Profile'
            onClick={() => {
              if (drawerVariant === 'temporary') {
                onClose();
              }
              history.push('/profile');
            }}
          />
        )}

        <CustomizedListItem
          icon={<RestaurantIcon />}
          text='Restaurants'
          onClick={() => {
            if (drawerVariant === 'temporary') {
              onClose();
            }
            history.push('/restaurants');
          }}
        />
      </List>
    </SideDrawer>
  );
};

export default SideMenu;
