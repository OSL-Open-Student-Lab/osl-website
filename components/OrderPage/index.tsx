import { FC } from "react"
import { Button, Container, Row } from "react-bootstrap"
import OrderPageEquipmen from './orderPageEquipmen';
import OrderPageTime from "./OrderPageTime";
import styles from './orderPage.module.scss'
import { IconButton } from "components/public/Buttons";

interface OrderPageState {

}

const OrderPage:FC = () => {
  return(
  <Container className='order-page'>
      <Row>
        <h1>Создание записи</h1>
        <form>
          <ul className="order-page__list">
            <li className="order-page__point">
              <p className="order-page__number">
                1
              </p>
              <OrderPageEquipmen/>
            </li>
            <li className="order-page__point">
              <p className="order-page__number">
                2
              </p>
              <OrderPageTime/>
            </li>
          </ul>
          <IconButton
            img="/assets/calendar-white.svg"
            type="disable"
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
