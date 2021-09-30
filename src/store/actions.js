import categoriesApi from '@/api/admin/categories'

const actions = {
  /** Admin 카테고리 가져오기*/
  async FIND_BY_CATEGORY({ commit }) {
    const { data } = await categoriesApi.findByCategory()
    commit('setCategory', data)
  },
}

export default actions
