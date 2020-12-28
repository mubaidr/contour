import { RDP } from '../../src/rdp'

describe('Ramer–Douglas–Peucker algorithm', () => {
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

  test('should reduce triangle', () => {
    const output = RDP([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 4, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 4 },
    ])

    expect(output).toBe([
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 4 },
    ])
  })

  test('should reduce rectangle', () => {
    const output = RDP([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 4, y: 4 },
      { x: 2, y: 4 },
      { x: 0, y: 4 },
      { x: 0, y: 2 },
    ])

    expect(output).toBe([
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 4 },
      { x: 0, y: 4 },
    ])
  })
})
