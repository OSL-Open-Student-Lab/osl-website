import { BasicLayout } from 'components/BaseLayout/BaseLayout'
import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from 'packages/auth'

const pic = '/printer.webp'

export default function Facilities() {
  const router = useRouter()
  const {} = useAuth()
  return (
    <BasicLayout>
      <Card style={{ width: '18rem' }}>
        <Image
          src="/printer.webp"
          width={480}
          height={245}
          layout="responsive"
          alt="epson"
        />
        <Card.Body>
          <Card.Title>Принтер Epson</Card.Title>
          <Link passHref href="/queues/1">
            <Button variant="danger">Забронировать</Button>
          </Link>
        </Card.Body>
      </Card>
    </BasicLayout>
  )
}
