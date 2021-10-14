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

export { getPostLikedByMe, getPostFavoriteByMe, getMyPost }
