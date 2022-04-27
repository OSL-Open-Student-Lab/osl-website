import { Image } from 'react-bootstrap'
import React, { FC } from 'react'
import { useRouter } from 'next/router'

import { IconButton } from 'components/public/Buttons'
import { useAuth } from 'packages/auth'

export interface FacilityProps {
  id: number
  image: string
  status?: string
  title: string
  description: string
}

const Facility: FC<FacilityProps> = ({
  id,
  image,
  status,
  title,
  description
}) => {
  const router = useRouter()
  const { authData } = useAuth()
  const facilityStatusType = !!status
    ? status === 'популярно!'
      ? 'facility__status_popular'
      : 'facility__status_new'
    : false

  function addBooking() {}
  function submitChoose() {}
  return (
    <div className="facility">
      <div className="facility__img-container">
        {!!facilityStatusType ? (
          <div className={`facility__status ${facilityStatusType}`}>
            {status}
          </div>
        ) : null}
        <Image src={image} className="facility__image" layout='fill'/>
      </div>
      <div className="facility__info-container">
        <h4 className="facility__title">{title}</h4>
        <p className="facility__description">{description}</p>
        {authData?.logged && (
          <div className="facility__action-container">
            {/* <IconButton
              img={'/assets/star.svg'}
              size={'small'}
              type="secondary"
            />
            <IconButton
              img={'/assets/menu-dots.svg'}
              text="подробнее"
              type="secondary"
              size={'small'}
            /> */}
            <IconButton
              img={'/assets/calendar-white.svg'}
              text="забронировать"
              type="primary"
              size={'small'}
              onClick={() => router.push(`/facilities/add_booking/${id}`)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Facility
