import { getInstanceWithAuth } from '@/api'

const axios = getInstanceWithAuth()

/** 음식 리스트 검색 */
function getFoods(search, page = 0, size = 10) {
  return axios.get(`/v1/foods`, {
    params: {
      search,
      page,
      size: isMaxPage(size),
    },
  })
}

function getFood(id) {
  return axios.get(`/v1/foods/${id}`)
}

/** size 가 -1 인 경우 max page 로 설정하여 요청한다 */
function isMaxPage(size) {
  const PER_PAGE_MAX = 2000
  return size === -1 ? PER_PAGE_MAX : size
}

export { getFoods, getFood }
