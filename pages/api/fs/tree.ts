// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import handlerControllers from '@/middleware/controller'
import { readFileTree } from '@/controllers/fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await handlerControllers(req, res, {
    get: readFileTree
  })
}
