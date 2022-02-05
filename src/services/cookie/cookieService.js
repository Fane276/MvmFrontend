import moment from "moment";
import Cookies from "universal-cookie";
import CookieConst from "./Consts/CookieConst";

const cookies = new Cookies();

const getAuthTokenCookie = () => {
  const cookies = new Cookies();
  return cookies.get(CookieConst.Abp.tokenCookieName);
}

const getTenantIdCookie=()=>{
  const cookies = new Cookies();
  return cookies.get(CookieConst.Abp.tenantIdCookie);
}

const setAuthTokenCookie = (authToken, expireInSeconds) => {
  const cookies = new Cookies();

  var timeExpire =  new Date(new Date().getTime() + 1000 * expireInSeconds)

  return cookies.set(CookieConst.Abp.tokenCookieName, authToken,{ path: "/", expires : timeExpire });
}

const setTenantIdCookie=(tenantId)=>{
  const cookies = new Cookies();
  return cookies.set(CookieConst.Abp.tenantIdCookieName, tenantId);
}


export {getAuthTokenCookie, getTenantIdCookie, setAuthTokenCookie, setTenantIdCookie};