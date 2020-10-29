import React from 'react';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useListItemStyles = makeStyles(() => ({
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    '& svg': {
      fontSize: 30,
      color: 'rgb(195, 82, 44)',
    },
    '& span': {
      fontSize: 18,
      fontWeight: 600,
    },
  },
}));

interface ListItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const CustomizedListItem: React.FC<ListItemProps> = ({
  icon,
  text,
  onClick,
}) => {
  const classes = useListItemStyles();
  const theme = useTheme();

  return (
    <>
      <ListItem
        className={classes.listItem}
        button
        TouchRippleProps={{ style: { color: theme.palette.primary.main } }}
        onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
      <Divider />
    </>
  );
};

export default CustomizedListItem;
