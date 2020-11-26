import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Layout from '../../../components/Layout';
import PaperLayout from '../../../components/PaperLayout';
import {
  MenuItem as MenuItemInterface,
  Meal as MealInterface,
  IRestaurant,
  RestrauntsApi,
} from '../../../common/api/restraurantsApi';

const useNewRestaurantStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    width: '100%',
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& p': {
      marginLeft: 30,
      fontSize: '1.3rem',
      fontWeight: 600,
    },
  },
  header__left: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  input: {
    marginBottom: 20,
  },
  inputGroup: {
    overflowY: 'auto',
    height: '100%',
    maxHeight: '100%',
    display: 'flex',
    padding: 7,
    marginTop: 15,
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    padding: 7,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealInput: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '& > div': {
      marginRight: 5,
    },
  },
}));

interface MealProps {
  menuItemIndex: number;
  mealIndex: number;
  reference: any;
}

const Meal: React.FC<MealProps> = ({ menuItemIndex, mealIndex, reference }) => {
  const classes = useNewRestaurantStyles();
  return (
    <div className={classes.mealInput}>
      <TextField
        name={`menu.category${menuItemIndex}.meal${mealIndex}.name`}
        type='text'
        fullWidth
        label='Name of the meal'
        variant='outlined'
        inputRef={reference({ required: true })}
      />
      <TextField
        name={`menu.category${menuItemIndex}.meal${mealIndex}.price`}
        type='number'
        fullWidth
        label='Price'
        variant='outlined'
        inputRef={reference({ required: true })}
      />
    </div>
  );
};

const generateMeal = (
  amount: number,
  menuItemIndex: number,
  reference: any
) => {
  const array = Array.from({ length: amount }, (_, index) => {
    return React.cloneElement(
      <Meal
        reference={reference}
        mealIndex={amount}
        menuItemIndex={menuItemIndex}
      />,
      { key: index }
    );
  });
  return array;
};

interface MenuItemProps {
  reference: any;
  mealsInitialAmount: number;
  menuItemIndex: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  reference,
  mealsInitialAmount,
  menuItemIndex,
}) => {
  const classes = useNewRestaurantStyles();
  const [mealsAmount, setMealsAmount] = useState(0);

  useEffect(() => {
    setMealsAmount(mealsInitialAmount);
  }, [mealsInitialAmount]);
  return (
    <div>
      <div className={classes.input}>
        <TextField
          name={`menu.category${menuItemIndex}.name`}
          type='text'
          fullWidth
          label='Category'
          variant='outlined'
          inputRef={reference({ required: true })}
        />
      </div>
      {generateMeal(mealsAmount, menuItemIndex, reference)}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5,
        }}>
        <Button
          style={{ margin: '5px 0px' }}
          onClick={() => setMealsAmount((prevState) => prevState + 1)}
          variant='contained'
          color='primary'>
          Add meal
        </Button>
      </div>
    </div>
  );
};

const generateMenuItem = (amount: number, register: any) => {
  const array = Array.from({ length: amount }, (_, index) => {
    return React.cloneElement(
      <MenuItem
        menuItemIndex={amount}
        reference={register}
        mealsInitialAmount={1}
      />,
      {
        key: index,
      }
    );
  });

  return array;
};

const AddRestaurant: React.FC = () => {
  const classes = useNewRestaurantStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm<IRestaurant>();

  const [menuItems, setMenuItems] = useState<any>([]);
  const [menuItemsAmount, setMenuItemsAmount] = useState(1);

  const onSubmit = async (data: IRestaurant) => {
    const items: MenuItemInterface[] = [];
    Object.values(data.menu).forEach((category: any) => {
      const categoryName = category.name;
      delete category.name;
      const menuItem: MenuItemInterface = {
        category: categoryName,
        meals: [...Object.values(category)] as MealInterface[],
      };
      items.push(menuItem);
    });

    const restaurant = {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      address: data.address,
      tags: data.tags,
      website: data.website,
      menu: {
        items,
      },
    };

    await RestrauntsApi.create(restaurant);
    history.push('/admin');
  };

  useEffect(() => {
    setMenuItems(generateMenuItem(menuItemsAmount, register));
  }, [menuItemsAmount, register]);

  return (
    <Layout>
      <PaperLayout styles={{ height: '90%' }}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.header}>
            <div className={classes.header__left}>
              <IconButton onClick={() => history.goBack()}>
                <BackIcon />
              </IconButton>
              <Typography>Add new restaurant</Typography>
            </div>
            <div>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'>
                Create
              </Button>
            </div>
          </div>
          <Divider />
          <div className={classes.inputGroup}>
            <div className={classes.input}>
              <TextField
                name='name'
                type='text'
                fullWidth
                label='Name of local'
                variant='outlined'
                inputRef={register({ required: true, minLength: 5 })}
              />
            </div>
            <div className={classes.input}>
              <TextField
                name='description'
                type='text'
                fullWidth
                label='Short description'
                variant='outlined'
                inputRef={register({ required: true, minLength: 5 })}
              />
            </div>
            <div className={classes.input}>
              <TextField
                name='imageUrl'
                type='text'
                fullWidth
                label='Image URL'
                variant='outlined'
                inputRef={register({ required: true, minLength: 5 })}
              />
            </div>
            <div className={classes.input}>
              <TextField
                name='address'
                type='text'
                fullWidth
                label='Address of local'
                variant='outlined'
                inputRef={register({ required: true, minLength: 5 })}
              />
            </div>
            <div className={classes.input}>
              <TextField
                name='website'
                type='text'
                fullWidth
                label='Link to webpage'
                variant='outlined'
                inputRef={register({ required: true, minLength: 5 })}
              />
            </div>
            <div className={classes.input}>
              <TextField
                name='tags'
                type='text'
                fullWidth
                label='Tags (start with #)'
                variant='outlined'
                inputRef={register({ required: true, minLength: 5 })}
              />
            </div>

            <div>
              <Typography
                style={{
                  textAlign: 'center',
                  margin: '15px 0px',
                  fontSize: 24,
                  fontWeight: 700,
                }}>
                Menu
              </Typography>
              {menuItems}
            </div>
            <Button
              onClick={() => setMenuItemsAmount((prevState) => prevState + 1)}
              style={{ marginTop: 10 }}
              fullWidth
              variant='contained'
              color='primary'>
              Add menu item
            </Button>
          </div>
        </form>
      </PaperLayout>
    </Layout>
  );
};

export default AddRestaurant;
