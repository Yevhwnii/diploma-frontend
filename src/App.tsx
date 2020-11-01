import React from 'react';

import Main from './pages/Main';
import { MediaContext } from './common/context/mediaContext';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function App() {
  const theme = useTheme();
  return (
    <div className='App'>
      <MediaContext.Provider
        value={{
          mdSmallScreen: useMediaQuery(theme.breakpoints.down('md')),
          smSmallScreen: useMediaQuery(theme.breakpoints.down('sm')),
          xsSmallScreen: useMediaQuery(theme.breakpoints.down('xs')),
        }}>
        <Main />
      </MediaContext.Provider>
    </div>
  );
}

export default App;
