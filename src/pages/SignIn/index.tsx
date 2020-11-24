import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';

import ModalPopUp from '../../components/ModalPopUp';
import ModalPaper from '../../components/ModalPopUp/ModalPaper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import { AuthContext } from '../../common/context/authContext';

const useSignInStyles = makeStyles((theme) => ({
  header: {
    height: 56,
    display: 'flex',
    color: '',
    backgroundColor: theme.palette.primary.main,
    alignItems: 'center',
    padding: 7,
    marginBottom: 15,
    '& p': {
      fontWeight: 700,
      fontSize: 20,
    },
  },
  form: {
    display: 'flex',
    padding: 7,
    // height: 270,
    flexDirection: 'column',
  },
  input: {
    marginBottom: 20,
  },
  actions: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      marginRight: 10,
    },
  },
  errors: {
    textAlign: 'center',
    margin: '7px 0px',
    '& p': {
      color: red[500],
      fontSize: 14,
    },
  },
  textButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  switch: {
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      fontSize: 14,
    },
    '& button': {
      height: 20,
      padding: 0,
      lineHeight: 1.1,
      fontSize: 14,
    },
  },
}));

interface FormData {
  username: string;
  password: string;
  fullname?: string;
}

interface SignInProps {
  open: boolean;
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ open, onClose }) => {
  const classes = useSignInStyles();
  const auth = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [signInMode, setsignInMode] = useState<boolean>(true);

  const onSubmit = async (data: FormData) => {
    if (signInMode) {
      const { isOk } = await auth.login({
        username: data.username,
        password: data.password,
      });
      if (isOk) {
        onClose();
      }
    } else {
      console.log('Sign Up', data);
      const { isOk } = await auth.signUp({
        username: data.username,
        fullname: data.fullname!,
        password: data.password,
      });

      if (isOk) {
        const response = await auth.login({
          username: data.username,
          password: data.password,
        });
        if (response.isOk) {
          onClose();
        }
      }
    }
  };

  return (
    <ModalPopUp open={open} onClose={onClose}>
      <ModalPaper>
        <div className={classes.header}>
          <Typography color='secondary'>
            {signInMode ? 'Sign In' : 'Sign Up'}
          </Typography>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.input}>
            <TextField
              name='username'
              type='text'
              fullWidth
              label='Username'
              variant='outlined'
              inputRef={register({ required: true, minLength: 5 })}
            />
          </div>
          {!signInMode && (
            <div className={classes.input}>
              <TextField
                name='fullname'
                type='text'
                fullWidth
                label='Full name'
                variant='outlined'
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 6,
                    message: 'Full name has to be at least 6 characters',
                  },
                })}
              />
            </div>
          )}
          <div className={classes.input}>
            <TextField
              name='password'
              type='password'
              fullWidth
              label='Password'
              variant='outlined'
              inputRef={register({ required: true, minLength: 6 })}
            />
          </div>
          <div className={classes.errors}>
            {errors.username || errors.password || errors.fullname ? (
              <Typography>
                Invalid data provided (password {!signInMode && 'and fullname'}{' '}
                should contain at least 6 char.){' '}
              </Typography>
            ) : null}
            {auth.authErrorMessage && (
              <Typography>Invalid credentials</Typography>
            )}
          </div>
          <div className={classes.actions}>
            <Button type='submit' variant='contained' color='primary'>
              Confirm
            </Button>
            <Button
              onClick={() => onClose()}
              variant='outlined'
              color='primary'>
              Cancel
            </Button>
          </div>
          <div className={classes.switch}>
            <Typography>
              Or switch to{' '}
              <Button
                onClick={() => setsignInMode(!signInMode)}
                className={classes.textButton}
                disableElevation
                disableTouchRipple
                disableRipple>
                {signInMode ? 'sign up' : 'sign in'}
              </Button>
            </Typography>
          </div>
        </form>
      </ModalPaper>
    </ModalPopUp>
  );
};

export default SignIn;
