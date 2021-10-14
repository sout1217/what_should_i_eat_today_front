import { getInstanceWithAuth } from '@/api'

const axios = getInstanceWithAuth()

function getCountries() {
  return axios.get('/v1/countries')
}

export default {
  getCountries,
}
