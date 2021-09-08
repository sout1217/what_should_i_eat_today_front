// icon : https://pictogrammers.github.io/@mdi/font/5.4.55/
export const FullPageLayout = {
  path: '/',
  component: () => import('@/views/layouts/full/Index'),
  children: [
    {
      path: '/404',
      name: 'NotFoundPage',
      component: () => import('@/views/page/NotFoundPage'),
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
