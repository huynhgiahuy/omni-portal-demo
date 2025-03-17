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
    icon: 'form',
    routes: [
      {
        path: '/omni-channel/search-page',
        name: 'SearchPage',
        component: './SearchPage/SearchPage',
      },
      {
        path: '/omni-channel/search-page/company-profile/:symbol',
        component: './CompanyProfilePage/CompanyProfilePage',
      },
      {
        path: '/omni-channel/403',
        name: '403Page',
        component: './403',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/user/login',
  },
  {
    component: './404',
  },
];
