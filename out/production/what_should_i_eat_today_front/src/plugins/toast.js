import VueToast from 'vue-toast-notification'
import Vue from 'vue'
import 'vue-toast-notification/dist/theme-sugar.css'

// 훅이 필요할 때 사용합니다.
const swichers = {
  created: true,
  beforeMount: true,
  mounted: true,
  destroyed: true,
}

let plugin = {}
// options은 인스턴스 생성시 넘겨주는 options 값 입니다. => 별도 설정이 필요할 경우 사용합니다.
plugin.install = function (Vue, options) {
  Object.assign(swichers, options)

  let common = {
    position: 'top-right',
    duration: 3000,
    dismissible: true,
    onClick: undefined,
    onDismiss: undefined,
    queue: false,
    pauseOnHover: true,
  }

  Vue.prototype.$toastSuccess = function (message, options) {
    let config = {
      message: message,
      type: 'success',
    }

    Object.assign(config, common)
    Object.assign(config, options)

    this.$toast.open(config)
  }

  Vue.prototype.$toastWarning = function (message, options) {
    let config = {
      message: message,
      type: 'warning',
    }

    Object.assign(config, common)
    Object.assign(config, options)

    this.$toast.open(config)
  }

  Vue.prototype.$toastError = function (message, options) {
    let config = {
      message: message,
      type: 'error',
    }

    Object.assign(config, common)
    Object.assign(config, options)

    this.$toast.open(config)
  }

  // 전역 메소드
  Vue.myGlobalMethod = function () {}
}

Vue.use(VueToast)
Vue.use(plugin)
