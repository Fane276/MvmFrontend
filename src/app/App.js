import './App.css';
import 'react-datepicker/dist/react-datepicker.css'

import { Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import { Text } from '@chakra-ui/react';
import NotAuthRoute from '../components/CustomRouteWrappers/NotAuthRoute';
import ProtectedRoute from '../components/CustomRouteWrappers/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import GlobalLoading from '../pages/GlobalLoading';
import Login from '../pages/Login';
import Vehicle from '../pages/Vehicle';

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
