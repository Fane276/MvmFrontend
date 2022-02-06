import { getTenantIdCookie, setAuthTokenCookie, setTenantIdCookie } from '../cookie/cookieService';
import { httpRequest } from '../httpService';

const tokenAuth = async (data) => {
  var result = await httpRequest.post("api/TokenAuth/Authenticate",{
    ...data,
    rememberClient:true
  });

  var tokenResponse=result.data.result;
  console.log(tokenResponse);
  if(tokenResponse){
    await setAuthTokenCookie(result.data.result.accessToken, result.data.result.expireInSeconds);
    var currentTenantId = getTenantIdCookie();
    if(currentTenantId){
      setTenantIdCookie(0);
    }
    return true;
  }
  return false;
}

export {tokenAuth};
