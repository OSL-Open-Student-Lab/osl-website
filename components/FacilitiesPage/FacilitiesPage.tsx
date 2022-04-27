import { Container } from 'react-bootstrap'
import useSWR from 'swr'

import Facility,{FacilityProps} from 'components/Facility/Facility'

import styles from './FacilitiesPage.module.scss'
import { api } from 'packages/api'

export interface FacilityData{
  name:string
  image:string
  description:string
  id:number
}

type FacilitiesResponse = Array<FacilityData>

async function facilitiesFetcher():Promise<FacilitiesResponse> {
  const pic = '/printer.webp'
  const description =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus omnis placeat porro incidunt iste dolore distinctio sint modi officia quis.'

  // const facilities = [
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 1, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 2, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 4, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 3, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 5, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 6, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 7, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 8, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 9, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 10, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 11, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 12, description },
  //   { image: pic, name: 'Принтер Epson', groupId: 1, id: 13, description }
  // ]
  const facilities:FacilitiesResponse = await api.get('/facilities').then((response)=>response.data.data)
  return facilities
}

export function FacilityPage() {
  const { data } = useSWR<FacilitiesResponse>('GET_FACILITIES', facilitiesFetcher)
  console.log(data)
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
          {data && data.map(({id,description,image,name})=>{
            return <Facility id={id} description={description} image={`http://localhost:8000/api/v1/static${image}`} title={name} key={id}/>
          })}
        </div>
      </Container>
    </>
  )
}
