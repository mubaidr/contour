import * as contours from '../src'
import * as data from './data'

test('trace contour', t => {
  expect.assertions(2)

  expect(contours.traceContour(data.square, 5)).toBe([5, 6, 10, 9])

  expect(contours.traceContour(data.dot, 4)).toBe([4])
})

test('neighbours', t => {
  expect.assertions(2)

  expect(
    contours.neighbours({ data: data.square.data, width: 4, height: 4 }, 5, 0)
  ).toBe([0, 1, 2, 6, 10, 9, 8, 4])

  expect(
    contours.neighbours({ data: data.square.data, width: 4, height: 4 }, 5, 1)
  ).toBe([1, 2, 6, 10, 9, 8, 4, 0])
})

test('neighbours edge', t => {
  expect.assertions(1)

  expect(
    contours.neighbours({ data: data.square.data, width: 4, height: 4 }, 0, 0)
  ).toBe([-1, -4, -3, 1, 5, 4, -1, -1])
})

test('offset', t => {
  expect.assertions(1)

  expect(contours.offset([1, 2, 3, 4, 5, 6], 3)).toBe([4, 5, 6, 1, 2, 3])
})
