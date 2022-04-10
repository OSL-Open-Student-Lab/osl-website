import { api } from 'packages/api'
import { Container } from 'react-bootstrap'
import useSWR from 'swr'

import { BookingCard } from './BookingCard'

import styles from './BookingsPage.module.scss'

interface BookingsPageProps {
  bookings: { id: number; image: string; title: string }[]
}

export function BookingsPage() {
  async function bookingsFetcher(url: string) {
    try {
      return await api.get(url).then((res) => res)
    } catch (e) {
      console.log(e)
    }
  }
  const { data, mutate } = useSWR('/queue/get_all', bookingsFetcher)
  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.header_title}>Мои записи</h1>
        <p className={styles.header_body}>
          В этом разделе указано, на какое время ты забронировал оборудование
        </p>
      </div>
      <div className="d-flex flex-wrap gap-5 my-5 ">
        <BookingCard />
      </div>
    </Container>
  )
}
