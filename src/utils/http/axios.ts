import type { HttpResponse, AxiosRequestOption } from './types'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { HttpError } from './utils'
import { axiosDefaultConfig } from './config'

interface InterceptorOptions<D> {
  instance: AxiosInstance,
  resolve: (value: HttpResponse<D> | PromiseLike<HttpResponse<D>>) => void;
  reject: (reason?: HttpError | Error) => void
}

const requestSuccessHandler = function <D>(options: InterceptorOptions<D>) {
  return async (req: AxiosRequestConfig) => {
    return req
  }
}

const requestErrorHandler = function <D>(options: InterceptorOptions<D>) {
  return async (error: AxiosError) => {
    return new HttpError(error)
  }
}

const responseSuccessHandler = function <D>(options: InterceptorOptions<D>) {
  return async (res: AxiosResponse | HttpResponse) => {
    return res
  }
}

const responseErrorHandler = function <D>(options: InterceptorOptions<D>) {
  return async (error: AxiosError) => {
    return new HttpError(error)
  }
}

const requestHandler = function <D>(instance: AxiosInstance, config: AxiosRequestOption): Promise<HttpResponse<D>> {
  return new Promise((resolve, reject) => {
    const options = {
      instance,
      resolve,
      reject
    }
    instance.interceptors.request.use(requestSuccessHandler(options), requestErrorHandler(options))
    instance.interceptors.response.use(responseSuccessHandler(options), responseErrorHandler(options))
    instance.request(config).then(resolve).catch(reject)
  })
}

const responseHandler = async function <D>(response: HttpResponse<D>) {
  return response.data
}

const axiosRequest = async function <D>(config: AxiosRequestOption) {
  const instance = axios.create(axiosDefaultConfig)
  const response = await requestHandler<D>(instance, config)
  return await responseHandler<D>(response)
}

const http = {
  request<D>(config: AxiosRequestConfig) {
    return axiosRequest<D>({ ...config })
  },
  get<D>(url: string, config?: AxiosRequestConfig) {
    return axiosRequest<D>({ ...config, method: 'GET', url })
  },
  post<D>(url: string, data?: D, config?: AxiosRequestConfig) {
    return axiosRequest<D>({ ...config, method: 'POST', url, data })
  },
  put<D>(url: string, data?: D, config?: AxiosRequestConfig) {
    return axiosRequest<D>({ ...config, method: 'PUT', url, data })
  },
  patch<D>(url: string, data?: D, config?: AxiosRequestConfig) {
    return axiosRequest<D>({ ...config, method: 'PATCH', url, data })
  },
  delete<D>(url: string, config?: AxiosRequestConfig) {
    return axiosRequest<D>({ ...config, method: 'DELETE', url })
  },
}

export default http