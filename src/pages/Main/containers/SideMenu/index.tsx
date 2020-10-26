import React from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
  drawer: {
    width: '100%',
    height: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
    position: 'relative',
  },
  hide: {
    transform: 'translateX(100%)',
  },
}));

interface SideMenuProps {
  show: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ show }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={clsx(classes.drawer, {
        [classes.hide]: !show,
      })}
      variant='persistent'
      anchor='left'
      open={show}
      classes={{
        paper: classes.drawerPaper,
      }}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MenuIcon /> : <MenuIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <MenuIcon /> : <MenuIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
