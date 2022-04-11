import IBody from "./body";
import IHeaders from "./header";

export default class IResponse extends IBody implements Response {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;

  constructor(body?: BodyInit | null, res?: ResponseInit) {
    super(body);
    const entity = res || {}
    this.headers = new Headers(entity.headers || {})
    this.status = entity.status || 0
    this.ok = this.status ? this.status >= 400 : false
    this.redirected = this.status ? this.status >= 300 && this.status < 400 : false
    this.statusText = entity.statusText || ''
    this.type = 'default'
    this.url = ''
  }

  clone(): IResponse {
    return new IResponse(this.body, {
      headers: this.headers,
      status: this.status,
      statusText: this.statusText
    })
  }
}