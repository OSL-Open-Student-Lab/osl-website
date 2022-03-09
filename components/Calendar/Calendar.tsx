import React, { useState, useRef, useMemo, useEffect } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'
import dayjs, { Dayjs } from 'dayjs'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import 'packages/dayjsConfig'

import { PageLevelName, PageLevelValue, PageLevelType } from './CalendarTypes'
import { useDidMountEffect } from 'packages/hooks/useDidMountEffect'
import { usePrev } from 'packages/hooks/usePrev'

import { Controls } from './CalendarControls'
import { WeekDays } from './CalenarWeekDays'
import { MonthPage } from './CalenarMonthPage'
import { YearPage } from './CalendarYearPage'
import { DecadePage } from './CalendarDecadePage'
export interface CalendarProps {
  minDate?: string
  maxDate?: string
  initialDate?: string
  initialSelectedDate?: string
  onSelectDate?: (newSelectedDate: string | undefined) => void
  disabledDays?: string[]
  selectedDate?: string[]
}
// ! DD-MM-YYYY HH:mm
export function Calendar({
  initialDate,
  onSelectDate,
  initialSelectedDate,
  minDate,
  maxDate,
  disabledDays
}: CalendarProps): JSX.Element {
  const processedInitialDate = initialDate
    ? dayjs(initialDate, 'DD.MM.YYYY')
    : dayjs()

  const [pageType, setPageLevelType] = useState<PageLevelType>('month')
  const prevPageLevelType = usePrev(pageType)

  const [date, setDate] = useState<Dayjs>(processedInitialDate.startOf('month'))
  const prevDate = usePrev(date)

  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(
    initialSelectedDate ? dayjs(initialSelectedDate) : undefined
  )

  const processedMinDate = minDate ? dayjs(minDate, 'DD.MM.YYYY') : undefined
  const processedMaxDate = maxDate ? dayjs(maxDate, 'DD.MM.YYYY') : undefined

  const pageLayoutRef = useRef<HTMLDivElement>(null)
  const pageWrapperRef = useRef<HTMLDivElement>(null)

  const pageLayoutAnimType =
    PageLevelValue[prevPageLevelType] < PageLevelValue[pageType] ? 'up' : 'down'

  const pageWrapperAnimType = useMemo(
    () => (prevDate.isBefore(date) ? 'next' : 'prev'),
    [prevDate, date]
  )

  useDidMountEffect(() => {
    if (onSelectDate) {
      onSelectDate(selectedDate?.format('DD.MM.YYYY'))
    }
  }, [selectedDate, onSelectDate])

  function todayClickHandler() {
    setPageLevelType('month')
    setDate(dayjs().startOf('month'))
    setSelectedDate(dayjs().startOf('day'))
  }

  const currnetPage = {
    [PageLevelName.month]: (
      <MonthPage
        initialDate={date}
        selectedDate={selectedDate}
        onSelect={(newSelectedDate: Dayjs) => setSelectedDate(newSelectedDate)}
        disabledDays={disabledDays}
        minDate={processedMinDate}
        maxDate={processedMaxDate}
      />
    ),
    [PageLevelName.year]: (
      <YearPage
        initialDate={date}
        selectedDate={selectedDate}
        onSelect={(newSelectedDate: Dayjs) => {
          setPageLevelType('month')
          setDate(newSelectedDate)
        }}
        minDate={processedMinDate}
        maxDate={processedMaxDate}
      />
    ),
    [PageLevelName.decade]: (
      <DecadePage
        initialDate={date}
        selectedDate={selectedDate}
        onSelect={(newSelectedDate: Dayjs) => {
          setPageLevelType('year')
          setDate(newSelectedDate)
        }}
        minDate={processedMinDate}
        maxDate={processedMaxDate}
      />
    )
  }
  return (
    <ButtonGroup className="calendar rounded rounded-3 border border-primary">
      <ButtonGroup vertical className={'w-100'}>
        <Controls
          pageTypeSetter={setPageLevelType}
          dateSetter={setDate}
          currentPageType={pageType}
          currentDate={date}
          minDate={processedMinDate}
          maxDate={processedMaxDate}
        />
        <div
          className={`h-100 w-100 ${pageLayoutAnimType} ${pageWrapperAnimType} calendar-layout-wrapper`}>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={pageType}
              addEndListener={(done) => {
                pageLayoutRef.current?.addEventListener('transitionend', done)
              }}
              in={true}
              nodeRef={pageLayoutRef}>
              <ButtonGroup
                vertical
                ref={pageLayoutRef}
                className={`w-100 h-100 page page-layout`}>
                {pageType === PageLevelName.month ? <WeekDays /> : null}
                <SwitchTransition mode="out-in">
                  <CSSTransition
                    key={date.toISOString()}
                    addEndListener={(done) => {
                      pageWrapperRef.current?.addEventListener(
                        'transitionend',
                        done
                      )
                    }}
                    nodeRef={pageWrapperRef}
                    in={true}>
                    <ButtonGroup
                      ref={pageWrapperRef}
                      vertical
                      className={`w-100 h-100 page page-wrapper`}>
                      {currnetPage[pageType]}
                    </ButtonGroup>
                  </CSSTransition>
                </SwitchTransition>
              </ButtonGroup>
            </CSSTransition>
          </SwitchTransition>
        </div>
        {dayjs().isSameOrAfter(dayjs(processedMinDate)) &&
        dayjs().isSameOrBefore(dayjs(processedMaxDate)) &&
        !(disabledDays
          ? disabledDays.includes(dayjs().format('DD.MM.YYYY'))
          : false) ? (
          <ButtonGroup className={'w-100'}>
            <Button onClick={todayClickHandler}>Сегодня</Button>
          </ButtonGroup>
        ) : null}
      </ButtonGroup>
    </ButtonGroup>
  )
}
