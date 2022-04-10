import Head from 'next/head'

import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { SignInForm } from 'components/SignInForm/SignInForm'

export default function SignIn() {
  return (
    <>
      <Head>
        <title>OSL:Авторизация</title>
      </Head>
      <BasicLayout>
        <SignInForm />
      </BasicLayout>
    </>
  )
}
