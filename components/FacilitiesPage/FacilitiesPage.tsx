import { Container } from 'react-bootstrap'

import Facility from 'components/FacilitiesSection/Facility'

import styles from './FacilitiesPage.module.scss'

const pic = '/printer.webp'
const description =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus omnis placeat porro incidunt iste dolore distinctio sint modi officia quis.'

const facilities = [
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 1, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 2, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 3, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 4, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 5, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 6, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 7, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 8, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 9, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 10, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 11, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 12, description },
  { image: pic, title: 'Принтер Epson', groupId: 1, id: 13, description }
]

export function FacilityPage() {
  return (
    <>
      <Container>
        <div className={styles.header}>
          <h1 className={styles.header_title}>Оборудование для бронирования</h1>
          <p className={styles.header_body}>
            Текущий список оборудования в студенческой лаборатории, которое
            может забронировать любой студент КГТУ
          </p>
        </div>
        <div className="d-flex flex-wrap gap-5 my-5 ">
          {facilities.map((facility) => (
            <Facility {...facility} key={facility.id} />
          ))}
        </div>
      </Container>
    </>
  )
}
