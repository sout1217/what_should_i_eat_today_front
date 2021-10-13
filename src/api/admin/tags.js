import { getInstanceWithAuth } from '@/api'

const axios = getInstanceWithAuth()

function getTags() {
  return axios.get('/v1/tags')
}

export default {
  getTags,
}
