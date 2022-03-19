import { Carousel } from 'react-bootstrap'
import Image from 'next/image'

const pic = '/pic.png'

const carouselArr = [
  {
    pic,
    header: 'First slide label',
    text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
  },
  {
    pic,
    header: 'Second slide label',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    pic,
    header: 'Third slide label',
    text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
  },
  {
    pic,
    header: 'Fourth slide label',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
]

export function CarouselSection() {
  return (
    <Carousel className="d-block w-100">
      {carouselArr.map((item, index) => (
        <Carousel.Item key={index} style={{ maxHeight: '500px' }}>
          <Image
            layout="responsive"
            width={1600}
            height={900}
            src={item.pic}
            alt={`${item.header} pic`}
          />
          <Carousel.Caption>
            <h3>{item.header}</h3>
            <p>{item.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
