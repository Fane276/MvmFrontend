import React, { createContext } from 'react';
import useAuth from '../../utils/auth/useAuth';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const {isAuthenticated, currentUser, isInitializingAuthentication} = useAuth()

  const value = {
    isAuthenticated, currentUser, isInitializingAuthentication
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export {AuthProvider, AuthContext};
