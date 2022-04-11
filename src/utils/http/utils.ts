import type { RequestConfig, HttpResponse, IHttpError, HttpRequest } from './types'
import IRequest from './request'

export class HttpError<T = unknown, C = RequestConfig, Req = HttpRequest, Res = HttpResponse<T, C>> extends Error {
  data?: T;
  status?: number;
  code?: string;
  config?: C;
  request?: Req;
  response?: Res;
  isAxiosError = true;
  constructor(args: IHttpError<T, C, Req, Res>) {
    super(args.message);
    if (args.config) this.config = args.config;
    if (args.request) this.request = args.request;
    if (args.response) this.response = args.response;
    if (args.code) this.code = args.code;
    if (args.status) this.status = args.status;
    if (args.data) this.data = args.data;
  }

  toJSON() {
    return {
      // Native
      message: this.message,
      name: this.name,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.status
    }
  }
}

export function createHttpError<T>(error: unknown): HttpError<T> {
  if (error instanceof Error) {
    return new HttpError<T>(error)
  }
  return new HttpError({
    message: 'Error',
  })
}

export function createRequest(input: RequestInfo, init?: RequestInit): Request {
  return new Request(input, init)
}
