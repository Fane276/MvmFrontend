import './index.css';
import './utils/i18n';

import React, { Suspense } from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import App from './app/App';
import theme from './app/theme/theme'
import {AuthProvider} from './components/Context/AuthContex';
import GlobalLoading from './pages/GlobalLoading';
import reportWebVitals from './reportWebVitals';
import store from './state/store';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<GlobalLoading/>}>
      <Provider store={store}>
        <CookiesProvider>  
          <ChakraProvider theme={theme}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ChakraProvider>
        </CookiesProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
