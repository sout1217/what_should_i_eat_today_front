/**
 * 공통 유틸 정의
 *
 * data : 2021-08-04
 * */
const empty = value => {
  if (value === null) return true
  if (typeof value === 'undefined') return true
  if (typeof value === 'string' && value === '') return true
  if (Array.isArray(value) && value.length < 1) return true
  if (
    typeof value === 'object' &&
    value.constructor.name === 'Object' &&
    Object.keys(value).length < 1 &&
    Object.getOwnPropertyNames(value) < 1
  )
    return true
  if (
    typeof value === 'object' &&
    value.constructor.name === 'String' &&
    Object.keys(value).length < 1
  )
    return true

  return false
}

const notEmpty = value => !empty(value)

export { notEmpty, empty }
