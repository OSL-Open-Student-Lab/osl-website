import Head from 'next/head'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import MainSection from 'components/MainSection'
import FacilitiesSection from 'components/FacilitiesSection'
import OurProjects from 'components/OurProjects'
import 'react-multi-carousel/lib/styles.css'
import OrderPage from 'components/OrderPage'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>OSL: Домашняя</title>
      </Head>
      <BasicLayout>
        <OrderPage/>
      </BasicLayout>
    </>
  )
}
