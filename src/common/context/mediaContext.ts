import { createContext } from 'react';

export interface IMedia {
  mdSmallScreen: boolean;
  smSmallScreen: boolean;
  xsSmallScreen: boolean;
}

const initialState: IMedia = {
  mdSmallScreen: false,
  smSmallScreen: false,
  xsSmallScreen: false,
};
export const MediaContext = createContext(initialState);
