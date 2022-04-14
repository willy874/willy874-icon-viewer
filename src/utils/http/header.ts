import { isHeaders } from '../condition';


export default class IHeaders extends Headers {
  constructor(args?: HeadersInit | IHeaders) {
    super(args);
  }

  static resolve(headers: HeadersInit | IHeaders | Record<string, any>): Record<string, string> {
    let result: Record<string, string> = {}
    if (isHeaders(headers)) {
      headers.forEach((key, value) => {
        result[key] = value
      })
    } else if (headers instanceof IHeaders) {
      headers.forEach((key, value) => {
        result[key] = value
      })
    } else if (headers instanceof Array) {
      headers.forEach(([key, value]) => {
        result[key] = value
      })
    } else {
      Object.keys(headers).forEach(key => {
        result[key] = typeof headers[key] === 'object' ? JSON.stringify(headers[key]) : headers[key]
      })
    }
    return result
  }

  static createHeader(headers: HeadersInit) {
    return new IHeaders(headers)
  }
}