import { createContext } from 'react';

export interface IAuth {
  isAuth: boolean;
  username: string;
  fullname: string;
  about: string;
}

const initialState: IAuth = {
  isAuth: false,
  username: '',
  fullname: '',
  about: '',
};

export const AuthContext = createContext(initialState);
