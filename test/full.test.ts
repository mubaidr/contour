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
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ])
  })

  test('trapezoid', () => {
    const found = new ContourFinder(data.trapezoid).extract()

    expect(found.length).toBe(1)
    expect(found[0]).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 2 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
    ])
  })

  test('reversedTrapezoid', () => {
    const found = new ContourFinder(data.reversedTrapezoid).extract()

    expect(found.length).toBe(1)
    expect(found[0]).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
    ])
  })

  test('onlySquare', () => {
    const found = new ContourFinder(data.onlySquare).extract()

    expect(found.length).toBe(1)
    expect(found[0]).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ])
  })

  test('multipleSquares', () => {
    const found = new ContourFinder(data.multipleSquares).extract()

    expect(found.length).toBe(2)
    expect(found[0]).toEqual([
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ])
    expect(found[1]).toEqual([
      { x: 5, y: 3 },
      { x: 5, y: 2 },
      { x: 6, y: 2 },
      { x: 6, y: 3 },
    ])
  })

  test('edgeSquares', () => {
    const found = new ContourFinder(data.edgeSquares).extract()

    expect(found.length).toBe(2)
    expect(found[0]).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ])
    expect(found[1]).toEqual([
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 3, y: 2 },
    ])
  })

  test('connected', () => {
    const found = new ContourFinder(data.connected).extract()

    expect(found.length).toBe(1)
  })

  test('largeSquare', () => {
    const found = new ContourFinder(data.largeSquare).extract()

    expect(found.length).toBe(1)
  })

  test('tri', () => {
    const found = new ContourFinder(data.tri).extract()

    expect(found.length).toBe(1)
  })

  test('stuff', () => {
    const found = new ContourFinder(data.stuff).extract()

    expect(found.length).toBe(5)
  })
})
