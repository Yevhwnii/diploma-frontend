import React, { useState } from 'react';
import clsx from 'clsx';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Search from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useSearchBarStyles = makeStyles((theme) => ({
  searchBar: {
    padding: '5px 20px 20px 20px',
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
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ componentVariant, onClose }) => {
  const classes = useSearchBarStyles();
  const history = useHistory();
  const [focusClass, setFocusClass] = useState<string | undefined>();
  const [input, setInput] = useState<any>('');

  const handleFocus = () => {
    setFocusClass(classes.activeSearchBar);
  };

  const handleBlur = () => {
    setFocusClass(undefined);
  };

  const handleSearch = () => {
    history.push(`/restaurants/search?q=${input}`);
    onClose();
  };
  if (componentVariant === 'li') {
    return (
      <>
        <ListItem
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(classes.searchBar, focusClass)}>
          <Search
            value={input}
            onRequestSearch={handleSearch}
            onChange={(newValue) => setInput(newValue)}
            placeholder='Search...'
          />
        </ListItem>
        <Divider />
      </>
    );
  } else {
    return null;
  }
};

export default SearchBar;
