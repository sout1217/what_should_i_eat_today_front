import { getInstanceWithAuth } from '@/api'

let instance = getInstanceWithAuth()

function getPostLikedByMe() {
  return instance.get('v1/posts/liked')
}

function getPostFavoriteByMe() {
  return instance.get('v1/posts/favorite')
}

function getMyPost() {
  return instance.get('v1/posts/my')
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
