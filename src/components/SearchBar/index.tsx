import React, { useState } from 'react';
import clsx from 'clsx';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Search from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/core/styles';

const useSearchBarStyles = makeStyles((theme) => ({
  searchBar: {
    padding: '15px 5px',
    '& > div': {
      borderRadius: 15,
      transition: 'border .3s ease',
      width: '100%',
      border: '1px solid ' + theme.palette.secondary.dark,
    },
  },
  activeSearchBar: {
    '& > div': {
      border: '1px solid ' + theme.palette.primary.main,
    },
  },
}));

interface SearchBarProps {
  componentVariant: 'li';
}

const SearchBar: React.FC<SearchBarProps> = ({ componentVariant }) => {
  const classes = useSearchBarStyles();
  const [focusClass, setFocusClass] = useState<string | undefined>();

  const handleFocus = () => {
    setFocusClass(classes.activeSearchBar);
  };

  const handleBlur = () => {
    setFocusClass(undefined);
  };
  if (componentVariant === 'li') {
    return (
      <>
        <ListItem
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(classes.searchBar, focusClass)}>
          <Search placeholder='Search...' />
        </ListItem>
        <Divider />
      </>
    );
  } else {
    return null;
  }
};

export default SearchBar;
