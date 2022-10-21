import xhr from './xhr'
import { AxiosRequestConfig } from './types'

import { buildURL } from './helpers/url'
import { transFormRequest } from './helpers/data'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

/**
 * 初始化 config 方法
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transFormURL(config)
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

export default axios
