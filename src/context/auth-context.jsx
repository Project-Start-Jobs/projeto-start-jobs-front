import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  isAuthenticated,
  removeLocalStorage,
  setLocalStorage,
} from '../utils/local-storage';
import { decodeJwt } from '../utils/decode-jwt';


const AuthContext = createContext(undefined);

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] = useState(isAuthenticated());

  const logged = (token) => {
    setLocalStorage('token', token);

    const decoded = decodeJwt(token);
    setUser({
      token: token,
      user: decoded.nome || decoded.name || '',
      id: decoded.idUsuario,
    });
   
  };

  const logout = () => {
    setLocalStorage('token', null);
    // removeLocalStorage('welcomeShown');
    setUser(null);
  };

  useEffect(() => {
    const authUser = isAuthenticated();
    
    if (!authUser) {
      logout(); 
      return;
    }
  
  }, []);

  return (
    <AuthContext.Provider value={{ user, logged, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
