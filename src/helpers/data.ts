import { isPlainObject } from './util'

export function transFormRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export function transFormResponse(data: any): Record<string, any> {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (err) {}
  }

  return data
}
