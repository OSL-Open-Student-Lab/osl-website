import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.send([
    {
      facility_booking_id: 1,
      from_time: '18-03-2022 10:00',
      to_time: '18-03-2022 13:00'
    },
    {
      facility_booking_id: 2,
      from_time: '25-03-2022 10:00',
      to_time: '25-03-2022 13:00'
    }
  ])
}
