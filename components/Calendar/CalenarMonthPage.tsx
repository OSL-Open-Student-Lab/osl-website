import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import { Dayjs } from 'dayjs'
import classNames from 'classnames'

import { PageProps } from './CalendarTypes'

export function MonthPage({
  initialDate,
  onSelect,
  selectedDate,
  minDate,
  maxDate,
  disabledDays
}: PageProps): JSX.Element {
  return (
    <>
      {Array(6)
        .fill(initialDate.startOf('week'))
        .map((week: Dayjs, weekIndex: number) => {
          const currentWeekStart = week.add(weekIndex, 'week')
          return (
            <ButtonGroup key={weekIndex} className="h-100">
              {Array(7)
                .fill(currentWeekStart)
                .map((day: Dayjs, dayIndex: number) => {
                  const currentDay = day.add(dayIndex, 'day')
                  const isSelected = currentDay.isSame(selectedDate)
                  const isToday = currentDay.isToday()
                  const isWeekEnd = currentDay.isoWeekday() > 5
                  const isInCurrentMonth = currentDay.isSame(
                    initialDate,
                    'month'
                  )
                  const isDisabled = disabledDays
                    ? disabledDays.includes(currentDay.format('DD.MM.YYYY'))
                    : false
                  const isAllowed =
                    (minDate ? minDate.isSameOrBefore(currentDay) : true) &&
                    (maxDate ? maxDate.isSameOrAfter(currentDay) : true)
                  let buttonVariant: string
                  switch (true) {
                    case isDisabled || !isAllowed:
                      buttonVariant = 'outline-secondary'
                      break
                    case isSelected:
                      buttonVariant = 'success'
                      break
                    case isToday:
                      buttonVariant = 'primary'
                      break
                    case isWeekEnd:
                      buttonVariant = 'outline-danger'
                      break
                    default:
                      buttonVariant = 'outline-primary'
                      break
                  }
                  return (
                    <Button
                      key={dayIndex}
                      variant={buttonVariant}
                      disabled={!isInCurrentMonth || !isAllowed || isDisabled}
                      className={classNames('w-100 border-0 rounded-0')}
                      onClick={() => onSelect && onSelect(currentDay)}>
                      {currentDay.format('D')}
                    </Button>
                  )
                })}
            </ButtonGroup>
          )
        })}
    </>
  )
}
