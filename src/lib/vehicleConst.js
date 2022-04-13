
const FuelType = {
  Petrol: 0,
  Disel: 1,
  Electric: 2
};

const fuelTypeToString=(value)=>{
  if(value === 1) return "Disel";
  if(value === 2) return "Electric";
  return "Petrol";
}

const FuelUnit ={
  Liter: 0,
  Galon: 1,
  Kilowatt: 2
}

const fuelUnitToString=(value)=>{
  if(value === 1) return "Galon";
  if(value === 2) return "Kilowatt";
  return "Liter";
}
export {FuelType, FuelUnit, fuelTypeToString, fuelUnitToString}