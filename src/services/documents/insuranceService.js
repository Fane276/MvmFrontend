import { httpRequestAuthenticated } from "../httpService"

const saveInsurance = async (insurance)=>{

  var result = await httpRequestAuthenticated.post("/api/Document/SaveInsurance", insurance);
  return result
}

const getInsuranceStatus = async (idVehicle)=>{
  var result = await httpRequestAuthenticated.get(`/api/Document/GetInsuranceStatus?idVehicle=${idVehicle}`)
  return result
}

export {saveInsurance, getInsuranceStatus}