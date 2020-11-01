import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import NavigationBar from './containers/AppBar';
import SideMenu from './containers/SideMenu';
import Restaurants from '../Restaurants';
import { MediaContext } from '../../common/context/mediaContext';
import SingleRestaurant from '../SingleRestaurant';

const Main: React.FC = () => {
  const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
  const [sideMenuStyles, setSideMenuStyles] = useState({});
  const media = useContext(MediaContext);
  const mdSmallScreen = media.mdSmallScreen;

  // If viewport is less than 950px, side menu automatically closes
  useEffect(() => {
    if (mdSmallScreen) {
      setShowSideMenu(false);
    } else {
      setShowSideMenu(true);
    }
  }, [mdSmallScreen]);

  // If viewport is less than 950px and user clicks on menu toggle, side menu becomes with position absolute and goes over main application
  useEffect(() => {
    if (!showSideMenu || (mdSmallScreen && showSideMenu)) {
      setSideMenuStyles({
        position: 'absolute',
        height: '100%',
      });
    } else {
      setSideMenuStyles({});
    }
  }, [mdSmallScreen, showSideMenu]);

  const handleDrawerToogle = () => {
    setShowSideMenu(!showSideMenu);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <NavigationBar onDrawerToggle={handleDrawerToogle} />
      </Grid>
      <Grid container style={{ height: 'calc(100vh - 64px)' }} item xs={12}>
        <Grid style={sideMenuStyles} item xs={2}>
          <SideMenu
            drawerVariant={mdSmallScreen ? 'temporary' : 'persistent'}
            show={showSideMenu}
            onClose={handleDrawerToogle}
          />
        </Grid>
        <Grid item xs={showSideMenu ? 10 : 12}>
          <Switch>
            <Route path='/restaurants' exact>
              <Restaurants />
            </Route>
            <Route path='/restaurants/:id'>
              <SingleRestaurant />
            </Route>

            <Route path='/'>
              <h1>Application</h1>
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
