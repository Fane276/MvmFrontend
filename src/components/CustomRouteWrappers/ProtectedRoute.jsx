import React, {useContext, useEffect, useState} from 'react';
import { Navigate } from 'react-router';
import GlobalLoading from '../../pages/GlobalLoading';
import { AuthContext } from '../Context/AuthContex';
import AppLayoutNotAuth from '../Layout/AppLayoutNotAuth';
import NotAuthorized from '../Layout/NotAuthorized';

const ProtectedRoute = ({children, requestPermission}) => {
  const {isAuthenticated, isLoading, permissions} = useContext(AuthContext);
  const [hasPermission, setHasPermission] = useState(false);
  
  useEffect(() => {
    const asyncExecutor = async ()=>{
      if(requestPermission){
        if(permissions.find((perm)=>perm.name === requestPermission)){
          setHasPermission(true);
        }
        else{
          setHasPermission(false);
        }
      }
    }
    asyncExecutor();
  }, [requestPermission, permissions])
  

  if(isLoading){
   <GlobalLoading/>
  }

  return (
    !isLoading &&(
    isAuthenticated ? 
      (
        requestPermission ? (
          hasPermission ? children
          :
          <AppLayoutNotAuth><NotAuthorized/></AppLayoutNotAuth>
        )
        :
        children
      )
      : (
      <Navigate to="/login"
      />
    ) 
    )
  )
};

export default ProtectedRoute;
