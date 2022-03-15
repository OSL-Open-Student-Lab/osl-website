import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import * as Yup from 'yup'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useAuth } from 'packages/hooks/useAuthAPI'
import useSWR from 'swr'
import { useEffect } from 'react'

const SignInSchema = Yup.object({
  username: Yup.string().required('Это обязательное поле').trim(),
  // .min(6, 'Логин должен быть не менее 6 символов')
  // .max(12, 'Логин не должен превышать 12 символов'),
  password: Yup.string().required(''),
  // .min(8, 'Длина пароля не должна быть не менее 8 символов'),
  rememberMe: Yup.boolean()
})

type SignInData = Yup.InferType<typeof SignInSchema>

export default function SignIn() {
  const router = useRouter()

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
  const { logged } = useAuth()
  useEffect(() => {
    if (logged) router.push('/')
  }, [logged, router])

  async function signinFetcher(data: SignInData) {
    if (process.env.apiLoginRoute) {
      await axios
        .post(process.env.apiLoginRoute, data, {
          withCredentials: true
        })
        .then(() => router.push('/'))
        .catch(() =>
          setError('username', {
            type: 'authError',
            message: 'Неверный логин или пароль'
          })
        )
    }
  }

  return (
    <BasicLayout>
      <Container fluid>
        <Form
          onSubmit={handleSubmit(signinFetcher)}
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
            <Button variant="danger" type="submit" size="lg" className="w-100">
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
