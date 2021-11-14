import { getInstance, getInstanceWithAuth } from '@/api'

let instanceWithAuth = getInstanceWithAuth()
let instance = getInstance()

function getPostLikedByMe() {
  return instanceWithAuth.get('v1/posts/liked')
}

/** 즐겨찾기 한 글 가져오기 */
function getPostFavoriteByMe() {
  return instanceWithAuth.get('v1/posts/favorite')
}

/** 글 즐겨찾기 하기 */
function favoritePost(id) {
  return instanceWithAuth.post(`v1/posts/${id}/favorite`)
}

/** 글 즐겨찾기 삭제하기 */
function unfavoritePost(id) {
  return instanceWithAuth.delete(`v1/posts/${id}/favorite`)
}

/** 내가 작성한 글 가져오기 */
function getMyPost() {
  return instanceWithAuth.get('v1/posts/my')
}

/** 랜덤 post 가져오기 */
function getRandomPosts() {
  return instance.get('v1/posts/random')
}

/** 글 삭제하기 */
function deletePost(id) {
  return instanceWithAuth.delete(`v1/posts/${id}`)
}

/** 글 좋아요하기 */
function likePost(id) {
  return instanceWithAuth.post(`v1/posts/${id}/like`)
}

/** 글 좋아요 취소하기 */
function cancelLiked(id) {
  return instanceWithAuth.delete(`v1/posts/${id}/like`)
}

/** 내가 작성한 글 수 */
function countMyPost() {
  return instanceWithAuth.get(`v1/posts/my/count`)
}

/** 내가 좋아요 한 글 수 */
function countLikePost() {
  return instanceWithAuth.get(`v1/posts/liked/count`)
}

/** 내가 즐겨찾기한 글 수 */
function countFavoritePost() {
  return instanceWithAuth.get(`v1/posts/favorite/count`)
}

/** 최근에 올라온 글 가져오기 */
function getRecentlyPosts(page) {
  return instanceWithAuth.get('v1/posts/recently', { params: { page } })
}

/** Post 1개 가져오기 */
function getPost(postId) {
  return instanceWithAuth.get(`v1/posts/${postId}`)
}

/** 현재 음식에 대한 최근 POST 가져오기 */
function getRecentPostsOfCurrentFood({ foodId, page }) {
  return instanceWithAuth.get(`v1/posts/foods/${foodId}`, { params: { page } })
}

/** 포스트 업로드 하기 */
function uploadPost(form) {
  let form_data = new FormData()

  for (let key in form) {
    form_data.append(key, form[key])
  }

  return instanceWithAuth.post(`v1/posts`, form_data)
}

export default {
  getPostLikedByMe,
  getPostFavoriteByMe,
  getRandomPosts,
  getMyPost,
  deletePost,
  likePost,
  cancelLiked,
  favoritePost,
  unfavoritePost,
  countMyPost,
  countLikePost,
  countFavoritePost,
  getRecentlyPosts,
  getPost,
  getRecentPostsOfCurrentFood,
  uploadPost,
}
