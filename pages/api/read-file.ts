// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { FileModel, DirectoryModel } from '@/models/fs'
import { readFile } from '@/services/fs'

type Data<T> = {
  message: string;
  data: T;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data<FileModel | DirectoryModel | null>>
) {
  const { url } = req.query
  const pathUrl = Array.isArray(url) ? url.join() : (url || '')
  const fileTree = await readFile(process.cwd() + pathUrl)
  res.status(200).json({
    message: 'OK',
    data: fileTree
  })
}
