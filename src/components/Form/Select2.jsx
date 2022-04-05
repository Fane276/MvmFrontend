import { AsyncSelect } from 'chakra-react-select';
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';
import { Button, Input, InputGroup, InputRightAddon, InputRightElement } from '@chakra-ui/react';
import { httpRequest } from '../../services/httpService';

const Select2 = ({endpoint, control, setValue,register, name, registerOptions, hasOtherOption}) => {
  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [valueInput, setValueInput] = useState(null);
  const [otherIsVisible, setOtherIsVisible] = useState(false);
  const asyncSelect = useRef();

  const {t} = useTranslation();
 
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
      return  httpRequest.get(`${endpoint}&q=${query}`).then(result => {
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
  return (
    <>
    {
      hasOtherOption?
      <>
        {
          otherIsVisible == false ?
          <AsyncSelect
          ref={asyncSelect}
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
          placeholder={t("SelectMake")}
          />
          :
          <InputGroup>
            <Input
              placeholder={t("EnterMakeName")}
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