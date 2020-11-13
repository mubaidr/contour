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
  test('dot', () => {
    const cf = new ContourFinder(data.dot)

    expect(
      cf.nextClockwise(
        {
          x: 0,
          y: 0,
        },
        {
          x: 1,
          y: 1,
        }
      )
    ).toEqual({
      x: 0,
      y: 0,
    })
  })

  test('square', () => {
    const cf = new ContourFinder(data.square)

    expect(
      cf.nextClockwise(
        {
          x: 0,
          y: 0,
        },
        {
          x: 1,
          y: 1,
        }
      )
    ).toEqual({
      x: 2,
      y: 1,
    })

    expect(
      cf.nextClockwise(
        {
          x: 0,
          y: 0,
        },
        {
          x: 1,
          y: 1,
        }
      )
    ).toEqual({
      x: 2,
      y: 1,
    })
  })
})
