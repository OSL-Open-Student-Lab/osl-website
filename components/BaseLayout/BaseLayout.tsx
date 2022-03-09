import { ReactNode } from 'react'

import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'
interface BasicLayoutProps {
  children?: ReactNode
}
export function BasicLayout({ children }: BasicLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
