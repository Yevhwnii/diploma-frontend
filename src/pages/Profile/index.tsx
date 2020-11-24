import React, { useContext } from 'react';

import Layout from '../../components/Layout';
import PaperLayout from '../../components/PaperLayout';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { AuthContext } from '../../common/context/authContext';
import { UserContext } from '../../common/context/userContext';

const useProfileStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
  },
  information: {
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    '& h5': {
      fontWeight: 700,
      marginBottom: 7,
    },
    '& p': {
      fontWeight: 400,
      color: grey[400],
    },
  },
  aboutMe: {
    display: 'flex',
    flexDirection: 'column',
    height: '70%',
    padding: 7,
    textAlign: 'center',
    '& p': {
      color: grey[600],
      fontWeight: 400,
    },
  },
}));

const Profile = () => {
  const classes = useProfileStyles();
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);

  return (
    <Layout>
      <PaperLayout styles={{ height: '40%' }}>
        <div className={classes.root}>
          <div className={classes.information}>
            <Typography variant='h5'>{user.fullname}</Typography>
            <Typography variant='body1'>@{user.username}</Typography>
          </div>
          <div className={classes.aboutMe}>
            <Typography variant='body1'>{auth.about}</Typography>
          </div>
        </div>
      </PaperLayout>
    </Layout>
  );
};

export default Profile;
