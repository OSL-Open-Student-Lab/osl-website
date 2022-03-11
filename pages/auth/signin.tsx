import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import * as Yup from 'yup'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import useSWR from 'swr'

const SignInSchema = Yup.object({
  username: Yup.string().required('Это обязательное поле').trim(),
  // .min(6, 'Логин должен быть не менее 6 символов')
  // .max(12, 'Логин не должен превышать 12 символов'),
  password: Yup.string().required(''),
  // .min(8, 'Длина пароля не должна быть не менее 8 символов'),
  rememberMe: Yup.boolean()
})

type SignInData = Yup.InferType<typeof SignInSchema>
fetch('https://osl-apiv1.herokuapp.com/api/v1/auth/register', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify({
    username: 'qwe124',
    password: 'qwe124',
    email: 'qwe1@qwe.qwe'
  })
})
export default function SignIn() {
  const router = useRouter()
  async function authFetcher(authUrl: string) {
    const response = await axios.get(authUrl, {
      withCredentials: true
    })
    return response
  }
  const { data, error } = useSWR(process.env.apiAuthRoute, authFetcher)
  console.log(data)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm<SignInData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(SignInSchema)
  })

  async function loginFetcher(data: SignInData) {
    if (process.env.apiLoginRoute) {
      // const response = await axios
      //   .post(process.env.apiLoginRoute, data, {
      //     withCredentials: true,
      //     method: 'POST'
      //   })
      //   .then(() => true)
      //   .catch(() => false)
      const response = await fetch(process.env.apiLoginRoute, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
      })
        .then((response) => response.status === 200)
        .catch(() => false)
      console.log(response)
    }
  }

  return (
    <BasicLayout>
      <Container fluid>
        <Form
          onSubmit={handleSubmit(loginFetcher)}
          className="my-5 mx-auto col-xxl-4 col-xl-6 col-lg-8 col-md-10 col-sm-12">
          <Form.Group>
            {errors.username?.type === 'authError' && (
              <Alert variant="danger">{errors.username?.message}</Alert>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Логин">
              <Form.Control
                {...register('username')}
                type="text"
                placeholder="username"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Пароль">
              <Form.Control
                {...register('password')}
                type="password"
                placeholder="password"
              />
              <Form.Text muted>{errors.password?.message}</Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              {...register('rememberMe')}
              id="rememberme"
              type="switch"
              label="Запомнить меня"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button type="submit" size="lg" className="w-100">
              Отправить
            </Button>
          </Form.Group>
          <Form.Group className="d-flex align-items-center">
            <span className="text-dark">Ещё нет аккаунта?</span>
            <Link href="/auth/signup" passHref>
              <Button variant="link">Регистрация</Button>
            </Link>
          </Form.Group>
        </Form>
      </Container>
    </BasicLayout>
  )
}
