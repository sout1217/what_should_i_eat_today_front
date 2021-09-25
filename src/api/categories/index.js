import { getInstance } from '../index'
const axios = getInstance()

/** 카테고리 생성하기 */
function create(payload) {
  console.log('payload -> ', payload)
  return axios.post('/v1/categories', payload)
}

/** 카테고리 조회하기 (페이지) */
function getCategories(page = 1, size = 10) {
  return axios.get('/v1/categories', {
    params: { page, size: isMaxPage(size) },
  })
}

/** size 가 -1 인 경우 max page 로 설정하여 요청한다 */
function isMaxPage(size) {
  const PER_PAGE_MAX = 2000
  return size === -1 ? PER_PAGE_MAX : size
}

export default { create, getCategories }
