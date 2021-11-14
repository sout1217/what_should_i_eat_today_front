import categoriesApi from '@/api/admin/categories'
import foodApi from '@/api/admin/foods'
import countriesApi from '@/api/admin/countries'
import tagsApi from '@/api/admin/tags'
import meApi from '@/api/member/me'
import postApi from '@/api/member/post'
import reviewApi from '@/api/member/review'
import reportApi from '@/api/member/report'

const actions = {
  /** 내 정보 조회 */
  async GET_ME({ commit }) {
    const { data: member } = await meApi.getMe()
    commit('updateMe', member)
  },

  /** 랜덤 음식들 가져오기  */
  async GET_RANDOM_POSTS({ commit }) {
    console.log(commit)
    const { data } = await postApi.getRandomPosts()
    return data
  },

  /** Admin 카테고리 가져오기*/
  async GET_CATEGORIES_BY_ID({ commit }, categoryId) {
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
  async GET_FOODS_BY_CATEGORY_ID(
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

  /** Admin 태그와 국가가 있는 음식 가져오기 */
  async GET_FOODS_WITH_TAGS_AND_COUNTRY(
    { commit },
    { formData, page = 0, size = 10 },
  ) {
    console.log(commit)
    const { data: foodsPage } = await foodApi.findAllWithTagsAndCountry(
      formData,
      page,
      size,
    )
    return foodsPage
  },

  /** Admin 국가 리스트 가져오기 */
  async GET_COUNTRY() {
    const { data: countries } = await countriesApi.getCountries()
    return countries
  },

  /** Admin 태그 리스트 가져오기 */
  async GET_TAGS() {
    const { data: tags } = await tagsApi.getTags()
    return tags
  },

  /** Admin FoodCategory 매핑 업데이트 */
  async UPDATE_FOOD_CATEGORY_MAPPING({ commit }, { categoryId, ...param }) {
    console.log(commit)
    console.log(param)

    await categoriesApi.updateFoodCategoryMapping(categoryId, param)

    // todo : 2021.10.12 백엔드 로직 만들기
  },

  /** All 최근 올라온 음식 글 가져오기 */
  async GET_RECENTLY_POSTS({ commit }, page) {
    console.log(commit)
    const { data: postsPage } = await postApi.getRecentlyPosts(page)
    return postsPage
  },

  /** POST 1개 가져오기 */
  async GET_POST({ commit }, postId) {
    console.log(commit)
    const { data: post } = await postApi.getPost(postId)
    return post
  },

  /** 현재 음식에 대한 최근 POST 가져오기 */
  async GET_RECENT_POSTS_OF_CURRENT_FOOD({ commit }, { foodId, page }) {
    console.log(commit)
    const { data: post } = await postApi.getRecentPostsOfCurrentFood({
      foodId,
      page,
    })
    return post
  },

  /** 글에 대한 댓글 작성 */
  async WRITE_REVIEW_FOR_POST({ commit }, { postId, content }) {
    console.log(commit)
    const { data: result } = await reviewApi.writeReviewForPost(postId, content)
    return result
  },

  /** 게시물에 대한 리뷰 가져오기  */
  async GET_REVIEWS_FOR_POST({ commit }, { postId, page }) {
    console.log(commit)
    const { data: reviewPageAndTotalCount } = await reviewApi.getReviewsForPost(
      postId,
      page,
    )
    return reviewPageAndTotalCount
  },

  /** 리뷰에 대한 자식 리뷰 가져오기 */
  async GET_REVIEWS_FOR_REVIEW({ commit }, { postId, reviewId }) {
    console.log(commit)
    const { data: reviews } = await reviewApi.getReviewsForReview(
      postId,
      reviewId,
    )
    return reviews
  },

  /** 댓글에 대한 답글 작성 */
  async WRITE_REVIEW_FOR_REVIEW({ commit }, { postId, reviewId, content }) {
    console.log(commit)
    const { data: result } = await reviewApi.writeReviewForReview(
      postId,
      reviewId,
      content,
    )
    return result
  },

  /** 리뷰 수정하기 */
  async UPDATE_REVIEW({ commit }, { reviewId, content }) {
    console.log(commit)
    await reviewApi.updateReview(reviewId, content)
  },

  /** 리뷰 삭제하기 */
  async DELETE_REVIEW({ commit }, reviewId) {
    console.log(commit)
    await reviewApi.deleteReview(reviewId)
  },
  /** 신고하기 */
  async DO_REPORT({ commit }, data) {
    console.log(commit)
    await reportApi.report(data)
  },
}

export default actions
