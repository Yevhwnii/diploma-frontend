import { createContext } from 'react';

export interface IUser {
  username: string;
  fullname: string;
  isAdmin?: boolean;
}

const initialState: IUser = {
  username: '',
  fullname: '',
  isAdmin: false,
};
export const UserContext = createContext(initialState);
