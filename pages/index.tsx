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
        <Calendar
          initialDate="22.01.2001"
          onSelectDate={(newDate) => {
            console.log(newDate)
          }}
        />
      </BasicLayout>
    )
  }

export default Home
