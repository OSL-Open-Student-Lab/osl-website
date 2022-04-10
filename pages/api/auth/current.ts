import { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (getCookie('logged', { httpOnly: true, sameSite: 'strict', req, res })) {
      return res.status(200).json({ data: { username: req.cookies.username } })
    }
    return res.status(401).json({ message: 'Unauthorized' })
  }
  return res.status(404).json({ message: 'Not found' })
}
