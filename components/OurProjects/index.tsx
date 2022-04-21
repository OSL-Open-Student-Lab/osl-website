import { Col, Container, Image, Row } from 'react-bootstrap'
import { useRouter } from 'next/router'
import React from 'react'

import { IconButton } from 'components/public/Buttons'

const OurProjects = () => {
  const router = useRouter()
  return (
    <section className="section section_our-projects">
      <Container className="our-projects__container">
        <h2 className="section__title">Наши проекты</h2>
        <Row className="our-projects__list">
          <Col md={6}>
            <div className="project">
              <div className="project__info-container">
                <h4 className="project__number">#1</h4>
                <p className="project__title">
                  Система устранения нефтеразливов
                </p>
                <p className="project__description">
                  Таким образом, перспективное планирование играет определяющее
                  значение для вывода текущих активов.
                </p>
              </div>
              <div className="project__image-container">
                <Image src="/assets/first-project-img.png" />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="project">
              <div className="project__info-container">
                <h4 className="project__number">#1</h4>
                <p className="project__title">
                  Система устранения нефтеразливов
                </p>
                <p className="project__description">
                  Таким образом, перспективное планирование играет определяющее
                  значение для вывода текущих активов.
                </p>
              </div>
              <div className="project__image-container">
                <Image src="/assets/first-project-img.png" />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="project">
              <div className="project__info-container">
                <h4 className="project__number">#1</h4>
                <p className="project__title">
                  Система устранения нефтеразливов
                </p>
                <p className="project__description">
                  Таким образом, перспективное планирование играет определяющее
                  значение для вывода текущих активов.
                </p>
              </div>
              <div className="project__image-container">
                <Image src="/assets/first-project-img.png" />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="project project_sign-in">
              <div className="project__info-container">
                <p className="project__title">Здесь может быть твой проект!</p>
                <p className="project__description">
                  Приходи к нам, и мы поможем тебе с пространством и
                  оборудованием.
                </p>
                <IconButton
                  onClick={() => router.push('/auth/signup')}
                  img={'/assets/users-white.svg'}
                  text="Присоединиться!"
                  size={'small'}
                  type={'primary'}
                />
              </div>
              <div className="project__image-container">
                <Image src="/assets/first-project-img.png" />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default OurProjects
