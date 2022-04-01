import Cookies from "universal-cookie";
import CookieConst from "./Consts/CookieConst";

const getAuthTokenCookie = () => {
  const cookies = new Cookies();
  return cookies.get(CookieConst.Abp.tokenCookieName);
}

const getTenantIdCookie=()=>{
  const cookies = new Cookies();
  return cookies.get(CookieConst.Abp.tenantIdCookieName);
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

const removeAuthTokenCookie=()=>{
  const cookies = new Cookies();
  return cookies.remove(CookieConst.Abp.tokenCookieName);
}

const removeTenantIdCookie=()=>{
  const cookies = new Cookies();
  return cookies.remove(CookieConst.Abp.tenantIdCookieName);
}


export {getAuthTokenCookie, getTenantIdCookie, setAuthTokenCookie, setTenantIdCookie,removeAuthTokenCookie,removeTenantIdCookie};