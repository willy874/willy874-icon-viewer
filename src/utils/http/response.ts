import { IHeadersInit } from "./types";
import IHeaders from "./header";

export default class IResponse extends Response {
  constructor(body?: BodyInit | null, res?: IHeadersInit) {
    super(body, res);
  }

  clone(): IResponse {
    return new IResponse(this.body, IHeaders.resolve(this.headers))
  }
}