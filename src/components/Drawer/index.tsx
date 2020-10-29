import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  drawer: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
    position: 'relative',
  },
}));

interface SideDrawerProps {
  children: React.ReactNode;
  show: boolean;
  onClose?: () => void;
  drawerVariant: 'permanent' | 'persistent' | 'temporary' | undefined;
}

const SideDrawer: React.FC<SideDrawerProps> = ({
  children,
  show,
  onClose,
  drawerVariant,
}) => {
  const classes = useStyles();

  return (
    <nav className={classes.root} aria-label='side menu'>
      <Drawer
        onClose={onClose}
        className={classes.drawer}
        variant={drawerVariant}
        anchor='left'
        transitionDuration={{ enter: 200, exit: 70 }}
        open={show}
        classes={{
          paper: classes.drawerPaper,
        }}>
        {children}
      </Drawer>
    </nav>
  );
};

export default SideDrawer;
