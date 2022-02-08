import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import { httpRequestAuthenticated } from '../../services/httpService';
import { AuthContext } from '../Context/AuthContex';

const NotAuthRoute = ({children}) => {
  const {value,setValue} = useContext(AuthContext);

  useEffect(() => {

    const fetch= async ()=>{

      console.log("useEffect NotAuthRoute: ");
      if(value.isFirstRender){

        var request = await httpRequestAuthenticated("api/services/app/Session/GetCurrentLoginInformations")
        var currentSession = request.data.result;
        
        if(currentSession.user){
          setValue({isAuthenticated:true, currentUser:currentSession.user, isFirstRender:false});
        }
        else{
          setValue({isAuthenticated:false, currentUser:null, isFirstRender:false});
        }
      }
      console.log(value);
  }
  fetch();
  
  }, []);
  
  // if(isInitializingAuthentication){
  //  <GlobalLoading/>
  // }

  return (
    !value.isInitializingAuthentication &&(
    console.log("NotAuthRoute: " + value.isAuthenticated),
    !value.isAuthenticated ? children: (
      <Navigate to="/dashboard"
      />
    ) 
    )
  )
};

export default NotAuthRoute;
