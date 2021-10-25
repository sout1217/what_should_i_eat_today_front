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

export default {
  getPostLikedByMe,
  getPostFavoriteByMe,
  getMyPost,
  getRandomPosts,
}
