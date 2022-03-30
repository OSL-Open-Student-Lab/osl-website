import { IconButton } from 'components/public/Buttons'
import React, { FC } from 'react'
import { Image } from 'react-bootstrap'

interface FacilityProps {
	id: number | string,
	image: string,
	status?: string,
	title: string,
	description: string,
}

const Facility: FC<FacilityProps> = ({ id, image, status, title, description }) => {
	const facilityStatusType = !!status ?
		status === 'популярно!' ?
			'facility__status_popular'
			:
			'facility__status_new'
		:
		false
	return (
		<div className="facility">
			<div className="facility__img-container">
				{!!facilityStatusType ?
					<div className={`facility__status ${facilityStatusType}`}>
						{status}
					</div>
					:
					null}
				<Image
					src={image}
					className='facility__image'
				/>
			</div>
			<div className="facility__info-container">
				<h4 className="facility__title">
					{title}
				</h4>
				<p className="facility__description">
					{description}
				</p>
				<div className="facility__action-container">
					<IconButton
						img={'/assets/star.svg'}
						size={'small'}
						type='secondary'
					/>
					<IconButton
						img={'/assets/menu-dots.svg'}
						text='подробнее'
						type='secondary'
						size={'small'}
					/>
					<IconButton
						img={'/assets/calendar-white.svg'}
						text='забронировать'
						type='primary'
						size={'small'}
					/>
				</div>
			</div>
		</div>
	)
}

export default Facility