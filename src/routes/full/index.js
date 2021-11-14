// icon : https://pictogrammers.github.io/@mdi/font/5.4.55/
export const FullPageLayout = {
  path: '/',
  component: () => import('@/views/layouts/full/Index'),
  children: [
    {
      path: '/401',
      name: 'AuthenticationPage',
      component: () => import('@/views/page/ErrorPage'),
      meta: {
        icon: 'mdi-view-dashboard',
      },
    },
    {
      path: '/402',
      name: 'AuthorizePage',
      component: () => import('@/views/page/ErrorPage'),
      meta: {
        icon: 'mdi-view-dashboard',
      },
    },
    {
      path: '/404',
      name: 'NotFoundPage',
      component: () => import('@/views/page/ErrorPage'),
      meta: {
        icon: 'mdi-view-dashboard',
      },
    },
    {
      path: '/500',
      name: 'ServerErrorPage',
      component: () => import('@/views/page/ErrorPage'),
      meta: {
        icon: 'mdi-view-dashboard',
      },
    },
    {
      path: '/login',
      name: 'SignUpPage',
      component: () => import('@/views/page/SignupPage'),
      meta: {
        icon: 'mdi-view-dashboard',
      },
    },
  ],
}
