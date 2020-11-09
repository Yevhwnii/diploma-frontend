import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../../components/Layout';
import PaperLayout from '../../components/PaperLayout';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const use404Styles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  centirilize: {
    display: 'flex',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const PageNotFound = () => {
  const classes = use404Styles();
  const history = useHistory();

  return (
    <Layout>
      <PaperLayout>
        <div className={classes.root}>
          <div className={classes.centirilize}>
            <Typography variant='h3'>Page not found...</Typography>
          </div>
          <div className={classes.centirilize}>
            <Typography variant='body1'>
              Server responded with 404 status error code, requested page cannot
              be found :(
            </Typography>
          </div>
          <div className={classes.centirilize}>
            <Button
              onClick={() => history.push('/map')}
              variant='contained'
              color='primary'>
              Back to application
            </Button>
          </div>
        </div>
      </PaperLayout>
    </Layout>
  );
};

export default PageNotFound;
