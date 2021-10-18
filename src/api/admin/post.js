import { getInstanceWithAuth } from '@/api'

let instance = getInstanceWithAuth()

function getPost(id) {
  return instance.get(`v1/posts/${id}`)
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

export {
  getPost,
  likePost,
  cancelLikd,
  favoritePost,
  unfavoritePost,
  deletePost,
}
