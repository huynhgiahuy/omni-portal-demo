export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/omni-channel',
    name: 'omni-channel',
    icon: '/icons/omni_icon.svg',
    routes: [
      // {
      //   path: '/omni-channel/report',
      //   name: 'report',
      //   component: './omni-channel/report/index',
      // },
      {
        path: '/omni-channel/profile',
        name: 'profile',
        component: './omni-channel/setting/index',
      },
      {
        component: './403',
      },
    ],
  },
  {
    path: '/',
    redirect: '/omni-channel/profile',
  },
  {
    component: './403',
  },
];
