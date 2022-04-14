import 'animate.css';

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../components/Context/AuthContex';
import Permission from '../lib/permissionsConst';
import GlobalLoading from './GlobalLoading';

const LandingPage = () => {
  const {isAuthenticated, isLoading, permissions} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=>{
      if(!isLoading){
        if(isAuthenticated){
          if(permissions){
            if(permissions.find((perm)=>perm.name === Permission.usersPages)){
              navigate("/DashboardAdmin");
            }
            else
            {
              navigate("/dashboard");
            }
          }
          else{
            navigate("/dashboard");
          }
        }
        else{
          navigate('/login')
        }
      }
    },1000);
  }, [isLoading, isAuthenticated, navigate, permissions])
  
  return (
    <>
      <GlobalLoading/>
    </>
  )
}

export default LandingPage