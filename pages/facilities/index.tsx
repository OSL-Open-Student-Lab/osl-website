import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { Modal, Card, Button, Col, Row, Container } from 'react-bootstrap'
import Image from 'next/image'
import { useState } from 'react'
import dayjs from 'dayjs'

import { Shedule } from 'components/Shedule/Shedule'
import { Calendar } from 'components/Calendar/Calendar'

const pic = '/printer.webp'

const facilities = [
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 1 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 2 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 3 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 4 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 5 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 6 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 7 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 8 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 9 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 10 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 11 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 12 },
  { picture: pic, title: 'Принтер Epson', groupId: 1, id: 13 }
]

export default function Facilities() {
  const [isModalVisible, setModalVisible] = useState(false)
  const [currentFacility, setCurrentFacility] = useState<number>()
  function closeModal() {
    setModalVisible(false)
    setCurrentFacility(undefined)
  }
  return (
    <BasicLayout>
      <Container>
        <Row className="my-3">
          {facilities.map(({ picture, title, id }) => (
            <Col key={id} sm={6} lg={4} xl={3} className="">
              <Card className="mx-auto my-3">
                <Image
                  src={picture}
                  width={16}
                  height={9}
                  layout="responsive"
                  alt="epson"
                />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setCurrentFacility(id)
                      setModalVisible(true)
                    }}
                  >
                    Забронировать
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal
        autoFocus
        backdrop="static"
        centered
        size="xl"
        onHide={closeModal}
        show={isModalVisible}
      >
        <Modal.Header closeButton>
          <Modal.Title>Выберите дату и время</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Calendar minDate={dayjs().format('DD.MM.YYYY')} />
            </Col>
            <Col>
              <Shedule
                disabledHours={[
                  [1, 9],
                  [17, 25]
                ]}
                onSelectHours={() => false}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={closeModal}>
            Отмена
          </Button>
          <Button variant="danger" onClick={closeModal}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
      <div>{currentFacility || null}</div>
    </BasicLayout>
  )
}
