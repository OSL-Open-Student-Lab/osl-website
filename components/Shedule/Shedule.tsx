import axios from 'axios'
import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'

interface SheduleProps {
  date: Dayjs
}

export function Shedule({ date }: SheduleProps): JSX.Element {
  const [bookedHours, setBookedHours] = useState<unknown>()
  const formattedDate = date.format('DD-MM-YYYY')
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/queries/${formattedDate}`, {
        withCredentials: true
      })
      .then((response) => {
        setBookedHours(response.data.data)
      })
      .catch(() => false)
  }, [date])

  return (
    <ButtonGroup vertical>
      {Array(24)
        .fill(null)
        .map((_item, index) => (
          <Button key={formattedDate + '|' + index}>{index + 1}</Button>
        ))}
    </ButtonGroup>
  )
}
