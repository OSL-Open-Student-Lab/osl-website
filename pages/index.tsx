import type { NextPage, NextPageContext } from 'next'

import AdminLayout from '../components/AdminLayout'

export async function getServerSideProps({}: NextPageContext) {
  return {
    props: {} // Will be passed to the page component as props
  }
}
const Home: NextPage = (props: any) => {
  return (
    <>
      <AdminLayout />
    </>
  )
}

export default Home
