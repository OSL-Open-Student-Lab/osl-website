import { useMemo } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import dayjs, { Dayjs } from 'dayjs'

import { PageLevelName, PageLevelType, PageLevelValue } from './CalendarTypes'

export interface ControlsProps {
  pageTypeSetter: React.Dispatch<React.SetStateAction<PageLevelType>>
  dateSetter: React.Dispatch<React.SetStateAction<Dayjs>>
  currentPageType: PageLevelType
  currentDate: Dayjs
  minDate?: Dayjs | null
  maxDate?: Dayjs | null
}

export function Controls({
  pageTypeSetter,
  dateSetter,
  currentPageType,
  currentDate,
  minDate,
  maxDate
}: ControlsProps): JSX.Element {
  const formattedDate = useMemo(() => {
    switch (currentPageType) {
      case PageLevelName.month:
        return currentDate.format('MMMM YYYY')
      case PageLevelName.year:
        return currentDate.format('YYYY')
      case PageLevelName.decade:
        return `${dayjs()
          .year(Math.floor(currentDate.year() / 10) * 10)
          .format('YYYY')}-${dayjs()
          .year(Math.ceil(currentDate.year() / 10) * 10 - 1)
          .format('YYYY')}`
    }
  }, [currentPageType, currentDate])

  function prevHandler() {
    const newMonth = currentDate.subtract(1, 'month')
    const newYear = currentDate.subtract(1, 'year')
    const newDecade = currentDate.subtract(10, 'year')
    switch (currentPageType) {
      case PageLevelName.month:
        if (!minDate || newMonth.startOf('month').isSameOrAfter(minDate)) {
          dateSetter(newMonth)
        }
        break
      case PageLevelName.year:
        if (!minDate || newYear.startOf('year').isSameOrAfter(minDate)) {
          dateSetter(newYear)
        }
        break
      case PageLevelName.decade:
        if (!minDate || newDecade.year() + 9 >= minDate?.year()) {
          dateSetter(newDecade)
        }
        break
    }
  }

  function nextHandler() {
    const newMonth = currentDate.add(1, 'month')
    const newYear = currentDate.add(1, 'year')
    const newDecade = currentDate.add(10, 'year')
    switch (currentPageType) {
      case PageLevelName.month:
        if (!maxDate || newMonth.endOf('month').isSameOrBefore(maxDate)) {
          dateSetter(newMonth)
        }
        break
      case PageLevelName.year:
        if (!maxDate || newYear.endOf('year').isSameOrBefore(maxDate)) {
          dateSetter(newYear)
        }
        break
      case PageLevelName.decade:
        if (!maxDate || newDecade.year() - 9 <= maxDate?.year()) {
          dateSetter(newDecade)
        }
        break
    }
  }

  function switchPageType() {
    switch (currentPageType) {
      case 'month':
        pageTypeSetter('year')
        break
      case 'year':
        pageTypeSetter('decade')
        break
      case 'decade':
        pageTypeSetter('year')
        break
    }
  }

  return (
    <ButtonGroup>
      <Button style={{ flexGrow: 1 }} onClick={prevHandler}>
        {'<'}
      </Button>
      <Button style={{ flexGrow: 5 }} onClick={switchPageType}>
        {formattedDate}
      </Button>
      <Button style={{ flexGrow: 1 }} onClick={nextHandler}>
        {'>'}
      </Button>
    </ButtonGroup>
  )
}
