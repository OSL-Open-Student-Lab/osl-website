import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import {} from '@consta/uikit'

import { useAuth } from 'packages/auth'

export function Header() {
  const [expanded, setExpanded] = useState<boolean>(false)
  const router = useRouter()
  const { authData, signOut } = useAuth()
  return (
    <header>
      <Navbar
        style={{ background: '#fff' }}
        expand="lg"
        className="shadow"
        fixed="top"
        collapseOnSelect
        expanded={expanded}
        onToggle={(expVal) => setExpanded(expVal)}
      >
        <Container fluid>
          <Link href="/" passHref>
            <Navbar.Brand className="d-flex align-items-center gap-1">
              <Image src="/favicon.ico" width={30} height={30} alt="logo" />
              OSL
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav
              activeKey={router.asPath}
              onSelect={() => setExpanded(false)}
              className="align-items-center"
            >
              <Nav.Item>
                <Link href="/" passHref>
                  <Nav.Link>Домашняя</Nav.Link>
                </Link>
              </Nav.Item>
              {authData?.logged && (
                <Nav.Item>
                  <Link href="/facilities" passHref>
                    <Nav.Link>Оборудование</Nav.Link>
                  </Link>
                </Nav.Item>
              )}
              {!authData?.logged &&
                router.pathname !== '/auth/signin' &&
                router.pathname !== '/auth/signup' && (
                  <Nav.Item>
                    <Link href="/auth/signin" passHref>
                      <Button variant="danger">Войти</Button>
                    </Link>
                  </Nav.Item>
                )}
              {authData?.logged && (
                <Nav.Item>
                  <Button variant="danger" onClick={signOut}>
                    Выйти
                  </Button>
                </Nav.Item>
              )}
              <Nav.Item></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
