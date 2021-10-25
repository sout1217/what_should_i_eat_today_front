import { getInstance, getInstanceWithAuth } from '@/api'

let instanceWithAuth = getInstanceWithAuth()
let instance = getInstance()

function getPostLikedByMe() {
  return instanceWithAuth.get('v1/posts/liked')
}

function getPostFavoriteByMe() {
  return instanceWithAuth.get('v1/posts/favorite')
}

function getMyPost() {
  return instanceWithAuth.get('v1/posts/my')
}

/** 랜덤 post 가져오기 */
function getRandomPosts() {
  return instance.get('v1/posts/random')
}

function deletePost(id) {
  return instance.delete(`v1/posts/${id}`)
}

function likePost(id) {
  return instance.post(`v1/posts/${id}/like`)
}

function cancelLikd(id) {
  return instance.delete(`v1/posts/${id}/like`)
}

function favoritePost(id) {
  return instance.post(`v1/posts/${id}/favorite`)
}

function unfavoritePost(id) {
  return instance.delete(`v1/posts/${id}/favorite`)
}

function countMyPost() {
  return instance.get(`v1/posts/my/count`)
}

function countLikePost() {
  return instance.get(`v1/posts/liked/count`)
}

function countFavoritePost() {
  return instance.get(`v1/posts/favorite/count`)
}

export {
  getPostLikedByMe,
  getPostFavoriteByMe,
  getRandomPosts,
  getMyPost,
  deletePost,
  likePost,
  cancelLikd,
  favoritePost,
  unfavoritePost,
  countMyPost,
  countLikePost,
  countFavoritePost,
}
