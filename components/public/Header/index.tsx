import React, { FC } from 'react'
// import {} from '@consta/uikit'
import { Container, Image } from 'react-bootstrap'
import { IconButton } from 'components/public/Buttons'


// export function Header() {
//   const [expanded, setExpanded] = useState<boolean>(false)
//   const router = useRouter()
//   const { authData, signOut } = useAuth()
//   return (
//     <header>
//       <Navbar
//         style={{ background: '#fff' }}
//         expand="lg"
//         className="shadow"
//         fixed="top"
//         collapseOnSelect
//         expanded={expanded}
//         onToggle={(expVal) => setExpanded(expVal)}
//       >
//         <Container fluid>
//           <Link href="/" passHref>
//             <Navbar.Brand className="d-flex align-items-center gap-1">
//               <Image src="/favicon.ico" width={30} height={30} alt="logo" />
//               OSL
//             </Navbar.Brand>
//           </Link>
//           <Navbar.Toggle />
//           <Navbar.Collapse className="justify-content-end">
//             <Nav
//               activeKey={router.asPath}
//               onSelect={() => setExpanded(false)}
//               className="align-items-center"
//             >
//               <Nav.Item>
//                 <Link href="/" passHref>
//                   <Nav.Link>Домашняя</Nav.Link>
//                 </Link>
//               </Nav.Item>
//               {authData?.logged && (
//                 <Nav.Item>
//                   <Link href="/facilities" passHref>
//                     <Nav.Link>Оборудование</Nav.Link>
//                   </Link>
//                 </Nav.Item>
//               )}
//               {!authData?.logged &&
//                 router.pathname !== '/auth/signin' &&
//                 router.pathname !== '/auth/signup' && (
//                   <Nav.Item>
//                     <Link href="/auth/signin" passHref>
//                       <Button variant="danger">Войти</Button>
//                     </Link>
//                   </Nav.Item>
//                 )}
//               {authData?.logged && (
//                 <Nav.Item>
//                   <Button variant="danger" onClick={signOut}>
//                     Выйти
//                   </Button>
//                 </Nav.Item>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   )
// }

export const Header: FC = () => {
  return (
    <header className='header'>
      <Container className="header__container">
        <div className="logo">
          <Image
            src={'/assets/logo.png'}
          />
        </div>
        <div className="header__links-container">
          <div className="header__nav-link">
            <a href="#">оборудование</a>
          </div>
          <div className="header__nav-link">
            <a href="#">о лаборатории</a>
          </div>
          <div className="header__nav-link">
            <a href="#">статьи</a>
          </div>
        </div>
        <div className="header__actions-container">
          <IconButton img={'/assets/sign-in.svg'}
            text='Войти'
            type='secondary'
            size={'small'} />
          <IconButton img={'/assets/user-add-white.svg'}
            text='Регистрация'
            type='primary'
            size={'small'} />
        </div>
      </Container>
    </header>
  )
}