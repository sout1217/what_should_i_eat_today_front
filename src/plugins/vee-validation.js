import Vue from 'vue'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  min,
  required,
  digits,
  numeric,
  email,
  confirmed,
} from 'vee-validate/dist/rules'

// 커스텀 validation
extend('limit', (value, params) => {
  const [min, max] = params
  if ((value && value.length < min) || value.length > max) {
    return `{_field_} 필드는 ${min}자 ~ ${max}자를 초과할 수 없습니다`
  }
  return true
})

// 이미 존재하는 validation + message overriding
extend('min', {
  ...min,
  message: '{_filed_} 필드는 { length }자 미만일 수 없습니다', // _filed_ 는 provider 의 name 이다
})

extend('required', {
  ...required,
  message: '{_field_} 필드는 반드시 입력해야 합니다',
})

extend('required-select', {
  ...required,
  message: '{_field_} 필드는 반드시 선택해야 합니다',
})

extend('numeric', {
  ...numeric,
  message: '{_field_} 필드는 숫자로만 구성되어야 합니다',
})
extend('digits', {
  ...digits,
  message: '{_field_} 필드는 11자리 여야 합니다',
})

extend('email', {
  ...email,
  message: '잘못 입력된 이메일 주소 입니다',
})

// provider 에 :rules="{ confirmed: 'provider name 명을 적어주면 된다'}"
extend('confirmed', {
  ...confirmed,
  message: '비밀번호와 비밀번호확인이 일치하지 않습니다',
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
