import { setAuthTokenCookie } from '../cookie/cookieService';
import { httpRequest } from '../httpService';

const tokenAuth = async (data) => {
  var result = await httpRequest.post("api/TokenAuth/Authenticate",{
    ...data,
    rememberClient:true
  });

  var tokenResponse=result.data.result;
  if(tokenResponse){
    await setAuthTokenCookie(result.data.result.accessToken, result.data.result.expireInSeconds);
    return true;
  }
  return false;
}

export {tokenAuth};
