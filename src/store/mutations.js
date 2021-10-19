const mutations = {
  /** 카테고리 리스트 SET 하기 */
  updateCategory(state, category) {
    const categories = []
    categories.push(category)
    state.admin.categories = categories
  },

  /** 내 정보 업데이트 */
  updateMe(state, member) {
    state.me = member
    // 메인 페이지로 올 경우 로컬 스토리지가 비워짐
  },

  /** 토큰 업데이트 */
  updateToken(state, token) {
    localStorage.setItem('wteToken', token)
    state.token = token
  },
}
export default mutations
