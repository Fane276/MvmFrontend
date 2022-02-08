import './App.css';

import { Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import NotAuthRoute from '../components/CustomRouteWrappers/NotAuthRoute';
import ProtectedRoute from '../components/CustomRouteWrappers/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import GlobalLoading from '../pages/GlobalLoading';
import Login from '../pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/design" element = {<ProtectedRoute><GlobalLoading/></ProtectedRoute>}/>
        <Route exact path="/login" element={<NotAuthRoute><Login/></NotAuthRoute>}/>
        <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
