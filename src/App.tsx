import React, { useCallback, useState } from 'react';

import Main from './pages/Main';
import { MediaContext } from './common/context/mediaContext';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AuthContext } from './common/context/authContext';

function App() {
  const theme = useTheme();
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const handleSingInFormToogle = useCallback(() => {
    setShowSignInForm(!showSignInForm);
  }, [showSignInForm]);

  const login = useCallback(() => {
    setIsAuth(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuth(false);
  }, []);
  return (
    <div className='App'>
      <AuthContext.Provider
        value={{
          isAuth: isAuth,
          showSignInModal: showSignInForm,
          about: 'I love sneaky beaky like ghost',
          fullname: 'Yevhenii Breiter',
          username: 'Mirandoo',
          toogleSignInModal: handleSingInFormToogle,
          login: login,
          logout: logout,
        }}>
        <MediaContext.Provider
          value={{
            mdSmallScreen: useMediaQuery(theme.breakpoints.down('md')),
            smSmallScreen: useMediaQuery(theme.breakpoints.down('sm')),
            xsSmallScreen: useMediaQuery(theme.breakpoints.down('xs')),
          }}>
          <Main />
        </MediaContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
