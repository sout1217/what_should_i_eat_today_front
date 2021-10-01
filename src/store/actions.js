import categoriesApi from '@/api/admin/categories'
import foodApi from '@/api/admin/foods'

const actions = {
  /** Admin 카테고리 가져오기*/
  async FIND_CATEGORIES_BY_ID({ commit }, categoryId) {
    console.log(commit)
    const { data: category } = await categoriesApi.findById(categoryId)
    // commit('updateCategory', category)

    return category
  },

  /** Admin 카테고리 수정하기 */
  async UPDATE_CATEGORY({ commit }, { categoryId, ...formData }) {
    console.log(commit)
    return categoriesApi.updateCategory(categoryId, formData)
  },

  /** Admin 카테고리에 해당하는 음식 가져오기 */
  async FIND_FOODS_BY_CATEGORY_ID(
    { commit },
    { categoryId, page = 0, size = 10 },
  ) {
    console.log(commit)
    const { data: foodsPage } = await foodApi.findAllByCategoryId(
      categoryId,
      page,
      size,
    )
    return foodsPage
  },
}

export default actions
