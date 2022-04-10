import React from 'react'
import useSWR from 'swr'

import { api } from 'packages/api'
import Facility from './Facility'

const prostoChtoNibud = [
  {
    id: 1,
    img: '/assets/facility-img.png',
    status: 'новинка!',
    title: 'Аннигиляторная пушка',
    description:
      'Краткое описание пушки, что она умеет, для каких целей находится в лаборатории, чем полезна студентам.'
  },
  {
    id: 2,
    img: '/assets/facility-img.png',
    status: 'популярно!',
    title: 'Заминированный тапок',
    description:
      'Краткое описание тапков, что они умеют, для каких целей находятся в лаборатории, чем полезны студентам.'
  },
  {
    id: 3,
    img: '/assets/facility-img.png',
    title: 'Робот-убийца',
    description:
      'Краткое описание робота, что он умеет, для каких целей находится в лаборатории, чем полезен студентам.'
  }
]

interface IFacility {
  id: number
  img: string
  title: string
  description: string
  status?: string
}

async function facilityFetcher() {
  return await api.get('facilities/get_all_url')
}

const FacilitiesList = () => {
  const { data } = useSWR('')
  return (
    <div className="facilities-list">
      {prostoChtoNibud.map((item: IFacility) => (
        <Facility
          key={item.id}
          id={item.id}
          image={item.img}
          title={item.title}
          description={item.description}
          status={item.status}
        />
      ))}
    </div>
  )
}

export default FacilitiesList
