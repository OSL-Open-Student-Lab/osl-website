import { Card, Container, Row, Col } from 'react-bootstrap'
import Image from 'next/image'
const pic = '/pic.png'
export function CardSection() {
  const cardArr = [
    {
      pic,
      title: 'Card Title',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      pic,
      title: 'Card Title',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      pic,
      title: 'Card Title',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      pic,
      title: 'Card Title',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      pic,
      title: 'Card Title',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
      pic,
      title: 'Card Title',
      text: "Some quick example text to build on the card title and make up the bulk of the card's content."
    }
  ]
  return (
    <Container fluid className="justify-content-center">
      <Row>
        {cardArr.map((item, index) => {
          return (
            <Col key={index} md={4} className='mb-4'>
              <Card className="bs-card">
                <div className="card-img" style={{ maxHeight: 250, overflow: 'hidden' }}>
                  <Image
                    alt={item.title}
                    src={item.pic}
                    height={900}
                    width={1600}
                    layout="intrinsic"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>

    </Container>
  )
}
