import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import Permission from '../../lib/permissionsConst';
import GlobalLoading from '../../pages/GlobalLoading';
import { AuthContext } from '../Context/AuthContex';

const NotAuthRoute = ({children}) => {
  const {isAuthenticated, isLoading, permissions} = useContext(AuthContext);
  const [hasAdminPermission, setHasAdminPermission] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!isLoading && isAuthenticated){
      if(permissions){
        if(permissions.find((perm)=>perm.name === Permission.usersPages)){
          setHasAdminPermission(true);
          navigate("/DashboardAdmin");
        }
        else{
          setHasAdminPermission(false);
        }
      }
    }
  }, [isLoading, isAuthenticated, permissions, navigate])

  return (
    !isLoading?(
    !isAuthenticated ? children : 
    (
      hasAdminPermission?
      <Navigate to="/dashboardAdmin"/>
      :
      <Navigate to="/dashboard"/>
    ) 
    )
    :
    <GlobalLoading/>
  )
};

export default NotAuthRoute;
