import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const proc = Boolean(Math.floor(Math.random() * 2))
  return res.status(proc ? 200 : 401).send(proc ? 'OK' : 'FAIL')
}
