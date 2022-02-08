import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  value: {},
  setValue: ({isAuthenticated,currentUser,isFirstRender}) =>{}
});

const AuthProvider = ({children}) => {


  const [value, setValue] = useState({isAuthenticated:false,currentUser:null,isFirstRender:true});
  
  return <AuthContext.Provider value={{value, setValue}}>{children}</AuthContext.Provider>
};

export {AuthProvider, AuthContext};
