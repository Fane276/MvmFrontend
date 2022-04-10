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

export {createVehicle}