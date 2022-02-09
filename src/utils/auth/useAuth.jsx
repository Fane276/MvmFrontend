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
          dispatch(login({isAuthenticated:true, currentUser:currentSession.user,currentTenant:currentSession.tenant, isLoading:false}));
        }
        else{
          dispatch(login({isAuthenticated:false, currentUser:null,currentTenant:null, isLoading:false}));
        }
    }
    fetch();
  }, [dispatch]);
  

  return null;
}

export default useAuth;
