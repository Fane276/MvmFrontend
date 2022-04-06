import { httpRequestAuthenticated } from "../httpService"

const createVehicle = (vehicle)=>{
  if(vehicle.idMakeAutoOther){
    vehicle.otherAutoMake = vehicle.idMakeAutoOther
  }
  if(vehicle.idModelAutoOther){
    vehicle.otherAutoModel = vehicle.idModelAutoOther
  }

  var result = httpRequestAuthenticated.post("/api/Vehicle/CreateNewVehicle", vehicle);
  console.log(result);
}

export {createVehicle}