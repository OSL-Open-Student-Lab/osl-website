import { Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import classNames from 'classnames'
import Link from 'next/link'

import { useAuth } from 'packages/auth'
import { SignIn } from 'components/icons'

import styles from './SignInForm.module.scss'

const SignInSchema = Yup.object({
  username: Yup.string().required('Это обязательное поле'),
  password: Yup.string().required('Это обязательное поле'),
  rememberMe: Yup.boolean().required()
})

type SignInData = Yup.InferType<typeof SignInSchema>

export function SignInForm() {
  const { signIn } = useAuth()
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
  async function signinFetcher({ username, password, rememberMe }: SignInData) {
    signIn(username, password, rememberMe).catch(() => {
      setError('username', {
        type: 'authError',
        message: 'Ошибка авторизации попробуйте ещё раз'
      })
    })
  }
  return (
    <Container>
      <Form className={styles.form} onSubmit={handleSubmit(signinFetcher)}>
        <div className={styles.form_header}>
          <h1 className={classNames(styles.form_header_title)}>Вход</h1>
          <p className={classNames(styles.form_header_body)}>
            Войдите в свой профиль OSL, чтобы забронировать нужное оборудование
            или написать статью
          </p>
        </div>
        <div className={styles.form_body}>
          <div className={styles.form_body_input_group}>
            <label className={styles.form_body_label} htmlFor="username">
              <div>
                Логин
                <div className={styles.form_body_error}>
                  {errors.username?.message}
                </div>
              </div>
            </label>
            <input
              className={styles.form_body_controller}
              placeholder="На латыни, от 6 до 20 символов"
              {...register('username')}
              type="text"
              id="username"
            />
          </div>
          <div className={styles.form_body_input_group}>
            <label className={styles.form_body_label}>
              <div>
                Пароль
                <div className={styles.form_body_error}>
                  {errors.password?.message}
                </div>
              </div>
            </label>
            <input
              className={styles.form_body_controller}
              placeholder="Состоит из букв, цифр и спецсимволов"
              {...register('password')}
              id="password"
              type="password"
            />
          </div>
          <div className={styles.form_body_checkbox_group}>
            <input
              type="checkbox"
              {...register('rememberMe')}
              className={styles.form_body_controller}
              id="rememberme"
            />
            <label className={styles.form_body_label} htmlFor="rememberme">
              запомниить меня
            </label>
          </div>
        </div>
        <div className={styles.form_footer}>
          <button className={styles.form_footer_button}>
            <SignIn className={styles.form_footer_button_icon} /> ВОЙТИ
          </button>
          <Link href="/auth/signup">
            <div className={styles.form_footer_link}>
              Нет аккаунта? зарегистрироваться
            </div>
          </Link>
        </div>
      </Form>
    </Container>
  )
}
