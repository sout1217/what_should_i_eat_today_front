import { getInstanceWithAuth } from '@/api'

let instance = getInstanceWithAuth()

function getMember(id) {
  return instance.get(`v1/members/${id}`)
}

export { getMember }
