import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';

import NavigationBar from './containers/AppBar';
import SideMenu from './containers/SideMenu';

const Main = () => {
  const [showSideMenu, setShowSideMenu] = useState<boolean>(true);

  const handleDrawerToogle = () => {
    setShowSideMenu(!showSideMenu);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <NavigationBar onDrawerToggle={handleDrawerToogle} />
      </Grid>
      <Grid container style={{ height: 'calc(100vh - 64px)' }} item xs={12}>
        <Grid style={showSideMenu ? {} : { display: 'none' }} item xs={2}>
          <SideMenu show={showSideMenu} />
        </Grid>
        <Grid item xs={showSideMenu ? 10 : 12}>
          <h1>Application</h1>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Main;
