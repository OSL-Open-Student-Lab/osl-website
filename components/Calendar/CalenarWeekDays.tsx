import React from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import dayjs, { Dayjs } from 'dayjs'
import classNames from 'classnames'

export function WeekDays(): JSX.Element {
  return (
    <ButtonGroup className="w-100">
      {Array(7)
        .fill(dayjs().startOf('week'))
        .map((weekDay: Dayjs, index) => {
          const currentWeekDay = weekDay.add(index, 'day')
          const isWeekEnd = currentWeekDay.isoWeekday() > 5
          return (
            <Button
              key={index}
              disabled
              variant="link"
              className={classNames('text-decoration-none', {
                'text-danger': isWeekEnd
              })}
            >
              <span className="h3">
                {currentWeekDay.format('dd').toUpperCase()}
              </span>
            </Button>
          )
        })}
    </ButtonGroup>
  )
}
