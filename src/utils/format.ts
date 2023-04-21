import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export function formatDate(utcDate: string) {
  return dayjs(utcDate).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}
