import './App.css';

import { Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import NotAuthRoute from '../components/CustomRouteWrappers/NotAuthRoute';
import ProtectedRoute from '../components/CustomRouteWrappers/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<NotAuthRoute><Login/></NotAuthRoute>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
