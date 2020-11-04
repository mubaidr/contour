import { ContourExtractor } from '../src'
import * as data from './data'

test('dot', () => {
  const found = new ContourExtractor().extract(data.dot)

  console.log(found)

  expect(found.length).toBe(1)
  expect(found[0]).toEqual([4])
})

test('square', () => {
  const found = new ContourExtractor().extract(data.square)

  expect(found.length).toBe(1)
  expect(found[0]).toEqual([5, 6, 10, 9])
})

test('squares', () => {
  expect.assertions(3)

  const found = new ContourExtractor().extract(data.squares)

  expect(found.length).toBe(2)
  expect(found[0]).toEqual([9, 10, 18, 17])
  expect(found[1]).toEqual([21, 22, 30, 29])
})

test('squares_edge', () => {
  const found = new ContourExtractor().extract(data.squares_edge)

  expect(found.length).toBe(2)
  expect(found[0]).toEqual([0, 1, 6, 5])
  expect(found[1]).toEqual([8, 9, 14, 13])
})

test('connected', () => {
  const found = new ContourExtractor().extract(data.connected)

  expect(found.length).toBe(1)
})

test('lots', () => {
  const found = new ContourExtractor().extract(data.stuff)

  expect(found.length).toBe(5)
})

test('filled', () => {
  const found = new ContourExtractor().extract(data.large_square)

  expect(found.length).toBe(1)
})
