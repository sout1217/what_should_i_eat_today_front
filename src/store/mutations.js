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
    state.isAuth = true
    // 메인 페이지로 올 경우 로컬 스토리지가 비워짐
  },

  /** 토큰 업데이트 */
  updateToken(state, token) {
    sessionStorage.setItem('wteToken', token)
    state.token = token
  },

  deleteToken(state) {
    sessionStorage.removeItem('wteToken')
    state.token = ''
  },
}
export default mutations
