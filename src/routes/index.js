import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
import store from '@/store'

const ERROR_CODE = {
  400: {
    name: 'BadRequestPage',
    message: '400 잘못된 요청 페이지입니다',
  },
  401: {
    name: 'AuthenticationPage',
    message: '401 로그인이 필요한 페이지 입니다',
  },
  402: {
    name: 'AuthorizePage',
    message: '402 접근이 제한된 페이지 입니다',
  },
  404: {
    name: 'NotFoundPage',
    message: '404 페이지를 찾을 수 없습니다',
  },
  500: {
    name: 'ServerErrorPage',
    message: '500 알 수 없는 오류가 발생하였습니다',
  },
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = to.meta?.auth || false
  // 관리자 페이지 접근 시 뷰가드

  if (auth) {
    if (store.state.token) await store.dispatch('GET_ME')
    else {
      return next({
        name: ERROR_CODE['401'].name,
        params: { message: ERROR_CODE['401'].message },
      })
    }

    if (store.state.me.email !== 'test1@gmail.com')
      return next({
        name: ERROR_CODE['402'].name,
        params: { message: ERROR_CODE['402'].message },
      })
  }
  next()
})

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta?.title || to.name
  })
})

export default router
