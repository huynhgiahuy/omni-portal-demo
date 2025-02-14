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
      {
        path: '/omni-channel/search-page',
        name: 'Search Page',
        component: './SearchPage/SearchPage',
      },
      {
        path: '/omni-channel/search-page/company-profile/:symbol',
        component: './CompanyProfilePage/CompanyProfilePage',
      },
      {
        path: '/omni-channel/403',
        name: '403 Page',
        component: './403',
      },
    ],
  },
  {
    path: '/',
    redirect: '/user/login',
  },
  {
    component: './403',
  },
];
