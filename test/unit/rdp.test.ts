import { ContourFinder } from '../../src/contours'
import { RDP } from '../../src/rdp'
import * as data from '../data'

describe('Name of the group', () => {
  test('should reduce square', () => {
    const found = new ContourFinder(data.square).extract()
    const output = RDP(found[0], 1)

    console.log(found[0])
    console.log(output)

    expect(output).toEqual([
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ])
  })

  test('should reduce largeSquare', () => {
    const found = new ContourFinder(data.largeSquare).extract()
    const output = RDP(found[0], 1)

    console.log(found[0])
    console.log(output)

    expect(output).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 2 },
      { x: 2, y: 2 },
    ])
  })
})
