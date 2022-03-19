import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Container } from 'react-bootstrap'

import 'packages/dayjsConfig'

import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { Calendar } from 'components/Calendar/Calendar'
import { Shedule } from 'components/Shedule/Shedule'
import { useAuth } from 'packages/hooks/useAuthAPI'

interface QueueSendingData {
  from_date?: string
  to_date?: string
  facility_id: number
}

const Home: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const router = useRouter()
  // useAuth(() => router.push('/'))

  return (
    <BasicLayout>
      <Container fluid className="d-flex flex-wrap justify-content-center">
        <Calendar
          minDate={dayjs().format('DD.MM.YYYY')}
          onSelectDate={(newDate) => {
            setSelectedDate(dayjs(newDate, 'DD.MM.YYYY'))
          }}
        />
        <div className="mx-2" />
        <Shedule
          date={selectedDate}
          onSelectHours={() => false}
          facilityID={router.query.id}
        />
      </Container>
    </BasicLayout>
  )
}

export default Home
