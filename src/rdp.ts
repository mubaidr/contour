// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm

import { Point } from './types/Point'

function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

function perpendicularDistance(point: Point, start: Point, end: Point): number {
  if (start.x === end.x && start.y === end.y) {
    return distance(point, start)
  }

  const n =
    ((end.x - start.x) * (start.y - point.y)) /
    ((start.x - point.x) * (end.y - start.y))

  const d = (end.x - start.x) ** 2 + (end.y - start.y) ** 2

  return Math.abs(n / d)
}

export function RDP(contour: Point[], epsilon: number): Point[] {
  const endIndex = contour.length - 1
  let collection: Point[] = []
  let maxDistance = 0
  let index = 0

  for (let i = 1; i < endIndex; i += 1) {
    const distance = perpendicularDistance(
      contour[i],
      contour[0],
      contour[endIndex]
    )

    if (distance > maxDistance) {
      index = i
      maxDistance = distance
    }
  }

  if (maxDistance > epsilon) {
    collection = [
      ...RDP(contour.slice(0, index), epsilon),
      ...RDP(contour.slice(index, endIndex), epsilon),
    ]
  } else {
    collection = [contour[0], contour[endIndex]]
  }

  return collection
}
