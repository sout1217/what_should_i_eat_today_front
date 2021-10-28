// icon : https://pictogrammers.github.io/@mdi/font/5.4.55/
// icon : https://vuetifyjs.com/en/features/icon-fonts/#installing-icon-fonts
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
    {
      path: '/mypage',
      name: 'MyPage',
      component: () => import('@/views/page/MyPage'),
    },
    {
      path: '/posts/:postId',
      name: 'PostDetailPage',
      component: () => import('@/views/page/PostDetailPage'),
    },
  ],
}
