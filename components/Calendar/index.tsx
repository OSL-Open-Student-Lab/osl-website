import React, { useState, useRef, useMemo } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import dayjs, { Dayjs } from 'dayjs'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import classNames from 'classnames'

import '../../packages/dayjsConfig'

import { usePrev } from '../../packages/hooks/usePrev'

export enum PageValue {
  month = 1,
  year = 2,
  decade = 3
}
export enum PageLevel {
  month = 'month',
  year = 'year',
  decade = 'decade'
}
export type PageType = keyof typeof PageValue

interface CalendarProps {
  minDate?: Dayjs
  maxDate?: Dayjs
  initialDate?: Dayjs
  selectedDate?: Dayjs
  onSelectDate?: (newSelectedDate: Dayjs) => void
  disabledDays?: string[]
  disabledFormat?: string
}

export function Calendar(props: CalendarProps) {
  const [pageType, setPageType] = useState<PageType>('month')
  const prevPageType = usePrev(pageType)
  const [date, setDate] = useState<Dayjs>(
    dayjs(props.initialDate).startOf('month')
  )
  const prevDate = usePrev(date)
  const [selectedDate, setSelectedDate] = useState<Dayjs>()

  const pageLayoutRef = useRef<any>(null)
  const pageWrapperRef = useRef<any>(null)
  const pageLayoutAnimType =
    PageValue[prevPageType] < PageValue[pageType] ? 'up' : 'down'

  const pageWrapperAnimType = useMemo(
    () => (prevDate.isBefore(date) ? 'next' : 'prev'),
    [prevDate, date]
  )

  const formattedDate = useMemo(
    () =>
      pageType === PageLevel.month
        ? date.format('MMMM YYYY')
        : pageType === PageLevel.year
        ? date.format('YYYY')
        : pageType === PageLevel.decade
        ? `${date.year(Math.floor(date.year() / 10) * 10).format('YYYY')}-${date
            .year(Math.ceil(date.year() / 10) * 10 - 1)
            .format('YYYY')}`
        : null,
    [pageType, date]
  )

  function prevHandler() {
    switch (pageType) {
      case 'month':
        setDate(date.subtract(1, 'month'))
        break
      case 'year':
        setDate(date.subtract(1, 'year'))
        break
      case 'decade':
        setDate(date.subtract(10, 'year'))
        break
    }
  }

  function nextHandler() {
    switch (pageType) {
      case 'month':
        setDate(date.add(1, 'month'))
        break
      case 'year':
        setDate(date.add(1, 'year'))
        break
      case 'decade':
        setDate(date.add(10, 'year'))
        break
    }
  }

  function switchPageType() {
    switch (pageType) {
      case 'month':
        setPageType('year')
        break
      case 'year':
        setPageType('decade')
        break
      case 'decade':
        setPageType('year')
        break
    }
  }

  function todayClickHandler() {
    setPageType('month')
    setDate(dayjs().startOf('month'))
    setSelectedDate(dayjs().startOf('day'))
  }

  return (
    <ButtonGroup className="calendar rounded border border-primary">
      <ButtonGroup vertical className={'w-100'}>
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

        <div
          className={`h-100 w-100 ${pageLayoutAnimType} ${pageWrapperAnimType} calendar-layout-wrapper`}>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={pageType}
              addEndListener={(done: any) => {
                pageLayoutRef.current.addEventListener(
                  'transitionend',
                  done,
                  null
                )
              }}
              in={true}
              nodeRef={pageLayoutRef}>
              <ButtonGroup
                vertical
                ref={pageLayoutRef}
                className={`w-100 h-100 page page-layout`}>
                {pageType === PageLevel.month ? <WeekDays /> : null}
                <SwitchTransition mode="out-in">
                  <CSSTransition
                    key={date.toISOString()}
                    addEndListener={(done: any) => {
                      pageWrapperRef.current.addEventListener(
                        'transitionend',
                        done,
                        null
                      )
                    }}
                    nodeRef={pageWrapperRef}
                    in={true}>
                    <ButtonGroup
                      ref={pageWrapperRef}
                      vertical
                      className={`w-100 h-100 page page-wrapper`}>
                      {pageType === PageLevel.month ? (
                        <>
                          <MonthPage
                            initialDate={date}
                            selectedDate={selectedDate}
                            onSelect={(newSelectedDate: Dayjs) =>
                              setSelectedDate(newSelectedDate)
                            }
                          />
                        </>
                      ) : null}
                      {pageType === PageLevel.year ? (
                        <>
                          <YearPage
                            initialDate={date}
                            selectedDate={selectedDate}
                            onSelect={(newSelectedDate: Dayjs) => {
                              setPageType('month')
                              setDate(newSelectedDate)
                            }}
                          />
                        </>
                      ) : null}
                      {pageType === PageLevel.decade ? (
                        <>
                          <DecadePage
                            initialDate={date}
                            selectedDate={selectedDate}
                            onSelect={(newSelectedDate: Dayjs) => {
                              setPageType('year')
                              setDate(newSelectedDate)
                            }}
                          />
                        </>
                      ) : null}
                    </ButtonGroup>
                  </CSSTransition>
                </SwitchTransition>
              </ButtonGroup>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <ButtonGroup className={'w-100'}>
          <Button onClick={todayClickHandler}>Сегодня</Button>
        </ButtonGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}

function WeekDays() {
  return (
    <ButtonGroup className={'w-100'}>
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
              })}>
              {currentWeekDay.format('dd').toUpperCase()}
            </Button>
          )
        })}
    </ButtonGroup>
  )
}

interface PageProps {
  initialDate: Dayjs
  onSelect?: (selectedDate: Dayjs) => void
  selectedDate?: Dayjs
  minDate?: Dayjs
  maxDate?: Dayjs
}

function MonthPage({
  initialDate,
  onSelect,
  selectedDate,
  minDate,
  maxDate
}: PageProps) {
  return (
    <>
      {Array(6)
        .fill(initialDate.startOf('week'))
        .map((week: Dayjs, weekIndex: number) => {
          const currentWeekStart = week.add(weekIndex, 'week')
          return (
            <ButtonGroup key={weekIndex}>
              {Array(7)
                .fill(currentWeekStart)
                .map((day: Dayjs, dayIndex: number) => {
                  const currentDay = day.add(dayIndex, 'day')
                  const isAllowed =
                    minDate && maxDate
                      ? currentDay.isSameOrAfter(minDate?.startOf('day')) &&
                        currentDay.isSameOrBefore(maxDate?.startOf('day'))
                      : true
                  const isSelected = currentDay.isSame(selectedDate)
                  const isToday = currentDay.isToday()
                  const isWeekEnd = currentDay.isoWeekday() > 5
                  const isInCurrentMonth = currentDay.isSame(
                    initialDate,
                    'month'
                  )
                  let buttonVariant: string = ''
                  switch (true) {
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
                      disabled={!isInCurrentMonth || !isAllowed}
                      className={classNames('w-100 border-0')}
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

function YearPage({
  initialDate,
  onSelect,
  minDate,
  maxDate,
  selectedDate
}: PageProps) {
  return (
    <>
      {Array(6)
        .fill(initialDate.startOf('year'))
        .map((monthPair: Dayjs, monthPairIndex: number) => (
          <ButtonGroup key={monthPairIndex}>
            {Array(2)
              .fill(monthPair)
              .map((month: Dayjs, monthIndex: number) => {
                const currentMonth = month.add(
                  2 * monthPairIndex + monthIndex,
                  'month'
                )
                const isAllowed =
                  minDate && maxDate
                    ? currentMonth.isSameOrAfter(minDate?.startOf('month')) &&
                      currentMonth.isSameOrBefore(maxDate?.endOf('month'))
                    : true

                const isSelected = currentMonth.isSame(
                  selectedDate?.startOf('month')
                )
                const isToday = currentMonth.isSame(dayjs().startOf('month'))

                let buttonVariant: string = ''
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

function DecadePage({
  initialDate,
  onSelect,
  minDate,
  maxDate,
  selectedDate
}: PageProps) {
  const startDate = initialDate
    .year(Math.floor(initialDate.year() / 10) * 10)
    .startOf('year')
  return (
    <>
      {Array(5)
        .fill(startDate)
        .map((yearPair, yearPairIndex) => (
          <ButtonGroup key={yearPairIndex}>
            {Array(2)
              .fill(yearPair)
              .map((year: Dayjs, yearIndex: number) => {
                const currentYear = year.add(
                  2 * yearPairIndex + yearIndex,
                  'year'
                )
                const isAllowed =
                  minDate && maxDate
                    ? year.isSameOrAfter(minDate?.startOf('year')) &&
                      year.isSameOrBefore(maxDate?.endOf('year'))
                    : true
                const isSelected = currentYear.isSame(
                  selectedDate?.startOf('year')
                )
                const isToday = currentYear.isSame(dayjs().startOf('year'))

                let buttonVariant: string = ''
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
                    disabled={!isAllowed}
                    variant={buttonVariant}
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
