import { getContours } from '../src'
import * as data from './data'

test('dot', t => {
  expect.assertions(2)

  const found = getContours(data.dot)

  expect(found.length).toBe(1)

  expect(found[0]).toBe([4])
})

test('square', t => {
  expect.assertions(2)

  const found = getContours(data.square)

  expect(found.length).toBe(1)

  expect(found[0]).toBe([5, 6, 10, 9])
})

test('squares', t => {
  expect.assertions(3)

  const found = getContours(data.squares)

  expect(found.length).toBe(2)

  expect(found[0]).toBe([9, 10, 18, 17])
  expect(found[1]).toBe([21, 22, 30, 29])
})

test('squares_edge', t => {
  expect.assertions(3)

  const found = getContours(data.squares_edge)

  expect(found.length).toBe(2)

  expect(found[0]).toBe([0, 1, 6, 5])
  expect(found[1]).toBe([8, 9, 14, 13])
})

test('connected', t => {
  expect.assertions(1)

  const found = getContours(data.connected)

  expect(found.length).toBe(1)
})

test('lots', t => {
  expect.assertions(1)

  const found = getContours(data.stuff)

  expect(found.length).toBe(5)
})

test('filled', t => {
  expect.assertions(1)

  const found = getContours(data.large_square)

  expect(found.length).toBe(1)
})
