interface ParsedPath {
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
}

export interface IFileModel extends ParsedPath {
  url: string;
  size: number;
  createTime: Date;
  updateTime: Date;
}

export class FileModel {
  url: string;
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
  size: number;
  createTime: Date;
  updateTime: Date;
  constructor(args: IFileModel) {
    this.url = args.url;
    this.root = args.root;
    this.base = args.base;
    this.name = args.name;
    this.ext = args.ext;
    this.dir = args.ext;
    this.size = args.size;
    this.createTime = args.createTime
    this.updateTime = args.updateTime;
  }
}

export interface IDirectoryModel extends ParsedPath {
  url: string;
  children: Array<FileModel | DirectoryModel>
}


export class DirectoryModel {
  url: string;
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
  child: Array<FileModel | DirectoryModel>
  constructor(args: IDirectoryModel) {
    this.url = args.url;
    this.root = args.root;
    this.base = args.base;
    this.name = args.name;
    this.ext = args.ext;
    this.dir = args.ext;
    this.child = args.children;
  }
}