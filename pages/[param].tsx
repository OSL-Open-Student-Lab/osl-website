import type {
  NextPage
  // NextPageContext
} from 'next'

import { BasicLayout } from 'components/BaseLayout'
import { useRouter } from 'next/router'
// export async function getServerSideProps(context: NextPageContext) {
//   return {
//     props: {} // Will be passed to the page component as props
//   }
// }
const Page: NextPage = () => {
  const router = useRouter()
  const { param } = router.query
  return <BasicLayout>{param}</BasicLayout>
}

export default Page
