import React, { useContext, useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import { MediaContext } from '../../common/context/mediaContext';

interface LayoutProps {
  children: React.ReactNode;
}

interface IDisplayConfig {
  side: boolean | 1 | 2;
  main: 8 | 10 | 12;
}

// Layout component for main part of application
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [displayConfig, setDisplayConfig] = useState<IDisplayConfig>({
    side: 2,
    main: 8,
  });

  const media = useContext(MediaContext);

  useEffect(() => {
    if (media.xsSmallScreen) {
      setDisplayConfig({
        side: false,
        main: 12,
      });
    } else if (media.mdSmallScreen) {
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
  }, [media]);

  return (
    <Grid
      container
      style={{
        height: '100%',
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'hidden',
      }}>
      <Grid item xs={displayConfig.side} />
      <Grid item xs={displayConfig.main}>
        {children}
      </Grid>
      <Grid item xs={displayConfig.side} />
    </Grid>
  );
};

export default Layout;
