import React from 'react'
import { Container } from 'react-bootstrap'
import FacilitiesList from './FacilitiesList'

const FacilitiesSection = () => {
	return (
		<section className='section section_facilities facilities-section'>
			<Container className='facilities-section__container'>
				<div className="d-flex justify-content-between">
					<h2 className="section__title">
						Оборудование
					</h2>
					<p className="facilities-section__view-more">
						показать больше
					</p>
				</div>
				<FacilitiesList />
			</Container>
		</section >
	)
}

export default FacilitiesSection