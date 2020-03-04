export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      name: 'forms',
      displayName: 'New Account',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-forms',
      },
      disabled: true,
      children: [
        {
          name: 'form-elements',
          displayName: 'Add',
        },
      ],
    },
    {
      name: 'tables',
      displayName: 'Users',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-tables',
      },
      children: [
        {
          name: 'markup',
          displayName: 'Professors',
        },
        {
          name: 'data',
          displayName: 'Students',
        },
      ],
    },
    {
      name: 'timelines',
      displayName: 'Admin Profile',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-ui-elements',
      },
    },
  ],
}
