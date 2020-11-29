import { RDP } from '../../src/rdp'
describe('Name of the group', () => {
  test('should reduce simple square', () => {
    const data = [
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ]

    expect(RDP(data, 0)).toEqual([
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ])
  })

  test('should reduce trapezoid', () => {
    const data = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 2 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
    ]

    console.log(RDP(data, 0.5))

    expect(RDP(data, 0.5)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 2 },
      { x: 2, y: 2 },
    ])
  })
})
