import { BaseProps } from 'packages/customTypes'

import { Header } from '../public/Header'
import { Footer } from '../public/Footer'

export function BasicLayout({ children }: BaseProps): JSX.Element {
  return (
    <>
      <Header />

      <main className="main">{children}</main>

      <Footer />
    </>
  )
}
