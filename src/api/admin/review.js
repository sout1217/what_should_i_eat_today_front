import { getInstanceWithAuth } from '@/api'

let instance = getInstanceWithAuth()

function getReview(id) {
  return instance.get(`v1/reviews/${id}`)
}

export { getReview }
