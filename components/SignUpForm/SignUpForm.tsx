import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Container, Form } from 'react-bootstrap'
import * as Yup from 'yup'
import Link from 'next/link'
import classNames from 'classnames'

import { UserAddWhite } from 'components/icons'
import { useAuth } from 'packages/auth'

import styles from './SignUpForm.module.scss'

const SignUpSchema = Yup.object({
  email: Yup.string().trim().email().required('Это обязательное поле'),
  username: Yup.string()
    .required('Это обязательное поле')
    .trim()
    .matches(/^\w+$/i, 'Логин должен быть на латинице и не содержать пробелов')
    .min(8, 'Логин должен быть не менее 8 символов')
    .max(20, 'Логин не должен превышать 20 символов'),
  password: Yup.string()
    .required('Это обязательное поле')
    .trim()
    .min(8, 'Длина пароля не должна быть не менее 8 символов')
    .matches(/[A-ZА-Я]{1}/, 'Пароль должен содержать заглавную букву')
    .matches(/[0-9]{1}/, 'Пароль должен содержать цифру'),
  confirm: Yup.string()
    .trim()
    .required('Это обязательное поле')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
})

type SignUpData = Yup.InferType<typeof SignUpSchema>

export function SignUpForm() {
  const { signUp } = useAuth()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignUpData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(SignUpSchema)
  })
  async function signupFetcher({ email, password, username }: SignUpData) {
    return signUp(email, username, password)
  }
  return (
    <Container>
      <Form className={styles.form} onSubmit={handleSubmit(signupFetcher)}>
        <div className={styles.form_header}>
          <h1 className={classNames(styles.form_header_title)}>Регистрация</h1>
          <p className={classNames(styles.form_header_body)}>
            Это позволит бронировать обородувание лаборатории и писать статьи на
            сайте
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
            <label className={styles.form_body_label} htmlFor="username">
              <div>
                Эл. почта
                <div className={styles.form_body_error}>
                  {errors.email?.message}
                </div>
              </div>
            </label>
            <input
              className={styles.form_body_controller}
              placeholder="Действительный адрес эл. почты"
              {...register('email')}
              type="email"
              id="email"
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
          <div className={styles.form_body_input_group}>
            <label className={styles.form_body_label}>
              <div>
                Повторите пароль
                <div className={styles.form_body_error}>
                  {errors.confirm?.message}
                </div>
              </div>
            </label>
            <input
              className={styles.form_body_controller}
              placeholder="Состоит из букв, цифр и спецсимволов"
              {...register('confirm')}
              id="confirm"
              type="password"
            />
          </div>
        </div>
        <div className={styles.form_footer}>
          <button className={styles.form_footer_button}>
            <UserAddWhite className={styles.form_footer_button_icon} />
            ЗАРЕГИСТРИРОВАТЬСЯ
          </button>
          <Link href="/auth/signup">
            <div className={styles.form_footer_link}>Есть аккаунт? войти</div>
          </Link>
        </div>
      </Form>
    </Container>
  )
}
