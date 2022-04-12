import type { HttpResponse, IHttpError, HttpRequest } from './types'

export class HttpError<T = unknown, C = Record<string, any>, Req = HttpRequest, Res = HttpResponse<T>> extends Error {
  data?: T;
  status?: number;
  code?: string;
  config?: C;
  request?: Req;
  response?: Res;
  constructor(args: IHttpError<T, C, Req, Res>) {
    const entity = args || {}
    super(entity.message || 'Http Error');
    if (entity.config) this.config = entity.config;
    if (entity.request) this.request = entity.request;
    if (entity.response) this.response = entity.response;
    if (entity.code) this.code = entity.code;
    if (entity.status) this.status = entity.status;
    if (entity.data) this.data = entity.data;
  }
}

export function createHttpError<T>(error: unknown): HttpError<T> {
  if (error instanceof Error) {
    return new HttpError<T>(error)
  }
  const info = error as object
  return new HttpError({
    message: 'Error',
    ...info
  })
}
