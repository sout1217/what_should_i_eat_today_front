// icon : https://pictogrammers.github.io/@mdi/font/5.4.55/
export const DefaultLayout = {
  path: '/',
  component: () => import('@/views/layouts/default/Index'),
  children: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/page/HomePage'),
      meta: {
        icon: 'mdi-view-dashboard',
      },
    },
    {
      path: '/components',
      name: 'ComponentPage',
      component: () => import('@/views/page/ComponentPage'),
    },
    {
      path: '/components2',
      name: 'ComponentPage',
      component: () => import('@/views/page/ComponentPage2'),
    },
  ],
}
