import { dispatchRequest } from '../core/dispatchRequest'

export type Methods =
  | 'get'
  | 'GET'
  | 'put'
  | 'PUT'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Methods
  data?: any
  params?: any
  headers?: any
  timeout?: number
  //responseType 服务器响应数据类型
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = unknown> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request<T>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T>(config: AxiosRequestConfig): AxiosPromise<T>

  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
