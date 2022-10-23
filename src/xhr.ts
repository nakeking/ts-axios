import { AxiosRequestConfig, AxiosPremise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { transFormResponse } from './helpers/data'

export default function xhr(config: AxiosRequestConfig): AxiosPremise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, timeout, responseType } = config

    const request = new XMLHttpRequest()

    if (timeout) {
      request.timeout = timeout
    }

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    /**
     * 请求响应成功监听事件
     * @returns
     */
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: transFormResponse(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }

    /**
     * 请求超时
     */
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }

    /**
     * 网络错误
     */
    request.onerror = function handleError() {
      reject(new Error('Network Error'))
    }

    Object.keys(headers).forEach(name => {
      request.setRequestHeader(name, headers[name])
    })

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed witch status code ${response.status}`))
      }
    }
  })
}
