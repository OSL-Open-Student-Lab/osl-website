import { ReactChild, ReactChildren, ReactNode } from 'react'
import { Container } from 'react-bootstrap'

import { Header } from 'components/Header'
import { Footer } from 'components/Footer'
interface BasicLayoutProps {
  children?: ReactNode
}
export function BasicLayout({ children }: BasicLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <Container fluid>{children}</Container>
      <Footer />
    </>
  )
}
