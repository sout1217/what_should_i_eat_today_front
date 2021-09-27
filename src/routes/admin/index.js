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
        fullPath: '/admin',
        visible: true,
        auth: true,
      },
    },
    {
      path: 'category',
      component: () => import('@/views/admin/page/category/Category'),
      meta: {
        icon: 'mdi-view-list',
        title: '카테고리',
        visible: true,
      },
      children: [
        {
          path: '',
          name: 'CategoryList',
          component: () =>
            import('@/views/admin/page/category/CategoryListPage'),
          meta: {
            icon: 'mdi-form-select',
            title: '목록보기',
            fullPath: '/admin/category',
            visible: true,
            auth: true,
          },
        },
        {
          path: 'write',
          name: 'CategoryWrite',
          component: () =>
            import('@/views/admin/page/category/CategoryWritePage'),
          meta: {
            icon: 'mdi-square-edit-outline',
            title: '작성하기',
            fullPath: '/admin/category/write',
            visible: false,
            auth: true,
          },
        },
        {
          path: ':id',
          name: 'CategoryDetails',
          component: () =>
            import('@/views/admin/page/category/CategoryDetailsPage'),
          meta: {
            icon: 'mdi-square-edit-outline',
            title: '상세보기',
            fullPath: '/admin/category',
            visible: false,
            auth: true,
          },
        },
      ],
    },
    {
      path: 'report',
      name: 'Report',
      component: () => import('@/views/admin/page/Report'),
      meta: {
        icon: 'mdi-view-dashboard',
        title: '신고관리',
        fullPath: '/admin/report',
        visible: true,
        auth: true,
      },
    },
  ],
}
