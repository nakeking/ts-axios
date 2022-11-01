import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { transFormResponse } from '../helpers/data'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      timeout,
      responseType,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,

      onDownloadProgress,
      onUploadProgress
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()
    addEvents()
    processHeaders()
    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (timeout) {
        request.timeout = timeout
      }
      if (responseType) {
        request.responseType = responseType
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
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
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }

      /**
       * 网络错误
       */
      request.onerror = function handleError() {
        reject(createError('Network Error', config, null, request))
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if (xsrfCookieName && (withCredentials || isURLSameOrigin(url!))) {
        const xsrfValue = cookie.read(xsrfCookieName)

        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      /**
       * header逻辑
       */
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      /**
       * 取消请求
       */
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed witch status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
