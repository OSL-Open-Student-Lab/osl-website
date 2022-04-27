import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import OrderPage from 'components/OrderPage'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  const {id} = router.query
  return <BasicLayout>
    {id}
    <OrderPage id={id}/>
  </BasicLayout>
}
