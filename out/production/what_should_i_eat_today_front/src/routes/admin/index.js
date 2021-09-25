// icon : https://pictogrammers.github.io/@mdi/font/5.4.55/
export const AdminLayout = {
  path: '/admin',
  component: () => import('@/views/admin/layouts/default/Index'),
  children: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/admin/page/HomePage'),
      meta: {
        icon: 'mdi-view-dashboard',
      },
    },
    {
      path: 'report',
      name: 'Report',
      component: () => import('@/views/admin/page/Report'),
      meta: {
        icon: 'mdi-view-dashboard',
      },
    },
  ],
}
