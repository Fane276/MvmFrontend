import './index.css';
import './utils/i18n';

import React, { Suspense } from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react'
import App from './app/App';
import theme from './app/theme/theme'
import {AuthProvider} from './components/Context/AuthContex';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="...is loading">
    <AuthProvider>
      <CookiesProvider>  
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </CookiesProvider>
      </AuthProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
