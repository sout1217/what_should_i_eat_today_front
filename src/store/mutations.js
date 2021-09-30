const mutations = {
  /** 카테고리 리스트 SET 하기 */
  setCategory(state, category) {
    state.category.categories = [].concat([category])
  },
}
export default mutations
