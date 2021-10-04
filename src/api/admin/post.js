import { getInstanceWithAuth } from '@/api'

let instance = getInstanceWithAuth()

function getPost(id) {
  return instance.get(`v1/posts/${id}`)
}

export { getPost }
