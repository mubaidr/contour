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

/*

function DouglasPeucker(PointList[], epsilon)
    // Find the point with the maximum distance
    dmax = 0
    index = 0
    end = length(PointList)
    for i = 2 to (end - 1) {
        d = perpendicularDistance(PointList[i], Line(PointList[1], PointList[end]))
        if (d > dmax) {
            index = i
            dmax = d
        }
    }

    ResultList[] = empty;

    // If max distance is greater than epsilon, recursively simplify
    if (dmax > epsilon) {
        // Recursive call
        recResults1[] = DouglasPeucker(PointList[1...index], epsilon)
        recResults2[] = DouglasPeucker(PointList[index...end], epsilon)

        // Build the result list
        ResultList[] = {recResults1[1...length(recResults1) - 1], recResults2[1...length(recResults2)]}
    } else {
        ResultList[] = {PointList[1], PointList[end]}
    }
    // Return the result
    return ResultList[]
end

*/

/**
 *
 * Ramer–Douglas–Peucker algorithm: https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
 *
 * @param contour array of polygon/contour points
 * @param epsilon
 */
export function RDP(contour: Point[], epsilon = 1): Point[] {
  const endIndex = contour.length - 1
  let collection: Point[] = []
  let maxDistance = 0
  let index = 0

  // no need to simplify 2 points... duh!
  if (contour.length <= 2) return contour

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
