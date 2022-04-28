import { api } from 'packages/api'
import { Container } from 'react-bootstrap'
import useSWR, { useSWRConfig } from 'swr'

import { BookingCard } from './BookingCard'

import styles from './BookingsPage.module.scss'

async function bookingsFetcher() {
  return await api.get('/queues').then((res) => res.data.data)
}
export function BookingsPage() {
  const { data: userBookings } = useSWR('GET_USER_BOOKINGS', bookingsFetcher)
  const { mutate } = useSWRConfig()
  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.header_title}>Мои записи</h1>
        <p className={styles.header_body}>
          В этом разделе указано, на какое время ты забронировал оборудование
        </p>
      </div>
      <div className="d-flex flex-wrap gap-5 my-5 ">
        {userBookings && userBookings.length > 0 ? (
          userBookings.map((item) => (
            <BookingCard
              id={item.booking_id}
              startTime={item.from_date}
              endTime={item.to_date}
              title={item.facility_name}
              key={item.booking_id}
              image={item.image}
              onCancel={() => mutate('GET_USER_BOOKINGS')}
            />
          ))
        ) : (
          <BookingCard />
        )}
      </div>
    </Container>
  )
}
