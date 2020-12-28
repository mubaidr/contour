import { Point, Polygon } from './types/ShapeType'

const THRESHOLD = 6.25

function getLineAngle(p0: Point, p1: Point): number {
  return Math.atan2(p1.y - p0.y, p1.x - p0.x)
}

function getLineLength(p0: Point, p1: Point): number {
  return Math.sqrt((p1.y - p0.y) ** 2 + (p1.x - p0.x) ** 2)
}

export function getLinesAngle(line1: Polygon, line2: Polygon): number {
  const [p0, p1] = line1
  const [p2, p3] = line2

  const theta1 = getLineAngle(p0, p1)
  const theta2 = getLineAngle(p2, p3)

  return Math.abs(theta1 - theta2) * (180 / Math.PI)
}

export function getLinesDifference(line1: Polygon, line2: Polygon): number {
  const [p0, p1] = line1
  const [p2, p3] = line2

  const length1 = getLineLength(p0, p1)
  const length2 = getLineLength(p2, p3)

  return Math.abs(length1 - length2)
}

export function isRectangle(contour: Polygon): boolean {
  const [p0, p1, p2, p3] = contour

  const angle1 = getLinesAngle([p0, p1], [p1, p2])
  const angle2 = getLinesAngle([p0, p3], [p3, p2])

  const diff = Math.abs(angle2 - angle1)

  return diff <= THRESHOLD
}

export function isSquare(contour: Polygon): boolean {
  const [p0, p1, p2] = contour

  const edgeLength = getLineLength(p0, p1)
  const diff = getLinesDifference([p0, p1], [p1, p2])

  return diff <= edgeLength * (THRESHOLD / 100)
}

export function isCircle(contour: Polygon): boolean {
  return true
}
