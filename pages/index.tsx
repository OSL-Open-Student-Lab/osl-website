import { NextPage } from 'next'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { Calendar } from '../components/Calendar/Calendar'

const Home: NextPage = () => {
  return (
    <BasicLayout>
      <Calendar
        initialDate="01.01.2022"
        onSelectDate={(newDate) => {
          console.log(newDate)
        }}
      />
    </BasicLayout>
  )
}

export default Home
