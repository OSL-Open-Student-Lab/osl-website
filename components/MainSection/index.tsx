import { Col, Container, Image, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import React from 'react'

import { IconButton } from 'components/public/Buttons'

const MainSection = () => {
  const router = useRouter()
  return (
    <section className="section section_main main-section">
      <Container className="main-section__container">
        <Row>
          <Col md={6} className="main-section__info-container">
            <h1>
              Лаборатория студенческого творчества Open Student Lab в КГТУ
            </h1>
            <IconButton
              img="/assets/arrow-right-white.svg"
              text="К оборудованию"
              type="primary"
              size={'medium'}
              onClick={() => router.push('/facilities')}
            />
          </Col>
          <Col md={6} className="main-section__img-container">
            <Image src={'/assets/IntroduceImg.png'} />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default MainSection
