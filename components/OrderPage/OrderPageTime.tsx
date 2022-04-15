import { FC } from "react";


const OrderPageTime:FC = () => {

  return (
    <div className="order-page__point item time">
        <div className="time__day-container">
          <p>Выберите день записи</p>
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
