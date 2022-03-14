import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import dayjs from 'dayjs'
import axios from 'axios'

import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { Calendar } from 'components/Calendar/Calendar'
import { Shedule } from 'components/Shedule/Shedule'
interface QueueSendingData {
  from_date?: string
  to_date?: string
  facility_id: number
}

const Home: NextPage = () => {
  const [queues, setQueues] = useState<unknown[]>()
  const { register, handleSubmit } = useForm<QueueSendingData>({
    defaultValues: {
      from_date: undefined,
      to_date: undefined,
      facility_id: 1
    }
  })
  function queuePoster(data: QueueSendingData) {
    axios
      .post(
        'http://localhost:5000/api/v1/queries',
        {
          ...data,
          from_date: dayjs(data.from_date).format('DD-MM-YYYY HH:mm:ss'),
          to_date: dayjs(data.to_date).format('DD-MM-YYYY HH:mm:ss')
        },
        { withCredentials: true }
      )
      .catch(() => false)
  }
  return (
    <BasicLayout>
      {/* <Calendar
        initialDate="01.01.2022"
        onSelectDate={(newDate) => {
          console.log(newDate)
        }}
      /> */}
      <Form onSubmit={handleSubmit(queuePoster)}>
        <Form.Control type="datetime-local" {...register('from_date')} />
        <Form.Control type="datetime-local" {...register('to_date')} />
        <Button type="submit">Отправить</Button>
      </Form>
      <Form
        onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          await axios
            .get('http://localhost:5000/api/v1/queries', {
              withCredentials: true
            })
            .then((response) =>
              setQueues(() =>
                response.data.data.map(
                  (queue: {
                    from_time:
                      | string
                      | number
                      | Date
                      | dayjs.Dayjs
                      | null
                      | undefined
                    to_time:
                      | string
                      | number
                      | Date
                      | dayjs.Dayjs
                      | null
                      | undefined
                  }) => {
                    return [
                      dayjs(queue.from_time).hour(),
                      dayjs(queue.to_time).hour()
                    ]
                  }
                )
              )
            )
            .catch(() => false)
        }}>
        {queues && queues.map((item, index) => <div key={index}>{item}</div>)}
        <Button type="submit">Get</Button>
      </Form>
      <Shedule date={dayjs()} />
    </BasicLayout>
  )
}

export default Home
