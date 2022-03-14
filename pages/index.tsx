import { Container } from 'react-bootstrap'
import { CarouselSection } from 'components/CarouselSection/CarouselSection'
import { CardSection } from 'components/CardSection/CardSection'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'

export default function HomePage() {
  return (
    <BasicLayout>
      <CarouselSection />
      <Container fluid>
        <h1 className="text-center display-4 mt-5">
          Что такое Open Student Laboratory?
        </h1>
        <p className="text-center lead mt-4">
          Open Student Laboratory(OSL) - это лаборатория студенческого
          творчества, предназначенная для реализации твоей идеи в реальный
          проект.
        </p>
        <p className="lead text-center">
          У тебя есть идея? Приходи к нам и мы поможем тебе с пространством и
          оборудованием для реализации!
        </p>
      </Container>
      <CardSection />
    </BasicLayout>
  )
}
