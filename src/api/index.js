/**
 * api 통신 function
 *
 * date : 2021-08-04
 * */
import axios from 'axios'
import { setInterceptors } from '@/api/common/interceptor'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

function getInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  })
}

// 인스턴스 요청
function getInstanceWithAuth() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  })
  return setInterceptors(instance)
}

export { getInstance, getInstanceWithAuth }
