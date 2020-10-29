// @ts-nocheck

import { createMuiTheme } from '@material-ui/core';
import { red, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Robot',
      'Ubuntu',
      'Helvetica Neue',
      'sans-serif',
    ],
  },
  palette: {
    primary: {
      main: '#f08080',
      dark: 'rgb(26, 145, 218)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f7f8fa',
      dark: grey[700],
    },

    error: {
      main: red.A400,
    },
    background: {
      default: '#f7f8fa',
    },
    // All text on the website
    text: {
      primary: '#14171a',
    },
  },
  shadows: [],
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 30,
        textTransform: 'none',
        fontSize: 16,
        height: 40,
        fontWeight: 700,
      },
    },
    MuiDrawer: {
      paper: {
        backgroundColor: '#f7f8fa',
      },
    },
    MuiFilledInput: {
      underline: {
        '&:after': {
          borderBottomWidth: '2px',
        },
        '&:before': {
          borderColor: '#000',
          borderBottomWidth: '2px',
        },
      },
      input: {
        backgroundColor: 'rgb(245, 248, 250)',
      },
    },
    MuiSvgIcon: {
      colorSecondary: {
        color: grey[500],
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 15,
        width: '38%',
        minWidth: 350,
      },
    },
    MuiDialogActions: {
      root: {
        marginBottom: 8,
      },
    },
    MuiDialogTitle: {
      root: {
        borderBottom: '1px solid rgb(204, 214, 221)',
        marginBottom: 10,
        padding: '10px 15px',
        '& h2': {
          display: 'flex',
          alignItems: 'center',
          fontWeight: 800,
        },
        '& button': {
          padding: 8,
          marginRight: 20,
        },
      },
    },
    MuiIconButton: {
      root: {
        borderRadius: 25,
      },
      colorSecondary: {
        backgroundColor: grey[500],
      },
    },
  },
});

export default theme;
