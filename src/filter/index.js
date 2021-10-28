/**
 * filters
 *
 * date : 2021-08-04
 * */

import Vue from 'vue'
import {
  LocalDate,
  LocalTime,
  LocalDateTime,
  DateTimeFormatter,
  ChronoUnit,
} from 'js-joda'
const yyyymmddFormmater = DateTimeFormatter.ofPattern('yyyy.MM.dd')

Vue.filter('visibleFilter', visibleFilter) /** 노출여부 필터 */
Vue.filter('yyyymmdd', yyyymmdd) /** yyyy.mm.dd 필터 */
Vue.filter('join', join) /** yyyy.mm.dd 필터 */
Vue.filter('untillNow', untillNow) /** yyyy.mm.dd 필터 */

/**
 * @description 노출여부
 * @param { boolean } value
 * */
function visibleFilter(value) {
  return value ? '노출' : '숨김'
}

/**
 * @description [year, month, day, hh, mm ,dd, ms] -> year.month.day - https://js-joda.github.io/js-joda/manual/formatting.html
 * @param { Array<number> } arr
 * */
function yyyymmdd(arr) {
  const sliceDate = arr.slice(0, 3)
  const sliceTime = arr.slice(3)
  const d = LocalDate.of(...sliceDate)
  const t = LocalTime.of(...sliceTime)

  return LocalDateTime.of(d, t).format(yyyymmddFormmater)
}

/**
 * @description [year, month, day, hh, mm ,dd, ms] -> year.month.day - https://js-joda.github.io/js-joda/manual/formatting.html
 * @param { Array<number> } arr
 * */
function untillNow(arr) {
  const sliceDate = arr.slice(0, 3)
  const sliceTime = arr.slice(3)

  const d = LocalDate.of(...sliceDate)
  const t = LocalTime.of(...sliceTime)

  return LocalDateTime.now().until(LocalDateTime.of(d, t), ChronoUnit.DAYS)
}

/**
 * @description 배열 합치기
 * @param { string[] } arr
 * @param { string } delimiter
 * */
function join(arr, delimiter = ', ') {
  return arr.join(delimiter)
}
