import React, { useCallback, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import Main from './pages/Main';
import { MediaContext } from './common/context/mediaContext';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AuthContext } from './common/context/authContext';
import { IUser, UserContext } from './common/context/userContext';
import {
  authApi,
  SignInCredentials,
  SignUpCredentials,
} from './common/api/authApi';

function App() {
  const theme = useTheme();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState('');
  const [userObject, setUserObject] = useState<IUser>();

  const handleSingInFormToogle = useCallback(() => {
    setShowSignInForm(!showSignInForm);
  }, [showSignInForm]);

  const login = useCallback(async (authCred: SignInCredentials) => {
    const response = await authApi.signIn(authCred);
    if (response.errorMessage) {
      setAuthErrorMessage(response.errorMessage);
      return { isOk: false };
    } else {
      const accessToken = response.accessToken;
      localStorage.setItem('tid', accessToken!);
      setAuthErrorMessage('');
      setIsAuth(true);
      return { isOk: true };
    }
  }, []);

  const assignUser = (user: IUser) => {
    const { username, fullname, isAdmin } = user;
    setUserObject({
      username,
      fullname,
      isAdmin,
    });
  };

  const signUp = useCallback(async (authCred: SignUpCredentials) => {
    const response = await authApi.signUp(authCred);
    if (response.isOk) {
      setAuthErrorMessage('');
      return response;
    } else {
      setAuthErrorMessage('Invalid credentials provided during sign up');
      return response;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('tid');
    setIsAuth(false);
  }, []);

  useEffect(() => {
    // Auto login
    const token = localStorage.getItem('tid');
    if (token) {
      const userData: {
        exp: number;
        username: string;
        fullname: string;
        isAdmin?: boolean;
      } = jwt_decode(token);
      const date = new Date(0);
      date.setUTCSeconds(userData.exp);
      if (new Date() > date) {
        logout();
      } else {
        const { username, fullname, isAdmin } = userData;
        assignUser({
          username,
          fullname,
          isAdmin,
        });
        setIsAuth(true);
      }
    } else {
      setIsAuth(false);
    }
  }, [logout, authErrorMessage]);
  return (
    <div className='App'>
      <AuthContext.Provider
        value={{
          isAuth: isAuth,
          authErrorMessage: authErrorMessage,
          showSignInModal: showSignInForm,
          about: 'Welcome to Recommendation System for Restaurants',
          toogleSignInModal: handleSingInFormToogle,
          login: login,
          signUp: signUp,
          logout: logout,
        }}>
        <UserContext.Provider
          value={{
            username: userObject?.username || '',
            fullname: userObject?.fullname || '',
            isAdmin: userObject?.isAdmin || false,
          }}>
          <MediaContext.Provider
            value={{
              mdSmallScreen: useMediaQuery(theme.breakpoints.down('md')),
              smSmallScreen: useMediaQuery(theme.breakpoints.down('sm')),
              xsSmallScreen: useMediaQuery(theme.breakpoints.down('xs')),
            }}>
            <Main />
          </MediaContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
