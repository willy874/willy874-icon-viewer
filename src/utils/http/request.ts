import IBody from "./body";

function createRequestEntity(url: RequestInfo | IRequest, args?: RequestInit) {
  if (url instanceof Request) return url
  if (url instanceof IRequest) return url
  if (typeof url === "string") return { ...args, url }
  return args || {}
}

function getUrl(req: RequestInfo | IRequest) {
  if (req instanceof Request) return req.url
  if (req instanceof IRequest) return req.url
  return req
}


export default class IRequest extends IBody implements Request {
  readonly cache: RequestCache;
  readonly credentials: RequestCredentials;
  readonly destination: RequestDestination;
  readonly headers: Headers;
  readonly integrity: string;
  readonly keepalive: boolean;
  readonly method: string;
  readonly mode: RequestMode;
  readonly redirect: RequestRedirect;
  readonly referrer: string;
  readonly referrerPolicy: ReferrerPolicy;
  readonly signal: AbortSignal;
  readonly url: string;

  constructor(url: RequestInfo | IRequest, args?: RequestInit) {
    const entity = createRequestEntity(url, args);
    super(entity.body);
    this.url = getUrl(url)
    this.cache = entity.cache || 'default'
    this.credentials = entity.credentials || 'same-origin'
    this.destination = ''
    this.headers = new Headers(entity.headers || {})
    this.integrity = entity.integrity || ''
    this.keepalive = entity.keepalive || false
    this.method = entity.method || 'GET'
    this.mode = entity.mode || 'cors'
    this.redirect = entity.redirect || 'follow'
    this.referrer = entity.referrer || 'about:client'
    this.referrerPolicy = entity.referrerPolicy || ''
    this.signal = entity.signal || new AbortSignal()
  }

  clone(): IRequest {
    return new IRequest(this)
  }

}