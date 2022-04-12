import { setAuthTokenCookie } from '../cookie/cookieService';
import { httpRequest } from '../httpService';

const tokenAuth = async (data) => {
  return await httpRequest.post("api/TokenAuth/Authenticate",{
    ...data,
    rememberClient:true
  })
  .then((result)=>{
    if(result.data.result){
      setAuthTokenCookie(result.data.result.accessToken, result.data.result.expireInSeconds);
    }
    return result;
  })
  .catch((err)=>{throw err.response});

}

export {tokenAuth};
