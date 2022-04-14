import type { NextApiRequest, NextApiResponse } from 'next'
import { readFileTree as readFTree } from '@/services/fs'
import fs from 'fs'

export async function readFile(req: NextApiRequest, res: NextApiResponse) {
  const paramUrl = req.query.url
  if (Array.isArray(paramUrl)) {
    const data = await Promise.all(
      paramUrl.map((value) => fs.promises.readFile(process.cwd() + (value || '')))
    )
    return res.status(200).json({
      message: 'OK',
      data
    })
  } else {
    const data = await fs.promises.readFile(process.cwd() + (paramUrl || ''))
    return res.status(200).json({
      message: 'OK',
      data
    })
  }
}

export async function writeFile(req: NextApiRequest, res: NextApiResponse) {
  const { paramUrl, data } = req.body as {
    paramUrl: string;
    data: string;
  }
  if (fs.existsSync(paramUrl)) {
    const stat = await fs.promises.stat(paramUrl)
    if (stat.isFile()) {
      await fs.promises.writeFile(paramUrl, data)
      return res.status(200).json({
        message: 'OK',
        data: null
      })
    } else {
      return res.status(404).json({
        message: 'is not path',
        data: null
      })
    }
  }
}


export async function readFileTree(req: NextApiRequest, res: NextApiResponse) {
  const paramUrl = req.query.url
  const pathUrl = Array.isArray(paramUrl) ? paramUrl.join() : (paramUrl || '')
  const url = process.cwd() + pathUrl
  const fileTree = await readFTree(url)
  res.status(200).json({
    message: 'OK',
    data: fileTree
  })
}