import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiAlertCircle,
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle
  },
  {
    to: '/login',
    label: 'Login',
    icon: mdiLock
  },
  {
    to: '/route',
    label: 'Route',
    icon: mdiAlertCircle
  },
  {
    to: '/product',
    label: 'Product',
    icon: mdiAlertCircle
  },
  {
    to: '/theme',
    label: 'Theme',
    icon: mdiAlertCircle
  },
  {
    to: '/contact',
    label: 'Contact',
    icon: mdiAlertCircle
  },
  {
    to: '/supportQA',
    label: 'SupportQA',
    icon: mdiAlertCircle
  },
  // {
  //   label: 'Dropdown',
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       label: 'Item One'
  //     },
  //     {
  //       label: 'Item Two'
  //     }
  //   ]
  // },
]
