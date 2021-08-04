/**
 * @see https://router.vuejs.org/guide/essentials/navigation.html
 * */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
  ],
});
