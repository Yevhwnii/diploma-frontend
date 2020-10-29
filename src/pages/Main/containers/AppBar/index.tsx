import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLogo: {
    display: 'flex',
    alignItems: 'center',
  },
  headerLogout: {
    height: '100%',
    display: 'flex',
    width: '140px',
    alignItems: 'center',
    '& button': {
      height: '100%',
      width: '100%',

      borderRadius: 0,
      '& span': {
        fontSize: 18,
      },
    },
  },
}));

interface NavigationBarProps {
  onDrawerToggle: () => void;
  smSmallScreen: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  onDrawerToggle,
  smSmallScreen,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        style={{
          background:
            'linear-gradient(90deg, hsla(15, 63%, 47%, 1) 0%, hsla(13, 89%, 62%, 1) 48%, hsla(15, 63%, 47%, 1) 100%)',
        }}
        position='static'>
        <Toolbar className={classes.toolbar}>
          <div className={classes.headerLogo}>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={onDrawerToggle}
              edge='start'
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            {!smSmallScreen && (
              <Typography variant='h6' noWrap>
                Recommendation system
              </Typography>
            )}
          </div>
          <div className={classes.headerLogout}>
            <Button
              color='secondary'
              endIcon={<ExitToAppIcon style={{ fontSize: 20 }} />}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
