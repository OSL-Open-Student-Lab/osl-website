import { NextApiRequest, NextApiResponse } from 'next'
import { setCookies } from 'cookies-next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    setCookies('logged', 'true', {
      req,
      res,
      httpOnly: true,
      sameSite: 'strict'
    })
    setCookies('username', req.body.username, {
      req,
      res,
      httpOnly: true,
      sameSite: 'strict'
    })
    return res.status(200).json({ message: 'OK' })
  }
  return res.status(404).json({ message: 'Not found' })
}
