import { ContourFinder } from '../src'
import * as data from './data'

describe('index <-> point conversion', () => {
  test('index to point', () => {
    const cf = new ContourFinder(data.dot)

    expect(cf.indexToPoint(0)).toEqual({
      x: 0,
      y: 0,
    })

    expect(cf.indexToPoint(4)).toEqual({
      x: 1,
      y: 1,
    })

    expect(cf.indexToPoint(8)).toEqual({
      x: 2,
      y: 2,
    })
  })

  test('point to index', () => {
    const cf = new ContourFinder(data.dot)

    expect(
      cf.pointToIndex({
        x: 0,
        y: 0,
      })
    ).toBe(0)

    expect(
      cf.pointToIndex({
        x: 1,
        y: 1,
      })
    ).toBe(4)

    expect(
      cf.pointToIndex({
        x: 2,
        y: 2,
      })
    ).toBe(8)
  })
})

describe('nextClockwise', () => {
  describe('dot', () => {
    test('0,4 -> 0,4', () => {
      const cf = new ContourFinder(data.dot)

      expect(
        cf.nextClockwise({
          previous: {
            x: 0,
            y: 0,
          },
          boundary: {
            x: 1,
            y: 1,
          },
        })
      ).toEqual({
        previous: {
          x: 0,
          y: 0,
        },
        boundary: {
          x: 1,
          y: 1,
        },
      })
    })
  })

  describe('square', () => {
    test('1,5 -> 2,6', () => {
      const cf = new ContourFinder(data.square)

      expect(
        cf.nextClockwise({
          previous: {
            x: 1,
            y: 0,
          },
          boundary: {
            x: 1,
            y: 1,
          },
        })
      ).toEqual({
        previous: {
          x: 2,
          y: 0,
        },
        boundary: {
          x: 2,
          y: 1,
        },
      })
    })

    test('7,6 -> 11,10', () => {
      const cf = new ContourFinder(data.square)

      expect(
        cf.nextClockwise({
          previous: {
            x: 3,
            y: 1,
          },
          boundary: {
            x: 2,
            y: 1,
          },
        })
      ).toEqual({
        previous: {
          x: 3,
          y: 2,
        },
        boundary: {
          x: 2,
          y: 2,
        },
      })
    })

    test('11,10 -> 13,9', () => {
      const cf = new ContourFinder(data.square)

      expect(
        cf.nextClockwise({
          previous: {
            x: 3,
            y: 2,
          },
          boundary: {
            x: 2,
            y: 2,
          },
        })
      ).toEqual({
        previous: {
          x: 1,
          y: 3,
        },
        boundary: {
          x: 1,
          y: 2,
        },
      })
    })

    test('13,9 -> 4,5', () => {
      const cf = new ContourFinder(data.square)

      expect(
        cf.nextClockwise({
          previous: {
            x: 1,
            y: 3,
          },
          boundary: {
            x: 1,
            y: 2,
          },
        })
      ).toEqual({
        previous: {
          x: 0,
          y: 1,
        },
        boundary: {
          x: 1,
          y: 1,
        },
      })
    })
  })
})
