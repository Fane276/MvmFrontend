import React from 'react'
import DatePicker from "react-datepicker";
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import {FiCalendar} from 'react-icons/fi'
import { Flex, Text } from '@chakra-ui/react'

const ChakraDatePicker = ({control, name, rules, placeholderText, dateFormat}) => {
  const {t, i18n} = useTranslation();
  
  return (
    <Controller
      control={control}
      name= {name}
      rules={rules}
      render={({ field }) => (
        <DatePicker
          placeholderText={placeholderText? placeholderText : t("DateFormat")}
          dateFormat={dateFormat? dateFormat : "dd.MM.yyyy"}
          locale={i18n.language}
          todayButton={
            <Flex alignItems ='center' justifyContent='center'>
              <FiCalendar color='gray.700'/>
              <Text color='gray.700' ml='2'>
                {t("Today")}
              </Text>
            </Flex>
          }
          onChange={(date) => field.onChange(date)}
          selected={field.value}
        />
    )}
    />
  )
}

export default ChakraDatePicker