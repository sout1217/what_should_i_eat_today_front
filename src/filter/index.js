/**
 * filters
 *
 * date : 2021-08-04
 * */

import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.extend(CustomParseFormat)

// dayjs.updateLocale('ko', {
//   relativeTime: {
//     future: 'in %s',
//     past: '%d ago',
//     s: 'a few seconds',
//     m: 'a minute',
//     mm: '%d minutes',
//     h: 'an hour',
//     hh: '%d hours',
//     d: 'a day',
//     dd: '%d days',
//     M: 'a month',
//     MM: '%d months',
//     y: 'a year',
//     yy: '%d years',
//   },
// })
import {
  LocalDate,
  LocalTime,
  LocalDateTime,
  DateTimeFormatter,
  ChronoUnit,
} from 'js-joda'

const yyyymmddFormmater = DateTimeFormatter.ofPattern('yyyy.MM.dd')
const yyyymmddhhmmssFormmater = DateTimeFormatter.ofPattern(
  'yyyy.MM.dd HH:mm:ss',
)

Vue.filter('visibleFilter', visibleFilter) /** 노출여부 필터 */
Vue.filter('yyyymmdd', yyyymmdd) /** yyyy.mm.dd 필터 */
Vue.filter('yyyymmddhhmmss', yyyymmddhhmmss) /** yyyy.mm.dd 필터 */
Vue.filter('join', join) /** yyyy.mm.dd 필터 */
Vue.filter('untillNow', untillNow) /** yyyy.mm.dd 필터 */
Vue.filter('oneThousand', oneThousand) /** yyyy.mm.dd 필터 */
Vue.filter('to', to)

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

function yyyymmddhhmmss(arr) {
  if (!arr) return
  const sliceDate = arr.slice(0, 3)
  const sliceTime = arr.slice(3)
  const d = LocalDate.of(...sliceDate)
  const t = LocalTime.of(...sliceTime)

  return LocalDateTime.of(d, t).format(yyyymmddhhmmssFormmater)
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
 * @description number -> 1000 -> 1k, 1200 -> 1.2k
 * @param { Array<number> } arr
 * */
function oneThousand(number) {
  if (number < 1000) {
    return number
  }
  const division = Math.floor(number / 100) / 10

  return `${division}k`
}

/**
 * @description 배열 합치기
 * @param { string[] } arr
 * @param { string } delimiter
 * */
function join(arr, delimiter = ', ') {
  return arr.join(delimiter)
}

function to({ createdAt, updatedAt }) {
  if (!createdAt) return
  const createdAtDayJS = convert(createdAt)
  const updatedAtDayJS = convert(updatedAt)

  if (createdAtDayJS.isSame(updatedAtDayJS)) return createdAtDayJS.fromNow()
  else return updatedAtDayJS.fromNow() + ' (수정됨)'
}

/**
 * ★★★ format 형식 맞추기
 * https://day.js.org/docs/en/parse/string-format
 * */
function convert(arr) {
  if (!arr) return ''
  if (arr.constructor.name === 'Date') return dayjs(arr)
  return dayjs(arr.slice(0, 6).join('-'), 'YYYY-M-D-H-m-s', 'ko')
}
