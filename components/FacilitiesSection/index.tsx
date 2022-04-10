import Link from 'next/link'
import React from 'react'
import { Container } from 'react-bootstrap'
import FacilitiesList from './FacilitiesList'

const FacilitiesSection = () => {
  return (
    <section className="section section_facilities facilities-section">
      <Container className="facilities-section__container">
        <div className="d-flex justify-content-between">
          <h2 className="section__title">Оборудование</h2>
          <Link href="/facilities">
            <p className="facilities-section__view-more">показать больше</p>
          </Link>
        </div>
        <FacilitiesList />
      </Container>
    </section>
  )
}

export default FacilitiesSection
