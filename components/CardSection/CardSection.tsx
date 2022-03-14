import { Card, Container } from 'react-bootstrap'
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
    <Container
      fluid
      className="d-flex flex-wrap my-5 justify-content-around gap-xl-2 gap-lg-5">
      {cardArr.map((item, index) => {
        return (
          <Card key={index} className="bs-card">
            <Image
              alt={item.title}
              src={item.pic}
              width={'100%'}
              height={500}
            />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.text}</Card.Text>
            </Card.Body>
          </Card>
        )
      })}
    </Container>
  )
}
