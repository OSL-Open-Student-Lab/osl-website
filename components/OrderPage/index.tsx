import { Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'
import dayjs from 'dayjs'
import useSWR from 'swr'

import { FacilityData } from 'components/FacilitiesPage/FacilitiesPage'
import { IconButton } from 'components/public/Buttons'
import { api } from 'packages/api'
import 'packages/dayjsConfig'
interface OrderPageProps {
  id: string | string[] | undefined
}
function OrderFetcher() {}

const OrderPage: FC<OrderPageProps> = ({ id }: OrderPageProps) => {
  const { data: facilityData } = useSWR<FacilityData>(
    id,
    async (id): Promise<FacilityData> => {
      const data = await api
        .get(`/facilities`, { params: { facility_id: id } })
        .then((res) => res.data.data)
      console.log(data[0].image)
      return data[0]
    }
  )
  const router = useRouter()
  const { setValue, handleSubmit } = useForm({
    defaultValues: {
      from_date: '',
      from_time: '',
      to_date: '',
      to_time: ''
    }
  })
  function fieldChange(name: string, type: 'date' | 'time') {
    return function (event: any) {
      const date = dayjs(
        event.target.value,
        type === 'time' ? 'HH:mm' : undefined
      )
      if (date.isValid()) {
        setValue(name, date.format(type === 'date' ? 'DD-MM-YYYY' : 'HH:mm'))
      }
    }
  }
  function addBooking(data) {
    api
      .post('/queues', {
        facility_id: id,
        from_date: [data.from_date, data.from_time].join(' '),
        to_date: [data.to_date, data.to_time].join(' ')
      })
      .then(() => router.push('/me/bookings'))
  }
  return (
    <Container className="order-page">
      <Row>
        <h1>Создание записи</h1>
        <form onSubmit={handleSubmit(addBooking)}>
          <ul className="order-page__list">
            <li className="order-page__point">
              <p className="order-page__number">1</p>
              <div className="item equipment">
                <div className="equipment__image">
                  <img
                    width={96}
                    height={96}
                    alt=""
                    src={`http://localhost:8000/api/v1/static/${facilityData?.image}`}
                  />
                </div>
                <div className="equipment__info-container">
                  <p className="equipment__state">Оборудование не выбрано</p>
                  <p className="equipment__name">Оборудование лаборатории</p>
                  <Link passHref href="/facilities">
                    <a className="equipment__choose-link">Выбрать</a>
                  </Link>
                </div>
              </div>
            </li>
            <li className="order-page__point">
              <p className="order-page__number">2</p>
              <div className="order-page__point item time">
                <div className="time__day-container">
                  <p>Выберите начало записи</p>
                  <input
                    className="input input_date"
                    type="date"
                    onChange={fieldChange('from_date', 'date')}
                  />
                </div>
                <div className="time__hours-container ">
                  <p>Выберите часы для записи</p>
                  <input
                    className="input"
                    type="time"
                    onChange={fieldChange('from_time', 'time')}
                  />
                </div>
              </div>
            </li>
            <li className="order-page__point">
              <p className="order-page__number">3</p>
              <div className="order-page__point item time">
                <div className="time__day-container">
                  <p>Выберите конец записи</p>
                  <input
                    className="input input_date"
                    type="date"
                    required
                    onChange={fieldChange('to_date', 'date')}
                  />
                </div>
                <div className="time__hours-container ">
                  <p>Выберите часы для записи</p>
                  <input
                    className="input"
                    type="time"
                    onChange={fieldChange('to_time', 'time')}
                  />
                </div>
              </div>
            </li>
          </ul>
          <IconButton
            img="/assets/calendar-white.svg"
            type={'disable'}
            size="medium"
            text="Забронировать оборудование"
            className="order-page__submit"
          />
        </form>
      </Row>
    </Container>
  )
}
export default OrderPage
