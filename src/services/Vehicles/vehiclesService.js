import { httpRequestAuthenticated } from "../httpService"

const createVehicle = async (vehicle)=>{
  if(vehicle.idMakeAutoOther){
    vehicle.otherAutoMake = vehicle.idMakeAutoOther
  }
  if(vehicle.idModelAutoOther){
    vehicle.otherAutoModel = vehicle.idModelAutoOther
  }

  var result = await httpRequestAuthenticated.post("/api/Vehicle/CreateNewVehicle", vehicle);
  return result;
}

const updateVehicle = async (vehicle)=>{
  if(vehicle.idMakeAutoOther){
    vehicle.otherAutoMake = vehicle.idMakeAutoOther
  }
  if(vehicle.idModelAutoOther){
    vehicle.otherAutoModel = vehicle.idModelAutoOther
  }

  var result = await httpRequestAuthenticated.post("/api/Vehicle/UpdateVehicle", vehicle);
  return result;
}

const deleteVehicle = async (idVehicle)=>{
  var result = await httpRequestAuthenticated.post("/api/Vehicle/DeleteRefill", {id: idVehicle});
  return result;
}

const getVehicle = async (idVehicle)=>{
  var result = await httpRequestAuthenticated.get(`/api/Vehicle/GetVehicleById?idVehicle=${idVehicle}`);
  return result;
}

export {createVehicle, deleteVehicle, getVehicle,updateVehicle}