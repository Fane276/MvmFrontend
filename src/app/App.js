import './App.css';

import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import AppLayoutNotAuth from '../components/Layout/AppLayoutNotAuth';
import Login from '../pages/Login';
import { setAuthTokenCookie, setTenantIdCookie } from '../services/cookie/cookieService';
import { httpRequest } from '../services/httpService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
