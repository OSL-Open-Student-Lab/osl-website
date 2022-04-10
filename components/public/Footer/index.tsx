import Link from 'next/link'
import dayjs from 'dayjs'
import { Button } from 'react-bootstrap'

export function Footer() {
  return (
    <footer className="py-3 bg-secondary bg-gradient text-light position-sticky top-100">
      <div className="text-center my-3">
        ©{dayjs().year()}
        Copyright:&nbsp;
        <Link href="https://github.com/TheBaconStyle" passHref>
          <Button variant="link" className="text-decoration-none">
            🥓
          </Button>
        </Link>
      </div>
    </footer>
  )
}
