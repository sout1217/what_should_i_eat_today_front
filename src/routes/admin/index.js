// icon : https://pictogrammers.github.io/@mdi/font/5.4.55/
export const AdminLayout = {
  path: '/admin',
  component: () => import('@/views/admin/layouts/default/Index'),
  children: [
    {
      path: '/',
      name: 'DashBoard',
      component: () => import('@/views/admin/page/HomePage'),
      meta: {
        icon: 'mdi-view-dashboard',
        title: '대시보드',
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
    {
      path: 'category',
      component: () => import('@/views/admin/page/category/Category'),
      meta: {
        icon: 'mdi-view-dashboard',
        title: '카테고리',
      },
      children: [
        {
          path: '',
          name: 'CategoryListPage',
          component: () =>
            import('@/views/admin/page/category/CategoryListPage'),
          meta: {
            icon: 'mdi-view-dashboard',
            title: '목록보기',
          },
        },
        {
          path: 'write',
          name: 'CategoryWritePage',
          component: () =>
            import('@/views/admin/page/category/CategoryWritePage'),
          meta: {
            icon: 'mdi-view-dashboard',
            title: '작성하기',
          },
        },
      ],
    },
  ],
}
