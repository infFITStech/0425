import {
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  // mdiThemeLightDark,
  mdiBellOutline,
  mdiMessageAlert,
  // mdiBellBadgeOutline, //有notification顯示
  mdiBullhornVariantOutline,
  mdiMenuRight
} from '@mdi/js'

export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        to: '/profile'
      },
      {
        icon: mdiCogOutline,
        label: 'Settings'
      },
      {
        icon: mdiEmail,
        label: 'Messages'
      },
      {
        isDivider: true
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true
      }
    ]
  },
  {
    icon: mdiBullhornVariantOutline,
    label: 'announcement',
    isDesktopNoLabel: true,
    announceCol: true,
    menu: [
      {
        icon: mdiMenuRight,
        label:"Announcement",
        title:"Title of a test announcement1",
        announceDetail:"This is a test announcement for 1"
      },
      {
        isDivider: true
      },
      {
        icon: mdiMenuRight,
        label:"Announcement",
        title:"Title of a test announcement2",
        announceDetail:"This is a test announcement for 2"

        
      },
      {
        isDivider: true
      },
      {
        icon: mdiMenuRight,
        label:"Announcement",
        title:"Title of a test announcement",
        announceDetail:"This is a test announcement for 3. qqqqqqqqqqqqqq qqq qqqqqqqq qqqqqqqqqq qqqqqqqqqqq qqqqqqqqqqqqqqqqqq qqqqqqqqqqqq\nqqqqqqqqq qqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqq qqqqqqqqqqqqq qqqqqqqqqqqqq qqqqqqqq qq qq qq q q q q q qqqqqqqqq qqqqqqq qqqqqqqqqqqq qqqqqqqqqqq qqqqqqqqqq qqqqqqqqqq qqqqqqqqqq "

        
      },
      {
        isDivider: true
      }
    ]
  },
  {
    icon: mdiBellOutline,
    label: 'notification',
    isDesktopNoLabel: true,
    notify: true,
    menu: [
      {
        icon: mdiMessageAlert,
        label: 'notify',
        content:'i am notify 1',
        title:"title of notify 1"
        
      },
      {
        isDivider: true
      },
      {
        icon: mdiMessageAlert,
        label: 'notify',
        content:'i am notify 2',
        title:"title of notify2"
        
      },
      {
        isDivider: true
      },
      {
        icon: mdiMessageAlert,
        label: 'notify',
        content:'i am notify 3',
        title:"notify 3"
        
      },
      {
        isDivider: true
      }
    ]
  },
  // {
  //   icon: mdiLogout,
  //   label: 'Log out',
  //   isDesktopNoLabel: true,
  //   isLogout: true
  // },
]
