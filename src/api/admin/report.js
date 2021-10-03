import { getInstanceWithAuth } from '@/api'
import { empty } from '@/util'

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

function getReport(id) {
  if (empty(id)) return

  return instance.get(`v1/reports/${id}`)
}

function updateReportStatus(id, status) {
  return instance.put(`v1/reports/${id}`, {
    status: status,
  })
}

export { getReports, getReport, updateReportStatus }
