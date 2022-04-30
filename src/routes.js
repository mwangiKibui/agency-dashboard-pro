import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
// import User from './pages/User';
import Client from './pages/Client';
import Agent from './pages/Agent';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
// import Products from './pages/Products';
import Transaction from './pages/Transaction';
import RecordTransaction from './pages/RecordTransaction';
import DashboardApp from './pages/DashboardApp';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        // { path: 'user', element: <User /> },
        { path: 'client', element: <Client /> },
        { path: 'agent', element: <Agent /> },
        // { path: 'products', element: <Products /> },
        { path: 'transaction', element: <Transaction /> },
        { path: 'record_transaction', element: <RecordTransaction /> },
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
