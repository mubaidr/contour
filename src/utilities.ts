import { Point, Polygon } from './types/ShapeType'

const THRESHOLD = 6.25

// gets angle of a line
function getLineAngle(p0: Point, p1: Point): number {
  return Math.atan2(p1.y - p0.y, p1.x - p0.x)
}

// gets length of a line
function getLineLength(p0: Point, p1: Point): number {
  return Math.sqrt((p1.y - p0.y) ** 2 + (p1.x - p0.x) ** 2)
}

// angle between two lines
export function getLinesAngle(line1: Polygon, line2: Polygon): number {
  const [p0, p1] = line1
  const [p2, p3] = line2

  const theta1 = getLineAngle(p0, p1)
  const theta2 = getLineAngle(p2, p3)

  // differenc of angle of two lines is angle between those lines
  return Math.abs(theta1 - theta2) * (180 / Math.PI)
}

// returns diffrnce in length between two lines
export function getLinesDifference(line1: Polygon, line2: Polygon): number {
  const [p0, p1] = line1
  const [p2, p3] = line2

  const length1 = getLineLength(p0, p1)
  const length2 = getLineLength(p2, p3)

  return Math.abs(length1 - length2)
}

// checks if two opposite vertex have right:90 angle
export function isRectangle(contour: Polygon): boolean {
  const [p0, p1, p2, p3] = contour

  const angle1 = getLinesAngle([p0, p1], [p1, p2])
  const angle2 = getLinesAngle([p0, p3], [p3, p2])

  const diff = Math.abs(angle2 - angle1)

  return diff <= THRESHOLD
}

// check if two adjacent sides are same of same length
export function isSquare(contour: Polygon): boolean {
  const [p0, p1, p2] = contour

  const edgeLength = getLineLength(p0, p1)
  const diff = getLinesDifference([p0, p1], [p1, p2])

  return diff <= edgeLength * (THRESHOLD / 100)
}

// check if polygon is a circle
export function isCircle(contour: Polygon): boolean {
  // polygon has too few points
  if (contour.length < 16) return false

  // find a circle equation from 3 distinct points
  const total = contour.length
  const circle = circleFromThreePoints(
    contour[Math.floor(total * 0.25)],
    contour[Math.floor(total * 0.5)],
    contour[Math.floor(total * 0.75)]
  )

  // determine if all points in polygon fulfull this circle equation
  for (let i = 0; i < contour.length; i += 1) {
    const p = contour[i]
    const r = Math.sqrt((p.x - circle.x) ** 2 + (p.y - circle.y) ** 2)

    if (circle.r - r > (circle.r * THRESHOLD) / 100) {
      return false
    }
  }

  return true
}

// gets a circle from 3 points
function circleFromThreePoints(
  p0: Point,
  p1: Point,
  p2: Point
): {
  x: number
  y: number
  r: number
} {
  const x1 = p0.x
  const y1 = p0.y
  const x2 = p1.x
  const y2 = p1.y
  const x3 = p2.x
  const y3 = p2.y

  const a = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2

  const b =
    (x1 * x1 + y1 * y1) * (y3 - y2) +
    (x2 * x2 + y2 * y2) * (y1 - y3) +
    (x3 * x3 + y3 * y3) * (y2 - y1)

  const c =
    (x1 * x1 + y1 * y1) * (x2 - x3) +
    (x2 * x2 + y2 * y2) * (x3 - x1) +
    (x3 * x3 + y3 * y3) * (x1 - x2)

  const x = -b / (2 * a)
  const y = -c / (2 * a)

  return {
    x: x,
    y: y,
    r: Math.hypot(x - x1, y - y1),
  }
}
