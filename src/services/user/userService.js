import { httpRequestAuthenticated } from "../httpService";

const getCurrentUserInfo = async ()=>{
  var result = await httpRequestAuthenticated.get(`/api/services/app/Account/GetCurrentUserInfo`);
  return result;
}

const changePassword = async (data) =>{
  return await httpRequestAuthenticated.post("/api/services/app/User/ChangePassword", data).then((result)=>{
    if(result){
      return result;
    }
  })
  .catch((error)=>{
    throw error.response;
  })
}

const updateUserInfo = async (data) =>{
  return await httpRequestAuthenticated.post("/api/services/app/Account/UserUpdate", data).then((result)=>{
    if(result){
      return result;
    }
  })
  .catch((error)=>{
    throw error.response;
  })
}

export {getCurrentUserInfo, changePassword, updateUserInfo}