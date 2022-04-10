/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { FC } from 'react'
import { Container, Image } from 'react-bootstrap'
import { IconButton } from 'components/public/Buttons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from 'packages/auth'

export const Header: FC = () => {
  const router = useRouter()
  const { authData, signOut } = useAuth()
  return (
    <header className="header">
      <Container className="header__container">
        <Link href="/">
          <Image className="logo" src={'/assets/logo.png'} />
        </Link>
        <div className="header__links-container">
          {authData?.logged && (
            <>
              <div className="header__nav-link">
                <Link href="/me/bookings">мои записи</Link>
              </div>
              <div className="header__nav-link">
                <Link href="/facilities" passHref>
                  оборудование
                </Link>
              </div>
            </>
          )}
          {/* <div className="header__nav-link">
            <a href="#">о лаборатории</a>
          </div>
          <div className="header__nav-link">
            <a href="#">статьи</a>
          </div> */}
        </div>
        <div className="header__actions-container">
          {!authData?.logged ? (
            <>
              <IconButton
                onClick={() => router.push('/auth/signin')}
                img="/assets/sign-in.svg"
                text="Войти"
                type="secondary"
                size="small"
              />
              <IconButton
                onClick={() => router.push('/auth/signup')}
                img="/assets/user-add-white.svg"
                text="Регистрация"
                type="primary"
                size="small"
              />
            </>
          ) : (
            <>
              Вы вошли как: {authData.username}
              <IconButton
                onClick={signOut}
                img="/assets/arrow-right-white.svg"
                text="Выйти"
                type="primary"
                size="small"
              />
            </>
          )}
        </div>
      </Container>
    </header>
  )
}
