import React from "react";
import Dropzone from "react-dropzone";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {FiUpload} from 'react-icons/fi'
import {VscVerified} from 'react-icons/vsc'
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

const FileInput = ({ control, name, multiple, accept, ...props}) => {
  const {t} = useTranslation();
  return(
    <Controller
    control={control}
    name={name}
    defaultValue={[]}
    {...props}
    render={({ field }) => (
      <>
        <Dropzone multiple={multiple} onDrop={field.onChange} accept={accept}>
          {({ getRootProps, getInputProps }) => (
            <Box
            borderStyle='dashed'
            borderWidth='1px'
            p='5'
            borderRadius='xl'
            w="100%"
            {...getRootProps()}
            >
              <Flex w="100%" direction='column' alignItems='center' justifyContent='center'>
                <input {...getInputProps()} name={name} onBlur={field.onBlur} />
                {field.value.length>0?
                  <VscVerified size='60px' color="#3182CE" className="animate__animated animate__zoomIn"/>
                  :
                  <FiUpload size='60px' color="#3182CE"  className="animate__animated animate__zoomIn"/>
                }
                <Text mt='5' textAlign='center' fontSize='xl'>{t("DropZoneMessage")}</Text>
              </Flex>
            </Box>
          )}
        </Dropzone>
        {multiple?
        <VStack>
          {field.value.map((f, index) => (
            <Text key={index} > {f.name} size: {f.size}</Text>
            ))}
        </VStack>
        :
        (<>{
          // field.value.length>0 && 
          // <VStack>
          // <Text> File uploaded</Text>
          // </VStack>
        }
        </>
        )
      }
      </>
    )}
    />
    )
  }
  
export default FileInput