import Error from 'next/error'

import { BasicLayout } from 'components/BaseLayout/BaseLayout'

export function ErrorPage() {
  return (
    <BasicLayout>
      <Error statusCode={404}></Error>
    </BasicLayout>
  )
}
