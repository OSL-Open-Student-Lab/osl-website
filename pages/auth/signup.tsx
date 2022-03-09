import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap'
import * as Yup from 'yup'
import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import Link from 'next/link'

const SignUpSchema = Yup.object({
  username: Yup.string()
    .required('Это обязательное поле')
    .trim()
    .min(6, 'Логин должен быть не менее 6 символов')
    .max(12, 'Логин не должен превышать 12 символов'),
  password: Yup.string()
    .required('Это обязательное поле')
    .min(8, 'Длина пароля не должна быть не менее 8 символов'),
  confirm: Yup.string()
    .required('Это обязательное поле')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
})

type SignUpData = Yup.InferType<typeof SignUpSchema>

export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, dirtyFields },
    setError
  } = useForm<SignUpData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(SignUpSchema)
  })
  function auth(_data: SignUpData) {
    return false
  }
  return (
    <BasicLayout>
      <Container fluid>
        <Form
          onSubmit={handleSubmit((data) => console.log(data))}
          className="my-5 mx-auto col-xxl-4 col-xl-6 col-lg-8 col-md-10 col-sm-12">
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
            <Button
              type="submit"
              size="lg"
              className="w-100"
              // disabled={!isValid}
            >
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
