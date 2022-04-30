// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'clients',
    path: '/dashboard/client',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'agents',
    path: '/dashboard/agent',
    icon: getIcon('eva:people-fill'),
  },  
  {
    title: 'Register Client',
    path: '/dashboard/record_transaction',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'List Client Transactions',
    path: '/dashboard/transaction',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
