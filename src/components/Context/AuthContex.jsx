import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../utils/auth/useAuth';

const AuthContext = createContext({
  isAuthenticated:false,
  currentUser: null,
  currentTenant: null,
  isLoading: true,
  permissions: []
});

const AuthProvider = ({children}) => {

  useAuth();
  const value = useSelector((state)=>state.user.value);
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export {AuthProvider, AuthContext};
