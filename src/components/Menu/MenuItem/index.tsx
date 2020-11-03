import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useMenuItemStyles = makeStyles(() => ({
  category: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  category_header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    '& p': {
      fontSize: 24,
      fontWeight: 600,
    },
  },
  menuList: {
    width: '100%',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 0,
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  menuItem_name: {
    width: '80%',
    height: '100%',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    '& p': {
      fontWeight: 300,
    },
  },
  menuItem_price: {
    '& p': {
      fontWeight: 600,
    },
  },
}));

interface MenuItemProps {
  name: string;
  price: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price }) => {
  const classes = useMenuItemStyles();
  return (
    <ListItem className={classes.menuItem}>
      <div className={classes.menuItem_name}>
        <Typography>{name}</Typography>
      </div>
      <div className={classes.menuItem_price}>
        <Typography>{price} zl.</Typography>
      </div>
    </ListItem>
  );
};

interface CategoryProps {
  name: string;
  items: any[];
}

export const Category: React.FC<CategoryProps> = ({ name, items }) => {
  const classes = useMenuItemStyles();
  return (
    <ListItem className={classes.category}>
      <div className={classes.category_header}>
        <Typography>{name}</Typography>
      </div>
      <List className={classes.menuList}>
        {items.map((item) => {
          return <MenuItem name={item.name} price={item.price} />;
        })}
      </List>
    </ListItem>
  );
};

export default MenuItem;
