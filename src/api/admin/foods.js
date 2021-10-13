import { getInstanceWithAuth } from '@/api'

const axios = getInstanceWithAuth()

function findAll(page = 0, size = 10) {
  return axios.get('/v1/foods', {
    params: {
      page,
      size: isMaxPage(size),
    },
  })
}

/** Admin 태그와 국가가 있는 음식 가져오기 */
function findAllWithTagsAndCountry(formData, page = 0, size = 10) {
  return axios.get('/v1/foods/tags-country', {
    params: {
      ...formData,
      page,
      size: isMaxPage(size),
    },
  })
}

/**
 * 카테고리에 해당하는 음식 조회하기 (페이지)
 * @param { number } page
 * @param { number } size
 * @param { number } categoryId
 * */
function findAllByCategoryId(categoryId, page = 0, size = 10) {
  return axios.get(`/v1/foods/categories/${categoryId}`, {
    params: {
      page,
      size: isMaxPage(size),
    },
  })
}

/** size 가 -1 인 경우 max page 로 설정하여 요청한다 */
function isMaxPage(size) {
  const PER_PAGE_MAX = 2000
  return size === -1 ? PER_PAGE_MAX : size
}

export default {
  findAll,
  findAllByCategoryId,
  findAllWithTagsAndCountry,
}
