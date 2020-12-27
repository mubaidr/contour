import { Polygon } from './types/ShapeType'

export function getLinesAngle(line1: Polygon, line2: Polygon): number {
  const [p1, p2] = line1
  const [p3, p4] = line2

  const theta1 = Math.atan2(p2.y - p1.y, p2.x - p1.x)
  const theta2 = Math.atan2(p4.y - p3.y, p4.x - p3.x)

  return Math.abs(theta1 - theta2) * (180 / Math.PI)
}

export function getLinesDifference(line1: Polygon, line2: Polygon): number {
  const [p1, p2] = line1
  const [p3, p4] = line2

  const length1 = Math.sqrt((p2.y - p1.y) ** 2 + (p2.x - p1.x) ** 2)
  const length2 = Math.sqrt((p4.y - p3.y) ** 2 + (p4.x - p3.x) ** 2)

  return Math.abs(length1 - length2)
}

export function isRectangle(contour: Polygon): boolean {
  // TODO: check two opposite angles if right
  return true
}

export function isSquare(contour: Polygon): boolean {
  // TODO: compare length of two meeting lines
  return true
}
