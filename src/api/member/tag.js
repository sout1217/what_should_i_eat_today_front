import { getInstanceWithAuth } from '@/api'

const axios = getInstanceWithAuth()

/** 음식 리스트 검색 */
function getTags(search, page = 0, size = 10) {
  return axios.get(`/v2/tags`, {
    params: {
      search,
      page,
      size: size,
    },
  })
}

export { getTags }
