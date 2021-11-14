import { getInstanceWithAuth } from '@/api'

let instanceWithAuth = getInstanceWithAuth()

/** 신고하기 */
function report(data) {
  return instanceWithAuth.post('v1/reports/', data)
}

export default {
  report,
}
