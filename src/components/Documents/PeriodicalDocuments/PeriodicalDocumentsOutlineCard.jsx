import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SimpleGrid } from '@chakra-ui/react';
import CreatePeriodicalDocumentModal from '../../../modals/PeriodicalDocuments/CreatePeriodicalDocumentModal';
import { getPeriodicalDocuments } from '../../../services/documents/periodicalDocumentSerivce';
import Card from '../../Cards/Card';
import CardHeader from '../../Cards/CardHeader';
import PeriodicalDocumentCard from './PeriodicalDocumentCard';

const PeriodicalDocumentsOutlineCard = ({idVehicle, ...props}) => {
  const [documentsList, setDocumentsList] = useState([]);

  const {t} = useTranslation();

  useEffect(() => {
    if(idVehicle){
      const asyncExecutor = async ()=>{
        await getPeriodicalDocuments(idVehicle).then((result)=>{
          if(result.status === 200){
            setDocumentsList(result.data.result.items);
          }
        })
      }
      asyncExecutor()
    }
  }, [idVehicle])

  const updateComponentHandler = async (idVehicle)=>{
    await getPeriodicalDocuments(idVehicle).then((result)=>{
      if(result.status === 200){
        setDocumentsList(result.data.result.items);
      }
    })
  }

  
  return (
    <Card {...props}>
      <CardHeader 
        title={t("PeriodicalDocuments")} 
        action={
          <CreatePeriodicalDocumentModal idvehicle={idVehicle} updateFunction={()=>updateComponentHandler(idVehicle)}/>
        }
      />
      <SimpleGrid columns={2} spacing='20px' w='100%' p='5'>
        {documentsList &&
          documentsList.map((document)=>{
            return <PeriodicalDocumentCard updateFunction={()=>updateComponentHandler(idVehicle)} key={document.id} document={document}/>
          })
        }
      </SimpleGrid>
    </Card>
  )
}

export default PeriodicalDocumentsOutlineCard