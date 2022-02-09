import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { httpRequestAuthenticated } from '../../services/httpService';
import { login } from '../../state/user/userSlice';
import useAuth from '../../utils/auth/useAuth';

const AuthContext = createContext({
  isAuthenticated:false,
  currentUser: null,
  currentTenant: null,
  isLoading: true
});

const AuthProvider = ({children}) => {

  const {currentUser:ceva}= useAuth();
  const value = useSelector((state)=>state.user.value);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetch= async ()=>{

  //       var request = await httpRequestAuthenticated("api/services/app/Session/GetCurrentLoginInformations")
  //       var currentSession = request.data.result;
  //       if(currentSession.user){
  //         dispatch(login({isAuthenticated:true, currentUser:currentSession.user,currentTenant:currentSession.tenant, isLoading:false}));
  //       }
  //       else{
  //         dispatch(login({isAuthenticated:false, currentUser:null,currentTenant:null, isLoading:false}));
  //       }
  //   }
  //   fetch();
  // }, [dispatch]);

  // const [value, setValue] = useState({isAuthenticated:false,currentUser:null,isFirstRender:true});
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export {AuthProvider, AuthContext};
