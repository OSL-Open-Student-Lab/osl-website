import Head from 'next/head'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import MainSection from 'components/MainSection'
import FacilitiesSection from 'components/FacilitiesSection/FacilitiesSection'
import OurProjects from 'components/OurProjects'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>OSL: Домашняя</title>
      </Head>
      <BasicLayout>
        <MainSection />
        <FacilitiesSection />
        <OurProjects />
      </BasicLayout>
    </>
  )
}
