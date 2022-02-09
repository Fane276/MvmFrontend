import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import GlobalLoading from '../../pages/GlobalLoading';
import { AuthContext } from '../Context/AuthContex';

const NotAuthRoute = ({children}) => {
  const {isAuthenticated, isLoading} = useContext(AuthContext);

  
  if(isLoading){
   <GlobalLoading/>
  }

  return (
    !isLoading &&(
    !isAuthenticated ? children : (
      <Navigate to="/dashboard"
      />
    ) 
    )
  )
};

export default NotAuthRoute;
