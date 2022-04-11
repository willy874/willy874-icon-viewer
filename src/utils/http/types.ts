
import IRequest from './request'
import type { ResponseType } from 'axios'

export type HttpRequest = IRequest | Request | XMLHttpRequest

export interface HttpResponse<T = unknown, C = RequestConfig> {
  status: number;
  statusText: string;
  data?: T;
  headers: Record<string, string>;
  config?: C,
  request?: HttpRequest;
  response?: Response;
}

export interface IHttpError<T = unknown, C = RequestConfig, Req = HttpRequest, Res = HttpResponse<T, C>> {
  message: string;
  data?: T;
  status?: number;
  config?: C;
  code?: string;
  request?: Req;
  response?: Res;
}

export type Method = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK";

export interface BasicCredentials {
  username: string;
  password: string;
}

export interface ProxyConfig {
  host: string;
  port: number;
  auth?: BasicCredentials;
  protocol?: string;
}

export interface CancelToken {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
}
export interface Cancel {
  message: string | undefined;
}

export interface TransitionalOptions {
  silentJSONParsing?: boolean;
  forcedJSONParsing?: boolean;
  clarifyTimeoutError?: boolean;
}

export interface RequestConfig<D = any> {
  // common
  url?: string;
  method?: Method;
  signal?: AbortSignal;
  // Axios
  baseURL?: string;
  transformRequest?: Array<(req: IRequest) => IRequest>;
  transformResponse?: Array<(res: HttpResponse) => HttpResponse>;
  headers?: HeadersInit;
  params?: any;
  data?: D;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  auth?: BasicCredentials;
  responseType?: ResponseType;
  responseEncoding?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  maxContentLength?: number;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: ProxyConfig | false;
  cancelToken?: CancelToken;
  decompress?: boolean;
  transitional?: TransitionalOptions;
  insecureHTTPParser?: boolean;
  paramsSerializer?: (params: any) => string;
  adapter?: (config: any) => Promise<any>;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  validateStatus?: ((status: number) => boolean) | null;
  // Request
  cache?: RequestCache;
  credentials?: RequestCredentials;
  destination?: RequestDestination;
  integrity?: string;
  keepalive?: boolean;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
}
