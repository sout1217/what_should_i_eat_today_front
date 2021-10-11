import { getInstanceWithAuth } from '@/api'
import { empty } from '@/util'

let instance = getInstanceWithAuth()

function getQnas(page = 0, size = 10, title = '', qnaStatus = '') {
  return instance.get('v1/qnas', {
    params: {
      page: page,
      size: size,
      title: title,
      qnaStatus: qnaStatus,
    },
  })
}

function getQna(id) {
  if (empty(id)) return

  return instance.get(`v1/qnas/${id}`)
}

export { getQnas, getQna }
export default class qnaApi {}
