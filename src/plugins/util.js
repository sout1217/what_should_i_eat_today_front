import Vue from 'vue'
import { empty, notEmpty } from '@/util/index'

let plugin = {}
// options은 인스턴스 생성시 넘겨주는 options 값 입니다. => 별도 설정이 필요할 경우 사용합니다.
plugin.install = function (Vue) {
  Vue.prototype.$isEmpty = empty
  Vue.prototype.$isNotEmpty = notEmpty
}

Vue.use(plugin)
