import { FC, useState } from "react"
import { Container, Row } from "react-bootstrap"
import OrderPageEquipmen from './orderPageEquipmen';
import OrderPageTime from "./OrderPageTime";
// import styles from './orderPage.module.scss'
import { IconButton } from "components/public/Buttons";
import useSWR from "swr";
import { api } from "packages/api";
import { FacilityData } from "components/FacilitiesPage/FacilitiesPage";
import { useForm } from "react-hook-form";

interface OrderPageProps {
  id:string|string[]|undefined
}
function OrderFetcher(){

}

const OrderPage:FC<OrderPageProps> = ({id}:OrderPageProps) => {
 const {data} = useSWR<FacilityData>(id,async (id):Promise<FacilityData>=>{
   const data= await api.get(`/facilities/${id}`).then((res)=>res.data.data)
   console.log(data[0].image)
   return data[0]
 })
 const [fromDate,setFromDate]=useState()
 const [formTime,setFromTime]=useState()
 const [toDate,setToDate]=useState()
 const [toTime,setToTime]=useState()

  return(
  <Container className='order-page'>
      <Row>
        <h1>Создание записи</h1>
        <form onSubmit={(event)=>{
          event.preventDefault()
          event.stopPropagation()
        }} >
          <ul className="order-page__list">
            <li className="order-page__point">
              <p className="order-page__number">
                1
              </p>
              <OrderPageEquipmen />
              
            </li>
            <li className="order-page__point">
              <p className="order-page__number">
                2
              </p>
              <OrderPageTime type="from"/>
            </li>
            <li className="order-page__point">
              <p className="order-page__number">
                3
              </p>
              <OrderPageTime type="to"/>
            </li>
          </ul>
          <IconButton
            img="/assets/calendar-white.svg"
            type={'disable'}
            size="medium"
            text="Забронировать оборудование"
            className='order-page__submit'
          />
        </form>
      </Row>
    </Container>
  )
}
export default OrderPage
