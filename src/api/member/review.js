import { getInstance, getInstanceWithAuth } from '@/api'

let instanceWithAuth = getInstanceWithAuth()
let instance = getInstance()

/** 게시물에 대한 리뷰 작성 */
function writeReviewForPost(postId, content) {
  return instanceWithAuth.post(`v1/reviews/posts/${postId}`, { content })
}

/** 게시물에 대한 리뷰 가져오기 */
function getReviewsForPost(postId, page = 0) {
  return instance.get(`v1/reviews/posts/${postId}`, {
    params: {
      page,
    },
  })
}

/** 리뷰에 대한 자식 리뷰 가져오기 */
function getReviewsForReview(postId, reviewId) {
  return instance.get(`v1/reviews/${reviewId}/posts/${postId}`)
}

/** 댓글에 대한 답글 작성 */
function writeReviewForReview(postId, reviewId, content) {
  return instanceWithAuth.post(`v1/reviews/${reviewId}/posts/${postId}`, {
    content,
  })
}

/** 댓글에 대한 답글 작성 */
function updateReview(reviewId, content) {
  return instanceWithAuth.put(`v1/reviews/${reviewId}`, {
    content,
  })
}

/** 댓글에 대한 답글 작성 */
function deleteReview(reviewId) {
  return instanceWithAuth.delete(`v1/reviews/${reviewId}`)
}

export default {
  writeReviewForPost,
  getReviewsForPost,
  getReviewsForReview,
  writeReviewForReview,
  updateReview,
  deleteReview,
}
