import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import GlobalLoading from '../../pages/GlobalLoading';
import { AuthContext } from '../Context/AuthContex';

const NotAuthRoute = ({children}) => {
  const {isAuthenticated, isInitializingAuthentication} = useContext(AuthContext);

  if(isInitializingAuthentication){
   <GlobalLoading/>
  }

  return (
    !isAuthenticated ? children: (
      <Navigate to="/dashboard"
      />
    )
  )
};

export default NotAuthRoute;
