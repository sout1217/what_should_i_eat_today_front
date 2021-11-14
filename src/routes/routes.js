import { DefaultLayout } from '@/routes/default'
import { FullPageLayout } from '@/routes/full'
import { AdminLayout } from '@/routes/admin'
import store from '@/store/index'

const routes = [
  DefaultLayout,
  FullPageLayout,
  AdminLayout,
  {
    path: '/oauth2/redirect',

    /** 토큰을 저장 후 메인 페이지로 이동 */
    beforeEnter: (to, from, next) => {
      store.commit('updateToken', to.query.token)
      next('/')
    },
  },
  {
    path: '/logout',
    beforeEnter: (to, from, next) => {
      store.commit('deleteToken')
      next('/')
    },
  },
  {
    path: '*',
    redirect: '/404',
  },
]

export default routes
