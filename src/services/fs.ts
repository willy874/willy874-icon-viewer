import { FileModel, DirectoryModel } from '@/models/fs'
import path from 'path'
import fs from 'fs'

export type ReadFileCallback = (url: string, fileData: FileModel | DirectoryModel) => any

export const readDirectory = async function (dir: string[], filePath: string, callback?: ReadFileCallback): Promise<Array<FileModel | DirectoryModel>> {
  return await Promise.all(dir.map(file => readFile(path.join(filePath, file), callback)))
}

export const readFile = async function (url: string, callback?: ReadFileCallback): Promise<FileModel | DirectoryModel> {
  const ParsedPath = path.parse(url)
  const stat = await fs.promises.stat(url)
  if (stat.isFile()) {
    const fileData = new FileModel({
      url,
      ...ParsedPath,
      size: stat.size,
      createTime: stat.birthtime,
      updateTime: stat.mtime
    })
    if (callback) await callback(url, fileData)
    return fileData
  } else {
    const dir = await fs.promises.readdir(url)
    const children = await readDirectory(dir, url, callback)
    const dirData = new DirectoryModel({ url, ...ParsedPath, children })
    if (callback) await callback(url, dirData)
    return dirData
  }
}
