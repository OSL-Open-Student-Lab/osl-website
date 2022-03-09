import { NextPage } from 'next'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { Calendar } from '../components/Calendar/Calendar'

<<<<<<< HEAD
import { BasicLayout } from 'components/BaseLayout'
import { Calendar } from '../components/Calendar/index'
import { HoursPage } from 'components/Calendar/hours'
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
=======
const Home: NextPage = () => {
  return (
    <BasicLayout>
      <Calendar
        initialDate="01.01.2022"
>>>>>>> af5f023b90ac32593ae5ff01c5b258ff6df5be62
        onSelectDate={(newDate) => {
          console.log(newDate)
        }}
      />
    </BasicLayout>
  )
}

export default Home
