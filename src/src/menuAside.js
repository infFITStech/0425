import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLock,
  mdiAlertCircle,
} from '@mdi/js'

export default [
  {
    label: '選單'
  },
  // {
  //   to: '/login',
  //   label: 'Login',
  //   icon: mdiLock
  // },
 
  {
    to: '/product',
    label: '商品管理',
    icon: mdiAlertCircle
  },
  {
    to: '/route',
    label: '購物動線規劃',
    icon: mdiAlertCircle
  },
  {
    to: '/theme',
    label: '主題及標籤',
    icon: mdiAlertCircle
  },
  {
    to: '/profile',
    label: '商家設定',
    icon: mdiAccountCircle
  },
  {
    to: '/contact',
    label: '聯絡我們',
    icon: mdiAlertCircle
  },
  {
    to: '/supportQA',
    label: '支援',
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
