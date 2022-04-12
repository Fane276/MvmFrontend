import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { httpRequestAuthenticated } from '../../services/httpService';
import { login } from '../../state/user/userSlice';

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch= async ()=>{

        var request = await httpRequestAuthenticated("api/services/app/Session/GetCurrentLoginInformations")
        var currentSession = request.data.result;
        if(currentSession.user){
          var userPermissionsRequest = await httpRequestAuthenticated.get("/api/services/app/Account/GetCurrentUserPermissions")
          var permissions = userPermissionsRequest.data.result.items;
          dispatch(login({isAuthenticated:true, currentUser:currentSession.user,currentTenant:currentSession.tenant, isLoading:false, permissions:permissions}));
        }
        else{
          dispatch(login({isAuthenticated:false, currentUser:null,currentTenant:null, isLoading:false, permissions:[]}));
        }
    }
    fetch();
  }, [dispatch]);
  

  return null;
}

export default useAuth;
