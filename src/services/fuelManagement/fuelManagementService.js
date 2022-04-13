import { httpRequestAuthenticated } from "../httpService"

const addRefill = async (data)=>{
  var result = await httpRequestAuthenticated.post("/api/FuelManagement/InsertRefill", data);
  return result;
}

const deleteRefill = async (idRefill)=>{
  var result = await httpRequestAuthenticated.post("/api/FuelManagement/DeleteRefill", {id: idRefill});
  return result;
}

export {addRefill, deleteRefill};