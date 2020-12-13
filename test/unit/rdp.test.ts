import { ContourFinder } from '../../src/contours'
import { perpendicularDistance, RDP } from '../../src/rdp'
import * as data from '../data'

describe('Name of the group', () => {
  test('perpendicularDistance', () => {
    const d1 = perpendicularDistance(
      { x: 1, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 2 }
    )
    const d2 = perpendicularDistance(
      { x: 0, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 2 }
    )
    const d3 = perpendicularDistance(
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 }
    )

    expect(d1).toBe(2)
    expect(d2).toBe(2)
    expect(d3).toBe(1)
  })

  test('should reduce line', () => {
    const output = RDP([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
    ])

    expect(output).toEqual([
      { x: 1, y: 1 },
      { x: 4, y: 4 },
    ])
  })

  // TOFIX: Fix RDP tests for closed small shapes
  test('should reduce square', () => {
    const found = new ContourFinder(data.square).simplify().contours

    expect(found.length).toBe(1)
    expect(found[0]).toEqual([
      { x: 1, y: 3 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 3 },
    ])
  })

  test('should reduce triangle', () => {
    const found = new ContourFinder(data.tri).simplify().contours

    expect(found.length).toBe(1)
    expect(found[0]).toEqual([
      { x: 1, y: 3 },
      { x: 1, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 3 },
    ])
  })
})
