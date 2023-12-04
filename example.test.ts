import { expect, test } from 'vitest'

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
