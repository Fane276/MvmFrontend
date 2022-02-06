import { useEffect, useState } from 'react';
import { httpRequestAuthenticated } from '../../services/httpService';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    }
    fetch();
  
  }, []);
  

  return [isAuthenticated, currentUser]
}

export default useAuth;
