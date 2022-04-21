import './App.css';
import 'react-datepicker/dist/react-datepicker.css'
import './date-picker.css'
import 'animate.css';

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import enUS from 'date-fns/locale/en-US';
import ro from 'date-fns/locale/ro';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { Route, Routes } from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import NotAuthRoute from '../components/CustomRouteWrappers/NotAuthRoute';
import ProtectedRoute from '../components/CustomRouteWrappers/ProtectedRoute';
import Permission from '../lib/permissionsConst';
import Dashboard from '../pages/Dashboard';
import DashboardAdmin from '../pages/DashboardAdmin';
import GlobalLoading from '../pages/GlobalLoading';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import UserDocumentsPage from '../pages/UserDocumentsPage';
import Vehicle from '../pages/Vehicle';
import VehiclesPage from '../pages/VehiclesPage';

registerLocale('ro', ro)
registerLocale('en', enUS)
setDefaultLocale('ro');

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element = {<LandingPage/>}/>
        <Route exact path="/design" element = {<ProtectedRoute><GlobalLoading/></ProtectedRoute>}/>
        <Route exact path="/login" element={<NotAuthRoute><Login/></NotAuthRoute>}/>
        <Route exact path="/register" element={<NotAuthRoute><Register/></NotAuthRoute>}/>
        <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route exact path="/DashboardAdmin" element={<ProtectedRoute requestPermission={Permission.usersPages}><DashboardAdmin/></ProtectedRoute>}/>
        <Route exact path="/Vehicle/:idVehicle" element={<ProtectedRoute><Vehicle/></ProtectedRoute>}/>
        <Route exact path="/UserDocuments" element={<ProtectedRoute><UserDocumentsPage/></ProtectedRoute>}/>
        <Route exact path="/Vehicles" element={<ProtectedRoute><VehiclesPage/></ProtectedRoute>}/>
        <Route exact path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
