import { httpRequestAuthenticated } from "../httpService"

const addRefill = async (data)=>{
  var result = await httpRequestAuthenticated.post("/api/FuelManagement/InsertRefill", data);
  return result;
}

const deleteRefill = async (idRefill)=>{
  var result = await httpRequestAuthenticated.post("/api/FuelManagement/DeleteRefill", {id: idRefill});
  return result;
}

const getPricePerLastDays = async (idVehicle)=>{
  var result = await httpRequestAuthenticated.get(`/api/FuelManagement/GetPricePerLastWeek?idVehicle=${idVehicle}`);
  return result;
}

const getPricePerVehicle = async ()=>{
  var result = await httpRequestAuthenticated.get(`/api/FuelManagement/GetCostPerVehicle`);
  return result;
}


export {addRefill, deleteRefill, getPricePerLastDays, getPricePerVehicle};