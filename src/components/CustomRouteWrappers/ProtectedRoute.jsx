import React, {useContext} from 'react';
import { Navigate } from 'react-router';
import GlobalLoading from '../../pages/GlobalLoading';
import { AuthContext } from '../Context/AuthContex';

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, isLoading} = useContext(AuthContext);
  
  if(isLoading){
   <GlobalLoading/>
  }

  return (
    !isLoading &&(
    isAuthenticated ? children: (
      <Navigate to="/login"
      />
    ) 
    )
  )
};

export default ProtectedRoute;
