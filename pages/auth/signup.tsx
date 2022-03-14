import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { useAuth } from 'packages/hooks/useAuth'

const SignUpSchema = Yup.object({
  email: Yup.string().email().trim().required('Это обязательное поле'),
  username: Yup.string().required('Это обязательное поле').trim(),
  // .min(6, 'Логин должен быть не менее 6 символов')
  // .max(12, 'Логин не должен превышать 12 символов'),
  password: Yup.string().required('Это обязательное поле').trim(),
  // .min(8, 'Длина пароля не должна быть не менее 8 символов'),
  confirm: Yup.string()
    .trim()
    .required('Это обязательное поле')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
})

type SignUpData = Yup.InferType<typeof SignUpSchema>

export default function SignUpForm() {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
    setError
  } = useForm<SignUpData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(SignUpSchema)
  })
  useAuth(() => router.push('/'))
  async function signupFetcher(data: SignUpData) {
    let isEmailValid = false
    let isUsernameValid = false
    if (process.env.apiEmailCheckRoute) {
      const email = data.email
      await axios
        .post(process.env.apiEmailCheckRoute, { email })
        .then(() => (isEmailValid = true))
        .catch(() =>
          setError('email', {
            message: 'На этот email уже зарегистрирован аккаунт'
          })
        )
    }
    if (process.env.apiUsernameCheckRoute) {
      const username = data.username
      await axios
        .post(process.env.apiUsernameCheckRoute, { username })
        .then(() => (isUsernameValid = true))
        .catch(() =>
          setError('username', {
            message: 'Пользоатель с таким логином уже существует'
          })
        )
    }
    if (process.env.apiRegRoute && isEmailValid && isUsernameValid) {
      axios
        .post(process.env.apiRegRoute, data, {
          withCredentials: true
        })
        .then(() => true)
        .catch(() => false)
    }
  }
  return (
    <BasicLayout>
      <Container fluid>
        <Form
          onSubmit={handleSubmit(signupFetcher)}
          className="my-5 mx-auto col-xxl-4 col-xl-6 col-lg-8 col-md-10 col-sm-12">
          <Form.Group className="mb-3">
            <FloatingLabel label="Email">
              <Form.Control
                {...register('email')}
                type="email"
                placeholder="email"
                isInvalid={!!errors.email}
                isValid={dirtyFields.email && !errors.email}
              />
              <Form.Text className="text-danger">
                {errors.username?.message}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Логин">
              <Form.Control
                {...register('username')}
                type="text"
                placeholder="username"
                isInvalid={!!errors.username}
                isValid={dirtyFields.username && !errors.username}
              />
              <Form.Text className="text-danger">
                {errors.username?.message}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Пароль">
              <Form.Control
                {...register('password')}
                type="password"
                placeholder="password"
                id="password"
                isInvalid={!!errors.password}
                isValid={dirtyFields.password && !errors.password}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label="Повторите пароль">
              <Form.Control
                {...register('confirm')}
                placeholder="confirm password"
                type="password"
                id="confirm_password"
                isInvalid={!!errors.confirm}
                isValid={dirtyFields.confirm && !errors.confirm}
              />
              <Form.Text className="text-danger">
                {errors.confirm?.message}
              </Form.Text>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button type="submit" size="lg" className="w-100">
              Отправить
            </Button>
          </Form.Group>
          <Form.Group className="d-flex align-items-center">
            <span className="text-dark">Уже есть аккаунт?</span>
            <Link href="/auth/signin" passHref>
              <Button variant="link">Войти</Button>
            </Link>
          </Form.Group>
        </Form>
      </Container>
    </BasicLayout>
  )
}
