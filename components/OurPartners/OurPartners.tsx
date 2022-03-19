import React from 'react'
import { Container, Image } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';

const pic = '/pic.png'

function OurPartners() {
  const listArr = [
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
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <div className="our-partner-section mb-5">
      <h2
        className="display-5 mb-5 pb-3"
        style={{ borderBottom: '1px solid gray', margin: 'auto', maxWidth: 345 }}
      >
        Наши Партнеры
      </h2>
      <Container fluid>
        <Carousel
          responsive={responsive}
        >
          {listArr.map((item, index) => (
            <div key={index} className="d-flex align-center justify-content-center">
              <Image
                src={item.pic}
                alt={item.pic}
                width="250px"
                height="200px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  )
}

export default OurPartners
