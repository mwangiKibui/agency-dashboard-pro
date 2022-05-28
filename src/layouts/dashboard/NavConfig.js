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
    path: '/dashboard/client/list',
    icon: getIcon('eva:people-fill'),
  },
  // {
  //   title: 'agents',
  //   path: '/dashboard/agent',
  //   icon: getIcon('eva:people-fill'),
  // },
  // {
  //   title: 'Register Client',
  //   path: '/dashboard/client/register',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Insuarance Classes',
    path: '/dashboard/insuarance_class/list',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'Add insuarance class',
  //   path: '/dashboard/insuarance_class/add',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Insuarance Covers',
    path: '/dashboard/insuarance_cover/list',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'Add insuarance cover',
  //   path: '/dashboard/insuarance_covers/add',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Motor Vehicle models',
    path: '/dashboard/motor_vehicle_model/list',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'Add motor vehicle model',
  //   path: '/dashboard/motor_vehicle_models/add',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Motor Vehicle Types',
    path: '/dashboard/motor_vehicle_type/list',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'Add motor vehicle type',
  //   path: '/dashboard/motor_vehicle_types/add',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  {
    title: 'Client Transactions',
    path: '/dashboard/transaction',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  // {
  //   title: 'Add Client Transaction',
  //   path: '/dashboard/record_transaction',
  //   icon: getIcon('eva:file-text-fill'),
  // },
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
