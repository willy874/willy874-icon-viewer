
import IRequest from './request'
import IHeaders from './header'
import IResponse from './response';
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export type HttpRequest = IRequest | XMLHttpRequest

export interface HttpResponse<T = unknown> extends AxiosResponse<T, T> {
}

export interface IHttpError<T = unknown, C = Record<string, any>, Req = HttpRequest, Res = HttpResponse<T>> {
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

export interface AxiosRequestOption<D = any> extends AxiosRequestConfig<D> {
}
export interface FetchRequestOption extends RequestInit {
  url?: string;
}

export interface IHeadersInit {
  headers?: string[][] | Record<string, string> | Headers | IHeaders;
  status?: number;
  statusText?: string;
}
