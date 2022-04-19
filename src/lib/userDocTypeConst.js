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

const documentType = {
  UserDocument: 0,
  Insurance: 1,
  Periodical: 2,
}
export {UserDocumentType, userDocumentTypeToString, documentType}