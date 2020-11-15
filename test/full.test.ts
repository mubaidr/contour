import { ContourFinder } from '../src'
import * as data from './data'

describe('ContourFinder', () => {
  test('dot', () => {
    const found = new ContourFinder(data.dot).extract()

    expect(found.length).toBe(1)
    expect(found[0]).toEqual([
      {
        x: 1,
        y: 1,
      },
    ])
  })

  test('square', () => {
    const found = new ContourFinder(data.square).extract()

    expect(found.length).toBe(1)
    expect(found[0]).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
    ])
  })

  test('multiple squares', () => {
    const found = new ContourFinder(data.squares).extract()

    expect(found.length).toBe(2)
    expect(found[0]).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 1, y: 2 },
    ])
    expect(found[1]).toEqual([
      { x: 5, y: 2 },
      { x: 6, y: 2 },
      { x: 6, y: 3 },
      { x: 5, y: 3 },
    ])
  })

  test('edge squares', () => {
    const found = new ContourFinder(data.squaresEdge).extract()

    console.log(found)

    expect(found.length).toBe(2)
    expect(found[0]).toEqual([0, 1, 6, 5])
    expect(found[1]).toEqual([8, 9, 14, 13])
  })

  test('connected', () => {
    const found = new ContourFinder(data.connected).extract()

    expect(found.length).toBe(1)
  })

  test('lots', () => {
    const found = new ContourFinder(data.stuff).extract()

    console.log(found)

    expect(found.length).toBe(5)
  })

  test('filled', () => {
    const found = new ContourFinder(data.largeSquare).extract()

    expect(found.length).toBe(1)
  })
})
