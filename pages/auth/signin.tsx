import { Container, Form, FloatingLabel, Button, Alert } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import * as Yup from 'yup'

import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { useAuth } from 'packages/auth'
import { useDidMountEffect } from 'packages/hooks/useDidMountEffect'

const SignInSchema = Yup.object({
  username: Yup.string()
    .required('Это обязательное поле')
    .trim()
    .min(6, 'Логин должен быть не менее 6 символов')
    .max(16, 'Логин не должен превышать 12 символов'),
  password: Yup.string()
    .required('')
    .min(8, 'Длина пароля не должна быть не менее 8 символов'),
  rememberMe: Yup.boolean().required()
})

type SignInData = Yup.InferType<typeof SignInSchema>

export default function SignIn() {
  const { signIn, authData } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<SignInData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      rememberMe: false
    },
    resolver: yupResolver(SignInSchema)
  })
  useDidMountEffect(() => {
    clearErrors('username')
    if (!authData?.logged && authData?.message) {
      setError(
        'username',
        { type: 'authError', message: authData?.message },
        { shouldFocus: true }
      )
    }
  }, [authData])
  async function signinFetcher({ username, password, rememberMe }: SignInData) {
    return signIn(username, password, rememberMe)
  }

  return (
    <BasicLayout>
      <Container fluid>
        <Form
          onSubmit={handleSubmit(signinFetcher)}
          className="my-5 mx-auto col-xxl-4 col-xl-6 col-lg-8 col-md-10 col-sm-12"
        >
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
            <Form.Text className="text-danger">
              {errors.username?.message}
            </Form.Text>
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
