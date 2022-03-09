import React, { useState } from 'react'
// import useSwr from 'swr'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useRouter } from 'next/router'

export function Header() {
  const [expanded, setExpanded] = useState<boolean>(false)
  const router = useRouter()
  return (
    <header>
      <Navbar
        expand="lg"
        className="shadow"
        sticky="top"
        fixed="top"
        collapseOnSelect
        expanded={expanded}
        onToggle={(expVal) => setExpanded(expVal)}>
        <Container fluid>
          <Link href="/" passHref>
            <Navbar.Brand className="d-flex align-items-center gap-1">
              <Image
                src="/favicon.ico"
                width={30}
                height={30}
                alt="logo"
                // placeholder="blur"
                // blurDataURL="holder.js/30x30"
              />
              OSL
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className={'justify-content-end'}>
            <Nav
              activeKey={router.asPath}
              onSelect={() => setExpanded(false)}
              className={'align-items-end'}>
              <Nav.Item>
                <Link href={'/'} passHref>
                  <Nav.Link>qwe</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href={'/qwe'} passHref>
                  <Nav.Link>qwe</Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href={'/auth/signin'} passHref>
                  <Button>qwe</Button>
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
