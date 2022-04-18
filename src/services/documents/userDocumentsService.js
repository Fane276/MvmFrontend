import { httpRequestAuthenticated } from "../httpService"

const getUserDocuments = async ()=>{
  var result = await httpRequestAuthenticated.get(`/api/Document/GetUserDocuments`)
  return result
}

const saveUserDocument = async (document)=>{
  var result = await httpRequestAuthenticated.post("/api/Document/SaveUserDocument", document);
  return result
}

const deleteUserDocument = async (idDocument)=>{
  var result = await httpRequestAuthenticated.post("/api/Document/DeleteUserDocument", {id: idDocument});
  return result
}

export {getUserDocuments, saveUserDocument, deleteUserDocument}