import 'animate.css';

import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { AuthContext } from '../components/Context/AuthContex';
import GlobalLoading from './GlobalLoading';

const LandingPage = () => {
  const {isAuthenticated, isLoading} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=>{
      if(!isLoading){
        if(isAuthenticated){
          navigate("/dashboard");
        }
        else{
          navigate('/login')
        }
      }
    },1000);
  }, [isLoading, isAuthenticated])
  
  return (
    <>
      <GlobalLoading/>
    </>
  )
}

export default LandingPage