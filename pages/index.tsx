import type {
  NextPage
  // NextPageContext
} from 'next'

import { BasicLayout } from 'components/BaseLayout'
import { Calendar } from '../components/Calendar/index'
// export async function getServerSideProps(context: NextPageContext) {
//   return {
//     props: {} // Will be passed to the page component as props
//   }
// }
const Home: NextPage = () =>
  // props: any
  {
    return (
      <BasicLayout>
        <Calendar />
      </BasicLayout>
    )
  }

export default Home
