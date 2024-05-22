import {
  mdiAccountCircle,
  mdiMonitor,
  mdiStoreCogOutline,
  mdiTag,
  mdiEmail ,
  mdiHelpCircle,
  mdiMulticast,
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
    label: '官網及商品管理',
    icon: mdiStoreCogOutline
  },
  {
    to: '/route',
    label: '動線規劃',
    icon: mdiMulticast
  },
  {
    to: '/theme',
    label: '主題及標籤',
    icon: mdiTag
  },
  {
    to: '/profile',
    label: '商家設定',
    icon: mdiAccountCircle
  },
  {
    to: '/contact',
    label: '聯絡我們',
    icon: mdiEmail
  },
  {
    to: '/supportQA',
    label: '支援',
    icon: mdiHelpCircle
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
