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

/**
 * request 参数类型接口
 */
export interface AxiosRequestConfig {
  url?: string
  method?: Methods
  data?: any
  params?: any
  headers?: any
  timeout?: number
  //responseType 服务器响应数据类型
  responseType?: XMLHttpRequestResponseType

  [protName: string]: any
}

// response 请求返回值类型接口
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// 接口错误信息增强
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// axios接口扩展
export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

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

// interceptor axios接口拦截器
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolveFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export interface ResolveFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
