import { AsyncSelect } from 'chakra-react-select';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';
import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { httpRequest } from '../../services/httpService';

const Select2 = ({extraParameter, extraParameterValue, endpoint, control, setValue,register, name, registerOptions, hasOtherOption, onChange}) => {
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [valueInput, setValueInput] = useState(null);
  const [otherIsVisible, setOtherIsVisible] = useState(false);
  const [extraParameterValueLocal, setExtraParameterValueLocal] = useState(null);
  const asyncSelect = useRef();

  const {t} = useTranslation();
 
  useEffect(() => {
    setExtraParameterValueLocal(extraParameterValue)
  
    asyncSelect.current.setValue('');

  }, [extraParameterValue])
  

  // handle input change event
  const handleInputChange = value => {
    setValueInput(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
    setValue(name, value.id);
    if(hasOtherOption){
      if(value.id == -1){
        setOtherIsVisible(true);
      }
      else{
        setOtherIsVisible(false);
      }
    }
    if(onChange){
      onChange(value.id);
    }
  }

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
      if(extraParameter && extraParameterValue){
        return  httpRequest.get(`${endpoint}?${extraParameter}=${extraParameterValue}&q=${query}`).then(result => {
          const res =  result.data.result.items;
          return res;
        });
      }
      else{
        return  httpRequest.get(`${endpoint}?&q=${query}`).then(result => {
          const res =  result.data.result.items;
          return res;
        });
      }
    }
    else{
      if(extraParameter && extraParameterValue){
        return  httpRequest.get(`${endpoint}?${extraParameter}=${extraParameterValue}`).then(result => {
          const res =  result.data.result.items;
          return res;
        });
      }
      else{
        return  httpRequest.get(endpoint).then(result => {
          const res =  result.data.result.items;
          return res;
        });
      }
    }
  }
  return (
    <>
    {
      hasOtherOption?
      <>
        {
          otherIsVisible == false ?
          <AsyncSelect
          ref={asyncSelect}
          key={JSON.stringify(extraParameterValueLocal)}
          cacheOptions
          defaultOptions
          value={selectedValue}
          getOptionLabel={e => e.name}
          getOptionValue={e => e.id}
          control = {control}
          loadOptions={fetchData}
          onInputChange={handleInputChange}
          onChange={handleChange}
          openMenuOnFocus={true}
          placeholder={t("Select")}
          />
          :
          <InputGroup>
            <Input
              placeholder={t("Other")}
              {...register(`${name}Other`)}
              />
            <InputRightAddon onClick={openSelect}>
              <FiChevronDown/>
            </InputRightAddon>
          </InputGroup>
        }
      </>
      :
      <>
      {
        <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={e => e.name}
        getOptionValue={e => e.id}
        control = {control}
        loadOptions={fetchData}
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder={t("SelectMake")}
        />
      }
      </>
    }
    </>
  )
}

export default Select2