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
                  С идеей нейтрализации нефтеразливов в 2020 году мы выиграли
                  грант по программе «УМНИК 2020»...
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
                <h4 className="project__number">#2</h4>
                <p className="project__title">Сайт лаборатории.</p>
                <p className="project__description">
                  С помощью сайта мы хотим сделать нашу жизнь проще, удобней а
                  ваши глаза радовать...
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
                <h4 className="project__number">#3</h4>
                <p className="project__title">
                  Система пропуска в лабораторию.
                </p>
                <p className="project__description">
                  На данный момент это весьма острая проблема т.к людей,
                  способных открыть лабораторию всего-то пару человек и...
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
