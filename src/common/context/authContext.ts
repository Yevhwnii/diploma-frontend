import { createContext } from 'react';

export interface IAuth {
  isAuth: boolean;
  username: string;
  fullname: string;
  about: string;
  showSignInModal: boolean;
  toogleSignInModal: () => void;
  login: () => void;
  logout: () => void;
}

const initialState: IAuth = {
  isAuth: false,
  username: '',
  fullname: '',
  about: '',
  showSignInModal: false,
  toogleSignInModal: () => {},
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);
