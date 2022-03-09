import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import dayjs, { Dayjs } from 'dayjs'
import { PageProps } from './CalendarTypes'

export function YearPage({
  initialDate,
  onSelect,
  minDate,
  maxDate,
  selectedDate
}: PageProps): JSX.Element {
  return (
    <>
      {Array(6)
        .fill(initialDate.startOf('year'))
        .map((monthPair: Dayjs, monthPairIndex: number) => (
          <ButtonGroup key={monthPairIndex} className="h-100">
            {Array(2)
              .fill(monthPair)
              .map((month: Dayjs, monthIndex: number) => {
                const currentMonth = month.add(
                  2 * monthPairIndex + monthIndex,
                  'month'
                )
                const isAllowed =
                  (minDate
                    ? minDate.startOf('month').isSameOrBefore(currentMonth)
                    : true) &&
                  (maxDate
                    ? maxDate.endOf('month').isSameOrAfter(currentMonth)
                    : true)
                const isSelected = currentMonth.isSame(
                  selectedDate?.startOf('month')
                )
                const isToday = currentMonth.isSame(dayjs().startOf('month'))

                let buttonVariant: string
                switch (true) {
                  case !isAllowed:
                    buttonVariant = 'outline-secondary'
                    break
                  case isSelected:
                    buttonVariant = 'success'
                    break
                  case isToday:
                    buttonVariant = 'primary'
                    break
                  default:
                    buttonVariant = 'outline-primary'
                    break
                }
                return (
                  <Button
                    key={2 * monthPairIndex + monthIndex}
                    variant={buttonVariant}
                    disabled={!isAllowed}
                    className="w-100 border-0 rounded-0"
                    onClick={() => onSelect && onSelect(currentMonth)}>
                    {currentMonth.format('MMMM')}
                  </Button>
                )
              })}
          </ButtonGroup>
        ))}
    </>
  )
}
