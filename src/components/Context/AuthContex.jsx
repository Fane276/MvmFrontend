import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../utils/auth/useAuth';

const AuthContext = createContext({
  isAuthenticated:false,
  currentUser: null,
  currentTenant: null,
  isLoading: true,
  permissions: []
});

const AuthProvider = ({children}) => {

  useAuth();
  const value = useSelector((state)=>state.user.value);


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
