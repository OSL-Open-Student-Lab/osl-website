import { FacilityData } from 'components/FacilitiesPage/FacilitiesPage'
import Link from 'next/link'

interface OrderPageEquipmenProps{
  // data:FacilityData
}

const orderPageEquipment = ({}:OrderPageEquipmenProps) => {
  return(
    <div
      className="item equipment"
      >
        <div
        className="equipment__image"
        >
          <img width={96} height={96} alt=""/>
        </div>
        <div 
        className="equipment__info-container"
        >
          <p 
          className="equipment__state">
            Оборудование не выбрано   
          </p>
          <p 
          className="equipment__name">
             Оборудование лаборатории   
          </p>
          <Link passHref href="/facilities">
          <a  className="equipment__choose-link">
          Выбрать
        </a>
          </Link>
             
      </div>          
        
    </div>   
  )
}

export default orderPageEquipment
