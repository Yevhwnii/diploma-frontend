import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

import { IRestaurant } from '../../../common/api/restraurantsApi';
import { useHistory } from 'react-router-dom';

interface AdminRestaurantProps {
  restaurant: IRestaurant;
  onDelete: (id: string, index: number) => void;
  restaurantIndex: number;
}

const AdminRestaurant: React.FC<AdminRestaurantProps> = ({
  restaurant,
  onDelete,
  restaurantIndex,
}) => {
  const history = useHistory();

  return (
    <ListItem
      onClick={() => history.push(`/restaurants/${restaurant._id}`)}
      button>
      <ListItemText primary={restaurant.name} secondary={restaurant.address} />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onDelete(restaurant._id, restaurantIndex)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default AdminRestaurant;
