// import * as contours from '../src'
// import * as data from './data'

// test('trace contour', () => {
//   expect(contours.traceContour(data.square, 5)).toEqual([5, 6, 10, 9])
//   expect(contours.traceContour(data.dot, 4)).toEqual([4])
// })

// test('neighbours', () => {
//   expect(
//     contours.neighbours({ data: data.square.data, width: 4, height: 4 }, 5, 0)
//   ).toEqual([0, 1, 2, 6, 10, 9, 8, 4])

//   expect(
//     contours.neighbours({ data: data.square.data, width: 4, height: 4 }, 5, 1)
//   ).toEqual([1, 2, 6, 10, 9, 8, 4, 0])
// })

// test('neighbours edge', () => {
//   expect(
//     contours.neighbours({ data: data.square.data, width: 4, height: 4 }, 0, 0)
//   ).toEqual([-1, -4, -3, 1, 5, 4, -1, -1])
// })

// test('offset', () => {
//   expect(contours.offset([1, 2, 3, 4, 5, 6], 3)).toEqual([4, 5, 6, 1, 2, 3])
// })
