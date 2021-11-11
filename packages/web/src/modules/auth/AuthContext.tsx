import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContextProps = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      new URLSearchParams(window.location.search).get('token') ?? localStorage.getItem('token');

    if (token) {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
    const REDIRECT_URI = window.location.href + 'ata';
    const CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

    window.location.href = `${AUTHORIZE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=ata`;
  };

  const logout = () => {
    console.log('logout');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  );
};
