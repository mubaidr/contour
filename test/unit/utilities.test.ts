import { Polygon } from '../../src/types/ShapeType'
import {
  getLinesAngle,
  getLinesDifference,
  isCircle,
  isRectangle,
  perpendicularDistance,
} from '../../src/utilities'

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
    const contour: Polygon = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 0, y: 2 },
    ]

    expect(isRectangle(contour)).toBeTruthy()
  })

  test('should fail if contour does not have right angles on all sides', () => {
    const contour: Polygon = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 6, y: 2 },
      { x: 0, y: 2 },
    ]

    expect(isRectangle(contour)).toBeFalsy()
  })
})

describe('isSquare', () => {
  test('should check if length of all lines is equal', () => {
    const contour: Polygon = [
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 5, y: 5 },
      { x: 0, y: 5 },
    ]

    expect(isRectangle(contour)).toBeTruthy()
  })
})

describe('isCircle', () => {
  test('should check if contour isCircle', () => {
    const contour: Polygon = [
      { x: 0, y: 20 },
      { x: 5, y: 19 },
      { x: 10, y: 17 },
      { x: 15, y: 13 },
      { x: 20, y: 0 },
      { x: 15, y: -13 },
      { x: 10, y: -17 },
      { x: 5, y: -19 },
      { x: 0, y: -20 },
      { x: -5, y: -19 },
      { x: -10, y: -17 },
      { x: -15, y: -13 },
      { x: -20, y: 0 },
      { x: -15, y: 13 },
      { x: -10, y: 17 },
      { x: -5, y: 19 },
    ]

    expect(isCircle(contour)).toBeTruthy()
  })
})
