import { getInstanceWithAuth } from '@/api'

let instanceWithAuth = getInstanceWithAuth()
// let instance = getInstance()

/** 게시물에 대한 리뷰 작성 */
function writeReviewForPost(postId, content) {
  return instanceWithAuth.post(`v1/reviews/posts/${postId}`, { content })
}

export default {
  writeReviewForPost,
}
