import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUserPermissions, getSessionInfo } from '../../services/account/accountService';
import { login } from '../../state/user/userSlice';

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch= async ()=>{

        var request = await getSessionInfo()
        var currentSession = request.data.result;
        if(currentSession.user){
          var userPermissionsRequest = await getCurrentUserPermissions();
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
