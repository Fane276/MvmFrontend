import { httpRequest, httpRequestAuthenticated } from "../httpService";

const registerUser = async (userInput) =>{
  return await httpRequest.post("/api/services/app/Account/Register", userInput).then((result)=>{
    if(result){
      return result;
    }
  })
  .catch((error)=>{
    throw error.response;
  })
}

const getSessionInfo = async ()=>{
  var request = await httpRequestAuthenticated("api/services/app/Session/GetCurrentLoginInformations")
  return request;
}

const getCurrentUserPermissions = async ()=>{
  var userPermissionsRequest = await httpRequestAuthenticated.get("/api/services/app/Account/GetCurrentUserPermissions")
  return userPermissionsRequest;
}

export {registerUser, getSessionInfo, getCurrentUserPermissions};