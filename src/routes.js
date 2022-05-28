import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
// import User from './pages/User';
import Client from './pages/Client';
import InsuaranceClass from './pages/InsuaranceClass';
import InsuaranceCover from './pages/InsuaranceCover';
import MotorVehicleModel from './pages/MotorVehicleModel';
import MotorVehicleType from './pages/MotorVehicleType';
import Agent from './pages/Agent';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
// import Products from './pages/Products';
import Transaction from './pages/Transaction';
import AddClientTransaction from './pages/AddClientTransaction';
import RegisterClient from './pages/RegisterClient';
import DashboardApp from './pages/DashboardApp';
import TransactionInfo from './pages/TransactionInfo';
import AddInsuaranceClass from './pages/AddInsuaranceClass';
import AddInsuaranceCover from './pages/AddInsuaranceCover';
import AddMotorVehicleModel from './pages/AddMotorVehicleModel';
import AddMotorVehicleType from './pages/AddMotorVehicleType';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        // { path: 'user', element: <User /> },
        { path: 'client/list', element: <Client /> },
        { path: 'insuarance_class/list', element: <InsuaranceClass /> },
        { path: 'insuarance_cover/list', element: <InsuaranceCover /> },
        { path: 'motor_vehicle_model/list', element: <MotorVehicleModel /> },
        { path: 'motor_vehicle_type/list', element: <MotorVehicleType /> },
        { path: 'agent', element: <Agent /> },
        // { path: 'products', element: <Products /> },
        { path: 'transaction', element: <Transaction /> },
        { path: 'record_transaction', element: <AddClientTransaction /> },
        { path: 'client/register', element: <RegisterClient /> },
        { path: 'insuarance_class/add', element: <AddInsuaranceClass /> },
        { path: 'insuarance_cover/add', element: <AddInsuaranceCover /> },
        { path: 'motor_vehicle_model/add', element: <AddMotorVehicleModel /> },
        { path: 'motor_vehicle_type/add', element: <AddMotorVehicleType /> },
        { path: 'transaction/info/:id', element: <TransactionInfo /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
