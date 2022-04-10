type JsonObject = { [key: string]: JsonType }
type JsonType = null | JsonObject | number | string | boolean;

export default class IRequest implements Request {
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
  readonly bodyUsed: boolean;
  readonly body: ReadableStream<Uint8Array> | null;

  constructor(url: string | IRequest, args?: RequestInit) {
    const entity = typeof url === 'string' ? args || {} : url
    this.url = url instanceof IRequest ? url.url : url
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
    this.body = entity.body ? new ReadableStream() : null
    this.bodyUsed = Boolean(this.body)
  }

  clone(): IRequest {
    return new IRequest(this)
  }
  async arrayBuffer(): Promise<ArrayBuffer> {
    if (this.body) {
      const reader = await this.body.getReader().read()
      if (reader.value) {
        return reader.value
      }
    }
    return new ArrayBuffer(0)
  }
  async blob(): Promise<Blob> {
    if (this.body) {
      const reader = await this.body.getReader().read()
      if (reader.value) {
        return new Blob([reader.value])
      }
    }
    return new Blob()
  }
  async formData(): Promise<FormData> {
    return new FormData()
  }
  async json(): Promise<JsonType> {
    if (this.body) {
      const reader = await this.body.getReader().read()
      if (reader.value) {
        try {
          return JSON.parse(new TextDecoder().decode(reader.value))
        } catch (error) {
          // 
        }
      }
    }
    return null
  }
  async text(): Promise<string> {
    if (this.body) {
      return this.body.toString()
    }
    return ''
  }
}