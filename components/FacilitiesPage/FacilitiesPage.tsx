import { Container } from 'react-bootstrap'
import useSWR from 'swr'

import Facility, { FacilityProps } from 'components/Facility/Facility'

import styles from './FacilitiesPage.module.scss'
import { api } from 'packages/api'

export interface FacilityData {
  name: string
  image: string
  description: string
  id: number
}

type FacilitiesResponse = Array<FacilityData>

async function facilitiesFetcher(): Promise<FacilitiesResponse> {
  const facilities: FacilitiesResponse = await api
    .get('/facilities')
    .then((response) => response.data.data)
  return facilities
}

export function FacilityPage() {
  const { data } = useSWR<FacilitiesResponse>(
    'GET_FACILITIES',
    facilitiesFetcher
  )
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
          {data &&
            data.map(({ id, description, image, name }) => {
              return (
                <Facility
                  id={id}
                  description={description}
                  image={`http://localhost:8000/api/v1/static${image}`}
                  title={name}
                  key={id}
                />
              )
            })}
        </div>
      </Container>
    </>
  )
}
