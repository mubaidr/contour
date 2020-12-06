// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm

import { Point } from './types/Point'

function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
}

export function perpendicularDistance(
  point: Point,
  start: Point,
  end: Point
): number {
  if (start.x === end.x && start.y === end.y) {
    return distance(point, start)
  }

  return (
    Math.abs(
      (start.y - end.y) * point.x +
        (end.x - start.x) * point.y +
        start.x * end.y -
        end.x * start.y
    ) / distance(start, end)
  )
}

export function RDP(contour: Point[], epsilon = 1): Point[] {
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
