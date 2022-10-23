import xhr from './xhr'
import { AxiosRequestConfig, AxiosPremise } from './types'

import { buildURL } from './helpers/url'
import { transFormRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPremise {
  processConfig(config)
  return xhr(config)
}

/**
 * 初始化 config 方法
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transFormURL(config)
  config.headers = transFormHeaders(config)
  config.data = transFormRequestData(config)
}

/**
 * 针对 config.url 初始化方法
 * @param config
 * @returns
 */
function transFormURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

/**
 * 针对 config.data 初始化方法
 * @param config
 */
function transFormRequestData(config: AxiosRequestConfig): any {
  return transFormRequest(config.data)
}

/**
 * 针对 config.headers 初始化方法
 * @param config
 * @returns
 */
function transFormHeaders(config: AxiosRequestConfig): any {
  let { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
