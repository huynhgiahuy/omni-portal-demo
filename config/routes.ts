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
    icon: 'smile',
    routes: [
      {
        path: '/omni-channel/report',
        name: 'report',
        component: './omni-channel/report/index'
      },
      {
        path: '/omni-channel/setting',
        name: 'setting',
        component: './omni-channel/setting/index',
      },
    ],
  },
  {
    path: '/',
    redirect: '/omni-channel',
  },
  {
    component: './404',
  },
];
