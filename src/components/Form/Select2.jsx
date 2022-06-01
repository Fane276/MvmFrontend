import { AsyncSelect } from 'chakra-react-select';
import React, { useEffect, useRef, useState } from 'react'
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { httpRequest } from '../../services/httpService';

const Select2 = ({extraParameter, setValue, valueName, textName, endpoint, control, dependsOn,register, name, rules, hasOtherOption, onChange}) => {
  const [valueInput, setValueInput] = useState(null);
  const [otherIsVisible, setOtherIsVisible] = useState(false);
  const [extraParameterValueLocal, setExtraParameterValueLocal] = useState(null);
  const asyncSelect = useRef();


  const {t} = useTranslation();

  const handleInputChange = value => {
    setValueInput(value);
  };


  const valueSelected = useWatch({control:control, name: name})

  useEffect(()=>{
    if(valueSelected){
      if(valueSelected.value === -1){
        setOtherIsVisible(true);
      }
      else{
        setOtherIsVisible(false);
      }
  
      if(onChange){
        onChange(valueSelected.value);
      }
    }
  },[valueSelected])


  const dependent = useWatch({control: control, name: dependsOn})
  
  useEffect(()=>{
    if(dependsOn){
      setValue(name, "");
      setExtraParameterValueLocal(dependent)
    }
  },[dependent,dependsOn])

  const openSelect = ()=>{
    setOtherIsVisible(false);
    
    setTimeout(()=>{      
      if(asyncSelect.current){
       asyncSelect.current.focus(); 
      }
    },50)
    
  }
 
  const fetchData = (query) => {
    if(query){
      console.log(dependent)
      if(extraParameter && dependent){
        return  httpRequest.get(`${endpoint}?${extraParameter}=${dependent.value ?? dependent}&q=${query}`).then(result => {
          const res =  result.data.result.items;
          return res.map((item)=>{return {value:item[valueName], text: item[textName]}});
        });
      }
      else{
        return  httpRequest.get(`${endpoint}?&q=${query}`).then(result => {
          const res =  result.data.result.items;
          return res.map((item)=>{return {value:item[valueName], text: item[textName]}});
        });
      }
    }
    else{
      if(extraParameter && dependent){
        return  httpRequest.get(`${endpoint}?${extraParameter}=${dependent.value ?? dependent}`).then(result => {
          const res =  result.data.result.items;
          return res.map((item)=>{return {value:item[valueName], text: item[textName]}});
        });
      }
      else{
        return  httpRequest.get(endpoint).then(result => {
          const res =  result.data.result.items;
          return res.map((item)=>{return {value:item[valueName], text: item[textName]}});
        });
      }
    }
  }

  return (
    <>
    {
      hasOtherOption?
      <>
        <Controller
          control={control}
          key={`${JSON.stringify(extraParameterValueLocal)}${name}`}
          name= {name}
          rules={rules}
          render={({ field, fieldState }) => (
            otherIsVisible === false ?
            <AsyncSelect
            ref={asyncSelect}
            cacheOptions
            defaultOptions
            value={field.value}
            getOptionLabel={e => e.text}
            getOptionValue={e => e.value}
            control = {control}
            loadOptions={fetchData}
            onInputChange={handleInputChange}
            onChange={(selected) => field.onChange(selected)}
            openMenuOnFocus={true}
            placeholder={t("Select")}
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                bg: "transparent",
                px: 2,
                cursor: "inherit"
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none"
              }),
              control: (provided) => ({
                ...provided,
                borderColor: fieldState.error? "red.400":'whiteAlpha.300',
                boxShadow: fieldState.error? "0 0 0 1px #e53e3e":'none',
              }),
            }}
            />
            :
            <InputGroup>
              <Input
                placeholder={t("Other")}
                borderRight='none'
                {...register(`${name}.other`)}
                />
              <InputRightAddon bgColor="transparent" borderColor="whiteAlpha.300" borderLeft='none' onClick={openSelect}>
                <FiChevronDown/>
              </InputRightAddon>
            </InputGroup>
          )}
        />
          
      </>
      :
      <>
      {
        <Controller
        control={control}
        key={`${JSON.stringify(extraParameterValueLocal)}${name}`}
        name= {name}
        rules={rules}
        render={({ field, fieldState }) => (
          <AsyncSelect
            ref={asyncSelect}
            cacheOptions
            defaultOptions
            value={field.value}
            getOptionLabel={e => e.text}
            getOptionValue={e => e.value}
            control = {control}
            loadOptions={fetchData}
            onInputChange={handleInputChange}
            onChange={(selected) => field.onChange(selected)}
            openMenuOnFocus={true}
            placeholder={t("Select")}
            chakraStyles={{
              dropdownIndicator: (provided) => ({
                ...provided,
                bg: "transparent",
                px: 2,
                cursor: "inherit"
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none"
              }),
              control: (provided) => ({
                ...provided,
                borderColor: fieldState.error? "red.400":'whiteAlpha.300',
                boxShadow: fieldState.error? "0 0 0 1px #e53e3e":'none',
              }),
            }}
          />
        )}
      />
      }
      </>
    }
    </>
  )
}

export default Select2