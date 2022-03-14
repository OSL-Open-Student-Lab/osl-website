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
    <Container fluid className="row justify-content-center">
      {cardArr.map((item, index) => {
        return (
          <Card key={index} className="bs-card col-lg-4">
            <div className="card-img">
              <Image
                alt={item.title}
                src={item.pic}
                height={1600}
                width={900}
                layout="intrinsic"
              />
            </div>
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
