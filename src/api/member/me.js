import { getInstanceWithAuth } from '@/api'
import store from '@/store/index'

let axios = getInstanceWithAuth()

/** 멤버 자기자신 조회 */
function getMe() {
  console.log(store.state.token)
  return axios.get('v1/me')
}

export default { getMe }
