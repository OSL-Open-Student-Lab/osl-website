import { Dayjs } from 'dayjs'

export const PageLevelValue = {
  month: 1,
  year: 2,
  decade: 3
}
export const PageLevelName = {
  month: 'month',
  year: 'year',
  decade: 'decade'
}
export type PageLevelType = keyof typeof PageLevelName

export interface PageProps {
  initialDate: Dayjs
  onSelect?: (selectedDate: Dayjs) => void
  selectedDate?: Dayjs
  minDate?: Dayjs
  maxDate?: Dayjs
  disabledDays?: string[]
}
