import { createContext, ReactNode, useEffect, useState } from 'react';
import { getToken } from './AuthToken';

type AuthContextProps = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    const loginURI = 'http://localhost:3000/auth/signup?redirect_uri=' + window.location.href;
    window.location.href = loginURI;
  };

  const logout = () => {
    console.log('logout');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  );
};
