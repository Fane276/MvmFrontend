import { httpRequest } from "../httpService";

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

export {registerUser};