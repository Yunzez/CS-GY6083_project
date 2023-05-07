import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const cors = Cors({
    origin: process.env.NEXT_PUBLIC_SITE_URL?.split('|'),
  })
  
export default async function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
    return new Promise((resolve, reject) => {
      cors(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }