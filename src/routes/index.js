/**
 * @see https://router.vuejs.org/guide/essentials/navigation.html
 * */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/components',
      component: () => import('@/views/ComponentPage.vue'),
    },
    {
      path: '/components2',
      component: () => import('@/views/ComponentPage2.vue'),
    },
  ],
})
