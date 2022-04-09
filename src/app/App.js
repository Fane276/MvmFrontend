import './App.css';
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'

import enUS from 'date-fns/locale/en-US';
import ro from 'date-fns/locale/ro';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import { Text } from '@chakra-ui/react';
import NotAuthRoute from '../components/CustomRouteWrappers/NotAuthRoute';
import ProtectedRoute from '../components/CustomRouteWrappers/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import GlobalLoading from '../pages/GlobalLoading';
import Login from '../pages/Login';
import Vehicle from '../pages/Vehicle';

registerLocale('ro', ro)
registerLocale('en', enUS)
setDefaultLocale('ro');

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/design" element = {<ProtectedRoute><GlobalLoading/></ProtectedRoute>}/>
        <Route exact path="/login" element={<NotAuthRoute><Login/></NotAuthRoute>}/>
        <Route exact path="/register" element={<NotAuthRoute><Text>Register</Text></NotAuthRoute>}/>
        <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route exact path="/Vehicle/:idVehicle" element={<ProtectedRoute><Vehicle/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
