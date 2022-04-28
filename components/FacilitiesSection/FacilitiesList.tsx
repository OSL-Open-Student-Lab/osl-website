import React from 'react'
import useSWR from 'swr'

import Facility from '../Facility/Facility'
import { api } from 'packages/api'

interface IFacility {
  id: number
  image: string
  name: string
  description: string
  status?: string
}

async function facilityFetcher() {
  return await api.get('/facilities').then((res) => res.data.data)
}

const FacilitiesList = () => {
  const { data: facilities } = useSWR('Mutate', facilityFetcher)
  return (
    <div className="facilities-list">
      {facilities &&
        facilities.map(
          (item: IFacility, index: number) =>
            index < 3 && (
              <Facility
                key={item.id}
                id={item.id}
                image={`http://localhost:8000/api/v1/static/${item.image}`}
                title={item.name}
                description={item.description}
              />
            )
        )}
    </div>
  )
}

export default FacilitiesList
