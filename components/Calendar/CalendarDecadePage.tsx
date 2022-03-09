import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import dayjs, { Dayjs } from 'dayjs'
import { PageProps } from './CalendarTypes'
export function DecadePage({
  initialDate,
  onSelect,
  minDate,
  maxDate,
  selectedDate
}: PageProps): JSX.Element {
  const startDate = initialDate
    .year(Math.floor(initialDate.year() / 10) * 10)
    .startOf('year')
  return (
    <>
      {Array(5)
        .fill(startDate)
        .map((yearPair, yearPairIndex) => (
          <ButtonGroup key={yearPairIndex} className="h-100">
            {Array(2)
              .fill(yearPair)
              .map((year: Dayjs, yearIndex: number) => {
                const currentYear = year.add(
                  2 * yearPairIndex + yearIndex,
                  'year'
                )
                const isAllowed =
                  (minDate
                    ? minDate.startOf('year').isSameOrBefore(currentYear)
                    : true) &&
                  (maxDate
                    ? maxDate.endOf('year').isSameOrAfter(currentYear)
                    : true)
                const isSelected = currentYear.isSame(
                  selectedDate?.startOf('year')
                )
                const isToday = currentYear.isSame(dayjs().startOf('year'))

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
                    key={2 * yearPairIndex + yearIndex}
                    variant={buttonVariant}
                    disabled={!isAllowed}
                    className={'w-100 border-0 rounded-0'}
                    onClick={() => onSelect && onSelect(currentYear)}>
                    {currentYear.format('YYYY')}
                  </Button>
                )
              })}
          </ButtonGroup>
        ))}
    </>
  )
}
