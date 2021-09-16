import { getInstanceWithAuth } from '@/api'

let instance = getInstanceWithAuth()

function getReports() {
  return instance.get('api/v1/reports')
}

export { getReports }
