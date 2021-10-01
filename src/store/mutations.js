const mutations = {
  /** 카테고리 리스트 SET 하기 */
  updateCategory(state, category) {
    const categories = []
    categories.push(category)
    state.admin.categories = categories
  },
}
export default mutations
