import React from 'react'
import { Container, Button } from 'react-bootstrap'

import { Calendar } from '../Calendar'

interface YearPageProps {}

function YearPage({}: YearPageProps) {
  // return <>{ Array(10).fill(null).map((_item,index)=>)}</>
}

export default function AdminLayout() {
  return (
    <Container>
      <Calendar />
    </Container>
  )
}
