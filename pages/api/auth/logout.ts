import { NextApiRequest, NextApiResponse } from 'next'
import { removeCookies } from 'cookies-next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    removeCookies('logged', { httpOnly: true, sameSite: 'strict', req, res })
    return res.status(200).json({ message: 'OK' })
  }
  return res.status(404).json({ message: 'Not found' })
}
