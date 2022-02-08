import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Flex } from '@chakra-ui/react';
import useAuth from '../utils/auth/useAuth';

const GlobalLoading = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();


  // useEffect(() => {
  //   if(isAuthenticated){
  //     navigate('/dashboard');
  //   }
  //   else{
  //     navigate('/login');
  //   }
    
  // }, [isAuthenticated, navigate]);
  
  return (<Flex>Loading...</Flex>)
};

export default GlobalLoading;
