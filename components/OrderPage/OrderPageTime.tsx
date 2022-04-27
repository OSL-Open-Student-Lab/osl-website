import { FC } from "react";

interface OrderPageTimeProps{
  type:'from' | 'to'
}

const OrderPageTime:FC<OrderPageTimeProps> = ({type}) => {

  return (
    <div className="order-page__point item time">
        <div className="time__day-container">
          <p>{type === 'from'&& 'Выберите начало записи'}{type==='to'&&'Выберите конец записи'}</p>
          <input className="input input_date"            
            type='date'
           />
      </div>
        <div className="time__hours-container ">
          <p>Выберите часы для записи</p>
          <input className="input" type='time'/>
      </div>
    </div>
  )
}

export default OrderPageTime;
