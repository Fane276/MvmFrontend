import axios from "axios";
import AppConsts from "../lib/appconst";
import { getAuthTokenCookie, getTenantIdCookie } from "./cookie/cookieService";

var httpRequestAuthenticated = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  headers:{ 
    Authorization: `Bearer ${ getAuthTokenCookie()}`,
    'Abp.TenantId': getTenantIdCookie()
  }
});

var httpRequest = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  headers:{ 
    'Abp.TenantId': getTenantIdCookie()
  }
});

export { httpRequestAuthenticated, httpRequest}