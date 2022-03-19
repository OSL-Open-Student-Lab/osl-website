import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

const pic = '/pic.png'

interface ProjectListProps {
  className: string
}
const ListArr = [
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

const colSize = [5, 7, 7, 5]

function ProjectList({ className }: ProjectListProps) {
  return (
    <div className={`project-list ${className}`}>
      <Container fluid className="p-0 overflow-hidden">
        <Row>
          {ListArr.map((item, index) => (
            <Col md={colSize[index % 4]} key={index} className="project p-0">
              <Image
                src={item.pic}
                alt={`${item.header} pic`}
                className="project__image"
              />
              <div className="project__overlay">
                <h4 className="project__title">{item.header}</h4>
                <p className="project__subtitle">{item.header}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default ProjectList
