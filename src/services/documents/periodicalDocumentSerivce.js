import { httpRequestAuthenticated } from "../httpService";

const savePeriodicalDocument = async (data)=>{
  var result = await httpRequestAuthenticated.post("/api/Document/SavePeriodicalDocument", data);
  return result
}

const getPeriodicalDocuments = async (idVehicle)=>{
  var result = await httpRequestAuthenticated.get(`/api/Document/GetPeriodicalDocuments?idVehicle=${idVehicle}`);
  return result
}

const deletePeriodicalDocument = async (data)=>{
  var result = await httpRequestAuthenticated.post("/api/Document/DeletePeriodicalDocument", data);
  return result
}

const getPeriodicalDocumentsTypes = async () =>{
  var result = await httpRequestAuthenticated.get("/api/services/app/PeriodicalDocumentType/GetPeriodicalDocumentsTypes");
  return result
}

const getPeriodicalDocument = async (idDocument)=>{
  var result = await httpRequestAuthenticated.get(`/api/Document/GetPeriodicalDocument?idDocument=${idDocument}`);
  return result
}

const updatePeriodicalDocument = async (data)=>{
  var result = await httpRequestAuthenticated.post("/api/Document/UpdatePeriodicalDocument", data);
  return result
}

export {savePeriodicalDocument, getPeriodicalDocuments, deletePeriodicalDocument, getPeriodicalDocumentsTypes, getPeriodicalDocument, updatePeriodicalDocument}