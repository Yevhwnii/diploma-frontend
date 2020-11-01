import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CircularProgress />
    </div>
  );
};

export default Spinner;
