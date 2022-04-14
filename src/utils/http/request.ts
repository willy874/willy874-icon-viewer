import { isRequest } from '../condition'

function createRequestEntity(input: RequestInfo | IRequest, init?: RequestInit): [RequestInfo, RequestInit?] {
  if (input instanceof isRequest) {
    return [input]
  }
  if (input instanceof IRequest) {
    return [input.url, { ...input }]
  }
  if (typeof input === "string") {
    return [input, init]
  }
  return ['']
}

export default class IRequest extends Request {
  constructor(input: RequestInfo | IRequest, args?: RequestInit) {
    const [url, init] = createRequestEntity(input, args)
    super(url, init);
  }

  clone(): IRequest {
    return new IRequest(this)
  }

}