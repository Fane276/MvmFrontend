const UserDocumentType ={
  OtherDoc: 0,
  DrivingLicence: 1,
  IdCard: 2
}

const userDocumentTypeToString=(value)=>{
  if(value === 1) return "DrivingLicence";
  if(value === 2) return "IdCard";
  return "OtherDoc";
}
export {UserDocumentType, userDocumentTypeToString}