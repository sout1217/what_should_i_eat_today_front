import { getInstanceWithAuth } from '@/api'

const axios = getInstanceWithAuth()

/** 카테고리 생성하기 */
function create(payload) {
  console.log('payload -> ', payload)
  return axios.post('/v1/categories', payload)
}
/** 카테고리 조회하기 one */
function getCategory(categoryId) {
  return axios.get(`/v1/categories/${categoryId}`)
}

/** 카테고리 리스트 조회하기 (페이지) */
function getCategories(page = 1, size = 10, title = '') {
  return axios.get('/v1/categories', {
    params: {
      page,
      size: isMaxPage(size),
      title,
    },
    // params: { page, size: isMaxPage(size) },
  })
}

/** 카테고리 지우기 */
/** @param { number[] } categoryIds */
function deleteAllById(categoryIds) {
  return axios.delete('/v1/categories', {
    data: categoryIds,
  })
}

/** 카테고리 노출여부 수정 */
function updateVisibleOfCategory(category) {
  return axios.put('/v1/categories/visible', category)
}

/** size 가 -1 인 경우 max page 로 설정하여 요청한다 */
function isMaxPage(size) {
  const PER_PAGE_MAX = 2000
  return size === -1 ? PER_PAGE_MAX : size
}

export default {
  create,
  getCategory,
  getCategories,
  deleteAllById,
  updateVisibleOfCategory,
}
