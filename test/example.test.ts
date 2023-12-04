import { expect, test, describe, vi } from 'vitest'
import { testFn } from './utils'

describe('test common', () => {
  test('test common matcher', () => {
    const name = 'warmleaf'
    expect(name).toBe('warmleaf')

    expect(2 + 2).not.toBe(5)
  })

  test('test to be true or false', () => {
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
  })

  test('test number', () => {
    expect(1).toBeGreaterThan(0)
    expect(1).toBeLessThan(2)
  })

  test('test object', () => {
    // toBe 是严格相等，toEqual 是值相等
    expect({ name: 'warmleaf' }).toEqual({ name: 'warmleaf' })
  })
})

describe('test fn', () => {
  test('test mock function', () => {
    const callBack = vi.fn()
    testFn(11, callBack)
    expect(callBack).toHaveBeenCalled()
    expect(callBack).toHaveBeenCalledWith(11)
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 'warmleaf'
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })
})
