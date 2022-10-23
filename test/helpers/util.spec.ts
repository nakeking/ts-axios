import { isDate, isPlainObject, isObject } from '../../src/helpers/util'

describe('helpers:util', () => {
  // 数据类型判断方法 单元测试
  describe('isXX', () => {
    // isDate 单元测试
    test('should validate Date', () => {
      expect(isDate(new Date())).toBeTruthy() //是否返回 true
      expect(isDate(Date.now())).toBeFalsy() //是否返回 false
    })

    // isPlainObject 单元测试
    test('should validate PlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    // isObject 单元测试
    test('should validate Object', () => {
      expect(isObject({})).toBeTruthy()
      expect(isObject(null)).toBeFalsy()
    })
  })
})
