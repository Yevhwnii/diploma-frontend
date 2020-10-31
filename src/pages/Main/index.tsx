import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import NavigationBar from './containers/AppBar';
import SideMenu from './containers/SideMenu';
import Restaurants from '../Restaurants';

const Main: React.FC = () => {
  const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
  const [sideMenuStyles, setSideMenuStyles] = useState({});
  const theme = useTheme();
  const mdSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const smSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const xsSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

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
        <NavigationBar
          smSmallScreen={smSmallScreen}
          onDrawerToggle={handleDrawerToogle}
        />
      </Grid>
      <Grid container style={{ height: 'calc(100vh - 64px)' }} item xs={12}>
        <Grid style={sideMenuStyles} item xs={2}>
          <SideMenu
            drawerVariant={mdSmallScreen ? 'temporary' : 'persistent'}
            smSmallScreen={smSmallScreen}
            show={showSideMenu}
            onClose={handleDrawerToogle}
          />
        </Grid>
        <Grid item xs={showSideMenu ? 10 : 12}>
          <Switch>
            <Route path='/restaurants' exact>
              <Restaurants
                mdScreen={mdSmallScreen}
                smallScreen={xsSmallScreen}
              />
            </Route>
            s
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
