import axios from 'axios'
import { Dayjs } from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

interface SheduleProps {
  bookedHours?: Array<[number, number]>
  date: Dayjs
  onSelectHours?: () => void
  facilityID: number
}

export function Shedule({
  date,
  bookedHours,
  onSelectHours,
  facilityID
}: SheduleProps): JSX.Element {
  const router = useRouter()
  const formattedDate = date.format('DD-MM-YYYY')
  const [selectedHourStart, setSelectedHourStart] = useState<
    number | undefined
  >()
  const [selectedHourEnd, setSelectedHourEnd] = useState<number | undefined>()
  useEffect(() => {
    setSelectedHourStart(undefined)
    setSelectedHourEnd(undefined)
  }, [date])

  function selectHandler(hour: number) {
    return function () {
      if (!selectedHourStart) {
        return setSelectedHourStart(hour)
      }
      if (!selectedHourEnd) {
        return setSelectedHourEnd(hour)
      }
      return
    }
  }
  const allowedHours = Array(24)
    .fill(null)
    .map((_hour, index) => index + 1)
    .filter((hour) => {
      if (bookedHours) {
        for (const book of bookedHours) {
          if (book[0] <= hour && hour < book[1]) return false
        }
      }
      if (hour <= selectedHourStart! || hour >= selectedHourEnd!) return false
      return true
    })
  async function queueFetcher() {
    await axios
      .post(
        'http://localhost:5000/api/v1/queue',
        {
          facility_id: facilityID,
          from_date: `${formattedDate} ${selectedHourStart}:00`,
          to_date: `${formattedDate} ${selectedHourEnd}:00`
        },
        { withCredentials: true }
      )
      .then(() => router.push('/facilities'))
      .catch(() => false)
  }
  return (
    <div className="d-inline w-50">
      <div>{`Выбранное время от ${selectedHourStart ?? '__'}:00 до ${
        selectedHourEnd ?? '__'
      }:00`}</div>

      {(!selectedHourStart || !selectedHourEnd) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
          {allowedHours.map((hour) => {
            const checked =
              selectedHourStart &&
              selectedHourEnd &&
              selectedHourStart <= hour &&
              selectedHourEnd >= hour
            return (
              <Button
                key={hour}
                onClick={selectHandler(hour)}
                variant={checked ? 'danger' : 'outline-danger'}
                className="rounded-0 px-3">
                {hour}
              </Button>
            )
          })}
        </div>
      )}
      <div>
        {(selectedHourStart || selectedHourEnd) && (
          <Button
            variant="danger"
            onClick={() => {
              setSelectedHourStart(undefined)
              setSelectedHourEnd(undefined)
            }}>
            Сброс
          </Button>
        )}
        {selectedHourStart && selectedHourEnd && (
          <Button className="ms-5" onClick={queueFetcher}>
            Отправить
          </Button>
        )}
      </div>
    </div>
  )
}
