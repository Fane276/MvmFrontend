import { useEffect, useState } from 'react';
import { httpRequestAuthenticated } from '../../services/httpService';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isInitializingAuthentication, setIsInitializingAuthentication] = useState(true);

  useEffect(() => {
    const fetch= async ()=>{

        var request = await httpRequestAuthenticated("api/services/app/Session/GetCurrentLoginInformations")
        var currentSession = request.data.result;
        if(currentSession.user){
          setIsAuthenticated(true);
          setCurrentUser(currentSession.user);
        }
        else{
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
        setIsInitializingAuthentication(false);
    }
    fetch();
  }, []);
  

  return {isAuthenticated, currentUser, isInitializingAuthentication}
}

export default useAuth;
