import { createContext } from 'react';
import { SignInCredentials, SignUpCredentials } from '../api/authApi';

export interface IAuth {
  isAuth: boolean;
  about: string;
  authErrorMessage: string | null;
  showSignInModal: boolean;
  toogleSignInModal: () => void;
  login: (authCred: SignInCredentials) => Promise<{ isOk: boolean }>;
  signUp: (authCred: SignUpCredentials) => Promise<{ isOk: boolean }>;
  logout: () => void;
}

const initialState: IAuth = {
  isAuth: false,
  authErrorMessage: null,
  about: '',
  showSignInModal: false,
  toogleSignInModal: () => {},
  login: async () => {
    return { isOk: false };
  },
  signUp: async () => {
    return { isOk: false };
  },
  logout: () => {
    return {};
  },
};

export const AuthContext = createContext(initialState);
