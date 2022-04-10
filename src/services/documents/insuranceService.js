import { httpRequestAuthenticated } from "../httpService"

const saveInsurance = async (insurance)=>{
  var result = await httpRequestAuthenticated.post("/api/Document/SaveInsurance", insurance);
  return result
}

const getInsuranceStatus = async (idVehicle)=>{
  var result = await httpRequestAuthenticated.get(`/api/Document/GetInsuranceStatus?idVehicle=${idVehicle}`)
  return result
}

const getInsuranceIds = async (idVehicle)=>{
  var result = await httpRequestAuthenticated.get(`/api/Document/GetInsuranceIds?idVehicle=${idVehicle}`)
  return result
}

const deleteInsurance = async (idInsurance)=>{
  var result = await httpRequestAuthenticated.post(`/api/Document/DeleteInsurance`,{id: idInsurance});
  return result;
}

const updateInsurance = async (insurance)=>{
  var result = await httpRequestAuthenticated.post("/api/Document/UpdateInsurance", insurance);
  return result
}


export {saveInsurance, getInsuranceStatus, getInsuranceIds, deleteInsurance, updateInsurance}