import { getInstanceWithAuth } from '@/api'

let instance = getInstanceWithAuth()

function getReports(page = 0, size = 10, title = '', reportStatus = '') {
  return instance.get('v1/reports', {
    params: {
      page: page,
      size: size,
      title: title,
      reportStatus: reportStatus,
    },
  })
}

export { getReports }
