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
  return instance.post(`v1/posts/${id}/favorite`)
}

/** 글 즐겨찾기 삭제하기 */
function unfavoritePost(id) {
  return instance.delete(`v1/posts/${id}/favorite`)
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
  return instance.get(`v1/posts/my/count`)
}

/** 내가 좋아요 한 글 수 */
function countLikePost() {
  return instance.get(`v1/posts/liked/count`)
}

/** 내가 즐겨찾기한 글 수 */
function countFavoritePost() {
  return instance.get(`v1/posts/favorite/count`)
}

/** 최근에 올라온 글 가져오기 */
function getRecentlyPosts() {
  return instanceWithAuth.get('v1/posts/recently')
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
}
