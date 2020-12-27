import { getLinesAngle, getLinesDifference } from '../../src/utilities'

describe('Angle between lines', () => {
  test('should get angle between lines: 0', () => {
    const line1 = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 5,
        y: 0,
      },
    ]

    const line2 = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
    ]

    expect(getLinesAngle(line1, line2)).toBe(0)
  })

  test('should get angle between lines: 45', () => {
    const line1 = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 5,
        y: 0,
      },
    ]

    const line2 = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 5,
        y: 5,
      },
    ]

    expect(getLinesAngle(line1, line2)).toBe(45)
  })

  test('should get angle between lines: 90', () => {
    const line1 = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 5,
        y: 0,
      },
    ]

    const line2 = [
      {
        x: 5,
        y: 0,
      },
      {
        x: 5,
        y: 5,
      },
    ]

    expect(getLinesAngle(line1, line2)).toBe(90)
  })
})

describe('Differnece between lines lengths', () => {
  test('should get differnece between lines length', () => {
    const line1 = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 5,
        y: 0,
      },
    ]

    const line2 = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 2,
        y: 0,
      },
    ]

    expect(getLinesDifference(line1, line2)).toBe(3)
  })
})

describe('isRectangle', () => {
  test('should check if contour has right angles on all sides', () => {
    console.log('Not implemented')
  })
})

describe('isSquare', () => {
  test('should check if length of all lines is equal', () => {
    console.log('Not implemented')
  })
})
