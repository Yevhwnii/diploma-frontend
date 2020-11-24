import axios from 'axios';

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  fullname: string;
  password: string;
}

export const authApi = {
  signIn: async (
    authCred: SignInCredentials
  ): Promise<{
    accessToken: string | undefined;
    errorMessage: string | undefined;
  }> => {
    try {
      const { username, password } = authCred;
      const response = await axios.post('http://localhost:4000/auth/signin', {
        username,
        password,
      });
      return {
        accessToken: response.data.accessToken,
        errorMessage: undefined,
      };
    } catch (error) {
      return {
        accessToken: undefined,
        errorMessage: 'Invalid credentials',
      };
    }
  },
  signUp: async (authCred: SignUpCredentials) => {
    try {
      const { username, fullname, password } = authCred;
      await axios.post('http://localhost:4000/auth/signup', {
        username,
        fullname,
        password,
      });
      return {
        isOk: true,
      };
    } catch (error) {
      return {
        isOk: false,
      };
    }
  },
};
