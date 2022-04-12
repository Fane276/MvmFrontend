import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

const GlobalLoading = () => {

  return (
    <Flex direction='column' w='100vw' h='100vh' justifyContent='center' alignItems='center'>
      <Image src='/mvm-logo-large.png' className='animate__animated animate__bounce animate__slow animate__infinite'/>
    </Flex>
  )
};

export default GlobalLoading;
