import {
  BookingCardButtonIcon,
  NoBookingsIcon,
  CalendarWhite
} from 'components/icons'
import { Button, Modal, Image } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useState } from 'react'
// import Image from 'next/image'
import dayjs from 'dayjs'

import 'packages/dayjsConfig'

import styles from './BookingCard.module.scss'

export interface BookingCardProps {
  title?: string
  startTime?: string
  endTime?: string
  image?: string
  id?: number
  onCancel?: () => void
}
import { api } from 'packages/api'

export function BookingCard({
  image,
  startTime,
  endTime,
  title,
  id,
  onCancel
}: BookingCardProps) {
  const router = useRouter()
  const start = dayjs(startTime, 'DD-MM-YYYY HH:mm')
  const end = dayjs(endTime, 'DD-MM-YYYY HH:mm')
  let resultTime = ``
  if (!start.isSame(end, 'date')) {
    resultTime = `с ${start.format('DD MMMM HH:mm')} до ${end.format(
      'DD MMMM HH:mm'
    )}`
  } else {
    resultTime = `${start.format('DD MMMM')}, c ${start.format(
      'HH:mm'
    )} до ${end.format('HH:mm')}`
  }
  const [isModalVisible, setModalVisible] = useState(false)
  function closeModal() {
    setModalVisible(false)
  }
  async function cancelBook() {
    api
      .delete('/queues', { params: { id: id } })
      .then(() => setModalVisible(false))
    onCancel && onCancel()
  }
  function showModal() {
    setModalVisible(true)
  }
  return (
    <div className={classNames(styles.card_wrapper, { [styles.no_id]: !id })}>
      <div className={styles.card_header}>
        <div className={styles.card_header_info}>
          {id ? (
            <Image
              className={styles.card_header_info_image}
              width={72}
              height={72}
              src={`http://localhost:8000/api/v1/static${image}`}
            />
          ) : (
            <NoBookingsIcon />
          )}

          {id && (
            <div className={styles.card_header_info_time}>
              <div className={styles.card_header_info_time_text}>
                Дата и время:
              </div>
              <div className={styles.card_header_info_time_date}>
                {resultTime}
              </div>
            </div>
          )}
        </div>
        <div className={styles.card_header_title}>
          {id ? title : 'Нет записей на оборудование'}
        </div>
      </div>

      <button
        onClick={
          id
            ? showModal
            : () => {
                router.push('/facilities')
              }
        }
        className={classNames(styles.card_button, { [styles.no_id]: !id })}
      >
        {id ? (
          <BookingCardButtonIcon className={styles.card_button_icon} />
        ) : (
          <CalendarWhite className={styles.card_button_icon} />
        )}
        <span className={styles.card_button_text}>
          {id ? 'ОТМЕНИТЬ БРОНЬ' : 'ЗАБРОНИРОВАТЬ ОБОРУДОВАНИЕ'}
        </span>
      </button>

      <Modal show={isModalVisible} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Отменить бронь?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Это действие нельзя будет отменить!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Закрыть
          </Button>
          <Button variant="outline-danger" onClick={cancelBook}>
            Отменить бронь
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
