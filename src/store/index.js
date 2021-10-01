/**
 * vuex 파일 정의
 *
 * data : 2021-08-04
 * */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/store/actions'
import state from '@/store/state'
import mutations from '@/store/mutations'
import getters from '@/store/getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
